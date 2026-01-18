const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Registration = require("../models/registrationModel");
/**
 * @desc    Get logged-in user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update logged-in user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Allow only name & year update
    if (req.body.name) user.name = req.body.name;
    if (req.body.year) user.year = req.body.year;

    // ❌ Email update restricted
    if (req.body.email) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }

    // ⭐ Optional password update
    if (req.body.password) {
      if (!req.body.confirmPassword) {
        return res
          .status(400)
          .json({ message: "Confirm password is required" });
      }

      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        year: updatedUser.year,
        role: updatedUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 GET LOGGED-IN USER'S REGISTERED EVENTS
exports.getMyEvents = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id
    }).populate("event");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};