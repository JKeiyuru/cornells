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
  getProductStats
} from "../controllers/product.controllers.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiting for different operations
const createProductLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each admin to 10 product creations per hour
  message: {
    success: false,
    message: "Product creation limit reached. Please wait before adding more luxury items.",
    error: "PRODUCT_CREATION_LIMIT"
  }
});

const ratingLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // limit each user to 5 ratings per day
  message: {
    success: false,
    message: "Daily rating limit reached. Quality reviews take time to craft.",
    error: "RATING_LIMIT_EXCEEDED"
  }
});

const productUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit updates to prevent spam
  message: "Too many product updates. Please slow down for optimal performance."
});

// ================================
// PUBLIC ROUTES (No authentication required)
// ================================

// Get all products with advanced filtering - Public luxury catalog
router.get("/", getAllProducts);

// Get single product details - Public product showcase
router.get("/:id", getProduct);

// Get featured products - Highlight luxury collection
router.get("/featured/collection", getFeaturedProducts);

// Get related products based on current product
router.get("/:id/related", getRelatedProducts);

// Search products by category with enhanced filtering
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    const { default: Product } = await import("../models/product.model.js");
    
    const skip = (page - 1) * limit;
    
    const query = {
      categories: { $regex: new RegExp(categoryName, 'i') },
      isActive: { $ne: false }
    };
    
    const products = await Product.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('ratings.postedBy', 'name')
      .lean();
    
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    
    res.status(200).json({
      success: true,
      category: categoryName,
      products: products,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalProducts: totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve category products at this time"
    });
  }
});

// Get products by brand - Brand-specific luxury showcase
router.get("/brand/:brandName", async (req, res) => {
  try {
    const { brandName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    
    const { default: Product } = await import("../models/product.model.js");
    
    const skip = (page - 1) * limit;
    
    const query = {
      brand: { $regex: new RegExp(brandName, 'i') },
      isActive: { $ne: false }
    };
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('ratings.postedBy', 'name')
      .lean();
    
    const totalProducts = await Product.countDocuments(query);
    
    res.status(200).json({
      success: true,
      brand: brandName,
      products: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts: totalProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve brand products at this time"
    });
  }
});

// Get product recommendations based on skin type
router.get("/recommendations/skintype/:skinType", async (req, res) => {
  try {
    const { skinType } = req.params;
    const limit = parseInt(req.query.limit) || 8;
    
    const { default: Product } = await import("../models/product.model.js");
    
    const products = await Product.find({
      skintype: { $in: [skinType] },
      isActive: { $ne: false },
      averageRating: { $gte: 4 }
    })
      .sort({ averageRating: -1, viewCount: -1 })
      .limit(limit)
      .populate('ratings.postedBy', 'name')
      .lean();
    
    res.status(200).json({
      success: true,
      skinType: skinType,
      recommendations: products,
      message: `Curated recommendations for ${skinType} skin by Cornells experts`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to generate personalized recommendations"
    });
  }
});

// Advanced search with multiple filters
router.post("/search/advanced", async (req, res) => {
  try {
    const {
      searchTerm,
      categories,
      brands,
      priceRange,
      skinTypes,
      concerns,
      rating,
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
      query.$text = { $search: searchTerm };
    }
    
    // Category filter
    if (categories && categories.length > 0) {
      query.categories = { $in: categories };
    }
    
    // Brand filter
    if (brands && brands.length > 0) {
      query.brand = { $in: brands };
    }
    
    // Price range filter
    if (priceRange && (priceRange.min || priceRange.max)) {
      query.originalPrice = {};
      if (priceRange.min) query.originalPrice.$gte = priceRange.min;
      if (priceRange.max) query.originalPrice.$lte = priceRange.max;
    }
    
    // Skin type filter
    if (skinTypes && skinTypes.length > 0) {
      query.skintype = { $in: skinTypes };
    }
    
    // Skin concern filter
    if (concerns && concerns.length > 0) {
      query.concern = { $in: concerns };
    }
    
    // Rating filter
    if (rating) {
      query.averageRating = { $gte: rating };
    }
    
    // Stock filter
    if (inStock !== undefined) {
      query.inStock = inStock ? { $gt: 0 } : { $lte: 0 };
    }
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 12;
    const skip = (pageNum - 1) * limitNum;
    
    let sort = {};
    if (searchTerm) {
      sort = { score: { $meta: "textScore" }, createdAt: -1 };
    } else {
      const sortField = sortBy || 'createdAt';
      const order = sortOrder === 'asc' ? 1 : -1;
      sort = { [sortField]: order };
    }
    
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate('ratings.postedBy', 'name')
      .lean();
    
    const totalProducts = await Product.countDocuments(query);
    
    res.status(200).json({
      success: true,
      products: products,
      totalResults: totalProducts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalProducts / limitNum),
        hasNextPage: pageNum < Math.ceil(totalProducts / limitNum),
        hasPrevPage: pageNum > 1
      },
      searchCriteria: {
        searchTerm,
        categories,
        brands,
        priceRange,
        skinTypes,
        concerns,
        rating,
        inStock
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Advanced search temporarily unavailable"
    });
  }
});

// ================================
// PROTECTED ROUTES (Authentication required)
// ================================

// Add product rating/review - Authenticated luxury experience
router.post("/:productId/ratings", protect, ratingLimiter, ratingProduct);

// Update product rating/review - Modify luxury feedback
router.put("/:productId/ratings", protect, updateRating);

// Delete product rating/review - Remove luxury feedback
router.delete("/:productId/ratings", protect, deleteRating);

// Get user's own ratings
router.get("/user/ratings", protect, async (req, res) => {
  try {
    const { default: Product } = await import("../models/product.model.js");
    
    const products = await Product.find({
      'ratings.postedBy': req.user._id,
      isActive: { $ne: false }
    })
      .select('title img ratings')
      .lean();
    
    const userRatings = products.map(product => {
      const userRating = product.ratings.find(
        rating => rating.postedBy.toString() === req.user._id.toString()
      );
      
      return {
        productId: product._id,
        productTitle: product.title,
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

// Create new product - Admin luxury catalog management
router.post("/", protect, requireRole('admin'), createProductLimiter, createProduct);

// Update product - Admin luxury product enhancement
router.put("/:id", protect, requireRole('admin'), productUpdateLimiter, updateProduct);

// Delete product (soft delete) - Admin luxury collection curation
router.delete("/:id", protect, requireRole('admin'), deleteProduct);

// Get comprehensive product statistics - Admin analytics dashboard
router.get("/admin/stats", protect, requireRole('admin'), getProductStats);

// Get low stock alerts - Admin inventory management
router.get("/admin/low-stock", protect, requireRole('admin'), async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    const { default: Product } = await import("../models/product.model.js");
    
    const lowStockProducts = await Product.find({
      isActive: { $ne: false },
      inStock: { $lte: threshold, $gt: 0 }
    })
      .select('title img inStock originalPrice categories')
      .sort({ inStock: 1 })
      .lean();
    
    const outOfStockProducts = await Product.find({
      isActive: { $ne: false },
      inStock: { $lte: 0 }
    })
      .select('title img originalPrice categories')
      .sort({ title: 1 })
      .lean();
    
    res.status(200).json({
      success: true,
      lowStock: {
        products: lowStockProducts,
        count: lowStockProducts.length,
        threshold: threshold
      },
      outOfStock: {
        products: outOfStockProducts,
        count: outOfStockProducts.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve stock alerts"
    });
  }
});

// Bulk product operations - Admin mass management
router.post("/admin/bulk", protect, requireRole('admin'), async (req, res) => {
  try {
    const { productIds, operation, updateData } = req.body;
    const { default: Product } = await import("../models/product.model.js");
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid product IDs for bulk operation"
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
        
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid bulk operation specified"
        });
    }
    
    res.status(200).json({
      success: true,
      message: `Bulk ${operation} completed successfully`,
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bulk operation failed"
    });
  }
});

// Product analytics - Admin detailed insights
router.get("/:id/analytics", protect, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { default: Product } = await import("../models/product.model.js");
    const { default: Order } = await import("../models/order.model.js");
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found in our luxury collection"
      });
    }
    
    // Sales analytics
    const salesData = await Order.aggregate([
      { $unwind: '$products' },
      { $match: { 'products.productId': product._id } },
      {
        $group: {
          _id: null,
          totalSold: { $sum: '$products.quantity' },
          totalRevenue: { $sum: { $multiply: ['$products.quantity', '$products.price'] } },
          avgOrderQuantity: { $avg: '$products.quantity' }
        }
      }
    ]);
    
    // Rating analytics
    const ratingStats = {
      totalRatings: product.ratings.length,
      averageRating: product.averageRating,
      ratingDistribution: {
        5: product.ratings.filter(r => r.star === 5).length,
        4: product.ratings.filter(r => r.star === 4).length,
        3: product.ratings.filter(r => r.star === 3).length,
        2: product.ratings.filter(r => r.star === 2).length,
        1: product.ratings.filter(r => r.star === 1).length
      }
    };
    
    const analytics = {
      product: {
        id: product._id,
        title: product.title,
        views: product.viewCount || 0,
        inStock: product.inStock
      },
      sales: salesData[0] || {
        totalSold: 0,
        totalRevenue: 0,
        avgOrderQuantity: 0
      },
      ratings: ratingStats,
      performance: {
        conversionRate: product.viewCount > 0 
          ? ((salesData[0]?.totalSold || 0) / product.viewCount * 100).toFixed(2)
          : 0,
        revenue: salesData[0]?.totalRevenue || 0
      }
    };
    
    res.status(200).json({
      success: true,
      analytics: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to generate product analytics"
    });
  }
});

export default router;