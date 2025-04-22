const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  department: { type: String },
  rollNo: { type: String, required: true }, // ✅ Added rollNo field
  projectGuide: { type: String },
  projectName: { type: String },
});

module.exports = mongoose.model("Student", studentSchema);
