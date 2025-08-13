// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/controllers/order.controller.js
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import axios from "axios";
import mongoose from "mongoose";

// Helper function to validate order data
const validateOrderData = (orderData) => {
  const { products, shippingAddress, paymentMethod, totalAmount } = orderData;
  
  const errors = [];
  
  if (!products || !Array.isArray(products) || products.length === 0) {
    errors.push("Order must contain at least one product");
  }
  
  if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.country) {
    errors.push("Complete shipping address is required");
  }
  
  if (!paymentMethod) {
    errors.push("Payment method is required");
  }
  
  if (!totalAmount || totalAmount <= 0) {
    errors.push("Total amount must be greater than 0");
  }
  
  return errors;
};

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `COR-${timestamp.slice(-6)}-${random}`;
};

// CREATE ORDER
// route POST /api/v1/orders
//@access Private
const createOrder = asyncHandler(async (req, res) => {
  const errors = validateOrderData(req.body);
  if (errors.length > 0) {
    res.status(400);
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  const {
    products,
    shippingAddress,
    paymentMethod,
    paymentDetails,
    totalAmount,
    shippingCost,
    taxAmount,
    discountAmount,
    couponCode,
    specialInstructions
  } = req.body;

  // Validate products existence and stock
  const productIds = products.map(item => item.productId);
  const foundProducts = await Product.find({ 
    _id: { $in: productIds },
    isActive: { $ne: false }
  });

  if (foundProducts.length !== productIds.length) {
    res.status(400);
    throw new Error("Some products are no longer available in our exclusive collection");
  }

  // Check stock availability
  const stockIssues = [];
  products.forEach(orderItem => {
    const product = foundProducts.find(p => p._id.toString() === orderItem.productId);
    if (product && product.inStock < orderItem.quantity) {
      stockIssues.push(`${product.title} - Only ${product.inStock} items available`);
    }
  });

  if (stockIssues.length > 0) {
    res.status(400);
    throw new Error(`Stock unavailable: ${stockIssues.join(', ')}`);
  }

  try {
    const orderData = {
      orderNumber: generateOrderNumber(),
      userId: req.user._id,
      products: products.map(item => ({
        productId: item.productId,
        title: foundProducts.find(p => p._id.toString() === item.productId).title,
        price: foundProducts.find(p => p._id.toString() === item.productId).price,
        quantity: item.quantity,
        image: foundProducts.find(p => p._id.toString() === item.productId).img?.[0] || ''
      })),
      shippingAddress,
      paymentMethod,
      paymentDetails,
      totalAmount,
      shippingCost: shippingCost || 0,
      taxAmount: taxAmount || 0,
      discountAmount: discountAmount || 0,
      couponCode: couponCode || '',
      specialInstructions: specialInstructions || '',
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date()
    };

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    if (!savedOrder) {
      res.status(400);
      throw new Error("Failed to create your exclusive order");
    }

    // Update product stock
    const stockUpdates = products.map(item => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { inStock: -item.quantity, soldCount: item.quantity } }
      }
    }));

    await Product.bulkWrite(stockUpdates);

    // Trigger order confirmation email
    try {
      await axios.post(
        `${process.env.BG_SERVICE_URL || "http://localhost:6000"}/send-pending-order`,
        {
          orderId: savedOrder._id,
          orderNumber: savedOrder.orderNumber,
          customerEmail: req.user.email,
          customerName: req.user.name,
          totalAmount: savedOrder.totalAmount
        },
        { timeout: 3000 }
      );
      console.log(`✨ Order confirmation email triggered for order ${savedOrder.orderNumber}`);
    } catch (emailError) {
      console.warn("Order confirmation email failed:", emailError.message);
      // Don't fail the order if email service is down
    }

    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('userId', 'name email')
      .populate('products.productId', 'title img averageRating');

    res.status(201).json({
      success: true,
      message: "Your exclusive Cornells order has been placed successfully",
      order: populatedOrder
    });

  } catch (error) {
    console.error('Order creation error:', error);
    throw error;
  }
});

// UPDATE ORDER STATUS
// route PUT /api/v1/orders/:id
//@access Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid order ID");
  }

  const { status, paymentStatus, trackingNumber, estimatedDelivery, notes } = req.body;

  const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'];
  const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'];

  if (status && !validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid order status");
  }

  if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
    res.status(400);
    throw new Error("Invalid payment status");
  }

  const updateData = {
    updatedAt: new Date(),
    updatedBy: req.user._id
  };

  if (status) updateData.status = status;
  if (paymentStatus) updateData.paymentStatus = paymentStatus;
  if (trackingNumber) updateData.trackingNumber = trackingNumber;
  if (estimatedDelivery) updateData.estimatedDelivery = new Date(estimatedDelivery);
  if (notes) updateData.adminNotes = notes;

  // Add status history
  if (status) {
    updateData.$push = {
      statusHistory: {
        status: status,
        timestamp: new Date(),
        updatedBy: req.user._id,
        notes: notes || ''
      }
    };
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  )
    .populate('userId', 'name email')
    .populate('products.productId', 'title img');

  if (!updatedOrder) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Trigger status update email
  try {
    await axios.post(
      `${process.env.BG_SERVICE_URL || "http://localhost:6000"}/send-order-status-update`,
      {
        orderId: updatedOrder._id,
        orderNumber: updatedOrder.orderNumber,
        status: updatedOrder.status,
        customerEmail: updatedOrder.userId.email,
        customerName: updatedOrder.userId.name,
        trackingNumber: updatedOrder.trackingNumber
      },
      { timeout: 3000 }
    );
  } catch (emailError) {
    console.warn("Status update email failed:", emailError.message);
  }

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order: updatedOrder
  });
});

// CANCEL ORDER
// route PUT /api/v1/orders/:id/cancel
//@access Private
const cancelOrder = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid order ID");
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check if user owns the order or is admin
  if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - You can only cancel your own orders");
  }

  // Check if order can be cancelled
  if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
    res.status(400);
    throw new Error(`Cannot cancel order with status: ${order.status}`);
  }

  const { reason } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: 'cancelled',
        cancellationReason: reason || 'Cancelled by customer',
        cancelledAt: new Date(),
        cancelledBy: req.user._id,
        updatedAt: new Date()
      },
      $push: {
        statusHistory: {
          status: 'cancelled',
          timestamp: new Date(),
          updatedBy: req.user._id,
          notes: reason || 'Cancelled by customer'
        }
      }
    },
    { new: true }
  )
    .populate('userId', 'name email')
    .populate('products.productId', 'title img');

  // Restore product stock
  const stockRestores = order.products.map(item => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { 
        $inc: { 
          inStock: item.quantity,
          soldCount: -item.quantity
        }
      }
    }
  }));

  await Product.bulkWrite(stockRestores);

  res.status(200).json({
    success: true,
    message: "Order has been cancelled successfully",
    order: updatedOrder
  });
});

// DELETE ORDER (Admin only)
// route DELETE /api/v1/orders/:id
//@access Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid order ID");
  }

  const order = await Order.findByIdAndDelete(req.params.id);
  
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json({
    success: true,
    message: "Order has been deleted successfully"
  });
});

// GET USER ORDERS
// route GET /api/v1/orders/user/:id
//@access Private
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Check if user is getting their own orders or is admin
  if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - You can only view your own orders");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  const skip = (page - 1) * limit;

  let query = { userId: userId };

  if (status) {
    query.status = status;
  }

  const orders = await Order.find(query)
    .populate('products.productId', 'title img averageRating')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalOrders = await Order.countDocuments(query);
  const totalPages = Math.ceil(totalOrders / limit);

  res.status(200).json({
    success: true,
    orders: orders,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalOrders: totalOrders,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});

// GET ALL ORDERS (Admin only)
// route GET /api/v1/orders
//@access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const status = req.query.status;
  const paymentStatus = req.query.paymentStatus;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

  const skip = (page - 1) * limit;

  let query = {};

  if (status) query.status = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;

  const orders = await Order.find(query)
    .populate('userId', 'name email')
    .populate('products.productId', 'title img')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalOrders = await Order.countDocuments(query);
  const totalPages = Math.ceil(totalOrders / limit);

  res.status(200).json({
    success: true,
    orders: orders,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalOrders: totalOrders,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});

// GET SINGLE ORDER
// route GET /api/v1/orders/:id
//@access Private
const getSingleOrder = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid order ID");
  }

  const order = await Order.findById(req.params.id)
    .populate('userId', 'name email phone')
    .populate('products.productId', 'title img averageRating categories')
    .populate('statusHistory.updatedBy', 'name');

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check if user owns the order or is admin
  if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - You can only view your own orders");
  }

  res.status(200).json({
    success: true,
    order: order
  });
});

// GET ORDER STATISTICS (Admin only)
// route GET /api/v1/orders/stats
//@access Private/Admin
const getOrderStats = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  // Monthly sales
  const monthlySales = await Order.aggregate([
    { 
      $match: { 
        createdAt: { $gte: previousMonth },
        status: { $ne: 'cancelled' }
      } 
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
        sales: "$totalAmount",
      },
    },
    {
      $group: {
        _id: { month: "$month", year: "$year" },
        total: { $sum: "$sales" },
        count: { $sum: 1 }
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);

  // Overall stats
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: 'pending' });
  const completedOrders = await Order.countDocuments({ status: 'delivered' });
  const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });

  // Revenue stats
  const totalRevenue = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  const thisMonthRevenue = await Order.aggregate([
    { 
      $match: { 
        createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
        status: { $ne: 'cancelled' }
      } 
    },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);

  res.status(200).json({
    success: true,
    stats: {
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders
      },
      revenue: {
        total: totalRevenue[0]?.total || 0,
        thisMonth: thisMonthRevenue[0]?.total || 0
      },
      monthlySales: monthlySales
    }
  });
});

export {
  getAllOrders,
  getOrderStats,
  updateOrder,
  cancelOrder,
  deleteOrder,
  getUserOrders,
  getSingleOrder,
  createOrder
};