const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentSchema");
const Teacher = require("../models/teacherSchema");
require("dotenv").config();

// Signup function
exports.signup = async (req, res) => {
  const { username, password, role, projectName, rollNo } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Username, password, and role are required",
    });
  }

  if (role === "Student" && !projectName) {
    return res.status(400).json({
      success: false,
      message: "Project name is required for students",
    });
  }

  try {
    const existingUser = await Promise.any([
      Student.findOne({ username }),
      Teacher.findOne({ username }),
    ]).catch(() => null);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "Student") {
      const newStudent = new Student({
        username,
        password: hashedPassword,
        role,
        rollNo,
        projectName,
      });
      await newStudent.save();
      return res.status(201).json({
        success: true,
        message: "Student registration successful",
        user: {
          username: newStudent.username,
          role: newStudent.role,
          projectName: newStudent.projectName,
        },
      });
    } else if (role === "Teacher") {
      const newTeacher = new Teacher({
        username,
        password: hashedPassword,
        role,
      });
      await newTeacher.save();
      return res.status(201).json({
        success: true,
        message: "Teacher registration successful",
        user: {
          username: newTeacher.username,
          role: newTeacher.role,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during signup",
      error: error.message,
    });
  }
};

// Login function
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    // Try to find user in both collections
    let user = await Student.findOne({ username });
    if (!user) {
      user = await Teacher.findOne({ username });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create token
    const tokenPayload = {
      userId: user._id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Set cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    const userData = user.toObject();
    delete userData.password;

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        user: {
          username: user.username,
          role: user.role,
          projectName: user.projectName || null, // Only students will have it
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login",
      error: error.message,
    });
  }
};

// Logout function
exports.logout = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.clearCookie("token", cookieOptions).status(200).json({
    success: true,
    message: "Logout successful",
  });
};
