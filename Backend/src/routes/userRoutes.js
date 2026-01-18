const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { getMyEvents } = require("../controllers/userController");

// Get user profile (autofill)
router.get("/profile", protect, getUserProfile);

// Update profile
router.put("/profile", protect, updateUserProfile);
router.get("/my-events", protect, getMyEvents);


module.exports = router;

