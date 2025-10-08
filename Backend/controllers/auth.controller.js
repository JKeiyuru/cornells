// Backend/controllers/auth.controller.js - Perfect Rekker Auth
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import axios from "axios";
import bcrypt from "bcryptjs";
import validator from "validator";

// Validation helper functions
const validateEmail = (email) => {
  return validator.isEmail(email) && email.length <= 254;
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

// ============================================
// ADMIN REGISTRATION (with verification code)
// ============================================
const registerAdmin = asyncHandler(async (req, res) => {
  let { name, email, password, adminCode } = req.body;

  // Normalize inputs
  name = name ? name.trim() : "";
  email = email ? email.toLowerCase().trim() : "";
  password = password ? password.trim() : "";

  // Validation
  if (!name || !email || !password || !adminCode) {
    res.status(400);
    throw new Error("All fields are required for admin registration");
  }

  if (!validateName(name)) {
    res.status(400);
    throw new Error("Name must be between 2 and 50 characters");
  }

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  if (!validatePassword(password)) {
    res.status(400);
    throw new Error("Password must contain at least 8 characters with uppercase, lowercase, number and special character");
  }

  // Verify admin code
  const ADMIN_REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE || "REKKER_ADMIN_2024";
  
  if (adminCode !== ADMIN_REGISTRATION_CODE) {
    res.status(403);
    throw new Error("Invalid admin verification code");
  }

  // Check if user exists (case insensitive)
  const userExists = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });

  if (userExists) {
    res.status(409);
    throw new Error("An account with this email already exists");
  }

  try {
    // Create admin user
    const user = await User.create({
      name,
      email,
      password, // Will be hashed by pre-save middleware
      role: 'admin',
      emailVerified: true, // Auto-verify admin accounts
      status: 'active'
    });

    if (user) {
      generateToken(res, user._id);

      console.log(`✅ Admin account created: ${email}`);

      res.status(201).json({
        success: true,
        message: "Admin account created successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } else {
      res.status(400);
      throw new Error("Unable to create admin account. Please try again.");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error("An account with this email already exists");
    }
    throw error;
  }
});

// ============================================
// LOGIN USER (works for both admin and regular users)
// ============================================
const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  // Normalize inputs
  email = email ? email.toLowerCase().trim() : "";
  password = password ? password.trim() : "";

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  try {
    // Find user (case insensitive email)
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    }).select("+password");

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials - Access denied");
    }

    // Check if account is active
    if (user.status !== 'active' || user.isActive === false) {
      res.status(401);
      throw new Error("Account is not active. Please contact support.");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid credentials - Access denied");
    }

    // Update last login
    await User.findByIdAndUpdate(user._id, {
      'security.lastLogin': new Date(),
      $inc: { 'security.loginCount': 1 },
      lastActivity: new Date()
    });

    generateToken(res, user._id);

    console.log(`✅ User logged in: ${email} (${user.role})`);

    res.status(200).json({
      success: true,
      message: `Welcome back to Rekker${user.role === 'admin' ? ' Admin' : ''}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: new Date(),
      },
    });
  } catch (error) {
    throw error;
  }
});

// ============================================
// LOGOUT USER
// ============================================
const logOut = asyncHandler(async (req, res) => {
  console.log("🚪 User logging out from Rekker");

  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out from Rekker. Until next time!",
  });
});

// ============================================
// VERIFY TOKEN
// ============================================
const verifyToken = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role || "user",
      },
    });
  } else {
    res.status(401);
    throw new Error("Token verification failed");
  }
});

// ============================================
// REFRESH TOKEN
// ============================================
const refreshToken = asyncHandler(async (req, res) => {
  if (req.user) {
    generateToken(res, req.user._id);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } else {
    res.status(401);
    throw new Error("Unable to refresh token");
  }
});

// ============================================
// REQUEST PASSWORD RESET
// ============================================
const forgotPassword = asyncHandler(async (req, res) => {
  let { email } = req.body;
  email = email ? email.toLowerCase().trim() : "";

  if (!email || !validateEmail(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
  }

  const user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });

  if (!user) {
    // Don't reveal if user exists for security
    res.status(200).json({
      success: true,
      message: "If an account with that email exists, password reset instructions have been sent",
    });
    return;
  }

  try {
    await axios.post(
      `${process.env.BG_SERVICE_URL || "http://localhost:6000"}/send-password-reset`,
      {
        userId: user._id,
        userEmail: user.email,
        userName: user.name,
      },
      { timeout: 3000 }
    );

    res.status(200).json({
      success: true,
      message: "Password reset instructions have been sent to your email",
    });
  } catch (error) {
    console.error("Password reset email failed:", error.message);
    res.status(500);
    throw new Error("Unable to send password reset email. Please try again later.");
  }
});

// ============================================
// CHANGE PASSWORD (for logged-in users)
// ============================================
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Current password and new password are required");
  }

  if (!validatePassword(newPassword)) {
    res.status(400);
    throw new Error("New password must contain at least 8 characters with uppercase, lowercase, number and special character");
  }

  try {
    // Get user with password
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Current password is incorrect");
    }

    // Check if new password is different
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      res.status(400);
      throw new Error("New password must be different from current password");
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    console.log(`✅ Password changed for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    throw error;
  }
});

// ============================================
// UPDATE USER PROFILE
// ============================================
const updateProfile = asyncHandler(async (req, res) => {
  const { name, contact, profile, addresses } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update allowed fields
    if (name && validateName(name)) {
      user.name = name.trim();
    }

    if (contact) {
      user.contact = { ...user.contact, ...contact };
    }

    if (profile) {
      user.profile = { ...user.profile, ...profile };
    }

    if (addresses) {
      user.addresses = addresses;
    }

    user.updatedBy = req.user._id;
    await user.save();

    console.log(`✅ Profile updated for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        profile: user.profile,
        addresses: user.addresses,
      },
    });
  } catch (error) {
    throw error;
  }
});

export {
  registerAdmin,
  loginUser,
  logOut,
  verifyToken,
  refreshToken,
  forgotPassword,
  changePassword,
  updateProfile
};