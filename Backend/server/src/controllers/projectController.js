const Student = require("../models/studentSchema");

// Select Guide for Students
exports.selectGuide = async (req, res) => {
  if (!req.session.username || req.session.role !== "student") {
    return res.redirect("/login");
  }

  const projectGuides = ["Guide A", "Guide B", "Guide C"];
  res.render("select-guide", { username: req.session.username, projectGuides });
};

// Handle the POST request for selecting the guide
exports.selectGuidePost = async (req, res) => {
  const { projectGuide, projectName } = req.body;

  try {
    await Student.updateOne(
      { username: req.session.username },
      { projectGuide, projectName } // Save both guide and project name
    );
    req.session.projectGuide = projectGuide; // Optionally store this in session

    res.redirect("/home-student");
  } catch (error) {
    res.status(500).send("Error selecting project guide: " + error.message);
  }
};

// Home for Student
exports.homeStudent = async (req, res) => {
  if (!req.session.username || req.session.role !== "student") {
    return res.redirect("/login");
  }

  try {
    const user = await Student.findOne({ username: req.session.username });
    res.render("home-student", {
      username: req.session.username,
      department: user.department, // Display department
      projectGuide: user.projectGuide || "Not selected",
      projectName: user.projectName || "Not provided", // Display project name
    });
  } catch (error) {
    res.status(500).send("Error fetching student data: " + error.message);
  }
};

// Home for Teacher (Display All Students and their Guides)
exports.homeTeacher = async (req, res) => {
  if (!req.session.username || req.session.role !== "teacher") {
    return res.redirect("/login");
  }

  try {
    const students = await Student.find(); // Fetch all students with their guides and project names
    res.render("home-teacher", {
      username: req.session.username, // Teacher's username
      students: students, // List of students with project guide and project name
    });
  } catch (error) {
    res.status(500).send("Error fetching students: " + error.message);
  }
};
