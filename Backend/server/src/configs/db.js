const mongoose = require('mongoose');
require("dotenv").config();

// MongoDB Connection
exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};
