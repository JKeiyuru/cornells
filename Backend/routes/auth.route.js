// Backend/routes/auth.route.js - Perfect Rekker Auth Routes
import express from "express";
import {
  registerAdmin,
  loginUser,
  logOut,
  verifyToken,
  refreshToken,
  forgotPassword,
  changePassword,
  updateProfile
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// ============================================
// RATE LIMITERS
// ============================================

// Strict rate limiting for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again in 15 minutes.",
    error: "RATE_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Extra strict for password reset
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 requests per hour
  message: {
    success: false,
    message: "Too many password reset requests. Please try again in an hour.",
    error: "PASSWORD_RESET_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Very strict for admin registration
const adminRegisterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: {
    success: false,
    message: "Too many admin registration attempts. Please try again later.",
    error: "ADMIN_REGISTER_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============================================
// PUBLIC ROUTES
// ============================================

// REGISTER ADMIN - Create admin account (requires verification code)
router.post("/register-admin", adminRegisterLimiter, registerAdmin);

// LOGIN - Authentication for all users (admin & regular)
router.post("/login", authLimiter, loginUser);

// FORGOT PASSWORD - Request password reset
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

// ============================================
// PROTECTED ROUTES (require authentication)
// ============================================

// LOGOUT - Secure logout
router.post("/logout", protect, logOut);

// VERIFY TOKEN - Check if token is valid
router.get("/verify", protect, verifyToken);

// REFRESH TOKEN - Renew authentication token
router.post("/refresh", protect, refreshToken);

// CHANGE PASSWORD - Update password (for logged-in users)
router.post("/change-password", protect, changePassword);

// UPDATE PROFILE - Update user information
router.put("/profile", protect, updateProfile);

// ============================================
// UTILITY ROUTES
// ============================================

// Check if email is available for registration
router.post("/check-email", rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: "Please wait before checking email availability again"
}), async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const { default: User } = await import("../models/user.model.js");
    const userExists = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });

    res.status(200).json({
      success: true,
      available: !userExists,
      message: userExists 
        ? "This email is already registered" 
        : "Email is available"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to check email availability"
    });
  }
});

// Validate password strength
router.post("/validate-password", (req, res) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required"
    });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValid = passwordRegex.test(password);
  
  const strength = {
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password),
    minLength: password.length >= 8
  };
  
  res.status(200).json({
    success: true,
    valid: isValid,
    strength: strength,
    message: isValid 
      ? "Password meets security standards" 
      : "Password needs to be stronger"
  });
});

// Validate admin code (without creating account)
router.post("/validate-admin-code", rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many validation attempts"
}), (req, res) => {
  const { adminCode } = req.body;
  
  if (!adminCode) {
    return res.status(400).json({
      success: false,
      message: "Admin code is required"
    });
  }

  const ADMIN_REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE || "REKKER_ADMIN_2024";
  const isValid = adminCode === ADMIN_REGISTRATION_CODE;
  
  res.status(200).json({
    success: true,
    valid: isValid,
    message: isValid 
      ? "Admin code is valid" 
      : "Invalid admin code"
  });
});

export default router;