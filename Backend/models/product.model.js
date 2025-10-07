// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/models/product.model.js
import mongoose from "mongoose";
import validator from "validator";

const ProductSchema = mongoose.Schema(
  {
    // Basic product information
    title: {
      type: String,
      required: [true, "Product title is required for Rekker collection"],
      trim: true,
      minlength: [2, "Product title must be at least 2 characters"],
      maxlength: [200, "Product title must be less than 200 characters"],
      index: true
    },

    description: {
      type: String,
      required: [true, "Product description is essential for comprehensive product information"],
      trim: true,
      minlength: [10, "Product description must be at least 10 characters"],
      maxlength: [2000, "Product description must be less than 2000 characters"],
      alias: 'desc'
    },

    // Enhanced product details for Rekker products
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, "Short description must be less than 300 characters"]
    },

    // Product specifications (especially important for wholesale)
    specifications: {
      type: String,
      trim: true,
      maxlength: [500, "Specifications must be less than 500 characters"]
    },

    // Product images - Updated to support both single and multiple images
    img: {
      type: String,
      required: [true, "Product image is required for showcase"],
      validate: {
        validator: function(v) {
          return validator.isURL(v) || v.length > 0;
        },
        message: "Please provide a valid image URL"
      }
    },

    images: {
      type: [String],
      default: [],
      validate: {
        validator: function(v) {
          return v.every(url => validator.isURL(url));
        },
        message: "All image URLs must be valid"
      }
    },

    // Brand system - Core to Rekker's business model
    brand: {
      type: String,
      required: [true, "Brand information is essential"],
      enum: {
        values: ["Rekker", "Saffron (by Rekker)", "Cornells (Distributed by Rekker)"],
        message: "Brand must be Rekker, Saffron (by Rekker), or Cornells (Distributed by Rekker)"
      },
      index: true
    },

    // Manufacturer information for proper attribution
    manufacturer: {
      type: String,
      default: function() {
        if (this.brand === "Saffron (by Rekker)") return "Rekker";
        if (this.brand === "Cornells (Distributed by Rekker)") return "Starling Parfums";
        return "Rekker";
      }
    },

    distributedBy: {
      type: String,
      default: "Rekker"
    },

    // Enhanced categorization for Rekker's diverse product range
    categories: {
      type: [String],
      required: [true, "Product must belong to at least one category"],
      validate: {
        validator: function(categories) {
          return categories && categories.length > 0;
        },
        message: "Product must belong to at least one category"
      },
      index: true
    },

    // Subcategories for better organization
    subcategories: {
      type: [String],
      default: []
    },

    // Target market - Important for wholesale business
    targetMarket: {
      type: [String],
      enum: {
        values: [
          "Supermarkets", 
          "Retail Chains", 
          "Schools", 
          "Offices", 
          "Wholesalers", 
          "Event Planners", 
          "Beauty Salons",
          "Hotels & Restaurants",
          "Online Retailers",
          "Individual Consumers"
        ],
        message: "Invalid target market specified"
      },
      default: []
    },

    // Wholesale pricing - Core to Rekker's business model
    wholesalePrice: {
      type: Number,
      required: [true, "Wholesale price is required for business operations"],
      min: [0.01, "Wholesale price must be greater than 0"]
    },

    // Retail price for comparison and partner guidance
    retailPrice: {
      type: Number,
      min: [0.01, "Retail price must be greater than 0"],
      validate: {
        validator: function(value) {
          return !value || value >= this.wholesalePrice;
        },
        message: "Retail price must be greater than or equal to wholesale price"
      }
    },

    // Legacy price field for backward compatibility
    price: {
      type: Number,
      get: function() {
        return this.retailPrice || this.wholesalePrice;
      }
    },

    // MOQ - Minimum Order Quantity (Critical for wholesale)
    moq: {
      type: Number,
      required: [true, "Minimum Order Quantity (MOQ) is required for wholesale operations"],
      min: [1, "MOQ must be at least 1"],
      alias: 'minimumOrderQuantity'
    },

    // Enhanced inventory management
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0
    },

    // Stock status for better inventory management
    stockStatus: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock", "Pre-Order"],
      default: function() {
        if (this.stock <= 0) return "Out of Stock";
        if (this.stock <= 10) return "Low Stock";
        return "In Stock";
      }
    },

    // Product identification
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true
    },

    // Product status and visibility
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },

    featured: {
      type: Boolean,
      default: false,
      index: true
    },

    // Legacy inStock field for backward compatibility
    inStock: {
      type: Boolean,
      default: true,
      get: function() {
        return this.stock > 0;
      }
    },

    // Ratings and reviews system
    ratings: [
      {
        star: {
          type: Number,
          required: [true, "Star rating is required"],
          min: [1, "Rating must be at least 1 star"],
          max: [5, "Rating cannot exceed 5 stars"]
        },
        name: {
          type: String,
          required: [true, "Reviewer name is required"],
          trim: true
        },
        comment: {
          type: String,
          required: [true, "Review comment is required"],
          trim: true,
          minlength: [5, "Review must be at least 5 characters"],
          maxlength: [1000, "Review must be less than 1000 characters"]
        },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Review must be linked to a user"]
        },
        verified: {
          type: Boolean,
          default: false
        },
        helpful: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }],
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // Calculated rating fields
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Average rating cannot be negative"],
      max: [5, "Average rating cannot exceed 5"],
      index: true
    },

    totalRatings: {
      type: Number,
      default: 0,
      min: [0, "Total ratings cannot be negative"]
    },

    // Business analytics - Important for wholesale operations
    quotesRequested: {
      type: Number,
      default: 0,
      min: [0, "Quotes requested cannot be negative"]
    },

    totalSales: {
      type: Number,
      default: 0,
      min: [0, "Total sales cannot be negative"]
    },

    viewCount: {
      type: Number,
      default: 0,
      min: [0, "View count cannot be negative"]
    },

    // Wholesale-specific features
    bulkDiscount: {
      quantity: {
        type: Number,
        min: [1, "Bulk discount quantity must be at least 1"]
      },
      discountPercentage: {
        type: Number,
        min: [0, "Discount percentage cannot be negative"],
        max: [100, "Discount percentage cannot exceed 100%"]
      }
    },

    // Shipping and logistics (important for wholesale)
    shippingInfo: {
      weight: Number, // in kg
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: {
          type: String,
          enum: ["cm", "inch"],
          default: "cm"
        }
      },
      fragile: {
        type: Boolean,
        default: false
      }
    },

    // Compliance and certifications (especially for beauty/cleaning products)
    certifications: {
      type: [String],
      default: []
    },

    // Expiration tracking (for products with shelf life)
    expiryTracking: {
      hasExpiry: {
        type: Boolean,
        default: false
      },
      shelfLife: {
        duration: Number,
        unit: {
          type: String,
          enum: ["days", "months", "years"],
          default: "months"
        }
      }
    },

    // SEO and marketing
    seo: {
      slug: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
      },
      metaTitle: {
        type: String,
        maxlength: [60, "Meta title too long"]
      },
      metaDescription: {
        type: String,
        maxlength: [160, "Meta description too long"]
      },
      keywords: [String]
    },

    // Audit fields
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    deletedAt: Date
  },
  {
    timestamps: true,
    toJSON: { 
      virtuals: true,
      getters: true,
      transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: { 
      virtuals: true,
      getters: true 
    }
  }
);

// Indexes for optimal query performance
ProductSchema.index({ brand: 1, categories: 1, isActive: 1 });
ProductSchema.index({ wholesalePrice: 1, moq: 1 });
ProductSchema.index({ stock: 1, stockStatus: 1 });
ProductSchema.index({ featured: 1, isActive: 1, createdAt: -1 });
ProductSchema.index({ targetMarket: 1, brand: 1 });
ProductSchema.index({ quotesRequested: -1, totalSales: -1 });

// Text search index
ProductSchema.index({ 
  title: "text", 
  description: "text", 
  brand: "text",
  categories: "text",
  subcategories: "text"
});

// Virtual fields
ProductSchema.virtual('profitMargin').get(function() {
  if (this.retailPrice && this.wholesalePrice) {
    return (((this.retailPrice - this.wholesalePrice) / this.retailPrice) * 100).toFixed(1);
  }
  return 0;
});

ProductSchema.virtual('minimumOrderValue').get(function() {
  return this.wholesalePrice * this.moq;
});

ProductSchema.virtual('stockLevel').get(function() {
  if (this.stock <= 0) return 'out-of-stock';
  if (this.stock <= 10) return 'low-stock';
  if (this.stock <= 50) return 'medium-stock';
  return 'high-stock';
});

ProductSchema.virtual('brandInfo').get(function() {
  const brandData = {
    name: this.brand,
    manufacturer: this.manufacturer,
    distributor: this.distributedBy
  };
  
  if (this.brand === "Saffron (by Rekker)") {
    brandData.description = "Cleaning products manufactured by Rekker";
    brandData.color = "#f59e0b"; // Orange-yellow for Saffron
  } else if (this.brand === "Cornells (Distributed by Rekker)") {
    brandData.description = "Beauty products distributed by Rekker, manufactured by Starling Parfums";
    brandData.color = "#a855f7"; // Purple-pink for Cornells
  } else {
    brandData.description = "Quality products by Rekker";
    brandData.color = "#0891b2"; // Blue-green for Rekker
  }
  
  return brandData;
});

ProductSchema.virtual('wholesaleInfo').get(function() {
  return {
    price: this.wholesalePrice,
    moq: this.moq,
    minimumValue: this.minimumOrderValue,
    currency: 'KSh',
    bulkDiscount: this.bulkDiscount,
    targetMarkets: this.targetMarket
  };
});

// Pre-save middleware
ProductSchema.pre('save', function(next) {
  // Auto-generate SKU if not provided
  if (!this.sku && this.isNew) {
    let prefix = 'RKR'; // Default for Rekker
    if (this.brand.includes('Saffron')) prefix = 'SAF';
    if (this.brand.includes('Cornells')) prefix = 'COR';
    
    const category = this.categories[0]?.substring(0, 3).toUpperCase() || 'PRD';
    const timestamp = Date.now().toString().slice(-6);
    this.sku = `${prefix}-${category}-${timestamp}`;
  }
  
  // Auto-generate slug from title if not provided
  if (!this.seo?.slug && this.title) {
    this.seo = this.seo || {};
    this.seo.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // Set manufacturer based on brand
  if (!this.manufacturer) {
    if (this.brand === "Saffron (by Rekker)") {
      this.manufacturer = "Rekker";
    } else if (this.brand === "Cornells (Distributed by Rekker)") {
      this.manufacturer = "Starling Parfums";
    } else {
      this.manufacturer = "Rekker";
    }
  }
  
  // Update stock status
  if (this.isModified('stock')) {
    if (this.stock <= 0) {
      this.stockStatus = "Out of Stock";
    } else if (this.stock <= 10) {
      this.stockStatus = "Low Stock";
    } else {
      this.stockStatus = "In Stock";
    }
  }
  
  next();
});

// Pre-save middleware to recalculate ratings
ProductSchema.pre('save', function(next) {
  if (this.isModified('ratings')) {
    const ratings = this.ratings || [];
    
    if (ratings.length > 0) {
      const totalStars = ratings.reduce((sum, rating) => sum + rating.star, 0);
      this.averageRating = Number((totalStars / ratings.length).toFixed(1));
      this.totalRatings = ratings.length;
    } else {
      this.averageRating = 0;
      this.totalRatings = 0;
    }
  }
  next();
});

// Static methods for brand-specific queries
ProductSchema.statics.findByBrand = function(brand, options = {}) {
  const { page = 1, limit = 12, featured = null } = options;
  const skip = (page - 1) * limit;
  
  let query = { brand, isActive: true };
  if (featured !== null) query.featured = featured;
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

ProductSchema.statics.findRekkerProducts = function(options = {}) {
  return this.findByBrand('Rekker', options);
};

ProductSchema.statics.findSaffronProducts = function(options = {}) {
  return this.findByBrand('Saffron (by Rekker)', options);
};

ProductSchema.statics.findCornellsProducts = function(options = {}) {
  return this.findByBrand('Cornells (Distributed by Rekker)', options);
};

ProductSchema.statics.findWholesaleProducts = function(options = {}) {
  const { minMoq, maxMoq, priceRange, targetMarket } = options;
  
  let query = { isActive: true };
  
  if (minMoq) query.moq = { $gte: minMoq };
  if (maxMoq) query.moq = { ...query.moq, $lte: maxMoq };
  if (priceRange) {
    query.wholesalePrice = {};
    if (priceRange.min) query.wholesalePrice.$gte = priceRange.min;
    if (priceRange.max) query.wholesalePrice.$lte = priceRange.max;
  }
  if (targetMarket) query.targetMarket = { $in: [targetMarket] };
  
  return this.find(query).sort({ moq: 1, wholesalePrice: 1 });
};

// Instance methods
ProductSchema.methods.incrementQuoteRequests = function() {
  this.quotesRequested = (this.quotesRequested || 0) + 1;
  return this.save();
};

ProductSchema.methods.updateSales = function(quantity = 1, revenue = 0) {
  this.totalSales = (this.totalSales || 0) + revenue;
  this.stock = Math.max(0, this.stock - quantity);
  return this.save();
};

ProductSchema.methods.canFulfillOrder = function(quantity) {
  return this.isActive && this.stock >= quantity && quantity >= this.moq;
};

ProductSchema.methods.calculateBulkPrice = function(quantity) {
  let price = this.wholesalePrice;
  
  if (this.bulkDiscount && quantity >= this.bulkDiscount.quantity) {
    const discount = (this.bulkDiscount.discountPercentage / 100);
    price = price * (1 - discount);
  }
  
  return {
    unitPrice: price,
    totalPrice: price * quantity,
    discount: this.bulkDiscount && quantity >= this.bulkDiscount.quantity ? this.bulkDiscount.discountPercentage : 0
  };
};

ProductSchema.methods.getBrandSpecificInfo = function() {
  const info = {
    brand: this.brand,
    manufacturer: this.manufacturer,
    distributor: this.distributedBy
  };
  
  if (this.brand.includes('Saffron')) {
    info.brandType = 'manufactured';
    info.focus = 'Cleaning and hygiene products';
    info.attribution = 'Manufactured by Rekker';
    info.color = '#f59e0b';
  } else if (this.brand.includes('Cornells')) {
    info.brandType = 'distributed';
    info.focus = 'Beauty and personal care products';
    info.attribution = 'Distributed by Rekker, Manufactured by Starling Parfums';
    info.color = '#a855f7';
  } else {
    info.brandType = 'owned';
    info.focus = 'Quality everyday products';
    info.attribution = 'Manufactured by Rekker';
    info.color = '#0891b2';
  }
  
  return info;
};

const Product = mongoose.model("Product", ProductSchema);
export default Product;