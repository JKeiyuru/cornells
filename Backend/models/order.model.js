// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/models/order.model.js
import mongoose from "mongoose";

// Order Status History Schema for luxury tracking
const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned']
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String,
    default: '',
    maxlength: 500
  }
}, { _id: true });

// Product Item Schema for order tracking
const orderProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  },
  image: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: null
  }
}, { _id: false });

// Shipping Address Schema for luxury delivery
const shippingAddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
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
    maxlength: 50,
    default: ''
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  state: {
    type: String,
    required: true,
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
    maxlength: 100,
    default: 'United States'
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  deliveryInstructions: {
    type: String,
    trim: true,
    maxlength: 300,
    default: ''
  }
}, { _id: false });

// Payment Details Schema for secure transactions
const paymentDetailsSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'apple_pay', 'google_pay', 'bank_transfer']
  },
  transactionId: {
    type: String,
    trim: true,
    default: ''
  },
  last4Digits: {
    type: String,
    trim: true,
    default: ''
  },
  cardBrand: {
    type: String,
    trim: true,
    default: ''
  },
  processingFee: {
    type: Number,
    default: 0,
    min: 0
  }
}, { _id: false });

// Main Order Schema - Luxury E-commerce
const OrderSchema = new mongoose.Schema({
  // Unique order identification
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  
  // Customer reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Order products with detailed tracking
  products: [orderProductSchema],
  
  // Comprehensive shipping information
  shippingAddress: {
    type: shippingAddressSchema,
    required: true
  },
  
  // Payment information and processing
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'apple_pay', 'google_pay', 'bank_transfer']
  },
  
  paymentDetails: paymentDetailsSchema,
  
  // Financial breakdown
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  
  shippingCost: {
    type: Number,
    default: 0,
    min: 0
  },
  
  taxAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  discountAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Promotions and special offers
  couponCode: {
    type: String,
    trim: true,
    uppercase: true,
    default: ''
  },
  
  // Order status tracking
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending',
    index: true
  },
  
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
    default: 'pending',
    index: true
  },
  
  // Luxury delivery tracking
  trackingNumber: {
    type: String,
    trim: true,
    default: '',
    index: true
  },
  
  shippingCarrier: {
    type: String,
    trim: true,
    default: ''
  },
  
  estimatedDelivery: {
    type: Date,
    index: true
  },
  
  actualDelivery: {
    type: Date
  },
  
  // Customer preferences
  specialInstructions: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  },
  
  giftMessage: {
    type: String,
    trim: true,
    maxlength: 300,
    default: ''
  },
  
  isGift: {
    type: Boolean,
    default: false
  },
  
  // Status history for complete tracking
  statusHistory: [statusHistorySchema],
  
  // Administrative fields
  adminNotes: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: ''
  },
  
  // Cancellation tracking
  cancellationReason: {
    type: String,
    trim: true,
    maxlength: 300
  },
  
  cancelledAt: {
    type: Date
  },
  
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Return/refund tracking
  returnRequested: {
    type: Boolean,
    default: false
  },
  
  returnReason: {
    type: String,
    trim: true,
    maxlength: 300
  },
  
  returnStatus: {
    type: String,
    enum: ['requested', 'approved', 'denied', 'received', 'processed'],
    default: null
  },
  
  refundAmount: {
    type: Number,
    min: 0,
    default: 0
  },
  
  // Order priority for VIP customers
  priority: {
    type: String,
    enum: ['standard', 'express', 'vip', 'urgent'],
    default: 'standard'
  },
  
  // Audit trail
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance optimization
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ trackingNumber: 1 });
OrderSchema.index({ estimatedDelivery: 1 });

// Virtual for order subtotal calculation
OrderSchema.virtual('subtotal').get(function() {
  return this.products.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});

// Virtual for total items count
OrderSchema.virtual('totalItems').get(function() {
  return this.products.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

// Virtual for days since order
OrderSchema.virtual('daysSinceOrder').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for order age in hours
OrderSchema.virtual('orderAgeHours').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60));
});

// Virtual for formatted order number display
OrderSchema.virtual('displayOrderNumber').get(function() {
  return `#${this.orderNumber}`;
});

// Instance method to check if order is cancellable
OrderSchema.methods.isCancellable = function() {
  return ['pending', 'confirmed', 'processing'].includes(this.status);
};

// Instance method to check if order is returnable
OrderSchema.methods.isReturnable = function() {
  if (this.status !== 'delivered') return false;
  const deliveryDate = this.actualDelivery || this.createdAt;
  const daysSinceDelivery = Math.floor((Date.now() - deliveryDate) / (1000 * 60 * 60 * 24));
  return daysSinceDelivery <= 30; // 30-day return policy
};

// Instance method to add status history entry
OrderSchema.methods.addStatusHistory = function(status, updatedBy, notes = '') {
  this.statusHistory.push({
    status,
    timestamp: new Date(),
    updatedBy,
    notes
  });
  this.status = status;
  this.updatedAt = new Date();
  this.updatedBy = updatedBy;
};

// Static method to get orders by status
OrderSchema.statics.findByStatus = function(status) {
  return this.find({ status })
    .populate('userId', 'name email')
    .populate('products.productId', 'title img')
    .sort({ createdAt: -1 });
};

// Static method to get recent orders
OrderSchema.statics.findRecent = function(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.find({ createdAt: { $gte: startDate } })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
};

// Pre-save middleware for order number generation
OrderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `COR-${timestamp.slice(-6)}-${random}`;
  }
  
  // Add initial status history entry
  if (this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      updatedBy: this.userId,
      notes: 'Order created'
    });
  }
  
  next();
});

// Pre-update middleware
OrderSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;