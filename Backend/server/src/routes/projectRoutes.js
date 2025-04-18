const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// Route for selecting the guide (GET)
router.get("/select-guide", projectController.selectGuide);

// Route for submitting selected guide (POST)
router.post("/select-guide", projectController.selectGuidePost);

// Route for home page for student
router.get("/home-student", projectController.homeStudent);

// Route for home page for teacher (view students and guides)
router.get("/home-teacher", projectController.homeTeacher);

module.exports = router;
