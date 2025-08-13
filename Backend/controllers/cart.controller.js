// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/controllers/cart.controller.js
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Helper function to validate cart item data
const validateCartItem = (item) => {
  const errors = [];
  
  if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
    errors.push("Valid product ID is required");
  }
  
  if (!item.quantity || item.quantity <= 0 || !Number.isInteger(item.quantity)) {
    errors.push("Quantity must be a positive integer");
  }
  
  if (item.quantity > 10) {
    errors.push("Maximum quantity per item is 10");
  }
  
  return errors;
};

// ADD ITEM TO CART
// route POST /api/v1/cart
//@access Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, size, color } = req.body;
  
  const errors = validateCartItem({ productId, quantity });
  if (errors.length > 0) {
    res.status(400);
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  // Verify product exists and is active
  const product = await Product.findOne({ 
    _id: productId, 
    isActive: { $ne: false } 
  });

  if (!product) {
    res.status(404);
    throw new Error("This exclusive product is not available");
  }

  // Check stock availability
  if (product.inStock < quantity) {
    res.status(400);
    throw new Error(`Only ${product.inStock} items available for ${product.title}`);
  }

  try {
    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({
      userId: req.user._id,
      productId: productId,
      size: size || null,
      color: color || null
    });

    if (existingCartItem) {
      // Update quantity if item already exists
      const newQuantity = existingCartItem.quantity + quantity;
      
      if (newQuantity > product.inStock) {
        res.status(400);
        throw new Error(`Cannot add ${quantity} more items. Only ${product.inStock - existingCartItem.quantity} more available`);
      }

      if (newQuantity > 10) {
        res.status(400);
        throw new Error("Maximum quantity per item is 10");
      }

      existingCartItem.quantity = newQuantity;
      existingCartItem.updatedAt = new Date();
      const updatedCartItem = await existingCartItem.save();
      
      const populatedItem = await Cart.findById(updatedCartItem._id)
        .populate('productId', 'title price img inStock averageRating');

      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem: populatedItem
      });
    } else {
      // Create new cart item
      const cartItemData = {
        userId: req.user._id,
        productId,
        quantity,
        price: product.price,
        title: product.title,
        image: product.img?.[0] || '',
        size: size || null,
        color: color || null
      };

      const newCartItem = new Cart(cartItemData);
      const savedCartItem = await newCartItem.save();

      const populatedItem = await Cart.findById(savedCartItem._id)
        .populate('productId', 'title price img inStock averageRating');

      res.status(201).json({
        success: true,
        message: "Item added to your exclusive cart",
        cartItem: populatedItem
      });
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
});

// UPDATE CART ITEM
// route PUT /api/v1/cart/:id
//@access Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity, size, color } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid cart item ID");
  }

  if (quantity && (quantity <= 0 || !Number.isInteger(quantity) || quantity > 10)) {
    res.status(400);
    throw new Error("Quantity must be between 1 and 10");
  }

  const cartItem = await Cart.findById(req.params.id);

  if (!cartItem) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  // Check if user owns the cart item
  if (cartItem.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Access denied - You can only update your own cart items");
  }

  // Verify product availability and stock
  const product = await Product.findOne({ 
    _id: cartItem.productId, 
    isActive: { $ne: false } 
  });

  if (!product) {
    res.status(404);
    throw new Error("Product is no longer available");
  }

  if (quantity && product.inStock < quantity) {
    res.status(400);
    throw new Error(`Only ${product.inStock} items available`);
  }

  const updateData = {
    updatedAt: new Date()
  };

  if (quantity) updateData.quantity = quantity;
  if (size !== undefined) updateData.size = size;
  if (color !== undefined) updateData.color = color;
  
  // Update price if it has changed
  if (product.price !== cartItem.price) {
    updateData.price = product.price;
  }

  const updatedCartItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('productId', 'title price img inStock averageRating');

  res.status(200).json({
    success: true,
    message: "Cart item updated successfully",
    cartItem: updatedCartItem
  });
});

// DELETE CART ITEM
// route DELETE /api/v1/cart/:id
//@access Private
const deleteCartItem = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid cart item ID");
  }

  const cartItem = await Cart.findById(req.params.id);

  if (!cartItem) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  // Check if user owns the cart item
  if (cartItem.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Access denied - You can only delete your own cart items");
  }

  await Cart.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Item removed from cart successfully"
  });
});

// GET USER CART
// route GET /api/v1/cart
//@access Private
const getUserCart = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find({ userId: req.user._id })
    .populate('productId', 'title price img inStock averageRating isActive')
    .sort({ createdAt: -1 });

  // Filter out items with inactive products and update prices
  const validCartItems = [];
  const itemsToRemove = [];
  const itemsToUpdate = [];

  for (const item of cartItems) {
    if (!item.productId || item.productId.isActive === false) {
      // Product no longer available, mark for removal
      itemsToRemove.push(item._id);
    } else {
      // Check if price has changed
      if (item.productId.price !== item.price) {
        itemsToUpdate.push({
          id: item._id,
          newPrice: item.productId.price
        });
        item.price = item.productId.price; // Update for response
      }

      // Check stock availability
      if (item.quantity > item.productId.inStock) {
        item.quantity = Math.max(1, item.productId.inStock);
        itemsToUpdate.push({
          id: item._id,
          quantity: item.quantity
        });
      }

      validCartItems.push(item);
    }
  }

  // Remove invalid items
  if (itemsToRemove.length > 0) {
    await Cart.deleteMany({ _id: { $in: itemsToRemove } });
  }

  // Update items with new prices or quantities
  if (itemsToUpdate.length > 0) {
    const updatePromises = itemsToUpdate.map(update => 
      Cart.findByIdAndUpdate(update.id, {
        $set: {
          ...(update.newPrice && { price: update.newPrice }),
          ...(update.quantity && { quantity: update.quantity }),
          updatedAt: new Date()
        }
      })
    );
    await Promise.all(updatePromises);
  }

  // Calculate cart totals
  const subtotal = validCartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

  const totalItems = validCartItems.reduce((total, item) => 
    total + item.quantity, 0
  );

  res.status(200).json({
    success: true,
    cartItems: validCartItems,
    summary: {
      itemCount: validCartItems.length,
      totalItems: totalItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      currency: 'USD'
    },
    notifications: {
      removedItems: itemsToRemove.length,
      updatedItems: itemsToUpdate.length
    }
  });
});

// CLEAR USER CART
// route DELETE /api/v1/cart/clear
//@access Private
const clearCart = asyncHandler(async (req, res) => {
  const result = await Cart.deleteMany({ userId: req.user._id });

  res.status(200).json({
    success: true,
    message: `Cart cleared successfully. ${result.deletedCount} items removed.`,
    deletedCount: result.deletedCount
  });
});

// GET CART ITEM COUNT
// route GET /api/v1/cart/count
//@access Private
const getCartItemCount = asyncHandler(async (req, res) => {
  const count = await Cart.countDocuments({ userId: req.user._id });

  res.status(200).json({
    success: true,
    count: count
  });
});

// MOVE ITEM TO WISHLIST (if wishlist exists)
// route POST /api/v1/cart/:id/move-to-wishlist
//@access Private
const moveToWishlist = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid cart item ID");
  }

  const cartItem = await Cart.findById(req.params.id);

  if (!cartItem) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  // Check if user owns the cart item
  if (cartItem.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Access denied");
  }

  // This would integrate with a wishlist model if it exists
  // For now, just remove from cart
  await Cart.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Item moved to wishlist (cart item removed)"
  });
});

// APPLY COUPON (if coupon system exists)
// route POST /api/v1/cart/apply-coupon
//@access Private
const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode } = req.body;

  if (!couponCode || typeof couponCode !== 'string' || couponCode.trim().length === 0) {
    res.status(400);
    throw new Error("Valid coupon code is required");
  }

  // Get user's cart
  const cartItems = await Cart.find({ userId: req.user._id })
    .populate('productId', 'price');

  if (cartItems.length === 0) {
    res.status(400);
    throw new Error("Your cart is empty");
  }

  const subtotal = cartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

  // This would integrate with a coupon/discount system
  // For now, simulate some basic coupons
  let discount = 0;
  let discountType = '';
  
  const upperCoupon = couponCode.toUpperCase();
  
  if (upperCoupon === 'WELCOME10') {
    discount = subtotal * 0.1; // 10% off
    discountType = 'percentage';
  } else if (upperCoupon === 'SAVE20') {
    discount = Math.min(20, subtotal); // $20 off or subtotal, whichever is less
    discountType = 'fixed';
  } else if (upperCoupon === 'LUXURY15') {
    discount = subtotal * 0.15; // 15% off
    discountType = 'percentage';
  } else {
    res.status(400);
    throw new Error("Invalid or expired coupon code");
  }

  const finalTotal = Math.max(0, subtotal - discount);

  res.status(200).json({
    success: true,
    message: "Coupon applied successfully",
    coupon: {
      code: couponCode,
      discount: parseFloat(discount.toFixed(2)),
      type: discountType
    },
    totals: {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      finalTotal: parseFloat(finalTotal.toFixed(2))
    }
  });
});

// GET ALL CARTS (Admin only)
// route GET /api/v1/cart/all
//@access Private/Admin
const getAllCarts = asyncHandler(async (req, res) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied - Admin privileges required");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const carts = await Cart.find()
    .populate('userId', 'name email')
    .populate('productId', 'title price img')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalCarts = await Cart.countDocuments();
  const totalPages = Math.ceil(totalCarts / limit);

  // Get cart statistics
  const cartStats = await Cart.aggregate([
    {
      $group: {
        _id: '$userId',
        itemCount: { $sum: 1 },
        totalValue: { $sum: { $multiply: ['$price', '$quantity'] } }
      }
    },
    {
      $group: {
        _id: null,
        totalCarts: { $sum: 1 },
        averageCartValue: { $avg: '$totalValue' },
        averageItemCount: { $avg: '$itemCount' }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    carts: carts,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalCarts: totalCarts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    },
    stats: cartStats[0] || {
      totalCarts: 0,
      averageCartValue: 0,
      averageItemCount: 0
    }
  });
});

export {
  addToCart,
  updateCartItem,
  deleteCartItem,
  getUserCart,
  clearCart,
  getCartItemCount,
  moveToWishlist,
  applyCoupon,
  getAllCarts
};