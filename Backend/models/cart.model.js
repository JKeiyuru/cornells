// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/models/cart.model.js
import mongoose from "mongoose";

// Cart Item Schema for luxury shopping experience
const CartSchema = new mongoose.Schema({
  // User reference for cart ownership
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Product reference with validation
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  
  // Product details cached for performance
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  
  // Current price (cached from product)
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: 'Price must be greater than 0'
    }
  },
  
  // Quantity with validation
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    default: 1,
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  },
  
  // Product image for cart display
  image: {
    type: String,
    required: true,
    default: ''
  },
  
  // Product variants for luxury customization
  size: {
    type: String,
    trim: true,
    default: null,
    maxlength: 20
  },
  
  color: {
    type: String,
    trim: true,
    default: null,
    maxlength: 30
  },
  
  variant: {
    type: String,
    trim: true,
    default: null,
    maxlength: 50
  },
  
  // Special product options
  fragrance: {
    type: String,
    trim: true,
    default: null,
    maxlength: 50
  },
  
  intensity: {
    type: String,
    enum: ['light', 'medium', 'strong', 'extra_strong', null],
    default: null
  },
  
  // Customer preferences
  isGift: {
    type: Boolean,
    default: false
  },
  
  giftMessage: {
    type: String,
    trim: true,
    maxlength: 200,
    default: ''
  },
  
  // Special requests or notes
  specialRequests: {
    type: String,
    trim: true,
    maxlength: 300,
    default: ''
  },
  
  // Saved for later functionality
  savedForLater: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // Priority for VIP customers
  priority: {
    type: String,
    enum: ['normal', 'high', 'vip'],
    default: 'normal'
  },
  
  // Session tracking for guest carts (if applicable)
  sessionId: {
    type: String,
    trim: true,
    default: null,
    index: true
  },
  
  // Cart expiration for cleanup
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    },
    index: true
  },
  
  // Tracking fields
  addedFrom: {
    type: String,
    enum: ['product_page', 'category', 'search', 'wishlist', 'recommendation', 'quick_add'],
    default: 'product_page'
  },
  
  // Device/source information
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'app'],
    default: 'desktop'
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound indexes for performance
CartSchema.index({ userId: 1, productId: 1, size: 1, color: 1 }, { unique: true });
CartSchema.index({ userId: 1, createdAt: -1 });
CartSchema.index({ userId: 1, savedForLater: 1 });
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Virtual for item total price
CartSchema.virtual('itemTotal').get(function() {
  return this.price * this.quantity;
});

// Virtual for formatted price display
CartSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Virtual for formatted total display
CartSchema.virtual('formattedTotal').get(function() {
  return `$${this.itemTotal.toFixed(2)}`;
});

// Virtual for cart age in hours
CartSchema.virtual('ageInHours').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60));
});

// Virtual for variant display
CartSchema.virtual('variantDisplay').get(function() {
  const variants = [];
  if (this.size) variants.push(`Size: ${this.size}`);
  if (this.color) variants.push(`Color: ${this.color}`);
  if (this.fragrance) variants.push(`Fragrance: ${this.fragrance}`);
  if (this.intensity) variants.push(`Intensity: ${this.intensity}`);
  return variants.join(', ');
});

// Instance method to update quantity safely
CartSchema.methods.updateQuantity = function(newQuantity) {
  if (newQuantity < 1 || newQuantity > 10 || !Number.isInteger(newQuantity)) {
    throw new Error('Quantity must be between 1 and 10');
  }
  this.quantity = newQuantity;
  this.updatedAt = new Date();
  return this.save();
};

// Instance method to check if item is expired
CartSchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Instance method to extend expiration
CartSchema.methods.extendExpiration = function(days = 30) {
  this.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return this.save();
};

// Static method to get user's cart with populated product data
CartSchema.statics.getUserCartWithProducts = function(userId) {
  return this.find({ userId, savedForLater: false })
    .populate('productId', 'title price img inStock averageRating isActive categories')
    .populate('userId', 'name email membershipTier')
    .sort({ createdAt: -1 });
};

// Static method to get saved items
CartSchema.statics.getSavedItems = function(userId) {
  return this.find({ userId, savedForLater: true })
    .populate('productId', 'title price img inStock averageRating isActive')
    .sort({ createdAt: -1 });
};

// Static method to calculate cart statistics
CartSchema.statics.getCartStats = function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId), savedForLater: false } },
    {
      $group: {
        _id: null,
        totalItems: { $sum: '$quantity' },
        totalValue: { $sum: { $multiply: ['$price', '$quantity'] } },
        itemCount: { $sum: 1 }
      }
    }
  ]);
};

// Static method to cleanup expired carts
CartSchema.statics.cleanupExpiredCarts = function() {
  return this.deleteMany({ expiresAt: { $lt: new Date() } });
};

// Static method to find abandoned carts (for marketing)
CartSchema.statics.findAbandonedCarts = function(hoursAgo = 24) {
  const cutoffTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
  return this.find({
    updatedAt: { $lt: cutoffTime },
    savedForLater: false
  }).populate('userId', 'name email');
};

// Pre-save middleware for validation and updates
CartSchema.pre('save', async function(next) {
  // Extend expiration on updates
  if (!this.isNew && this.isModified('quantity')) {
    this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }
  
  // Validate product still exists and is active
  if (this.isModified('productId')) {
    const Product = mongoose.model('Product');
    const product = await Product.findById(this.productId);
    if (!product || product.isActive === false) {
      const error = new Error('Product is no longer available');
      return next(error);
    }
    
    // Update cached product data
    this.title = product.title;
    this.price = product.price;
    this.image = product.img?.[0] || '';
  }
  
  next();
});

// Pre-update middleware
CartSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Post-save middleware for analytics
CartSchema.post('save', function(doc) {
  // You could add analytics tracking here
  console.log(`Cart item ${doc.isNew ? 'added' : 'updated'} for user ${doc.userId}`);
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;