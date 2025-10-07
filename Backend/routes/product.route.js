// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/routes/product.route.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  ratingProduct,
  updateRating,
  deleteRating,
  deleteProduct,
  getFeaturedProducts,
  getRelatedProducts,
  getProductStats,
  getProductsByBrand,
  requestProductQuote,
  getAdminDashboard
} from "../controllers/product.controllers.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Enhanced rate limiting for different operations
const createProductLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Allow more product creations for active admin work
  message: {
    success: false,
    message: "Product creation limit reached. Please wait before adding more items to the catalog.",
    error: "PRODUCT_CREATION_LIMIT"
  },
  standardHeaders: true,
  legacyHeaders: false
});

const ratingLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // Allow more ratings for better customer feedback
  message: {
    success: false,
    message: "Daily rating limit reached. Quality reviews take time to craft.",
    error: "RATING_LIMIT_EXCEEDED"
  }
});

const productUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // More updates for active inventory management
  message: {
    success: false,
    message: "Too many product updates. Please slow down for optimal performance.",
    error: "UPDATE_LIMIT_EXCEEDED"
  }
});

const quoteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Reasonable limit for quote requests per business
  message: {
    success: false,
    message: "Quote request limit reached. Please contact us directly for urgent requests.",
    error: "QUOTE_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false
});

const bulkOperationsLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 5, // Limited bulk operations to prevent system overload
  message: {
    success: false,
    message: "Bulk operations limit reached. Please wait before performing more bulk actions.",
    error: "BULK_LIMIT_EXCEEDED"
  }
});

// ================================
// PUBLIC ROUTES (No authentication required)
// ================================

// Get all products with enhanced filtering for Rekker business model
router.get("/", getAllProducts);

// Get single product details with business information
router.get("/:id", getProduct);

// Get featured products across all brands or specific brand
router.get("/featured/collection", getFeaturedProducts);

// Get related products based on brand and category
router.get("/:id/related", getRelatedProducts);

// ================================
// BRAND-SPECIFIC ROUTES (Public)
// ================================

// Get products by brand - Core to Rekker's multi-brand structure
router.get("/brand/:brandName", async (req, res) => {
  try {
    const { brandName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const featured = req.query.featured;
    const category = req.query.category;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    // Validate brand name
    const validBrands = ["Rekker", "Saffron (by Rekker)", "Cornells (Distributed by Rekker)"];
    const decodedBrandName = decodeURIComponent(brandName);
    
    if (!validBrands.includes(decodedBrandName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid brand name",
        validBrands: validBrands
      });
    }

    const { default: Product } = await import("../models/product.model.js");
    
    const skip = (page - 1) * limit;
    let query = { brand: decodedBrandName, isActive: { $ne: false } };
    
    if (featured === 'true') query.featured = true;
    if (category) query.categories = { $in: [category] };

    const products = await Product.find(query)
      .populate('ratings.postedBy', 'name')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalProducts = await Product.countDocuments(query);
    
    // Brand-specific statistics
    const brandStats = await Product.aggregate([
      { $match: { brand: decodedBrandName, isActive: { $ne: false } } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          avgWholesalePrice: { $avg: '$wholesalePrice' },
          avgMoq: { $avg: '$moq' },
          totalQuotes: { $sum: '$quotesRequested' },
          totalSales: { $sum: '$totalSales' },
          featuredCount: { $sum: { $cond: ['$featured', 1, 0] } },
          inStockCount: { $sum: { $cond: [{ $gt: ['$stock', 0] }, 1, 0] } }
        }
      }
    ]);

    // Category breakdown for this brand
    const categoryStats = await Product.aggregate([
      { $match: { brand: decodedBrandName, isActive: { $ne: false } } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
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
                 product.stock <= 10 ? 'low-stock' : 'in-stock',
      brandInfo: {
        name: product.brand,
        color: product.brand.includes('Saffron') ? '#f59e0b' : 
               product.brand.includes('Cornells') ? '#a855f7' : '#0891b2'
      }
    }));

    res.status(200).json({
      success: true,
      brand: {
        name: decodedBrandName,
        description: getBrandDescription(decodedBrandName),
        color: getBrandColor(decodedBrandName),
        manufacturer: getBrandManufacturer(decodedBrandName)
      },
      products: formattedProducts,
      statistics: brandStats[0] || {},
      categories: categoryStats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts: totalProducts,
        hasNextPage: page < Math.ceil(totalProducts / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Brand products error:', error);
    res.status(500).json({
      success: false,
      message: "Unable to retrieve brand products at this time"
    });
  }
});

// Helper functions for brand information
const getBrandDescription = (brand) => {
  switch (brand) {
    case "Saffron (by Rekker)":
      return "Premium cleaning products manufactured by Rekker";
    case "Cornells (Distributed by Rekker)":
      return "Luxury beauty products distributed by Rekker, manufactured by Starling Parfums";
    default:
      return "Quality products manufactured by Rekker";
  }
};

const getBrandColor = (brand) => {
  switch (brand) {
    case "Saffron (by Rekker)":
      return "#f59e0b"; // Saffron orange-yellow
    case "Cornells (Distributed by Rekker)":
      return "#a855f7"; // Cornells purple-pink
    default:
      return "#0891b2"; // Rekker blue-green
  }
};

const getBrandManufacturer = (brand) => {
  switch (brand) {
    case "Saffron (by Rekker)":
      return "Rekker";
    case "Cornells (Distributed by Rekker)":
      return "Starling Parfums";
    default:
      return "Rekker";
  }
};

// Get products by category across all brands
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const brand = req.query.brand;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    const { default: Product } = await import("../models/product.model.js");
    
    const skip = (page - 1) * limit;
    
    let query = {
      categories: { $regex: new RegExp(categoryName, 'i') },
      isActive: { $ne: false }
    };
    
    if (brand) query.brand = brand;
    
    const products = await Product.find(query)
      .populate('ratings.postedBy', 'name')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const totalProducts = await Product.countDocuments(query);
    
    // Brand breakdown within this category
    const brandStats = await Product.aggregate([
      { $match: query },
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

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
      category: categoryName,
      products: formattedProducts,
      brandBreakdown: brandStats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts: totalProducts,
        hasNextPage: page < Math.ceil(totalProducts / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Category products error:', error);
    res.status(500).json({
      success: false,
      message: "Unable to retrieve category products at this time"
    });
  }
});

// Advanced wholesale search
router.post("/search/wholesale", async (req, res) => {
  try {
    const {
      searchTerm,
      brands,
      categories,
      moqRange,
      priceRange,
      targetMarkets,
      inStock,
      sortBy,
      sortOrder,
      page,
      limit
    } = req.body;
    
    const { default: Product } = await import("../models/product.model.js");
    
    let query = { isActive: { $ne: false } };
    
    // Text search
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { categories: { $in: [new RegExp(searchTerm, 'i')] } },
        { sku: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    
    // Brand filter
    if (brands && brands.length > 0) {
      query.brand = { $in: brands };
    }
    
    // Category filter
    if (categories && categories.length > 0) {
      query.categories = { $in: categories };
    }
    
    // MOQ range filter
    if (moqRange && (moqRange.min || moqRange.max)) {
      query.moq = {};
      if (moqRange.min) query.moq.$gte = moqRange.min;
      if (moqRange.max) query.moq.$lte = moqRange.max;
    }
    
    // Wholesale price range filter
    if (priceRange && (priceRange.min || priceRange.max)) {
      query.wholesalePrice = {};
      if (priceRange.min) query.wholesalePrice.$gte = priceRange.min;
      if (priceRange.max) query.wholesalePrice.$lte = priceRange.max;
    }
    
    // Target market filter
    if (targetMarkets && targetMarkets.length > 0) {
      query.targetMarket = { $in: targetMarkets };
    }
    
    // Stock filter
    if (inStock !== undefined) {
      query.stock = inStock ? { $gt: 0 } : { $lte: 0 };
    }
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 12;
    const skip = (pageNum - 1) * limitNum;
    
    let sort = {};
    const sortField = sortBy || 'createdAt';
    const order = sortOrder === 'asc' ? 1 : -1;
    sort = { [sortField]: order };
    
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate('ratings.postedBy', 'name')
      .lean();
    
    const totalProducts = await Product.countDocuments(query);

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
      totalResults: totalProducts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalProducts / limitNum),
        hasNextPage: pageNum < Math.ceil(totalProducts / limitNum),
        hasPrevPage: pageNum > 1
      },
      searchCriteria: {
        searchTerm,
        brands,
        categories,
        moqRange,
        priceRange,
        targetMarkets,
        inStock
      }
    });
  } catch (error) {
    console.error('Wholesale search error:', error);
    res.status(500).json({
      success: false,
      message: "Wholesale search temporarily unavailable"
    });
  }
});

// ================================
// WHOLESALE BUSINESS ROUTES (Public but business-focused)
// ================================

// Request product quote - Core wholesale functionality
router.post("/:id/quote", quoteLimiter, requestProductQuote);

// Get wholesale catalog summary
router.get("/wholesale/catalog", async (req, res) => {
  try {
    const { default: Product } = await import("../models/product.model.js");
    
    // Summary statistics for wholesale buyers
    const summary = await Product.aggregate([
      { $match: { isActive: { $ne: false } } },
      {
        $group: {
          _id: '$brand',
          productCount: { $sum: 1 },
          avgMoq: { $avg: '$moq' },
          minMoq: { $min: '$moq' },
          maxMoq: { $max: '$moq' },
          avgWholesalePrice: { $avg: '$wholesalePrice' },
          minWholesalePrice: { $min: '$wholesalePrice' },
          maxWholesalePrice: { $max: '$wholesalePrice' },
          categories: { $addToSet: { $arrayElemAt: ['$categories', 0] } }
        }
      },
      { $sort: { productCount: -1 } }
    ]);
    
    // Top categories across all brands
    const topCategories = await Product.aggregate([
      { $match: { isActive: { $ne: false } } },
      { $unwind: '$categories' },
      {
        $group: {
          _id: '$categories',
          count: { $sum: 1 },
          brands: { $addToSet: '$brand' },
          avgMoq: { $avg: '$moq' },
          avgPrice: { $avg: '$wholesalePrice' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    res.status(200).json({
      success: true,
      wholesale: {
        brandSummary: summary,
        topCategories: topCategories,
        totalProducts: await Product.countDocuments({ isActive: { $ne: false } }),
        message: "Rekker Wholesale Catalog - Quality products for your business needs"
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve wholesale catalog"
    });
  }
});

// ================================
// PROTECTED ROUTES (Authentication required)
// ================================

// Add product rating/review
router.post("/:productId/ratings", protect, ratingLimiter, ratingProduct);

// Update product rating/review
router.put("/:productId/ratings", protect, updateRating);

// Delete product rating/review
router.delete("/:productId/ratings", protect, deleteRating);

// Get user's own ratings
router.get("/user/ratings", protect, async (req, res) => {
  try {
    const { default: Product } = await import("../models/product.model.js");
    
    const products = await Product.find({
      'ratings.postedBy': req.user._id,
      isActive: { $ne: false }
    })
      .select('title img brand ratings')
      .lean();
    
    const userRatings = products.map(product => {
      const userRating = product.ratings.find(
        rating => rating.postedBy.toString() === req.user._id.toString()
      );
      
      return {
        productId: product._id,
        productTitle: product.title,
        productBrand: product.brand,
        productImage: product.img,
        rating: userRating
      };
    });
    
    res.status(200).json({
      success: true,
      ratings: userRatings,
      count: userRatings.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve your reviews at this time"
    });
  }
});

// ================================
// ADMIN ONLY ROUTES
// ================================

// Create new product
router.post("/", protect, requireRole('admin'), createProductLimiter, createProduct);

// Update product
router.put("/:id", protect, requireRole('admin'), productUpdateLimiter, updateProduct);

// Delete product (soft delete)
router.delete("/:id", protect, requireRole('admin'), deleteProduct);

// Get comprehensive product statistics
router.get("/admin/stats", protect, requireRole('admin'), getProductStats);

// Get admin dashboard data
router.get("/admin/dashboard", protect, requireRole('admin'), getAdminDashboard);

// Get low stock alerts
router.get("/admin/low-stock", protect, requireRole('admin'), async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    const { default: Product } = await import("../models/product.model.js");
    
    const lowStockProducts = await Product.find({
      isActive: { $ne: false },
      stock: { $lte: threshold, $gt: 0 }
    })
      .select('title img brand stock wholesalePrice moq categories quotesRequested')
      .sort({ stock: 1 })
      .lean();
    
    const outOfStockProducts = await Product.find({
      isActive: { $ne: false },
      stock: { $lte: 0 }
    })
      .select('title img brand wholesalePrice moq categories quotesRequested')
      .sort({ quotesRequested: -1 })
      .lean();
    
    // Critical stock items (high quote requests but low/no stock)
    const criticalStockProducts = await Product.find({
      isActive: { $ne: false },
      stock: { $lte: threshold },
      quotesRequested: { $gte: 5 }
    })
      .select('title img brand stock quotesRequested moq')
      .sort({ quotesRequested: -1, stock: 1 })
      .lean();
    
    res.status(200).json({
      success: true,
      inventory: {
        lowStock: {
          products: lowStockProducts.map(p => ({ ...p, inStock: p.stock > 0 })),
          count: lowStockProducts.length,
          threshold: threshold
        },
        outOfStock: {
          products: outOfStockProducts.map(p => ({ ...p, inStock: false })),
          count: outOfStockProducts.length
        },
        critical: {
          products: criticalStockProducts.map(p => ({ ...p, inStock: p.stock > 0 })),
          count: criticalStockProducts.length,
          description: "High demand items with low stock"
        }
      }
    });
  } catch (error) {
    console.error('Stock alerts error:', error);
    res.status(500).json({
      success: false,
      message: "Unable to retrieve stock alerts"
    });
  }
});

// Bulk product operations
router.post("/admin/bulk", protect, requireRole('admin'), bulkOperationsLimiter, async (req, res) => {
  try {
    const { productIds, operation, updateData } = req.body;
    const { default: Product } = await import("../models/product.model.js");
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid product IDs for bulk operation"
      });
    }
    
    if (productIds.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Bulk operations limited to 50 products at a time"
      });
    }
    
    let result;
    const timestamp = new Date();
    
    switch (operation) {
      case 'activate':
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { 
            $set: { 
              isActive: true,
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;
        
      case 'deactivate':
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { 
            $set: { 
              isActive: false,
              deletedAt: timestamp,
              deletedBy: req.user._id
            }
          }
        );
        break;
        
      case 'feature':
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { 
            $set: { 
              featured: true,
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;
        
      case 'unfeature':
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { 
            $set: { 
              featured: false,
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;
        
      case 'update_stock':
        if (!updateData.stock && updateData.stock !== 0) {
          return res.status(400).json({
            success: false,
            message: "Stock quantity required for bulk stock update"
          });
        }
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { 
            $set: { 
              stock: updateData.stock,
              stockStatus: updateData.stock <= 0 ? "Out of Stock" : 
                         updateData.stock <= 10 ? "Low Stock" : "In Stock",
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;
        
      case 'update_category':
        if (!updateData.categories) {
          return res.status(400).json({
            success: false,
            message: "Categories required for bulk category update"
          });
        }
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { 
            $set: { 
              categories: updateData.categories,
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;

      case 'update_pricing':
        if (!updateData.wholesalePrice) {
          return res.status(400).json({
            success: false,
            message: "Wholesale price required for bulk pricing update"
          });
        }
        result = await Product.updateMany(
          { _id: { $in: productIds } },
          { 
            $set: { 
              wholesalePrice: updateData.wholesalePrice,
              retailPrice: updateData.retailPrice || null,
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid bulk operation specified",
          validOperations: ['activate', 'deactivate', 'feature', 'unfeature', 'update_stock', 'update_category', 'update_pricing']
        });
    }
    
    res.status(200).json({
      success: true,
      message: `Bulk ${operation} completed successfully`,
      operation: operation,
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
      timestamp: timestamp
    });
  } catch (error) {
    console.error('Bulk operation error:', error);
    res.status(500).json({
      success: false,
      message: "Bulk operation failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Product analytics for specific product
router.get("/:id/analytics", protect, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { default: Product } = await import("../models/product.model.js");
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the catalog"
      });
    }
    
    // Performance metrics over time (if you have Order model)
    // This would need to be implemented based on your Order model structure
    const performanceMetrics = {
      viewsToQuotes: product.viewCount > 0 ? 
        ((product.quotesRequested / product.viewCount) * 100).toFixed(2) : 0,
      quotesToSales: product.quotesRequested > 0 ? 
        ((product.totalSales / product.quotesRequested) * 100).toFixed(2) : 0,
      averageOrderValue: product.totalSales > 0 ? 
        (product.totalSales / Math.max(1, product.quotesRequested)).toFixed(2) : 0
    };
    
    const analytics = {
      product: {
        id: product._id,
        title: product.title,
        brand: product.brand,
        sku: product.sku
      },
      metrics: {
        views: product.viewCount || 0,
        quotesRequested: product.quotesRequested || 0,
        totalSales: product.totalSales || 0,
        averageRating: product.averageRating || 0,
        totalRatings: product.totalRatings || 0
      },
      performance: performanceMetrics,
      inventory: {
        currentStock: product.stock,
        moq: product.moq,
        stockStatus: product.stockStatus,
        stockLevel: product.stock <= 0 ? 'critical' : 
                   product.stock <= 10 ? 'low' : 
                   product.stock <= 50 ? 'medium' : 'high'
      },
      pricing: {
        wholesalePrice: product.wholesalePrice,
        retailPrice: product.retailPrice,
        minimumOrderValue: product.wholesalePrice * product.moq,
        profitMargin: product.retailPrice ? 
          (((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100).toFixed(1) : 0
      }
    };
    
    res.status(200).json({
      success: true,
      analytics: analytics
    });
  } catch (error) {
    console.error('Product analytics error:', error);
    res.status(500).json({
      success: false,
      message: "Unable to generate product analytics"
    });
  }
});

// Export products data (CSV/Excel format)
router.get("/admin/export", protect, requireRole('admin'), async (req, res) => {
  try {
    const { format, brand, category } = req.query;
    const { default: Product } = await import("../models/product.model.js");
    
    let query = { isActive: { $ne: false } };
    if (brand) query.brand = brand;
    if (category) query.categories = { $in: [category] };
    
    const products = await Product.find(query)
      .select('title brand categories wholesalePrice retailPrice moq stock quotesRequested totalSales averageRating sku createdAt')
      .sort({ brand: 1, title: 1 })
      .lean();
    
    // Format data for export
    const exportData = products.map(product => ({
      SKU: product.sku || '',
      Title: product.title,
      Brand: product.brand,
      Category: product.categories.join(', '),
      'Wholesale Price (KSh)': product.wholesalePrice,
      'Retail Price (KSh)': product.retailPrice || '',
      'MOQ': product.moq,
      'Current Stock': product.stock,
      'Quotes Requested': product.quotesRequested || 0,
      'Total Sales (KSh)': product.totalSales || 0,
      'Average Rating': product.averageRating || 0,
      'Created Date': new Date(product.createdAt).toLocaleDateString(),
      'Minimum Order Value (KSh)': product.wholesalePrice * product.moq
    }));
    
    if (format === 'json') {
      res.status(200).json({
        success: true,
        data: exportData,
        count: exportData.length,
        exportedAt: new Date().toISOString()
      });
    } else {
      // For CSV format, you would implement CSV generation here
      // For now, return JSON with CSV headers
      res.status(200).json({
        success: true,
        message: "Export data ready",
        data: exportData,
        count: exportData.length,
        headers: Object.keys(exportData[0] || {}),
        exportedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: "Export failed"
    });
  }
});

export default router;