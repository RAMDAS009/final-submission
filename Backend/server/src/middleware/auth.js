const jwt = require("jsonwebtoken"); 
require("dotenv").config();

// Auth middleware
exports.auth = async (req, res, next) => {
  try {
    // Extract token from Authorization header, cookies, or body
    const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

    // If token is missing 
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token 
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      // Verification issues
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// isStudent middleware
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(400).json({
        success: false,
        message: "This is a protected route for Students",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, try again",
    });
  }
};

// isInstructor middleware
exports.isTeacher = async (req, res, next) => {
  try {
    if (req.user.role !== "Teacher") {
      return res.status(400).json({
        success: false,
        message: "This is a protected route for teachers",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, try again",
    });
  }
};