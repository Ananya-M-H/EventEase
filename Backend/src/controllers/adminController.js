const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/registrationModel");

// 📊 ADMIN DASHBOARD STATS
exports.getAdminStats = async (req, res) => {
  try {
    // 1️⃣ Total counts
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await Registration.countDocuments();

    // 2️⃣ Registrations per event
    const eventStats = await Event.aggregate([
      {
        $lookup: {
          from: "registrations",
          localField: "_id",
          foreignField: "event",
          as: "registrations"
        }
      },
      {
        $project: {
          title: 1,
          totalSeats: 1,
          availableSeats: 1,
          status: 1,
          registrationsCount: { $size: "$registrations" }
        }
      }
    ]);

    // Build two arrays the frontend expects
    const registrationsPerEvent = eventStats.map((e) => ({
      eventId: e._id,
      title: e.title,
      registrations: e.registrationsCount
    }));

    const remainingSeats = eventStats.map((e) => ({
      _id: e._id,
      title: e.title,
      totalSeats: e.totalSeats,
      availableSeats: e.availableSeats
    }));

    res.status(200).json({
      totalUsers,
      totalEvents,
      totalRegistrations,
      registrationsPerEvent,
      remainingSeats
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
