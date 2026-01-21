const Event = require("../models/Event");
const Registration = require("../models/registrationModel");

//  REGISTER FOR EVENT (USER)
// exports.registerForEvent = async (req, res) => {
//   try {
//     const eventId = req.params.id;
//     const userId = req.user._id;

//     const event = await Event.findById(eventId);

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     // Check if event is closed or no seats available
//     if (event.status === "CLOSED" || event.availableSeats <= 0) {
//       return res.status(400).json({ message: "Event is fully booked or closed" });
//     }

//     //  Duplicate registration check
//     const alreadyRegistered = await Registration.findOne({
//       user: userId,
//       event: eventId
//     });

//     if (alreadyRegistered) {
//       return res.status(400).json({ message: "You are already registered for this event" });
//     }

//     //  Create registration
//     await Registration.create({
//       user: userId,
//       event: eventId
//     });

//     //  Reduce seat count after successful registration
//     event.availableSeats -= 1;

//     // Auto-close if seats exhausted
//     if (event.availableSeats === 0) {
//       event.status = "CLOSED";
//     }

//     await event.save();

//     res.status(201).json({
//       message: "Registration successful",
//       remainingSeats: event.availableSeats
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    // Check if already registered first
    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (alreadyRegistered) {
      return res.status(400).json({ 
        message: "You are already registered for this event" 
      });
    }

    // Atomically decrement available seats
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { 
        $inc: { availableSeats: -1 },
      },
      { new: true }
    );

    // Check if decrement succeeded and seats not negative
    if (!updatedEvent || updatedEvent.availableSeats < 0) {
      // Undo if failed
      if (updatedEvent) {
        await Event.findByIdAndUpdate(eventId, { 
          $inc: { availableSeats: 1 } 
        });
      }
      return res.status(400).json({ 
        message: "Event is fully booked" 
      });
    }

    // Now safe to create registration
    await Registration.create({
      user: userId,
      event: eventId
    });

    // Auto-close if needed
    if (updatedEvent.availableSeats === 0) {
      await Event.findByIdAndUpdate(
        eventId, 
        { status: "CLOSED" }
      );
    }

    res.status(201).json({
      message: "Registration successful",
      remainingSeats: updatedEvent.availableSeats
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET EVENT REGISTRATIONS (ADMIN)
exports.getEventRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      event: req.params.id
    })
      .populate("user", "name email year")
      .populate("event", "title");

    res.status(200).json({
      count: registrations.length,
      registrations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
