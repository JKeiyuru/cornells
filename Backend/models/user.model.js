// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required for your exclusive Cornells account"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters for our premium service"],
      maxlength: [50, "Name must be less than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required for your luxury experience"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
      maxlength: [254, "Email address is too long"],
      index: true
    },

    password: {
      type: String,
      required: [true, "Password is required for account security"],
      minlength: [8, "Password must be at least 8 characters for premium security"],
      select: false // Don't include password in queries by default
    },

    // Enhanced profile information for luxury experience
    profile: {
      avatar: {
        type: String,
        default: ""
      },
      dateOfBirth: {
        type: Date
      },
      gender: {
        type: String,
        enum: ["male", "female", "non-binary", "prefer-not-to-say"],
      },
      skinType: {
        type: String,
        enum: ["oily", "dry", "combination", "sensitive", "normal"],
      },
      skinConcerns: [{
        type: String,
        enum: ["acne", "aging", "dark-spots", "sensitivity", "dryness", "oiliness", "pores", "fine-lines"]
      }],
      beautyProfile: {
        favoriteCategories: [String],
        preferredBrands: [String],
        budgetRange: {
          min: Number,
          max: Number
        }
      }
    },

    // Contact and shipping information
    contact: {
      phone: {
        type: String,
        validate: {
          validator: function(v) {
            return !v || /^\+?[\d\s\-\(\)]{10,}$/.test(v);
          },
          message: "Please provide a valid phone number"
        }
      },
      alternatePhone: {
        type: String,
        validate: {
          validator: function(v) {
            return !v || /^\+?[\d\s\-\(\)]{10,}$/.test(v);
          },
          message: "Please provide a valid alternate phone number"
        }
      }
    },

    addresses: [{
      type: {
        type: String,
        enum: ["home", "office", "other"],
        default: "home"
      },
      isDefault: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        maxlength: 50
      },
      street: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
      },
      apartment: {
        type: String,
        trim: true,
        maxlength: 50
      },
      city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      },
      state: {
        type: String,
        trim: true,
        maxlength: 100
      },
      postalCode: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
      },
      country: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      },
      instructions: {
        type: String,
        maxlength: 500
      }
    }],

    // Account and membership details
    membership: {
      tier: {
        type: String,
        enum: ["bronze", "silver", "gold", "platinum", "diamond"],
        default: "bronze"
      },
      points: {
        type: Number,
        default: 0,
        min: 0
      },
      totalSpent: {
        type: Number,
        default: 0,
        min: 0
      },
      joinDate: {
        type: Date,
        default: Date.now
      },
      vipStatus: {
        type: Boolean,
        default: false
      }
    },

    // User preferences for personalized experience
    preferences: {
      newsletter: {
        type: Boolean,
        default: true
      },
      smsNotifications: {
        type: Boolean,
        default: false
      },
      emailNotifications: {
        marketing: {
          type: Boolean,
          default: true
        },
        orders: {
          type: Boolean,
          default: true
        },
        recommendations: {
          type: Boolean,
          default: true
        },
        newArrivals: {
          type: Boolean,
          default: true
        }
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "EUR", "GBP", "CAD", "AUD", "KES"]
      },
      language: {
        type: String,
        default: "en",
        enum: ["en", "fr", "es", "de", "it"]
      },
      theme: {
        type: String,
        default: "luxury",
        enum: ["luxury", "classic", "modern"]
      }
    },

    // Account security and activity
    security: {
      lastLogin: {
        type: Date
      },
      loginCount: {
        type: Number,
        default: 0
      },
      lastPasswordChange: {
        type: Date,
        default: Date.now
      },
      twoFactorEnabled: {
        type: Boolean,
        default: false
      },
      securityQuestions: [{
        question: String,
        answer: {
          type: String,
          select: false
        }
      }]
    },

    // Wishlist and favorites
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],

    // Reviews and ratings given by user
    reviewsGiven: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      review: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],

    // System fields
    role: {
      type: String,
      enum: ["admin", "moderator"],
      default: "admin"
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "pending"],
      default: "active"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    emailVerified: {
      type: Boolean,
      default: false
    },

    phoneVerified: {
      type: Boolean,
      default: false
    },

    // Tracking fields
    lastActivity: {
      type: Date,
      default: Date.now
    },

    ipAddress: String,
    userAgent: String,

    // Soft delete support
    deletedAt: Date,
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // Audit trail
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ "membership.tier": 1 });
userSchema.index({ "membership.points": -1 });
userSchema.index({ role: 1, status: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ "security.lastLogin": -1 });

// Virtual for full name formatting
userSchema.virtual('displayName').get(function() {
  return this.name.split(' ').map(name => 
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  ).join(' ');
});

// Virtual for membership status
userSchema.virtual('membershipStatus').get(function() {
  const tier = this.membership.tier;
  const totalSpent = this.membership.totalSpent;
  
  let status = "Welcome to Cornells";
  
  switch(tier) {
    case "diamond":
      status = "Diamond Elite - Exclusive Luxury";
      break;
    case "platinum":
      status = "Platinum VIP - Premium Access";
      break;
    case "gold":
      status = "Gold Member - Enhanced Experience";
      break;
    case "silver":
      status = "Silver Member - Growing Collection";
      break;
    default:
      status = "Bronze Member - Beauty Journey Begins";
  }
  
  return status;
});

// Virtual for default address
userSchema.virtual('defaultAddress').get(function() {
  return this.addresses.find(addr => addr.isDefault) || this.addresses[0];
});

// Pre-save middleware for password hashing (only if password is modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.security.lastPasswordChange = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to ensure only one default address
userSchema.pre("save", function (next) {
  if (this.isModified("addresses")) {
    const defaultAddresses = this.addresses.filter(addr => addr.isDefault);
    
    if (defaultAddresses.length > 1) {
      // Keep only the first default, set others to false
      this.addresses.forEach((addr, index) => {
        if (index > 0 && addr.isDefault) {
          addr.isDefault = false;
        }
      });
    } else if (defaultAddresses.length === 0 && this.addresses.length > 0) {
      // Set first address as default if none exists
      this.addresses[0].isDefault = true;
    }
  }
  next();
});

// Pre-save middleware to update membership tier based on spending
userSchema.pre("save", function (next) {
  if (this.isModified("membership.totalSpent")) {
    const spent = this.membership.totalSpent;
    
    if (spent >= 10000) {
      this.membership.tier = "diamond";
      this.membership.vipStatus = true;
    } else if (spent >= 5000) {
      this.membership.tier = "platinum";
      this.membership.vipStatus = true;
    } else if (spent >= 2000) {
      this.membership.tier = "gold";
    } else if (spent >= 500) {
      this.membership.tier = "silver";
    } else {
      this.membership.tier = "bronze";
    }
  }
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) {
    throw new Error("Password not available for comparison");
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to update last activity
userSchema.methods.updateActivity = function(ipAddress, userAgent) {
  this.lastActivity = new Date();
  if (ipAddress) this.ipAddress = ipAddress;
  if (userAgent) this.userAgent = userAgent;
  return this.save();
};

// Method to add points and update spending
userSchema.methods.addPurchase = function(amount) {
  this.membership.totalSpent += amount;
  this.membership.points += Math.floor(amount * 0.1); // 10% points rate
  return this.save();
};

// Method to check if user can access VIP features
userSchema.methods.hasVipAccess = function() {
  return this.membership.vipStatus || 
         this.role === 'admin' || 
         this.membership.tier === 'diamond' || 
         this.membership.tier === 'platinum';
};

// Method to get user's luxury tier benefits
userSchema.methods.getTierBenefits = function() {
  const benefits = {
    bronze: ["Standard shipping", "Basic support", "Product recommendations"],
    silver: ["Free shipping over $50", "Priority support", "Early sale access", "Birthday discount"],
    gold: ["Free shipping", "VIP support", "Exclusive products", "Personal beauty consultant", "Double points"],
    platinum: ["Free express shipping", "24/7 VIP support", "Exclusive launches", "Personal shopper", "Triple points"],
    diamond: ["Free same-day shipping", "Dedicated account manager", "Custom product development", "Exclusive events", "Quadruple points"]
  };
  
  return benefits[this.membership.tier] || benefits.bronze;
};

// Static method to find active users
userSchema.statics.findActive = function() {
  return this.find({ isActive: true, status: 'active' });
};

// Static method to find VIP users
userSchema.statics.findVIPUsers = function() {
  return this.find({ 
    $or: [
      { 'membership.vipStatus': true },
      { 'membership.tier': { $in: ['platinum', 'diamond'] } },
      { role: 'admin' }
    ],
    isActive: true 
  });
};

const User = mongoose.model("User", userSchema);
export default User;