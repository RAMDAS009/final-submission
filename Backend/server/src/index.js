const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = 3000;
const cookieParser = require("cookie-parser");
const db = require("./configs/db");
// Routes
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");

// Environment Variables
dotenv.config();
db.connect();
// Middleware Configuration
app.use(cookieParser());
// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Setup
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
