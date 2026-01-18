const asyncHandler = require("../utils/asyncHandler");

exports.getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ status: "UPCOMING" });
  res.json(events);
});
