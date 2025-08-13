// /home/jkeiyuru/Development/cornells/FullStackBeautyStore/Backend/utils/generateToken.js
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Generate JWT access token
const generateToken = (res, userId, rememberMe = false) => {
  try {
    // Different expiration times based on "Remember Me" option
    const expiresIn = rememberMe ? "30d" : "7d";
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

    // Create token payload
    const payload = {
      userId,
      type: 'access',
      iat: Math.floor(Date.now() / 1000),
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SEC, {
      expiresIn,
      issuer: 'cornells-beauty',
      audience: 'cornells-users',
    });

    // Set secure cookie options
    const cookieOptions = {
      httpOnly: true, // Prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // CSRF protection
      maxAge,
      path: '/', // Available on all paths
    };

    // Set the cookie
    res.cookie('jwt', token, cookieOptions);

    return token;
  } catch (error) {
    console.error('Token generation failed:', error.message);
    throw new Error('Failed to generate authentication token');
  }
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  try {
    const payload = {
      userId,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
    };

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SEC, {
      expiresIn: "90d",
      issuer: 'cornells-beauty',
      audience: 'cornells-users',
    });
  } catch (error) {
    console.error('Refresh token generation failed:', error.message);
    throw new Error('Failed to generate refresh token');
  }
};

// Generate email verification token
const generateEmailVerificationToken = (email, userId) => {
  try {
    const payload = {
      email,
      userId,
      type: 'email_verification',
      iat: Math.floor(Date.now() / 1000),
    };

    return jwt.sign(payload, process.env.JWT_EMAIL_SECRET || process.env.JWT_SEC, {
      expiresIn: "24h",
      issuer: 'cornells-beauty',
      audience: 'cornells-verification',
    });
  } catch (error) {
    console.error('Email verification token generation failed:', error.message);
    throw new Error('Failed to generate email verification token');
  }
};

// Generate password reset token
const generatePasswordResetToken = (email, userId) => {
  try {
    // Create a more secure reset token using crypto
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash the token before storing (you should store this hash in DB)
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Also create a JWT for additional verification
    const jwtPayload = {
      email,
      userId,
      tokenHash: hashedToken,
      type: 'password_reset',
      iat: Math.floor(Date.now() / 1000),
    };

    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_RESET_SECRET || process.env.JWT_SEC, {
      expiresIn: "1h",
      issuer: 'cornells-beauty',
      audience: 'cornells-reset',
    });

    return {
      resetToken, // Send this in email
      hashedToken, // Store this in database
      jwtToken, // Use for additional verification
    };
  } catch (error) {
    console.error('Password reset token generation failed:', error.message);
    throw new Error('Failed to generate password reset token');
  }
};

// Generate API key for external integrations
const generateApiKey = (prefix = 'ck') => {
  try {
    const timestamp = Date.now().toString(36);
    const randomBytes = crypto.randomBytes(16).toString('hex');
    return `${prefix}_${timestamp}_${randomBytes}`;
  } catch (error) {
    console.error('API key generation failed:', error.message);
    throw new Error('Failed to generate API key');
  }
};

// Verify JWT token
const verifyToken = (token, secret = process.env.JWT_SEC) => {
  try {
    return jwt.verify(token, secret, {
      issuer: 'cornells-beauty',
      audience: ['cornells-users', 'cornells-verification', 'cornells-reset'],
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else if (error.name === 'NotBeforeError') {
      throw new Error('Token not active yet');
    }
    throw new Error('Token verification failed');
  }
};

// Decode JWT token without verification (for debugging)
const decodeToken = (token) => {
  try {
    return jwt.decode(token, { complete: true });
  } catch (error) {
    console.error('Token decode failed:', error.message);
    return null;
  }
};

// Clear authentication cookies
const clearAuthCookies = (res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    expires: new Date(0),
    path: '/',
  };

  res.cookie('jwt', '', cookieOptions);
  res.cookie('refreshToken', '', cookieOptions);
};

// Generate session token for additional security
const generateSessionToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Create secure token pair (access + refresh)
const generateTokenPair = (res, userId, rememberMe = false) => {
  try {
    const accessToken = generateToken(res, userId, rememberMe);
    const refreshToken = generateRefreshToken(userId);
    
    // Set refresh token in a separate cookie
    const refreshCookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
      path: '/api/v1/auth/refresh',
    };

    res.cookie('refreshToken', refreshToken, refreshCookieOptions);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Token pair generation failed:', error.message);
    throw new Error('Failed to generate authentication tokens');
  }
};

// Validate token expiration
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return true;
    
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    return true;
  }
};

// Get token expiration time
const getTokenExpirationTime = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) return null;
    
    return new Date(decoded.exp * 1000);
  } catch (error) {
    return null;
  }
};

// Generate secure random string
const generateSecureRandomString = (length = 32) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

// Create CSRF token
const generateCSRFToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export default generateToken;

export {
  generateToken,
  generateRefreshToken,
  generateEmailVerificationToken,
  generatePasswordResetToken,
  generateApiKey,
  generateTokenPair,
  verifyToken,
  decodeToken,
  clearAuthCookies,
  generateSessionToken,
  isTokenExpired,
  getTokenExpirationTime,
  generateSecureRandomString,
  generateCSRFToken
};