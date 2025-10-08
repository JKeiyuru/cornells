// Backend/routes/auth.route.js - Updated with Admin Registration
import express from "express";
import {
  registerUser,
  registerAdmin,
  loginUser,
  // logOut,
  // verifyToken,
  // refreshToken,
  forgotPassword,
  // changePassword,
  updateProfile
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again in 15 minutes for your security.",
    error: "RATE_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 requests per hour
  message: {
    success: false,
    message: "Too many password reset requests. Please try again in an hour.",
    error: "PASSWORD_RESET_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const adminRegisterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit to 3 admin registration attempts per hour
  message: {
    success: false,
    message: "Too many admin registration attempts. Please try again later.",
    error: "ADMIN_REGISTER_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ================================
// PUBLIC ROUTES
// ================================

// REGISTER ROUTE - Join Rekker (Client)
router.post("/register", authLimiter, registerUser);

// REGISTER ADMIN ROUTE - Create admin account (requires admin code)
router.post("/register-admin", adminRegisterLimiter, registerAdmin);

// LOGIN ROUTE - Access your account
router.post("/login", authLimiter, loginUser);

// FORGOT PASSWORD ROUTE - Recover your account
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

// ================================
// PROTECTED ROUTES (require authentication)
// ================================

// LOGOUT ROUTE - Secure departure
router.post("/logout", protect, logOut);

// VERIFY TOKEN ROUTE - Validate access
router.get("/verify", protect, verifyToken);

// REFRESH TOKEN ROUTE - Maintain session
router.post("/refresh", protect, refreshToken);

// CHANGE PASSWORD ROUTE - Update password (for logged-in users)
router.post("/change-password", protect, changePassword);

// UPDATE PROFILE ROUTE - Update user information
router.put("/profile", protect, updateProfile);

// ================================
// UTILITY ROUTES
// ================================

// Route to check if email is available for registration
router.post("/check-email", rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: "Please wait a moment before checking email availability again"
}), async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required for availability check"
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
        ? "This email is already registered with Rekker" 
        : "Email is available for your Rekker account"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to check email availability at this time"
    });
  }
});

// Route to validate password strength
router.post("/validate-password", (req, res) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required for validation"
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
      ? "Password meets Rekker security standards" 
      : "Password requires enhancement for premium security"
  });
});

// Route to validate admin code (without creating account)
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