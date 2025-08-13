// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/controllers/user.controller.js
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import validator from "validator";

// Validation helpers
const validateEmail = (email) => {
  return validator.isEmail(email) && email.length <= 254;
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

// UPDATE USER PROFILE
// route PUT /api/v1/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, currentPassword, ...otherFields } = req.body;

  // Check if user is updating their own profile or is admin
  if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - You can only update your own profile");
  }

  const user = await User.findById(userId).select('+password');
  if (!user) {
    res.status(404);
    throw new Error("User not found in our exclusive community");
  }

  const updateData = {};

  // Validate and update name
  if (name !== undefined) {
    if (!validateName(name)) {
      res.status(400);
      throw new Error("Name must be between 2 and 50 characters");
    }
    updateData.name = name.trim();
  }

  // Validate and update email
  if (email !== undefined) {
    if (!validateEmail(email)) {
      res.status(400);
      throw new Error("Please provide a valid email address");
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') },
      _id: { $ne: userId }
    });

    if (existingUser) {
      res.status(409);
      throw new Error("This email is already associated with another account");
    }

    updateData.email = email.toLowerCase().trim();
  }

  // Update password if provided
  if (password) {
    if (!currentPassword) {
      res.status(400);
      throw new Error("Current password is required to set a new password");
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      res.status(400);
      throw new Error("Current password is incorrect");
    }

    if (!validatePassword(password)) {
      res.status(400);
      throw new Error("New password must contain at least 8 characters with uppercase, lowercase, number and special character");
    }

    const salt = await bcrypt.genSalt(12);
    updateData.password = await bcrypt.hash(password, salt);
  }

  // Add other allowed fields (profile preferences, etc.)
  const allowedFields = ['phone', 'address', 'preferences', 'newsletter'];
  allowedFields.forEach(field => {
    if (otherFields[field] !== undefined) {
      updateData[field] = otherFields[field];
    }
  });

  // Update last modified timestamp
  updateData.updatedAt = new Date();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedUser) {
    res.status(400);
    throw new Error("Failed to update your profile");
  }

  res.status(200).json({
    success: true,
    message: "Your Cornells profile has been updated successfully",
    user: updatedUser
  });
});

// DELETE USER ACCOUNT
// route DELETE /api/v1/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Check if user is deleting their own account or is admin
  if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - You can only delete your own account");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found in our system");
  }

  // Soft delete by marking as inactive instead of hard delete
  const deletedUser = await User.findByIdAndUpdate(
    userId,
    { 
      $set: { 
        isActive: false,
        deletedAt: new Date(),
        email: `deleted_${Date.now()}_${user.email}` // Prevent email conflicts
      }
    },
    { new: true }
  );

  if (!deletedUser) {
    res.status(400);
    throw new Error("Failed to deactivate account");
  }

  res.status(200).json({
    success: true,
    message: "Your Cornells account has been deactivated successfully. We're sorry to see you go!"
  });
});

// GET SINGLE USER
// route GET /api/v1/users/:id
//@access Private
const getOneUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Check if user is viewing their own profile or is admin
  if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - You can only view your own profile");
  }

  const user = await User.findById(userId)
    .select('-password')
    .populate('orders', 'orderNumber totalAmount status createdAt');

  if (!user || !user.isActive) {
    res.status(404);
    throw new Error("User not found in our exclusive community");
  }

  res.status(200).json({
    success: true,
    user: user
  });
});

// GET ALL USERS (Admin only)
// route GET /api/v1/users
//@access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
  const search = req.query.search;

  const skip = (page - 1) * limit;

  let query = { isActive: { $ne: false } }; // Exclude soft deleted users

  // Add search functionality
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(query)
    .select('-password')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .populate('orders', 'orderNumber totalAmount status');

  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limit);

  res.status(200).json({
    success: true,
    users: users,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});

// GET USER STATISTICS (Admin only)
// route GET /api/v1/users/stats
//@access Private/Admin
const getUsersStats = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const monthlyStats = await User.aggregate([
    { 
      $match: { 
        createdAt: { $gte: lastYear },
        isActive: { $ne: false }
      } 
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" }
      }
    },
    {
      $group: {
        _id: { month: "$month", year: "$year" },
        total: { $sum: 1 }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);

  // Overall stats
  const totalUsers = await User.countDocuments({ isActive: { $ne: false } });
  const newUsersThisMonth = await User.countDocuments({
    createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    isActive: { $ne: false }
  });
  const activeUsers = await User.countDocuments({
    lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    isActive: { $ne: false }
  });

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      newUsersThisMonth,
      activeUsers,
      monthlyRegistrations: monthlyStats
    }
  });
});

// GET USER PROFILE (Current user)
// route GET /api/v1/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-password')
    .populate('orders', 'orderNumber totalAmount status createdAt');

  if (!user || !user.isActive) {
    res.status(404);
    throw new Error("User profile not found");
  }

  res.status(200).json({
    success: true,
    user: user
  });
});

// UPDATE USER PREFERENCES
// route PUT /api/v1/users/preferences
//@access Private
const updateUserPreferences = asyncHandler(async (req, res) => {
  const { newsletter, notifications, currency, language } = req.body;

  const preferences = {};
  if (newsletter !== undefined) preferences.newsletter = newsletter;
  if (notifications !== undefined) preferences.notifications = notifications;
  if (currency !== undefined) preferences.currency = currency;
  if (language !== undefined) preferences.language = language;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { preferences: preferences } },
    { new: true, runValidators: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    message: "Your preferences have been updated",
    user: updatedUser
  });
});

export {
  getAllUsers,
  getOneUser,
  getUsersStats,
  getUserProfile,
  deleteUser,
  updateUser,
  updateUserPreferences
};