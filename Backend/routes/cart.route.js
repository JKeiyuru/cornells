// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/routes/cart.route.js
import express from "express";
const router = express.Router();
import {
  addToCart,
  updateCartItem,
  deleteCartItem,
  getUserCart,
  clearCart,
  getCartItemCount,
  moveToWishlist,
  applyCoupon,
  getAllCarts
} from "../controllers/cart.controller.js";
import { protect, requireAdmin } from "../middlewares/auth.middleware.js";

// ADD ITEM TO EXCLUSIVE CART
// POST /api/v1/cart
router.post("/", protect, addToCart);

// UPDATE CART ITEM QUANTITY/DETAILS
// PUT /api/v1/cart/:id
router.put("/:id", protect, updateCartItem);

// DELETE CART ITEM
// DELETE /api/v1/cart/:id
router.delete("/:id", protect, deleteCartItem);

// GET USER'S LUXURY CART
// GET /api/v1/cart
router.get("/", protect, getUserCart);

// CLEAR ENTIRE CART
// DELETE /api/v1/cart/clear
router.delete("/clear", protect, clearCart);

// GET CART ITEM COUNT FOR BADGE
// GET /api/v1/cart/count
router.get("/count", protect, getCartItemCount);

// MOVE ITEM TO WISHLIST
// POST /api/v1/cart/:id/move-to-wishlist
router.post("/:id/move-to-wishlist", protect, moveToWishlist);

// APPLY LUXURY COUPON CODE
// POST /api/v1/cart/apply-coupon
router.post("/apply-coupon", protect, applyCoupon);

// GET ALL CARTS (Admin Only) - For analytics and management
// GET /api/v1/cart/all
router.get("/all", protect, requireAdmin, getAllCarts);

export default router;