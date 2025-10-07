// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/controllers/product.controllers.js
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Helper function to validate product data for Rekker business
const validateProductData = (productData) => {
  const { title, description, wholesalePrice, moq, brand, categories } = productData;
  
  const errors = [];
  
  if (!title || title.trim().length < 2) {
    errors.push("Product title must be at least 2 characters long");
  }
  
  if (!description || description.trim().length < 10) {
    errors.push("Product description must be at least 10 characters long");
  }
  
  if (!wholesalePrice || wholesalePrice <= 0) {
    errors.push("Wholesale price must be greater than 0 for business operations");
  }
  
  if (!moq || moq < 1) {
    errors.push("Minimum Order Quantity (MOQ) must be at least 1");
  }
  
  if (!brand || !["Rekker", "Saffron (by Rekker)", "Cornells (Distributed by Rekker)"].includes(brand)) {
    errors.push("Brand must be Rekker, Saffron (by Rekker), or Cornells (Distributed by Rekker)");
  }
  
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    errors.push("Product must belong to at least one category");
  }
  
  return errors;
};

// Helper function to format product response for frontend
const formatProductResponse = (product) => {
  const productObj = product.toJSON ? product.toJSON() : product;
  
  return {
    ...productObj,
    // Ensure backward compatibility
    desc: productObj.description,
    price: productObj.retailPrice || productObj.wholesalePrice,
    inStock: productObj.stock > 0,
    // Add Rekker-specific data
    brandInfo: product.getBrandSpecificInfo ? product.getBrandSpecificInfo() : null,
    wholesaleInfo: product.wholesaleInfo,
    minimumOrderValue: product.minimumOrderValue,
    stockLevel: product.stockLevel
  };
};

// CREATE A PRODUCT
// route POST /api/v1/products
// @access Private/Admin
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
      throw new Error("A product with this title already exists in the Rekker catalog");
    }

    // Process product data with Rekker-specific enhancements
    const productData = {
      ...req.body,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      createdBy: req.user._id,
      isActive: true,
      
      // Handle image data (support both img and images array)
      img: req.body.img || (req.body.images && req.body.images[0]) || "",
      images: req.body.images || (req.body.img ? [req.body.img] : []),
      
      // Ensure wholesale business requirements
      wholesalePrice: parseFloat(req.body.wholesalePrice),
      retailPrice: req.body.retailPrice ? parseFloat(req.body.retailPrice) : null,
      moq: parseInt(req.body.moq),
      stock: parseInt(req.body.stock || 0),
      
      // Initialize business metrics
      quotesRequested: 0,
      totalSales: 0,
      viewCount: 0,
      
      // Handle subcategories and target markets
      subcategories: req.body.subcategories || req.body.subcategory || [],
      targetMarket: req.body.targetMarket || []
    };

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    if (savedProduct) {
      console.log(`✨ New ${savedProduct.brand} product created: ${savedProduct.title}`);
      
      res.status(201).json({
        success: true,
        message: `Product successfully added to ${savedProduct.brand} catalog`,
        product: formatProductResponse(savedProduct)
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the product");
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
// @access Private/Admin
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
      updatedAt: new Date(),
      updatedBy: req.user._id,
      
      // Handle pricing updates
      wholesalePrice: parseFloat(req.body.wholesalePrice),
      retailPrice: req.body.retailPrice ? parseFloat(req.body.retailPrice) : null,
      moq: parseInt(req.body.moq),
      stock: parseInt(req.body.stock || 0),
      
      // Handle image updates
      img: req.body.img || (req.body.images && req.body.images[0]) || "",
      images: req.body.images || (req.body.img ? [req.body.img] : []),
      
      // Update subcategories and target markets
      subcategories: req.body.subcategories || req.body.subcategory || [],
      targetMarket: req.body.targetMarket || []
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('ratings.postedBy', 'name');

    if (!updatedProduct) {
      res.status(404);
      throw new Error("Product not found in the Rekker catalog");
    }

    res.status(200).json({
      success: true,
      message: `${updatedProduct.brand} product updated successfully`,
      product: formatProductResponse(updatedProduct)
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
// @access Private/Admin
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
    throw new Error("Product not found in the catalog");
  }

  res.status(200).json({
    success: true,
    message: `${product.brand} product has been removed from the catalog`
  });
});

// GET SINGLE PRODUCT
// route GET /api/v1/products/:id
// @access Public
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
    throw new Error("Product not found in the catalog");
  }

  // Update view count
  await Product.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });

  res.status(200).json({
    success: true,
    product: formatProductResponse(product)
  });
});

// GET ALL PRODUCTS WITH ENHANCED FILTERING FOR REKKER BUSINESS
// route GET /api/v1/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
  
  // Enhanced query parameters for Rekker business
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qBrand = req.query.brand;
  const qSearch = req.query.search;
  const qPriceMin = parseFloat(req.query.priceMin);
  const qPriceMax = parseFloat(req.query.priceMax);
  const qMoqMin = parseInt(req.query.moqMin);
  const qMoqMax = parseInt(req.query.moqMax);
  const qInStock = req.query.inStock;
  const qFeatured = req.query.featured;
  const qTargetMarket = req.query.targetMarket;

  const skip = (page - 1) * limit;

  let query = { isActive: { $ne: false } };
  let sort = {};

  // Brand filter (core to Rekker's business model)
  if (qBrand) {
    query.brand = qBrand;
  }

  // Category filter
  if (qCategory) {
    query.categories = { $in: [qCategory] };
  }

  // Target market filter (important for wholesale)
  if (qTargetMarket) {
    query.targetMarket = { $in: [qTargetMarket] };
  }

  // Search filter (enhanced for Rekker products)
  if (qSearch) {
    query.$or = [
      { title: { $regex: qSearch, $options: 'i' } },
      { description: { $regex: qSearch, $options: 'i' } },
      { brand: { $regex: qSearch, $options: 'i' } },
      { categories: { $in: [new RegExp(qSearch, 'i')] } },
      { subcategories: { $in: [new RegExp(qSearch, 'i')] } },
      { sku: { $regex: qSearch, $options: 'i' } }
    ];
  }

  // Wholesale price range filter
  if (!isNaN(qPriceMin) || !isNaN(qPriceMax)) {
    query.wholesalePrice = {};
    if (!isNaN(qPriceMin)) query.wholesalePrice.$gte = qPriceMin;
    if (!isNaN(qPriceMax)) query.wholesalePrice.$lte = qPriceMax;
  }

  // MOQ range filter (specific to wholesale business)
  if (!isNaN(qMoqMin) || !isNaN(qMoqMax)) {
    query.moq = {};
    if (!isNaN(qMoqMin)) query.moq.$gte = qMoqMin;
    if (!isNaN(qMoqMax)) query.moq.$lte = qMoqMax;
  }

  // Stock filter
  if (qInStock === 'true') {
    query.stock = { $gt: 0 };
  } else if (qInStock === 'false') {
    query.stock = { $lte: 0 };
  }

  // Featured filter
  if (qFeatured === 'true') {
    query.featured = true;
  }

  // Sorting logic
  if (qNew === 'true') {
    sort = { createdAt: -1 };
  } else if (sortBy === 'price') {
    sort = { wholesalePrice: sortOrder };
  } else if (sortBy === 'moq') {
    sort = { moq: sortOrder };
  } else if (sortBy === 'rating') {
    sort = { averageRating: sortOrder };
  } else if (sortBy === 'popularity') {
    sort = { viewCount: sortOrder };
  } else if (sortBy === 'quotes') {
    sort = { quotesRequested: sortOrder };
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

    // Enhanced statistics for Rekker business
    const brandStats = await Product.aggregate([
      { $match: { isActive: { $ne: false } } },
      { $group: { _id: '$brand', count: { $sum: 1 }, avgMoq: { $avg: '$moq' }, avgPrice: { $avg: '$wholesalePrice' } } },
      { $sort: { count: -1 } }
    ]);

    const categoryStats = await Product.aggregate([
      { $match: { isActive: { $ne: false } } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const targetMarketStats = await Product.aggregate([
      { $match: { isActive: { $ne: false } } },
      { $unwind: '$targetMarket' },
      { $group: { _id: '$targetMarket', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Format products for response
    const formattedProducts = products.map(product => ({
      ...product,
      desc: product.description,
      price: product.retailPrice || product.wholesalePrice,
      inStock: product.stock > 0,
      minimumOrderValue: product.wholesalePrice * product.moq,
      stockLevel: product.stock <= 0 ? 'out-of-stock' : 
                 product.stock <= 10 ? 'low-stock' : 'in-stock'
    }));

    res.status(200).json({
      success: true,
      products: formattedProducts,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalProducts: totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      filters: {
        brands: brandStats,
        categories: categoryStats,
        targetMarkets: targetMarketStats,
        appliedFilters: {
          brand: qBrand,
          category: qCategory,
          targetMarket: qTargetMarket,
          search: qSearch,
          priceRange: { min: qPriceMin, max: qPriceMax },
          moqRange: { min: qMoqMin, max: qMoqMax },
          inStock: qInStock,
          featured: qFeatured,
          sortBy: sortBy,
          sortOrder: req.query.sortOrder
        }
      },
      businessMetrics: {
        totalBrands: brandStats.length,
        totalCategories: categoryStats.length,
        avgMoq: brandStats.reduce((sum, brand) => sum + (brand.avgMoq || 0), 0) / brandStats.length,
        avgWholesalePrice: brandStats.reduce((sum, brand) => sum + (brand.avgPrice || 0), 0) / brandStats.length
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500);
    throw new Error("Failed to retrieve the product catalog");
  }
});

// GET PRODUCTS BY BRAND - Essential for Rekker's multi-brand structure
// route GET /api/v1/products/brand/:brandName
// @access Public
const getProductsByBrand = asyncHandler(async (req, res) => {
  const { brandName } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const featured = req.query.featured;
  
  // Validate brand name
  const validBrands = ["Rekker", "Saffron (by Rekker)", "Cornells (Distributed by Rekker)"];
  if (!validBrands.includes(brandName)) {
    res.status(400);
    throw new Error("Invalid brand name. Must be Rekker, Saffron (by Rekker), or Cornells (Distributed by Rekker)");
  }

  const skip = (page - 1) * limit;
  let query = { brand: brandName, isActive: { $ne: false } };
  
  if (featured === 'true') {
    query.featured = true;
  }

  try {
    const products = await Product.find(query)
      .populate('ratings.postedBy', 'name')
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalProducts = await Product.countDocuments(query);
    
    // Brand-specific statistics
    const brandStats = await Product.aggregate([
      { $match: { brand: brandName, isActive: { $ne: false } } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          avgPrice: { $avg: '$wholesalePrice' },
          avgMoq: { $avg: '$moq' },
          totalQuotes: { $sum: '$quotesRequested' },
          totalSales: { $sum: '$totalSales' },
          featuredCount: { $sum: { $cond: ['$featured', 1, 0] } }
        }
      }
    ]);

    const formattedProducts = products.map(product => formatProductResponse(product));

    res.status(200).json({
      success: true,
      brand: {
        name: brandName,
        description: getBrandDescription(brandName),
        color: getBrandColor(brandName)
      },
      products: formattedProducts,
      statistics: brandStats[0] || {},
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts: totalProducts,
        hasNextPage: page < Math.ceil(totalProducts / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Unable to retrieve ${brandName} products`);
  }
});

// Helper functions for brand information
const getBrandDescription = (brand) => {
  switch (brand) {
    case "Saffron (by Rekker)":
      return "Cleaning products manufactured by Rekker";
    case "Cornells (Distributed by Rekker)":
      return "Beauty products distributed by Rekker, manufactured by Starling Parfums";
    default:
      return "Quality products by Rekker";
  }
};

const getBrandColor = (brand) => {
  switch (brand) {
    case "Saffron (by Rekker)":
      return "#f59e0b"; // Orange-yellow
    case "Cornells (Distributed by Rekker)":
      return "#a855f7"; // Purple-pink
    default:
      return "#0891b2"; // Blue-green
  }
};

// GET FEATURED PRODUCTS
// route GET /api/v1/products/featured
// @access Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const brand = req.query.brand;

  let query = { 
    isActive: { $ne: false },
    featured: true 
  };
  
  if (brand) {
    query.brand = brand;
  }

  const featuredProducts = await Product.find(query)
    .populate('ratings.postedBy', 'name')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  const formattedProducts = featuredProducts.map(product => formatProductResponse(product));

  res.status(200).json({
    success: true,
    products: formattedProducts,
    count: formattedProducts.length
  });
});

// GET RELATED PRODUCTS
// route GET /api/v1/products/:id/related
// @access Public
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

  // Find related products by brand and category
  const relatedProducts = await Product.find({
    _id: { $ne: req.params.id },
    isActive: { $ne: false },
    $or: [
      { brand: currentProduct.brand },
      { categories: { $in: currentProduct.categories } }
    ]
  })
    .populate('ratings.postedBy', 'name')
    .sort({ brand: currentProduct.brand ? -1 : 1, createdAt: -1 })
    .limit(limit)
    .lean();

  const formattedProducts = relatedProducts.map(product => formatProductResponse(product));

  res.status(200).json({
    success: true,
    products: formattedProducts,
    basedOn: {
      brand: currentProduct.brand,
      categories: currentProduct.categories
    }
  });
});

// REQUEST PRODUCT QUOTE - Core wholesale functionality
// route POST /api/v1/products/:id/quote
// @access Public (no login required for quote requests)
const requestProductQuote = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  const { quantity, businessName, contactName, email, phone, message } = req.body;

  // Validation
  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error("Quantity must be at least 1");
  }

  if (!businessName || !contactName || !email || !phone) {
    res.status(400);
    throw new Error("Business name, contact name, email, and phone are required");
  }

  const product = await Product.findById(req.params.id);
  
  if (!product || !product.isActive) {
    res.status(404);
    throw new Error("Product not found or no longer available");
  }

  if (quantity < product.moq) {
    res.status(400);
    throw new Error(`Minimum order quantity for this product is ${product.moq} units`);
  }

  // Calculate quote details
  const bulkPricing = product.calculateBulkPrice(quantity);
  
  // Update product quote metrics
  await product.incrementQuoteRequests();

  // Here you would typically save the quote request to a Quote model
  // For now, we'll return the quote information
  const quoteData = {
    product: {
      id: product._id,
      title: product.title,
      brand: product.brand,
      sku: product.sku
    },
    customer: {
      businessName,
      contactName,
      email,
      phone
    },
    quote: {
      quantity,
      unitPrice: bulkPricing.unitPrice,
      totalPrice: bulkPricing.totalPrice,
      discount: bulkPricing.discount,
      moq: product.moq,
      currency: 'KSh'
    },
    message,
    requestedAt: new Date()
  };

  res.status(201).json({
    success: true,
    message: "Quote request submitted successfully. We'll contact you within 24 hours.",
    quote: quoteData
  });
});

// ADD PRODUCT RATING/REVIEW
// route POST /api/v1/products/:productId/rating
// @access Private
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
    throw new Error("Product not found in the catalog");
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
    message: "Thank you for your review of our Rekker product",
    product: formatProductResponse(updatedProduct)
  });
});

// UPDATE PRODUCT RATING/REVIEW
// route PUT /api/v1/products/:productId/rating
// @access Private
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
    product: formatProductResponse(updatedProduct)
  });
});

// DELETE PRODUCT RATING/REVIEW
// route DELETE /api/v1/products/:productId/rating
// @access Private
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
    product: formatProductResponse(updatedProduct)
  });
});

// GET PRODUCT STATISTICS (Admin only)
// route GET /api/v1/products/stats
// @access Private/Admin
const getProductStats = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  // Overall statistics
  const totalProducts = await Product.countDocuments({ isActive: { $ne: false } });
  const outOfStock = await Product.countDocuments({ 
    isActive: { $ne: false }, 
    stock: { $lte: 0 } 
  });
  const lowStock = await Product.countDocuments({ 
    isActive: { $ne: false }, 
    stock: { $gte: 1, $lte: 10 } 
  });
  const featuredProducts = await Product.countDocuments({
    isActive: { $ne: false },
    featured: true
  });

  // Brand breakdown
  const brandStats = await Product.aggregate([
    { $match: { isActive: { $ne: false } } },
    {
      $group: {
        _id: '$brand',
        count: { $sum: 1 },
        avgMoq: { $avg: '$moq' },
        avgWholesalePrice: { $avg: '$wholesalePrice' },
        totalQuotes: { $sum: '$quotesRequested' },
        totalSales: { $sum: '$totalSales' },
        featuredCount: { $sum: { $cond: ['$featured', 1, 0] } }
      }
    },
    { $sort: { count: -1 } }
  ]);

  // Top performing products
  const topQuoted = await Product.find({ 
    isActive: { $ne: false },
    quotesRequested: { $gt: 0 }
  })
    .sort({ quotesRequested: -1 })
    .limit(5)
    .select('title brand quotesRequested totalSales averageRating')
    .lean();

  const topSelling = await Product.find({ 
    isActive: { $ne: false },
    totalSales: { $gt: 0 }
  })
    .sort({ totalSales: -1 })
    .limit(5)
    .select('title brand totalSales quotesRequested averageRating')
    .lean();

  // Most viewed products
  const mostViewed = await Product.find({ 
    isActive: { $ne: false } 
  })
    .sort({ viewCount: -1 })
    .limit(5)
    .select('title brand viewCount quotesRequested')
    .lean();

  // Category performance
  const categoryStats = await Product.aggregate([
    { $match: { isActive: { $ne: false } } },
    { $unwind: '$categories' },
    {
      $group: {
        _id: '$categories',
        count: { $sum: 1 },
        avgMoq: { $avg: '$moq' },
        totalQuotes: { $sum: '$quotesRequested' }
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({
    success: true,
    stats: {
      overview: {
        totalProducts,
        outOfStock,
        lowStock,
        featuredProducts,
        inStock: totalProducts - outOfStock
      },
      brands: brandStats,
      topPerforming: {
        mostQuoted: topQuoted,
        topSelling: topSelling,
        mostViewed: mostViewed
      },
      categories: categoryStats,
      businessMetrics: {
        totalQuoteRequests: brandStats.reduce((sum, brand) => sum + brand.totalQuotes, 0),
        totalSalesValue: brandStats.reduce((sum, brand) => sum + brand.totalSales, 0),
        avgMoqAcrossBrands: brandStats.reduce((sum, brand) => sum + brand.avgMoq, 0) / brandStats.length
      }
    }
  });
});

// GET ADMIN DASHBOARD DATA
// route GET /api/v1/products/admin/dashboard
// @access Private/Admin
const getAdminDashboard = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  // Recent products
  const recentProducts = await Product.find({ isActive: { $ne: false } })
    .sort({ createdAt: -1 })
    .limit(10)
    .select('title brand createdAt quotesRequested totalSales stock')
    .lean();

  // Products needing attention
  const lowStockProducts = await Product.find({
    isActive: { $ne: false },
    stock: { $gt: 0, $lte: 10 }
  })
    .sort({ stock: 1 })
    .limit(10)
    .select('title brand stock moq')
    .lean();

  const outOfStockProducts = await Product.find({
    isActive: { $ne: false },
    stock: { $lte: 0 }
  })
    .sort({ quotesRequested: -1 })
    .limit(10)
    .select('title brand quotesRequested moq')
    .lean();

  // Recent activity
  const highQuoteProducts = await Product.find({
    isActive: { $ne: false },
    quotesRequested: { $gte: 5 }
  })
    .sort({ quotesRequested: -1 })
    .limit(10)
    .select('title brand quotesRequested totalSales stock')
    .lean();

  res.status(200).json({
    success: true,
    dashboard: {
      recentProducts: recentProducts.map(p => formatProductResponse(p)),
      attention: {
        lowStock: lowStockProducts.map(p => formatProductResponse(p)),
        outOfStock: outOfStockProducts.map(p => formatProductResponse(p))
      },
      activity: {
        highQuotes: highQuoteProducts.map(p => formatProductResponse(p))
      }
    }
  });
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  getProductsByBrand,
  getFeaturedProducts,
  getRelatedProducts,
  requestProductQuote,
  ratingProduct,
  updateRating,
  deleteRating,
  getProductStats,
  getAdminDashboard
};