// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/models/product.model.js
import mongoose from "mongoose";
import validator from "validator";

const ProductSchema = mongoose.Schema(
  {
    // Basic product information
    title: {
      type: String,
      required: [true, "Product title is required for our luxury collection"],
      trim: true,
      minlength: [2, "Product title must be at least 2 characters"],
      maxlength: [200, "Product title must be less than 200 characters"],
      index: true
    },

    description: {
      type: String,
      required: [true, "Product description is essential for luxury experience"],
      trim: true,
      minlength: [10, "Product description must be at least 10 characters"],
      maxlength: [2000, "Product description must be less than 2000 characters"],
      alias: 'desc'
    },

    // Enhanced product details
    whatinbox: {
      type: String,
      trim: true,
      maxlength: [1000, "What's in box description too long"]
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, "Short description must be less than 300 characters"]
    },

    // Product specifications
    specifications: {
      ingredients: [String],
      volume: String,
      weight: String,
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
      shelfLife: {
        duration: Number,
        unit: {
          type: String,
          enum: ["months", "years"],
          default: "months"
        }
      },
      origin: String,
      certifications: [String]
    },

    // Media assets
    images: {
      primary: {
        type: String,
        required: [true, "Primary product image is required for luxury showcase"]
      },
      gallery: [String],
      thumbnail: String
    },

    // Legacy support for existing img field
    img: {
      type: [String],
      default: [],
      get: function() {
        // Return primary image and gallery combined for backward compatibility
        const images = [];
        if (this.images && this.images.primary) {
          images.push(this.images.primary);
        }
        if (this.images && this.images.gallery) {
          images.push(...this.images.gallery);
        }
        return images.length > 0 ? images : this._doc.img;
      }
    },

    video: {
      url: String,
      thumbnail: String,
      duration: Number
    },

    // Pricing information
    originalPrice: {
      type: Number,
      required: [true, "Original price is required for our exclusive products"],
      min: [0.01, "Price must be greater than 0"]
    },

    discountedPrice: {
      type: Number,
      min: [0.01, "Discounted price must be greater than 0"],
      validate: {
        validator: function(value) {
          return !value || value < this.originalPrice;
        },
        message: "Discounted price must be less than original price"
      }
    },

    // Legacy price field for backward compatibility
    price: {
      type: Number,
      get: function() {
        return this.discountedPrice || this.originalPrice;
      }
    },

    // Wholesale pricing
    wholesalePrice: {
      type: Number,
      min: [0.01, "Wholesale price must be greater than 0"]
    },

    wholesaleMinimumQuantity: {
      type: Number,
      min: [1, "Minimum wholesale quantity must be at least 1"],
      default: 10
    },

    // Product categorization
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

    brand: {
      type: String,
      required: [true, "Brand information is essential for luxury products"],
      trim: true,
      maxlength: [100, "Brand name too long"],
      index: true
    },

    // Beauty-specific categorization
    skintype: {
      type: [String],
      enum: {
        values: ["oily", "dry", "combination", "sensitive", "normal", "mature", "acne-prone"],
        message: "Invalid skin type specified"
      },
      index: true
    },

    concern: {
      type: [String],
      enum: {
        values: [
          "acne", "aging", "dark-spots", "sensitivity", "dryness", "oiliness", 
          "pores", "fine-lines", "wrinkles", "hydration", "brightening", 
          "firming", "anti-aging", "sun-protection", "repair"
        ],
        message: "Invalid skin concern specified"
      },
      index: true
    },

    // Inventory management
    inventory: {
      inStock: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: [0, "Stock cannot be negative"],
        default: 0
      },
      reserved: {
        type: Number,
        default: 0,
        min: [0, "Reserved stock cannot be negative"]
      },
      reorderLevel: {
        type: Number,
        default: 5,
        min: [0, "Reorder level cannot be negative"]
      },
      maxStock: {
        type: Number,
        default: 1000
      },
      sku: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        uppercase: true
      },
      barcode: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
      }
    },

    // Legacy inStock field for backward compatibility
    inStock: {
      type: Boolean,
      default: true,
      get: function() {
        return this.inventory ? this.inventory.inStock > 0 : this._doc.inStock;
      }
    },

    // Product status and visibility
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued", "coming-soon"],
      default: "active",
      index: true
    },

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

    exclusiveProduct: {
      type: Boolean,
      default: false
    },

    limitedEdition: {
      type: Boolean,
      default: false
    },

    // SEO and marketing
    seo: {
      metaTitle: {
        type: String,
        maxlength: [60, "Meta title too long"]
      },
      metaDescription: {
        type: String,
        maxlength: [160, "Meta description too long"]
      },
      keywords: [String],
      slug: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
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
        reported: [{
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

    // Sales and performance tracking
    analytics: {
      viewCount: {
        type: Number,
        default: 0,
        min: [0, "View count cannot be negative"]
      },
      salesCount: {
        type: Number,
        default: 0,
        min: [0, "Sales count cannot be negative"]
      },
      wishlistCount: {
        type: Number,
        default: 0,
        min: [0, "Wishlist count cannot be negative"]
      },
      conversionRate: {
        type: Number,
        default: 0,
        min: [0, "Conversion rate cannot be negative"],
        max: [100, "Conversion rate cannot exceed 100%"]
      },
      lastSold: Date,
      bestSellingMonth: {
        month: Number,
        year: Number,
        quantity: Number
      }
    },

    // Legacy viewCount for backward compatibility
    viewCount: {
      type: Number,
      default: 0,
      get: function() {
        return this.analytics ? this.analytics.viewCount : this._doc.viewCount;
      }
    },

    soldCount: {
      type: Number,
      default: 0,
      get: function() {
        return this.analytics ? this.analytics.salesCount : this._doc.soldCount;
      }
    },

    // Product relationships
    relatedProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],

    bundleProducts: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      },
      discountPercentage: {
        type: Number,
        min: 0,
        max: 100
      }
    }],

    // Shipping and delivery
    shipping: {
      weight: {
        value: Number,
        unit: {
          type: String,
          enum: ["kg", "g", "lb", "oz"],
          default: "g"
        }
      },
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
      freeShipping: {
        type: Boolean,
        default: false
      },
      shippingClass: {
        type: String,
        enum: ["standard", "fragile", "hazardous", "oversized"],
        default: "standard"
      },
      estimatedDelivery: {
        min: Number, // days
        max: Number  // days
      }
    },

    // Promotional features
    promotions: {
      onSale: {
        type: Boolean,
        default: false
      },
      saleStartDate: Date,
      saleEndDate: Date,
      flashSale: {
        type: Boolean,
        default: false
      },
      newArrival: {
        type: Boolean,
        default: false
      },
      bestSeller: {
        type: Boolean,
        default: false
      },
      staffPick: {
        type: Boolean,
        default: false
      }
    },

    // Luxury product features
    luxury: {
      premiumPackaging: {
        type: Boolean,
        default: false
      },
      giftWrapping: {
        type: Boolean,
        default: true
      },
      personalizedMessage: {
        type: Boolean,
        default: true
      },
      exclusiveAccess: {
        type: Boolean,
        default: false
      },
      vipOnly: {
        type: Boolean,
        default: false
      },
      limitedQuantity: Number,
      luxuryTier: {
        type: String,
        enum: ["premium", "luxury", "ultra-luxury", "exclusive"],
        default: "premium"
      }
    },

    // Usage instructions and care
    usage: {
      instructions: [String],
      skinPatchTest: {
        type: Boolean,
        default: false
      },
      warnings: [String],
      storage: String,
      applicationTips: [String]
    },

    // Audit and tracking fields
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

    deletedAt: Date,

    // Version control
    version: {
      type: Number,
      default: 1
    },

    changeLog: [{
      version: Number,
      changes: String,
      changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      changedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true,
    toJSON: { 
      virtuals: true,
      getters: true,
      transform: function(doc, ret) {
        // Clean up the response object
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

// Compound indexes for better query performance
ProductSchema.index({ categories: 1, status: 1, isActive: 1 });
ProductSchema.index({ brand: 1, categories: 1, isActive: 1 });
ProductSchema.index({ originalPrice: 1, discountedPrice: 1 });
ProductSchema.index({ averageRating: -1, totalRatings: -1 });
ProductSchema.index({ "analytics.viewCount": -1, "analytics.salesCount": -1 });
ProductSchema.index({ skintype: 1, concern: 1, isActive: 1 });
ProductSchema.index({ featured: 1, status: 1, createdAt: -1 });
ProductSchema.index({ "promotions.onSale": 1, "promotions.saleEndDate": 1 });
ProductSchema.index({ "luxury.vipOnly": 1, "luxury.exclusiveAccess": 1 });

// Text index for search functionality
ProductSchema.index({ 
  title: "text", 
  description: "text", 
  brand: "text",
  categories: "text",
  "specifications.ingredients": "text"
});

// Virtual fields
ProductSchema.virtual('displayPrice').get(function() {
  return this.discountedPrice || this.originalPrice;
});

ProductSchema.virtual('discountPercentage').get(function() {
  if (this.discountedPrice && this.originalPrice > this.discountedPrice) {
    return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
  }
  return 0;
});

ProductSchema.virtual('isOnSale').get(function() {
  return this.discountedPrice && this.discountedPrice < this.originalPrice;
});

ProductSchema.virtual('stockStatus').get(function() {
  const stock = this.inventory ? this.inventory.inStock : 0;
  if (stock <= 0) return 'out-of-stock';
  if (stock <= (this.inventory?.reorderLevel || 5)) return 'low-stock';
  return 'in-stock';
});

ProductSchema.virtual('availableStock').get(function() {
  const total = this.inventory ? this.inventory.inStock : 0;
  const reserved = this.inventory ? this.inventory.reserved : 0;
  return Math.max(0, total - reserved);
});

ProductSchema.virtual('ratingsSummary').get(function() {
  const ratings = this.ratings || [];
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  ratings.forEach(rating => {
    distribution[rating.star] = (distribution[rating.star] || 0) + 1;
  });
  
  return {
    total: ratings.length,
    average: this.averageRating,
    distribution: distribution
  };
});

ProductSchema.virtual('luxuryFeatures').get(function() {
  const features = [];
  if (this.luxury?.premiumPackaging) features.push('Premium Packaging');
  if (this.luxury?.giftWrapping) features.push('Complimentary Gift Wrapping');
  if (this.luxury?.personalizedMessage) features.push('Personalized Message');
  if (this.luxury?.exclusiveAccess) features.push('Exclusive Access');
  if (this.luxury?.vipOnly) features.push('VIP Only');
  if (this.limitedEdition) features.push('Limited Edition');
  if (this.exclusiveProduct) features.push('Exclusive Product');
  return features;
});

// Pre-save middleware
ProductSchema.pre('save', function(next) {
  // Auto-generate SKU if not provided
  if (!this.inventory?.sku && this.isNew) {
    const brand = this.brand?.substring(0, 3).toUpperCase() || 'COR';
    const category = this.categories?.[0]?.substring(0, 3).toUpperCase() || 'PRD';
    const timestamp = Date.now().toString().slice(-6);
    this.inventory = this.inventory || {};
    this.inventory.sku = `${brand}-${category}-${timestamp}`;
  }
  
  // Auto-generate slug from title if not provided
  if (!this.seo?.slug && this.title) {
    this.seo = this.seo || {};
    this.seo.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // Update version and changelog
  if (this.isModified() && !this.isNew) {
    this.version += 1;
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

// Instance methods
ProductSchema.methods.updateViewCount = function() {
  this.analytics = this.analytics || {};
  this.analytics.viewCount = (this.analytics.viewCount || 0) + 1;
  return this.save();
};

ProductSchema.methods.updateSalesCount = function(quantity = 1) {
  this.analytics = this.analytics || {};
  this.analytics.salesCount = (this.analytics.salesCount || 0) + quantity;
  this.analytics.lastSold = new Date();
  return this.save();
};

ProductSchema.methods.updateStock = function(quantity, operation = 'reduce') {
  this.inventory = this.inventory || { inStock: 0 };
  
  if (operation === 'reduce') {
    this.inventory.inStock = Math.max(0, this.inventory.inStock - quantity);
  } else if (operation === 'add') {
    this.inventory.inStock += quantity;
  }
  
  return this.save();
};

ProductSchema.methods.addRating = function(userId, rating, comment, userName) {
  // Check if user already rated this product
  const existingRatingIndex = this.ratings.findIndex(
    r => r.postedBy.toString() === userId.toString()
  );
  
  if (existingRatingIndex >= 0) {
    // Update existing rating
    this.ratings[existingRatingIndex].star = rating;
    this.ratings[existingRatingIndex].comment = comment;
    this.ratings[existingRatingIndex].updatedAt = new Date();
  } else {
    // Add new rating
    this.ratings.push({
      star: rating,
      comment: comment,
      name: userName,
      postedBy: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  return this.save();
};

ProductSchema.methods.removeRating = function(userId) {
  this.ratings = this.ratings.filter(
    rating => rating.postedBy.toString() !== userId.toString()
  );
  return this.save();
};

ProductSchema.methods.isLowStock = function() {
  const stock = this.inventory ? this.inventory.inStock : 0;
  const reorderLevel = this.inventory ? this.inventory.reorderLevel : 5;
  return stock <= reorderLevel && stock > 0;
};

ProductSchema.methods.canPurchase = function(quantity = 1) {
  const availableStock = this.availableStock;
  return this.status === 'active' && 
         this.isActive && 
         availableStock >= quantity;
};

// Static methods
ProductSchema.statics.findActive = function() {
  return this.find({ isActive: true, status: 'active' });
};

ProductSchema.statics.findFeatured = function(limit = 10) {
  return this.find({ 
    featured: true, 
    isActive: true, 
    status: 'active' 
  })
  .limit(limit)
  .sort({ createdAt: -1 });
};

ProductSchema.statics.findByCategory = function(category, limit = 12) {
  return this.find({
    categories: { $in: [category] },
    isActive: true,
    status: 'active'
  })
  .limit(limit)
  .sort({ createdAt: -1 });
};

ProductSchema.statics.findLowStock = function(threshold = 10) {
  return this.find({
    'inventory.inStock': { $lte: threshold, $gt: 0 },
    isActive: true,
    status: 'active'
  });
};

ProductSchema.statics.findVIPProducts = function() {
  return this.find({
    'luxury.vipOnly': true,
    isActive: true,
    status: 'active'
  });
};

ProductSchema.statics.searchProducts = function(query, options = {}) {
  const {
    page = 1,
    limit = 12,
    sortBy = 'relevance',
    category,
    brand,
    priceRange,
    rating
  } = options;
  
  let searchQuery = {
    $text: { $search: query },
    isActive: true,
    status: 'active'
  };
  
  // Add filters
  if (category) searchQuery.categories = { $in: [category] };
  if (brand) searchQuery.brand = new RegExp(brand, 'i');
  if (priceRange) {
    searchQuery.originalPrice = {};
    if (priceRange.min) searchQuery.originalPrice.$gte = priceRange.min;
    if (priceRange.max) searchQuery.originalPrice.$lte = priceRange.max;
  }
  if (rating) searchQuery.averageRating = { $gte: rating };
  
  let sort = {};
  switch (sortBy) {
    case 'price_low':
      sort = { originalPrice: 1 };
      break;
    case 'price_high':
      sort = { originalPrice: -1 };
      break;
    case 'rating':
      sort = { averageRating: -1 };
      break;
    case 'newest':
      sort = { createdAt: -1 };
      break;
    case 'popular':
      sort = { 'analytics.viewCount': -1 };
      break;
    default:
      sort = { score: { $meta: 'textScore' } };
  }
  
  const skip = (page - 1) * limit;
  
  return this.find(searchQuery)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

const Product = mongoose.model("Product", ProductSchema);
export default Product;