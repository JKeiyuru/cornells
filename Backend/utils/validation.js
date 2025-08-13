// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/utils/validation.js
import validator from "validator";
import mongoose from "mongoose";

// Email validation with luxury domain preferences
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: "Email is required" };
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (!validator.isEmail(trimmedEmail)) {
    return { isValid: false, message: "Please provide a valid email address for your Cornells account" };
  }

  if (trimmedEmail.length > 254) {
    return { isValid: false, message: "Email address is too long" };
  }

  // Check for disposable email domains (luxury brands should avoid these)
  const disposableDomains = [
    '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 
    'mailinator.com', 'throwaway.email', 'temp-mail.org'
  ];
  
  const domain = trimmedEmail.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return { 
      isValid: false, 
      message: "Please use a permanent email address for your exclusive Cornells experience" 
    };
  }

  return { isValid: true, email: trimmedEmail };
};

// Enhanced password validation for luxury security standards
const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: "Password is required" };
  }

  const minLength = 8;
  const maxLength = 128;

  if (password.length < minLength) {
    return { 
      isValid: false, 
      message: `Password must be at least ${minLength} characters long` 
    };
  }

  if (password.length > maxLength) {
    return { 
      isValid: false, 
      message: `Password must not exceed ${maxLength} characters` 
    };
  }

  // Check for required character types
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const missingRequirements = [];
  if (!hasLowercase) missingRequirements.push("lowercase letter");
  if (!hasUppercase) missingRequirements.push("uppercase letter");
  if (!hasNumbers) missingRequirements.push("number");
  if (!hasSpecialChar) missingRequirements.push("special character");

  if (missingRequirements.length > 0) {
    return {
      isValid: false,
      message: `Password must contain at least one: ${missingRequirements.join(', ')}`
    };
  }

  // Check against common passwords
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123', 
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ];

  if (commonPasswords.includes(password.toLowerCase())) {
    return {
      isValid: false,
      message: "Please choose a more secure password for your exclusive account"
    };
  }

  // Check for sequential or repeated characters
  if (/(.)\1{2,}/.test(password)) {
    return {
      isValid: false,
      message: "Password should not contain repeated characters"
    };
  }

  return { isValid: true };
};

// Name validation for luxury personalization
const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, message: "Name is required for your Cornells profile" };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return { 
      isValid: false, 
      message: "Name must be at least 2 characters long" 
    };
  }

  if (trimmedName.length > 50) {
    return { 
      isValid: false, 
      message: "Name must not exceed 50 characters" 
    };
  }

  // Allow letters, spaces, hyphens, and apostrophes (for international names)
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      message: "Name can only contain letters, spaces, hyphens, and apostrophes"
    };
  }

  return { isValid: true, name: trimmedName };
};

// Phone number validation
const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: true }; // Phone is optional
  }

  if (typeof phone !== 'string') {
    return { isValid: false, message: "Phone number must be a string" };
  }

  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');

  if (!validator.isMobilePhone(cleanPhone, 'any', { strictMode: false })) {
    return {
      isValid: false,
      message: "Please provide a valid phone number"
    };
  }

  return { isValid: true, phone: cleanPhone };
};

// MongoDB ObjectId validation
const validateObjectId = (id) => {
  if (!id) {
    return { isValid: false, message: "ID is required" };
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { isValid: false, message: "Invalid ID format" };
  }

  return { isValid: true };
};

// Product validation
const validateProductData = (productData) => {
  const errors = [];
  const { title, description, price, categories, inStock } = productData;

  // Title validation
  if (!title || typeof title !== 'string' || title.trim().length < 2) {
    errors.push("Product title must be at least 2 characters long");
  } else if (title.length > 100) {
    errors.push("Product title must not exceed 100 characters");
  }

  // Description validation
  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push("Product description must be at least 10 characters long");
  } else if (description.length > 2000) {
    errors.push("Product description must not exceed 2000 characters");
  }

  // Price validation
  if (!price || typeof price !== 'number' || price <= 0) {
    errors.push("Product price must be a positive number");
  } else if (price > 999999.99) {
    errors.push("Product price is too high");
  }

  // Categories validation
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    errors.push("Product must belong to at least one category");
  } else if (categories.length > 5) {
    errors.push("Product can belong to maximum 5 categories");
  }

  // Stock validation
  if (inStock !== undefined && (typeof inStock !== 'number' || inStock < 0)) {
    errors.push("Stock quantity must be a non-negative number");
  }

  return { isValid: errors.length === 0, errors };
};

// Address validation
const validateAddress = (address) => {
  if (!address || typeof address !== 'object') {
    return { isValid: false, message: "Address is required" };
  }

  const errors = [];
  const { street, city, state, country, postalCode } = address;

  if (!street || typeof street !== 'string' || street.trim().length < 5) {
    errors.push("Street address must be at least 5 characters long");
  }

  if (!city || typeof city !== 'string' || city.trim().length < 2) {
    errors.push("City is required and must be at least 2 characters long");
  }

  if (!country || typeof country !== 'string' || country.trim().length < 2) {
    errors.push("Country is required");
  }

  if (postalCode && !validator.isPostalCode(postalCode, 'any')) {
    errors.push("Please provide a valid postal code");
  }

  return { isValid: errors.length === 0, errors };
};

// Credit card validation (basic - use payment processor for actual validation)
const validateCreditCard = (cardData) => {
  if (!cardData || typeof cardData !== 'object') {
    return { isValid: false, message: "Card data is required" };
  }

  const errors = [];
  const { cardNumber, expiryMonth, expiryYear, cvv, cardholderName } = cardData;

  if (!cardNumber || !validator.isCreditCard(cardNumber.replace(/\s/g, ''))) {
    errors.push("Please provide a valid card number");
  }

  if (!expiryMonth || !validator.isInt(expiryMonth.toString(), { min: 1, max: 12 })) {
    errors.push("Please provide a valid expiry month (1-12)");
  }

  const currentYear = new Date().getFullYear();
  if (!expiryYear || !validator.isInt(expiryYear.toString(), { min: currentYear, max: currentYear + 20 })) {
    errors.push("Please provide a valid expiry year");
  }

  if (!cvv || !validator.isInt(cvv.toString(), { min: 100, max: 9999 })) {
    errors.push("Please provide a valid CVV");
  }

  if (!cardholderName || typeof cardholderName !== 'string' || cardholderName.trim().length < 2) {
    errors.push("Cardholder name is required");
  }

  return { isValid: errors.length === 0, errors };
};

// URL validation
const validateUrl = (url) => {
  if (!url) {
    return { isValid: true }; // URL is optional
  }

  if (typeof url !== 'string') {
    return { isValid: false, message: "URL must be a string" };
  }

  if (!validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
    return { isValid: false, message: "Please provide a valid URL" };
  }

  return { isValid: true };
};

// Date validation
const validateDate = (date, fieldName = 'Date') => {
  if (!date) {
    return { isValid: false, message: `${fieldName} is required` };
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return { isValid: false, message: `Please provide a valid ${fieldName.toLowerCase()}` };
  }

  return { isValid: true, date: parsedDate };
};

// Sanitize HTML content
const sanitizeHtml = (html) => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Basic HTML sanitization (use a proper library like DOMPurify in production)
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .trim();
};

// File validation
const validateFile = (file, options = {}) => {
  if (!file) {
    return { isValid: false, message: "File is required" };
  }

  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxFiles = 1
  } = options;

  const errors = [];

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size must not exceed ${Math.round(maxSize / 1024 / 1024)}MB`);
  }

  // Check file type
  if (!allowedTypes.includes(file.mimetype)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  return { isValid: errors.length === 0, errors };
};

// Batch validation function
const validateBatch = (data, validationRules) => {
  const results = {};
  let hasErrors = false;

  for (const [field, value] of Object.entries(data)) {
    if (validationRules[field]) {
      const result = validationRules[field](value);
      results[field] = result;
      if (!result.isValid) {
        hasErrors = true;
      }
    }
  }

  return { isValid: !hasErrors, results };
};

export {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateObjectId,
  validateProductData,
  validateAddress,
  validateCreditCard,
  validateUrl,
  validateDate,
  validateFile,
  sanitizeHtml,
  validateBatch
};