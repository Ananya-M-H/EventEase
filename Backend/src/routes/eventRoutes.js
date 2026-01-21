const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { protect, admin } = require("../middleware/authMiddleware");
const { validateEvent } = require("../middleware/validate");

//  Public
router.get("/", protect, getEvents);
router.get("/:id", protect, getEventById);

//  Admin only
router.post("/", protect, admin, createEvent);
router.put("/:id", protect, admin, updateEvent);
router.delete("/:id", protect, admin, deleteEvent);

module.exports = router;
