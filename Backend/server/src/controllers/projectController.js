const Student = require("../models/studentSchema");

exports.selectGuide = async (req, res) => {
  if (!req.session.username || req.session.role !== "student") {
    return res.redirect("/login");
  }

  const projectGuides = ["Guide A", "Guide B", "Guide C"];
  res.render("select-guide", { username: req.session.username, projectGuides });
};

exports.selectGuidePost = async (req, res) => {
  const { projectGuide, projectName } = req.body;

  try {
    await Student.updateOne(
      { username: req.session.username },
      { projectGuide, projectName }
    );
    req.session.projectGuide = projectGuide;
    res.redirect("/home-student");
  } catch (error) {
    res.status(500).send("Error selecting project guide: " + error.message);
  }
};

exports.homeStudent = async (req, res) => {
  if (!req.session.username || req.session.role !== "student") {
    return res.redirect("/login");
  }

  try {
    const user = await Student.findOne({ username: req.session.username });
    res.render("home-student", {
      username: req.session.username,
      department: user.department,
      projectGuide: user.projectGuide || "Not selected",
      projectName: user.projectName || "Not provided",
    });
  } catch (error) {
    res.status(500).send("Error fetching student data: " + error.message);
  }
};

exports.homeTeacher = async (req, res) => {
  if (!req.session.username || req.session.role !== "teacher") {
    return res.redirect("/login");
  }

  try {
    const students = await Student.find();
    res.render("home-teacher", {
      username: req.session.username,
      students,
    });
  } catch (error) {
    res.status(500).send("Error fetching students: " + error.message);
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, "-password");
    res.json({ success: true, students });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch students" });
  }
};
