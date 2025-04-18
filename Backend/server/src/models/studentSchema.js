const mongoose = require("mongoose");

// Student Schema and Model (updated with department and projectName fields)
const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  // department: { type: String, required: true },
  projectGuide: { type: String },
  projectName: { type: String }, // New field to store project name
});
module.exports = mongoose.model("Student", studentSchema);
