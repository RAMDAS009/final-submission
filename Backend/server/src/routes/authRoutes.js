const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route for signup
router.post("/signup", authController.signup);

// Route for login
router.post("/login", authController.login);

// Route for logout
router.post("/logout", authController.logout);

module.exports = router;
 