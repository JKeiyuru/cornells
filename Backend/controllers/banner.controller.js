// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/controllers/banner.controller.js
import Banner from "../models/banner.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Helper function to validate banner data
const validateBannerData = (bannerData) => {
  const { title, description, image, link } = bannerData;
  
  const errors = [];
  
  if (!title || title.trim().length < 2) {
    errors.push("Banner title must be at least 2 characters long");
  }
  
  if (title && title.length > 100) {
    errors.push("Banner title must not exceed 100 characters");
  }
  
  if (!description || description.trim().length < 5) {
    errors.push("Banner description must be at least 5 characters long");
  }
  
  if (description && description.length > 300) {
    errors.push("Banner description must not exceed 300 characters");
  }
  
  if (!image || typeof image !== 'string' || !image.trim()) {
    errors.push("Banner image URL is required");
  }
  
  if (link && typeof link !== 'string') {
    errors.push("Banner link must be a valid string");
  }
  
  return errors;
};

// CREATE BANNER
// route POST /api/v1/banners
//@access Private/Admin
const createBanner = asyncHandler(async (req, res) => {
  // Check if user is admin
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required to create banners");
  }

  const errors = validateBannerData(req.body);
  if (errors.length > 0) {
    res.status(400);
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  try {
    const bannerData = {
      ...req.body,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      image: req.body.image.trim(),
      link: req.body.link?.trim() || '',
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      priority: req.body.priority || 1,
      startDate: req.body.startDate ? new Date(req.body.startDate) : new Date(),
      endDate: req.body.endDate ? new Date(req.body.endDate) : null,
      createdBy: req.user._id
    };

    // Validate date range
    if (bannerData.endDate && bannerData.startDate >= bannerData.endDate) {
      res.status(400);
      throw new Error("End date must be after start date");
    }

    const newBanner = new Banner(bannerData);
    const savedBanner = await newBanner.save();

    if (!savedBanner) {
      res.status(400);
      throw new Error("Failed to create the exclusive banner");
    }

    console.log(`✨ New luxury banner created: ${savedBanner.title}`);

    res.status(201).json({
      success: true,
      message: "Exclusive banner created successfully for Cornells",
      banner: savedBanner
    });
  } catch (error) {
    console.error('Banner creation error:', error);
    throw error;
  }
});

// UPDATE BANNER
// route PUT /api/v1/banners/:id
//@access Private/Admin
const updateBanner = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid banner ID");
  }

  const errors = validateBannerData(req.body);
  if (errors.length > 0) {
    res.status(400);
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  try {
    const updateData = {
      ...req.body,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      image: req.body.image.trim(),
      link: req.body.link?.trim() || '',
      updatedAt: new Date(),
      updatedBy: req.user._id
    };

    // Handle date updates
    if (req.body.startDate) updateData.startDate = new Date(req.body.startDate);
    if (req.body.endDate) updateData.endDate = new Date(req.body.endDate);

    // Validate date range
    if (updateData.endDate && updateData.startDate >= updateData.endDate) {
      res.status(400);
      throw new Error("End date must be after start date");
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('createdBy updatedBy', 'name');

    if (!updatedBanner) {
      res.status(404);
      throw new Error("Banner not found in our collection");
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner: updatedBanner
    });
  } catch (error) {
    console.error('Banner update error:', error);
    throw error;
  }
});

// DELETE BANNER
// route DELETE /api/v1/banners/:id
//@access Private/Admin
const deleteBanner = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid banner ID");
  }

  const banner = await Banner.findByIdAndDelete(req.params.id);
  
  if (!banner) {
    res.status(404);
    throw new Error("Banner not found");
  }

  res.status(200).json({
    success: true,
    message: "Banner deleted successfully from Cornells collection"
  });
});

// GET ALL BANNERS
// route GET /api/v1/banners
//@access Public
const getAllBanners = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const isActive = req.query.isActive;
  const sortBy = req.query.sortBy || 'priority';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

  const skip = (page - 1) * limit;

  let query = {};

  // Filter by active status
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  // Filter by date range (current banners)
  const now = new Date();
  if (req.query.current === 'true') {
    query.startDate = { $lte: now };
    query.$or = [
      { endDate: { $gte: now } },
      { endDate: null }
    ];
  }

  try {
    const banners = await Banner.find(query)
      .populate('createdBy updatedBy', 'name')
      .sort({ [sortBy]: sortOrder, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBanners = await Banner.countDocuments(query);
    const totalPages = Math.ceil(totalBanners / limit);

    res.status(200).json({
      success: true,
      banners: banners,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalBanners: totalBanners,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500);
    throw new Error("Failed to retrieve banners");
  }
});

// GET SINGLE BANNER
// route GET /api/v1/banners/:id
//@access Public
const getSingleBanner = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid banner ID");
  }

  const banner = await Banner.findById(req.params.id)
    .populate('createdBy updatedBy', 'name');

  if (!banner) {
    res.status(404);
    throw new Error("Banner not found");
  }

  // Update view count
  await Banner.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });

  res.status(200).json({
    success: true,
    banner: banner
  });
});

// GET ACTIVE BANNERS
// route GET /api/v1/banners/active
//@access Public
const getActiveBanners = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const now = new Date();

  const activeBanners = await Banner.find({
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: { $gte: now } },
      { endDate: null }
    ]
  })
    .sort({ priority: 1, createdAt: -1 })
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    banners: activeBanners
  });
});

// GET RANDOM BANNER
// route GET /api/v1/banners/random
//@access Public
const getRandomBanner = asyncHandler(async (req, res) => {
  const now = new Date();

  const activeBanners = await Banner.find({
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: { $gte: now } },
      { endDate: null }
    ]
  }).lean();

  if (!activeBanners || activeBanners.length === 0) {
    res.status(404);
    throw new Error("No active banners found");
  }

  const randomIndex = Math.floor(Math.random() * activeBanners.length);
  const randomBanner = activeBanners[randomIndex];

  // Update view count for the selected banner
  await Banner.findByIdAndUpdate(randomBanner._id, { $inc: { viewCount: 1 } });

  res.status(200).json({
    success: true,
    banner: randomBanner
  });
});

// GET BANNER STATISTICS (Admin only)
// route GET /api/v1/banners/stats
//@access Private/Admin
const getBannerStats = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  const now = new Date();

  const totalBanners = await Banner.countDocuments();
  const activeBanners = await Banner.countDocuments({ isActive: true });
  const currentBanners = await Banner.countDocuments({
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: { $gte: now } },
      { endDate: null }
    ]
  });
  const expiredBanners = await Banner.countDocuments({
    endDate: { $lt: now }
  });

  // Most viewed banners
  const topViewed = await Banner.find()
    .sort({ viewCount: -1 })
    .limit(5)
    .select('title viewCount createdAt')
    .lean();

  res.status(200).json({
    success: true,
    stats: {
      totalBanners,
      activeBanners,
      currentBanners,
      expiredBanners,
      topViewed
    }
  });
});

// TOGGLE BANNER STATUS
// route PATCH /api/v1/banners/:id/toggle
//@access Private/Admin
const toggleBannerStatus = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid banner ID");
  }

  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    res.status(404);
    throw new Error("Banner not found");
  }

  banner.isActive = !banner.isActive;
  banner.updatedAt = new Date();
  banner.updatedBy = req.user._id;

  const updatedBanner = await banner.save();

  res.status(200).json({
    success: true,
    message: `Banner ${updatedBanner.isActive ? 'activated' : 'deactivated'} successfully`,
    banner: updatedBanner
  });
});

export { 
  getAllBanners, 
  getSingleBanner,
  getActiveBanners,
  createBanner, 
  updateBanner,
  deleteBanner, 
  getRandomBanner,
  getBannerStats,
  toggleBannerStatus
};