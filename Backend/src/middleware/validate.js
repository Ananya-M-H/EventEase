exports.validateEvent = (req, res, next) => {
  const { title, description, date, totalSeats } = req.body;

  if (!title || !description || !date || totalSeats < 0) {
    return res.status(400).json({ message: "Invalid event data" });
  }

  next();
};

