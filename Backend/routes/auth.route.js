// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/routes/auth.route.js
import express from "express";
import {
  registerUser,
  loginUser,
  logOut,
  verifyToken,
  refreshToken,
  forgotPassword
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

// REGISTER ROUTE - Join Cornells exclusive community
router.post("/register", authLimiter, registerUser);

// LOGIN ROUTE - Access your exclusive collection
router.post("/login", authLimiter, loginUser);

// LOGOUT ROUTE - Secure departure from Cornells experience
router.post("/logout", protect, logOut);

// VERIFY TOKEN ROUTE - Validate exclusive access
router.get("/verify", protect, verifyToken);

// REFRESH TOKEN ROUTE - Maintain seamless luxury experience
router.post("/refresh", protect, refreshToken);

// FORGOT PASSWORD ROUTE - Recover your exclusive account
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

// Additional luxury authentication routes for enhanced security

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
        ? "This email is already part of our exclusive community" 
        : "Email is available for your Cornells account"
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
      ? "Password meets Cornells security standards" 
      : "Password requires enhancement for premium security"
  });
});

export default router;