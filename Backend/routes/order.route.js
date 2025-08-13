// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/routes/order.route.js
import express from "express";
const router = express.Router();
import {
  createOrder,
  updateOrder,
  getAllOrders,
  getOrderStats,
  deleteOrder,
  getUserOrders,
  getSingleOrder,
  cancelOrder
} from "../controllers/order.controller.js";
import { protect, requireAdmin } from "../middlewares/auth.middleware.js";

// CREATE EXCLUSIVE CORNELLS ORDER ROUTE
// POST /api/v1/orders
router.post("/", protect, createOrder);

// UPDATE ORDER STATUS ROUTE (Admin Only)
// PUT /api/v1/orders/:id
router.put("/:id", protect, requireAdmin, updateOrder);

// CANCEL ORDER ROUTE (Customer/Admin)
// PUT /api/v1/orders/:id/cancel
router.put("/:id/cancel", protect, cancelOrder);

// GET ALL ORDERS ROUTE (Admin Only)
// GET /api/v1/orders
router.get("/", protect, requireAdmin, getAllOrders);

// GET ORDER STATISTICS ROUTE (Admin Only)
// GET /api/v1/orders/stats
router.get("/stats", protect, requireAdmin, getOrderStats);

// GET USER ORDERS ROUTE (Customer/Admin)
// GET /api/v1/orders/user/:id
router.get("/user/:id", protect, getUserOrders);

// GET SINGLE ORDER ROUTE (Customer/Admin)
// GET /api/v1/orders/:id
router.get("/:id", protect, getSingleOrder);

// DELETE ORDER ROUTE (Admin Only)
// DELETE /api/v1/orders/:id
router.delete("/:id", protect, requireAdmin, deleteOrder);

export default router;