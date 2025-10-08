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

// REGISTER USER (CLIENT)
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password, contact, profile, addresses } = req.body;

  // Normalize inputs
  name = name ? name.trim() : "";
  email = email ? email.toLowerCase().trim() : "";
  password = password ? password.trim() : "";

  // Enhanced validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required for your Rekker account");
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
    throw new Error("An account with this email already exists");
  }

  try {
    // Create user with enhanced data
    const userData = {
      name,
      email,
      password,
      role: 'user' // Default role for client registration
    };

    // Add optional fields if provided
    if (contact) userData.contact = contact;
    if (profile) userData.profile = profile;
    if (addresses && addresses.length > 0) userData.addresses = addresses;

    const user = await User.create(userData);

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
        console.log(`✨ Welcome email triggered for ${email} - Welcome to Rekker`);
      } catch (error) {
        console.warn("Welcome email service temporarily unavailable:", error.message);
      }

      res.status(201).json({
        success: true,
        message: "Welcome to Rekker - Your account has been created successfully",
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
      throw new Error("Unable to create your account. Please try again.");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error("An account with this email already exists");
    }
    throw error;
  }
});

// REGISTER ADMIN
const registerAdmin = asyncHandler(async (req, res) => {
  let { name, email, password, adminCode } = req.body;

  // Normalize inputs
  name = name ? name.trim() : "";
  email = email ? email.toLowerCase().trim() : "";
  password = password ? password.trim() : "";
  adminCode = adminCode ? adminCode.trim() : "";

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

  // Verify adminCode — replace 'YOUR_ADMIN_CODE' with the actual code or config variable
  if (adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
    res.status(403);
    throw new Error("Invalid admin registration code");
  }

  // Check if user exists
  const userExists = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });

  if (userExists) {
    res.status(409);
    throw new Error("An account with this email already exists");
  }

  try {
    const adminData = {
      name,
      email,
      password,
      role: 'admin',
    };

    const admin = await User.create(adminData);

    if (admin) {
      generateToken(res, admin._id);

      res.status(201).json({
        success: true,
        message: "Admin account created successfully",
        user: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          createdAt: admin.createdAt,
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

// (Assuming loginUser, logOut, verifyToken, refreshToken, forgotPassword are imported or implemented above)

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
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Current password is incorrect");
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      res.status(400);
      throw new Error("New password must be different from current password");
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    throw error;
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, contact, profile, addresses } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

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
  registerUser,
  registerAdmin,
  // If you have implementations for the following, import or define them, otherwise remove from export
  loginUser,
  logOut,
  verifyToken,
  refreshToken,
  forgotPassword,
  changePassword,
  updateProfile,
};
