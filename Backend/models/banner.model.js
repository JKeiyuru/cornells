// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/models/banner.model.js
import mongoose from "mongoose";

// Banner Schema for luxury marketing campaigns
const BannerSchema = new mongoose.Schema({
  // Banner content and branding
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
    index: true
  },
  
  subtitle: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 150
  },
  
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 300
  },
  
  // Visual content
  image: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(url) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url);
      },
      message: 'Please provide a valid image URL'
    }
  },
  
  mobileImage: {
    type: String,
    trim: true,
    default: '',
    validate: {
      validator: function(url) {
        return !url || /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url);
      },
      message: 'Please provide a valid mobile image URL'
    }
  },
  
  // Call-to-action
  buttonText: {
    type: String,
    trim: true,
    maxlength: 30,
    default: 'Shop Now'
  },
  
  link: {
    type: String,
    trim: true,
    default: '',
    validate: {
      validator: function(url) {
        return !url || /^(https?:\/\/)|(\/[\/\w\.-]*)*\/?$/.test(url);
      },
      message: 'Please provide a valid URL or path'
    }
  },
  
  // Banner targeting and display
  targetAudience: {
    type: String,
    enum: ['all', 'new_customers', 'returning_customers', 'vip_members', 'premium_members'],
    default: 'all'
  },
  
  category: {
    type: String,
    trim: true,
    enum: ['homepage', 'product', 'category', 'sale', 'promotion', 'announcement', 'seasonal'],
    default: 'homepage',
    index: true
  },
  
  // Scheduling and visibility
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 10,
    validate: {
      validator: Number.isInteger,
      message: 'Priority must be an integer'
    }
  },
  
  startDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  endDate: {
    type: Date,
    default: null,
    index: true,
    validate: {
      validator: function(endDate) {
        return !endDate || endDate > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  
  // Analytics and tracking
  viewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  clickCount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  conversionCount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Design customization
  backgroundColor: {
    type: String,
    trim: true,
    default: '#ffffff',
    validate: {
      validator: function(color) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
      },
      message: 'Please provide a valid hex color code'
    }
  },
  
  textColor: {
    type: String,
    trim: true,
    default: '#000000',
    validate: {
      validator: function(color) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
      },
      message: 'Please provide a valid hex color code'
    }
  },
  
  buttonColor: {
    type: String,
    trim: true,
    default: '#d4af37',
    validate: {
      validator: function(color) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
      },
      message: 'Please provide a valid hex color code'
    }
  },
  
  // Banner positioning
  position: {
    type: String,
    enum: ['hero', 'secondary', 'sidebar', 'footer', 'popup', 'inline'],
    default: 'hero'
  },
  
  displayType: {
    type: String,
    enum: ['carousel', 'static', 'video', 'interactive'],
    default: 'static'
  },
  
  // Content variations for A/B testing
  variations: [{
    title: String,
    description: String,
    image: String,
    clickCount: { type: Number, default: 0 },
    conversionCount: { type: Number, default: 0 }
  }],
  
  // Promotion details
  promotionCode: {
    type: String,
    trim: true,
    uppercase: true,
    default: ''
  },
  
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  
  // Luxury brand specific fields
  collection: {
    type: String,
    trim: true,
    default: ''
  },
  
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter', 'holiday', 'all_year'],
    default: 'all_year'
  },
  
  luxuryTier: {
    type: String,
    enum: ['standard', 'premium', 'exclusive', 'limited_edition'],
    default: 'standard'
  },
  
  // Geographic targeting
  regions: [{
    type: String,
    trim: true
  }],
  
  countries: [{
    type: String,
    trim: true,
    uppercase: true
  }],
  
  // Device targeting
  deviceTypes: [{
    type: String,
    enum: ['desktop', 'tablet', 'mobile'],
    default: ['desktop', 'tablet', 'mobile']
  }],
  
  // Administrative fields
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  approvedAt: {
    type: Date
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['draft', 'pending_approval', 'approved', 'active', 'paused', 'expired', 'archived'],
    default: 'active',
    index: true
  },
  
  // Notes and comments
  adminNotes: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  },
  
  // SEO fields
  altText: {
    type: String,
    trim: true,
    maxlength: 150,
    default: ''
  },
  
  metaDescription: {
    type: String,
    trim: true,
    maxlength: 160,
    default: ''
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance optimization
BannerSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
BannerSchema.index({ category: 1, priority: 1 });
BannerSchema.index({ targetAudience: 1 });
BannerSchema.index({ status: 1 });
BannerSchema.index({ createdBy: 1 });
BannerSchema.index({ viewCount: -1 });
BannerSchema.index({ clickCount: -1 });

// Virtual for click-through rate
BannerSchema.virtual('clickThroughRate').get(function() {
  if (this.viewCount === 0) return 0;
  return ((this.clickCount / this.viewCount) * 100).toFixed(2);
});

// Virtual for conversion rate
BannerSchema.virtual('conversionRate').get(function() {
  if (this.clickCount === 0) return 0;
  return ((this.conversionCount / this.clickCount) * 100).toFixed(2);
});

// Virtual for banner effectiveness score
BannerSchema.virtual('effectivenessScore').get(function() {
  const ctr = parseFloat(this.clickThroughRate);
  const cr = parseFloat(this.conversionRate);
  return Math.round((ctr * 0.6 + cr * 0.4) * 10) / 10;
});

// Virtual for days remaining
BannerSchema.virtual('daysRemaining').get(function() {
  if (!this.endDate) return null;
  const today = new Date();
  const timeDiff = this.endDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
});

// Virtual for is expired
BannerSchema.virtual('isExpired').get(function() {
  if (!this.endDate) return false;
  return new Date() > this.endDate;
});

// Virtual for is current
BannerSchema.virtual('isCurrent').get(function() {
  const now = new Date();
  const isStarted = now >= this.startDate;
  const notExpired = !this.endDate || now <= this.endDate;
  return this.isActive && isStarted && notExpired;
});

// Virtual for display duration in days
BannerSchema.virtual('displayDuration').get(function() {
  if (!this.endDate) return null;
  const timeDiff = this.endDate.getTime() - this.startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
});

// Instance method to increment view count
BannerSchema.methods.incrementView = function() {
  this.viewCount += 1;
  return this.save({ validateBeforeSave: false });
};

// Instance method to increment click count
BannerSchema.methods.incrementClick = function() {
  this.clickCount += 1;
  return this.save({ validateBeforeSave: false });
};

// Instance method to increment conversion count
BannerSchema.methods.incrementConversion = function() {
  this.conversionCount += 1;
  return this.save({ validateBeforeSave: false });
};

// Instance method to check if banner should be displayed
BannerSchema.methods.shouldDisplay = function(targetAudience = 'all', deviceType = 'desktop') {
  // Check if active and current
  if (!this.isCurrent) return false;
  
  // Check target audience
  if (this.targetAudience !== 'all' && this.targetAudience !== targetAudience) {
    return false;
  }
  
  // Check device type
  if (this.deviceTypes.length > 0 && !this.deviceTypes.includes(deviceType)) {
    return false;
  }
  
  return true;
};

// Static method to get active banners
BannerSchema.statics.getActiveBanners = function(options = {}) {
  const {
    category = null,
    targetAudience = 'all',
    deviceType = 'desktop',
    limit = 10
  } = options;
  
  const now = new Date();
  const query = {
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: { $gte: now } },
      { endDate: null }
    ]
  };
  
  if (category) query.category = category;
  if (targetAudience !== 'all') query.targetAudience = { $in: ['all', targetAudience] };
  if (deviceType) query.deviceTypes = { $in: [deviceType] };
  
  return this.find(query)
    .sort({ priority: 1, createdAt: -1 })
    .limit(limit)
    .populate('createdBy', 'name');
};

// Static method to get expired banners for cleanup
BannerSchema.statics.getExpiredBanners = function() {
  const now = new Date();
  return this.find({
    endDate: { $lt: now },
    status: { $ne: 'archived' }
  });
};

// Static method to get banner performance stats
BannerSchema.statics.getPerformanceStats = function(dateRange = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - dateRange);
  
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalBanners: { $sum: 1 },
        totalViews: { $sum: '$viewCount' },
        totalClicks: { $sum: '$clickCount' },
        totalConversions: { $sum: '$conversionCount' },
        avgClickThroughRate: {
          $avg: {
            $cond: [
              { $eq: ['$viewCount', 0] },
              0,
              { $multiply: [{ $divide: ['$clickCount', '$viewCount'] }, 100] }
            ]
          }
        }
      }
    }
  ]);
};

// Pre-save middleware for validation and updates
BannerSchema.pre('save', function(next) {
  // Auto-generate alt text if not provided
  if (!this.altText && this.title) {
    this.altText = `${this.title} - Cornells Luxury Beauty`;
  }
  
  // Auto-generate meta description if not provided
  if (!this.metaDescription && this.description) {
    this.metaDescription = this.description.length > 160 
      ? this.description.substring(0, 157) + '...'
      : this.description;
  }
  
  // Ensure mobile image defaults to main image
  if (!this.mobileImage && this.image) {
    this.mobileImage = this.image;
  }
  
  next();
});

// Pre-update middleware
BannerSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Banner = mongoose.model("Banner", BannerSchema);
export default Banner;