// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/controllers/product.controller.js
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Helper function to validate product data
const validateProductData = (productData) => {
  const { title, description, price, categories } = productData;
  
  const errors = [];
  
  if (!title || title.trim().length < 2) {
    errors.push("Product title must be at least 2 characters long");
  }
  
  if (!description || description.trim().length < 10) {
    errors.push("Product description must be at least 10 characters long");
  }
  
  if (!price || price <= 0) {
    errors.push("Product price must be greater than 0");
  }
  
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    errors.push("Product must belong to at least one category");
  }
  
  return errors;
};

// CREATE A PRODUCT
// route POST /api/v1/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // Check if user is admin
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required to create products");
  }

  const errors = validateProductData(req.body);
  if (errors.length > 0) {
    res.status(400);
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  try {
    // Check if product with same title already exists
    const existingProduct = await Product.findOne({ 
      title: { $regex: new RegExp(`^${req.body.title}$`, 'i') }
    });

    if (existingProduct) {
      res.status(409);
      throw new Error("A product with this title already exists in our exclusive collection");
    }

    const productData = {
      ...req.body,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      createdBy: req.user._id,
      isActive: true
    };

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    if (savedProduct) {
      console.log(`✨ New luxury product created: ${savedProduct.title}`);
      
      res.status(201).json({
        success: true,
        message: "Exclusive product added to Cornells collection successfully",
        product: savedProduct
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the exclusive product");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error("Product with similar details already exists");
    }
    throw error;
  }
});

// UPDATE PRODUCT
// route PUT /api/v1/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  const errors = validateProductData(req.body);
  if (errors.length > 0) {
    res.status(400);
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  try {
    const updateData = {
      ...req.body,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      slug: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      updatedAt: new Date(),
      updatedBy: req.user._id
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('ratings.postedBy', 'name');

    if (!updatedProduct) {
      res.status(404);
      throw new Error("Product not found in our exclusive collection");
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully in Cornells collection",
      product: updatedProduct
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error("Another product with similar details already exists");
    }
    throw error;
  }
});

// DELETE PRODUCT (Soft Delete)
// route DELETE /api/v1/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { 
      $set: { 
        isActive: false,
        deletedAt: new Date(),
        deletedBy: req.user._id
      }
    },
    { new: true }
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found in our collection");
  }

  res.status(200).json({
    success: true,
    message: "Product has been removed from Cornells collection"
  });
});

// GET SINGLE PRODUCT
// route GET /api/v1/products/:id
//@access Public
const getProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  const product = await Product.findOne({ 
    _id: req.params.id, 
    isActive: { $ne: false } 
  })
    .populate('ratings.postedBy', 'name')
    .populate('createdBy', 'name');

  if (!product) {
    res.status(404);
    throw new Error("This exclusive product is not available");
  }

  // Update view count
  await Product.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });

  res.status(200).json({
    success: true,
    product: product
  });
});

// GET ALL PRODUCTS
// route GET /api/v1/products
//@access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
  
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qSearch = req.query.search;
  const qPriceMin = parseFloat(req.query.priceMin);
  const qPriceMax = parseFloat(req.query.priceMax);
  const qInStock = req.query.inStock;

  const skip = (page - 1) * limit;

  let query = { isActive: { $ne: false } };
  let sort = {};

  // Category filter
  if (qCategory) {
    query.categories = { $in: [qCategory] };
  }

  // Search filter
  if (qSearch) {
    query.$or = [
      { title: { $regex: qSearch, $options: 'i' } },
      { description: { $regex: qSearch, $options: 'i' } },
      { categories: { $in: [new RegExp(qSearch, 'i')] } }
    ];
  }

  // Price range filter
  if (!isNaN(qPriceMin) || !isNaN(qPriceMax)) {
    query.price = {};
    if (!isNaN(qPriceMin)) query.price.$gte = qPriceMin;
    if (!isNaN(qPriceMax)) query.price.$lte = qPriceMax;
  }

  // Stock filter
  if (qInStock === 'true') {
    query.inStock = { $gt: 0 };
  } else if (qInStock === 'false') {
    query.inStock = { $lte: 0 };
  }

  // Sorting
  if (qNew === 'true') {
    sort = { createdAt: -1 };
  } else if (sortBy === 'price') {
    sort = { price: sortOrder };
  } else if (sortBy === 'rating') {
    sort = { averageRating: sortOrder };
  } else if (sortBy === 'popularity') {
    sort = { viewCount: sortOrder };
  } else {
    sort = { [sortBy]: sortOrder };
  }

  try {
    const products = await Product.find(query)
      .populate('ratings.postedBy', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    // Get category statistics
    const categoryStats = await Product.aggregate([
      { $match: { isActive: { $ne: false } } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      products: products,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalProducts: totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      filters: {
        categories: categoryStats,
        appliedFilters: {
          category: qCategory,
          search: qSearch,
          priceRange: { min: qPriceMin, max: qPriceMax },
          inStock: qInStock,
          sortBy: sortBy,
          sortOrder: req.query.sortOrder
        }
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500);
    throw new Error("Failed to retrieve our exclusive collection");
  }
});

// GET FEATURED PRODUCTS
// route GET /api/v1/products/featured
//@access Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 8;

  const featuredProducts = await Product.find({ 
    isActive: { $ne: false },
    featured: true 
  })
    .populate('ratings.postedBy', 'name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    products: featuredProducts
  });
});

// GET RELATED PRODUCTS
// route GET /api/v1/products/:id/related
//@access Public
const getRelatedProducts = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  const currentProduct = await Product.findById(req.params.id);
  if (!currentProduct) {
    res.status(404);
    throw new Error("Product not found");
  }

  const limit = parseInt(req.query.limit) || 6;

  const relatedProducts = await Product.find({
    _id: { $ne: req.params.id },
    isActive: { $ne: false },
    categories: { $in: currentProduct.categories }
  })
    .populate('ratings.postedBy', 'name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    products: relatedProducts
  });
});

// ADD PRODUCT RATING/REVIEW
// route POST /api/v1/products/:productId/rating
//@access Private
const ratingProduct = asyncHandler(async (req, res) => {
  const { star, comment } = req.body;
  const productId = req.params.productId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  // Validation
  if (!star || star < 1 || star > 5) {
    res.status(400);
    throw new Error("Rating must be between 1 and 5 stars");
  }

  if (!comment || comment.trim().length < 5) {
    res.status(400);
    throw new Error("Review comment must be at least 5 characters long");
  }

  const product = await Product.findOne({ 
    _id: productId, 
    isActive: { $ne: false } 
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found in our exclusive collection");
  }

  // Check if user already reviewed this product
  const existingRating = product.ratings.find(
    rating => rating.postedBy.toString() === req.user._id.toString()
  );

  if (existingRating) {
    res.status(409);
    throw new Error("You have already reviewed this product. You can update your existing review.");
  }

  const newRating = {
    star: parseInt(star),
    comment: comment.trim(),
    name: req.user.name,
    postedBy: req.user._id,
    createdAt: new Date()
  };

  product.ratings.push(newRating);

  // Calculate new average rating
  const totalRatings = product.ratings.length;
  const sumRatings = product.ratings.reduce((sum, rating) => sum + rating.star, 0);
  product.averageRating = (sumRatings / totalRatings).toFixed(1);

  const updatedProduct = await product.save();

  res.status(201).json({
    success: true,
    message: "Thank you for your exclusive review of our Cornells product",
    product: updatedProduct
  });
});

// UPDATE PRODUCT RATING/REVIEW
// route PUT /api/v1/products/:productId/rating
//@access Private
const updateRating = asyncHandler(async (req, res) => {
  const { star, comment } = req.body;
  const productId = req.params.productId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  // Validation
  if (!star || star < 1 || star > 5) {
    res.status(400);
    throw new Error("Rating must be between 1 and 5 stars");
  }

  if (!comment || comment.trim().length < 5) {
    res.status(400);
    throw new Error("Review comment must be at least 5 characters long");
  }

  const product = await Product.findOne({ 
    _id: productId, 
    isActive: { $ne: false } 
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Find and update existing rating
  const ratingIndex = product.ratings.findIndex(
    rating => rating.postedBy.toString() === req.user._id.toString()
  );

  if (ratingIndex === -1) {
    res.status(404);
    throw new Error("You haven't reviewed this product yet");
  }

  product.ratings[ratingIndex].star = parseInt(star);
  product.ratings[ratingIndex].comment = comment.trim();
  product.ratings[ratingIndex].updatedAt = new Date();

  // Recalculate average rating
  const totalRatings = product.ratings.length;
  const sumRatings = product.ratings.reduce((sum, rating) => sum + rating.star, 0);
  product.averageRating = (sumRatings / totalRatings).toFixed(1);

  const updatedProduct = await product.save();

  res.status(200).json({
    success: true,
    message: "Your review has been updated successfully",
    product: updatedProduct
  });
});

// DELETE PRODUCT RATING/REVIEW
// route DELETE /api/v1/products/:productId/rating
//@access Private
const deleteRating = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  const product = await Product.findOne({ 
    _id: productId, 
    isActive: { $ne: false } 
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Find and remove rating
  const ratingIndex = product.ratings.findIndex(
    rating => rating.postedBy.toString() === req.user._id.toString()
  );

  if (ratingIndex === -1) {
    res.status(404);
    throw new Error("You haven't reviewed this product");
  }

  product.ratings.splice(ratingIndex, 1);

  // Recalculate average rating
  if (product.ratings.length > 0) {
    const totalRatings = product.ratings.length;
    const sumRatings = product.ratings.reduce((sum, rating) => sum + rating.star, 0);
    product.averageRating = (sumRatings / totalRatings).toFixed(1);
  } else {
    product.averageRating = 0;
  }

  const updatedProduct = await product.save();

  res.status(200).json({
    success: true,
    message: "Your review has been deleted successfully",
    product: updatedProduct
  });
});

// GET PRODUCT STATISTICS (Admin only)
// route GET /api/v1/products/stats
//@access Private/Admin
const getProductStats = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  const totalProducts = await Product.countDocuments({ isActive: { $ne: false } });
  const outOfStock = await Product.countDocuments({ 
    isActive: { $ne: false }, 
    inStock: { $lte: 0 } 
  });
  const lowStock = await Product.countDocuments({ 
    isActive: { $ne: false }, 
    inStock: { $gte: 1, $lte: 10 } 
  });

  // Top rated products
  const topRated = await Product.find({ 
    isActive: { $ne: false },
    averageRating: { $gte: 4.5 }
  })
    .sort({ averageRating: -1 })
    .limit(5)
    .select('title averageRating ratings')
    .lean();

  // Most viewed products
  const mostViewed = await Product.find({ 
    isActive: { $ne: false } 
  })
    .sort({ viewCount: -1 })
    .limit(5)
    .select('title viewCount')
    .lean();

  res.status(200).json({
    success: true,
    stats: {
      totalProducts,
      outOfStock,
      lowStock,
      topRated,
      mostViewed
    }
  });
});

export {
  ratingProduct,
  updateRating,
  deleteRating,
  getAllProducts,
  getFeaturedProducts,
  getRelatedProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
};