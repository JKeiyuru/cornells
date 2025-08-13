// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/routes/banner.route.js
import express from "express";
import {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBanners,
  getSingleBanner,
  getActiveBanners,
  getRandomBanner,
  getBannerStats,
  toggleBannerStatus
} from "../controllers/banner.controller.js";
import { protect, requireAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC ROUTES - Luxury banner display

// GET ALL BANNERS WITH FILTERS
// GET /api/v1/banners
router.get("/", getAllBanners);

// GET ACTIVE BANNERS FOR HOMEPAGE
// GET /api/v1/banners/active
router.get("/active", getActiveBanners);

// GET RANDOM BANNER FOR DYNAMIC DISPLAY
// GET /api/v1/banners/random
router.get("/random", getRandomBanner);

// GET SINGLE BANNER BY ID
// GET /api/v1/banners/:id
router.get("/:id", getSingleBanner);

// ADMIN PROTECTED ROUTES - Banner management

// CREATE LUXURY BANNER (Admin Only)
// POST /api/v1/banners
router.post("/", protect, requireAdmin, createBanner);

// UPDATE BANNER DETAILS (Admin Only)
// PUT /api/v1/banners/:id
router.put("/:id", protect, requireAdmin, updateBanner);

// DELETE BANNER (Admin Only)
// DELETE /api/v1/banners/:id
router.delete("/:id", protect, requireAdmin, deleteBanner);

// GET BANNER STATISTICS (Admin Only)
// GET /api/v1/banners/stats
router.get("/stats", protect, requireAdmin, getBannerStats);

// TOGGLE BANNER ACTIVE STATUS (Admin Only)
// PATCH /api/v1/banners/:id/toggle
router.patch("/:id/toggle", protect, requireAdmin, toggleBannerStatus);

export default router;