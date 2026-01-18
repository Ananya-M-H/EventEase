const express = require("express");
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser
} = require("../controllers/authController");

// 🔹 REGISTER (Signup)
router.post("/signup", registerUser);

// 🔹 LOGIN
router.post("/login", loginUser);

module.exports = router;
