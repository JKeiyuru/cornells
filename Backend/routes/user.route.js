// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/routes/user.route.js
import express from "express";
import {
  updateUser,
  getAllUsers,
  getOneUser,
  getUsersStats,
  deleteUser,
  getUserProfile,
  updateUserPreferences
} from "../controllers/user.controller.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiting for user operations
const userUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 update requests per windowMs
  message: {
    success: false,
    message: "Too many profile updates. Please try again in 15 minutes.",
    error: "UPDATE_RATE_LIMIT_EXCEEDED"
  }
});

const profileLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 profile requests per minute
  message: "Too many profile requests. Please slow down for optimal experience."
});

// ================================
// PUBLIC ROUTES (No authentication required)
// ================================

// Check username availability
router.get("/check-username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { default: User } = await import("../models/user.model.js");
    
    const userExists = await User.findOne({ 
      name: { $regex: new RegExp(`^${username}$`, 'i') }
    });

    res.status(200).json({
      success: true,
      available: !userExists,
      message: userExists 
        ? "This name is already taken in our exclusive community" 
        : "Name is available for your Cornells profile"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to check name availability"
    });
  }
});

// ================================
// PROTECTED ROUTES (Authentication required)
// ================================

// Get current user profile - Enhanced luxury experience
router.get("/profile", protect, profileLimiter, getUserProfile);

// Update current user profile - Premium personalization
router.put("/profile", protect, userUpdateLimiter, updateUser);

// Update user preferences - Customize luxury experience
router.put("/preferences", protect, updateUserPreferences);

// Add product to wishlist
router.post("/wishlist/:productId", protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const { default: User } = await import("../models/user.model.js");
    
    const user = await User.findById(req.user._id);
    
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    
    const populatedUser = await User.findById(req.user._id)
      .populate('wishlist', 'title img price originalPrice discountedPrice');
    
    res.status(200).json({
      success: true,
      message: "Added to your exclusive wishlist",
      wishlist: populatedUser.wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update wishlist at this time"
    });
  }
});

// Remove product from wishlist
router.delete("/wishlist/:productId", protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const { default: User } = await import("../models/user.model.js");
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate('wishlist', 'title img price originalPrice discountedPrice');
    
    res.status(200).json({
      success: true,
      message: "Removed from your exclusive wishlist",
      wishlist: user.wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update wishlist at this time"
    });
  }
});

// Get user's wishlist
router.get("/wishlist", protect, async (req, res) => {
  try {
    const { default: User } = await import("../models/user.model.js");
    
    const user = await User.findById(req.user._id)
      .populate({
        path: 'wishlist',
        match: { isActive: { $ne: false } },
        select: 'title img price originalPrice discountedPrice categories averageRating inStock'
      });
    
    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
      count: user.wishlist.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve your wishlist at this time"
    });
  }
});

// Add address to user profile
router.post("/addresses", protect, async (req, res) => {
  try {
    const { type, label, street, apartment, city, state, postalCode, country, instructions, isDefault } = req.body;
    const { default: User } = await import("../models/user.model.js");
    
    const user = await User.findById(req.user._id);
    
    // If this is set as default, unset others
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }
    
    const newAddress = {
      type: type || 'home',
      label: label || `${type} Address`,
      street,
      apartment,
      city,
      state,
      postalCode,
      country,
      instructions,
      isDefault: isDefault || user.addresses.length === 0
    };
    
    user.addresses.push(newAddress);
    await user.save();
    
    res.status(201).json({
      success: true,
      message: "Delivery address added to your Cornells profile",
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to add address at this time"
    });
  }
});

// Update address
router.put("/addresses/:addressId", protect, async (req, res) => {
  try {
    const { addressId } = req.params;
    const updateData = req.body;
    const { default: User } = await import("../models/user.model.js");
    
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(addressId);
    
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found in your profile"
      });
    }
    
    // If setting as default, unset others
    if (updateData.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }
    
    Object.assign(address, updateData);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update address at this time"
    });
  }
});

// Delete address
router.delete("/addresses/:addressId", protect, async (req, res) => {
  try {
    const { addressId } = req.params;
    const { default: User } = await import("../models/user.model.js");
    
    const user = await User.findById(req.user._id);
    user.addresses.id(addressId).remove();
    
    // If we removed the default address and others exist, set first as default
    if (user.addresses.length > 0 && !user.addresses.some(addr => addr.isDefault)) {
      user.addresses[0].isDefault = true;
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Address removed from your profile",
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to remove address at this time"
    });
  }
});

// Get user's membership details and benefits
router.get("/membership", protect, async (req, res) => {
  try {
    const { default: User } = await import("../models/user.model.js");
    const user = await User.findById(req.user._id);
    
    const membershipDetails = {
      tier: user.membership.tier,
      points: user.membership.points,
      totalSpent: user.membership.totalSpent,
      vipStatus: user.membership.vipStatus,
      joinDate: user.membership.joinDate,
      benefits: user.getTierBenefits(),
      hasVipAccess: user.hasVipAccess(),
      status: user.membershipStatus
    };
    
    res.status(200).json({
      success: true,
      membership: membershipDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve membership details"
    });
  }
});

// ================================
// USER MANAGEMENT ROUTES (ID-based operations)
// ================================

// Update specific user - Enhanced with luxury validation
router.put("/:id", protect, userUpdateLimiter, updateUser);

// Get specific user details
router.get("/:id", protect, getOneUser);

// Soft delete user account - Luxury farewell experience
router.delete("/:id", protect, deleteUser);

// ================================
// ADMIN ONLY ROUTES
// ================================

// Get all users with advanced filtering - Admin luxury dashboard
router.get("/", protect, requireRole('admin'), getAllUsers);

// Get comprehensive user statistics - Admin analytics
router.get("/stats", protect, requireRole('admin'), getUsersStats);

// Get VIP users list - Exclusive member management
router.get("/vip/list", protect, requireRole('admin'), async (req, res) => {
  try {
    const { default: User } = await import("../models/user.model.js");
    
    const vipUsers = await User.findVIPUsers()
      .select('name email membership profile contact createdAt')
      .sort({ 'membership.totalSpent': -1 });
    
    res.status(200).json({
      success: true,
      vipUsers: vipUsers,
      count: vipUsers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve VIP user list"
    });
  }
});

// Manually adjust user membership tier - Admin privilege
router.put("/:id/membership", protect, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { tier, points, vipStatus } = req.body;
    const { default: User } = await import("../models/user.model.js");
    
    const user = await User.findByIdAndUpdate(
      id,
      {
        'membership.tier': tier,
        'membership.points': points,
        'membership.vipStatus': vipStatus,
        updatedBy: req.user._id,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in our exclusive community"
      });
    }

    res.status(200).json({
      success: true,
      message: "User membership tier updated successfully",
      user: {
        name: user.name,
        email: user.email,
        membership: user.membership,
        membershipStatus: user.membershipStatus
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update user membership at this time"
    });
  }
});

// Get user activity report - Admin insights
router.get("/:id/activity", protect, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { default: User } = await import("../models/user.model.js");
    const { default: Order } = await import("../models/order.model.js");
    
    const user = await User.findById(id)
      .select('name email security membership lastActivity createdAt');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get user's order history summary
    const orderStats = await Order.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$totalAmount" },
          avgOrderValue: { $avg: "$totalAmount" },
          lastOrderDate: { $max: "$createdAt" }
        }
      }
    ]);

    const activityReport = {
      user: {
        name: user.name,
        email: user.email,
        joinDate: user.createdAt,
        lastActivity: user.lastActivity,
        loginCount: user.security.loginCount,
        lastLogin: user.security.lastLogin
      },
      membership: user.membership,
      orders: orderStats[0] || {
        totalOrders: 0,
        totalSpent: 0,
        avgOrderValue: 0,
        lastOrderDate: null
      }
    };

    res.status(200).json({
      success: true,
      activityReport: activityReport
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to generate activity report"
    });
  }
});

// Bulk user operations - Admin mass management
router.post("/bulk/update", protect, requireRole('admin'), async (req, res) => {
  try {
    const { userIds, updateData, operation } = req.body;
    const { default: User } = await import("../models/user.model.js");
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid user IDs for bulk operation"
      });
    }

    let result;
    const timestamp = new Date();
    
    switch (operation) {
      case 'deactivate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { 
            $set: { 
              status: 'inactive',
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;
        
      case 'activate':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { 
            $set: { 
              status: 'active',
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;
        
      case 'update_preferences':
        result = await User.updateMany(
          { _id: { $in: userIds } },
          { 
            $set: { 
              ...updateData,
              updatedAt: timestamp,
              updatedBy: req.user._id
            }
          }
        );
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid bulk operation specified"
        });
    }

    res.status(200).json({
      success: true,
      message: `Bulk ${operation} completed successfully`,
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bulk operation failed"
    });
  }
});

export default router;