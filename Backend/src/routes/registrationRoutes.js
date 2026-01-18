const express = require("express");
const router = express.Router();

const {
  registerForEvent,
  getEventRegistrations
} = require("../controllers/registrationController");

const { protect, admin } = require("../middleware/authMiddleware");

// USER registers
router.post("/:id/register", protect, registerForEvent);

// ADMIN views registrations
router.get("/:id/registrations", protect, admin, getEventRegistrations);

module.exports = router;
