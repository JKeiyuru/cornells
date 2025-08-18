// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/controllers/auth.controller.js
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
  // Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  // Normalize inputs
  name = name ? name.trim() : "";
  email = email ? email.toLowerCase().trim() : "";
  password = password ? password.trim() : "";

  // Enhanced validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required for your exclusive Cornells account");
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

  // Check if user exists (case insensitive)
  const userExists = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });

  if (userExists) {
    res.status(409);
    throw new Error("An account with this email already exists in our exclusive community");
  }

  try {
    // Create user - Let the pre-save middleware handle password hashing
    const user = await User.create({
      name,
      email,
      password, // Don't hash here - the pre-save middleware will handle it
    });

    if (user) {
      generateToken(res, user._id);

      // Trigger welcome email asynchronously
      try {
        await axios.post(
          `${process.env.BG_SERVICE_URL || "http://localhost:6000"}/send-welcome`,
          {
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
          },
          { timeout: 3000 }
        );
        console.log(`✨ Welcome email triggered for ${email} - Welcome to Cornells exclusive community`);
      } catch (error) {
        console.warn("Welcome email service temporarily unavailable:", error.message);
      }

      res.status(201).json({
        success: true,
        message: "Welcome to Cornells - Your exclusive account has been created",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } else {
      res.status(400);
      throw new Error("Unable to create your exclusive account. Please try again.");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error("An account with this email already exists");
    }
    throw error;
  }
});

// LOGIN USER
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
      throw new Error("Invalid credentials - Access to Cornells exclusive collection denied");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid credentials - Access to Cornells exclusive collection denied");
    }

    // Update last login
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
      $inc: { loginCount: 1 },
    });

    generateToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Welcome back to Cornells exclusive collection",
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

// LOGOUT USER
const logOut = asyncHandler(async (req, res) => {
  console.log("🚪 User logging out from Cornells exclusive experience");

  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out from Cornells. Until next time!",
  });
});

// VERIFY TOKEN
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

// REFRESH TOKEN
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
      },
    });
  } else {
    res.status(401);
    throw new Error("Unable to refresh token");
  }
});

// REQUEST PASSWORD RESET
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

export {
  registerUser,
  loginUser,
  logOut,
  verifyToken,
  refreshToken,
  forgotPassword,
};