const Event = require("../models/Event");

// 🛠 CREATE EVENT (ADMIN)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, totalSeats } = req.body;

    if (!title || !description || !date || !totalSeats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const status = totalSeats === 0 ? "CLOSED" : "UPCOMING";
    
    const event = await Event.create({
      title,
      description,
      date,
      totalSeats,
      availableSeats: totalSeats,
      status: status,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📄 GET ALL EVENTS (PUBLIC)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "UPCOMING" }).sort({ date: 1 });

    res.status(200).json({
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ UPDATE EVENT (ADMIN)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;

    if (req.body.totalSeats !== undefined) {
      event.totalSeats = req.body.totalSeats;

      if (event.availableSeats > event.totalSeats) {
        event.availableSeats = event.totalSeats;
      }
    }

    // 🔥 Auto-close logic
    if (event.availableSeats === 0) {
      event.status = "CLOSED";
    }

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ❌ DELETE EVENT (ADMIN)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📄 GET SINGLE EVENT (LOGGED-IN USERS)
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

