const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/events", registrationRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", adminRoutes);

module.exports = app;

const { errorHandler } = require("./middleware/errorMiddleware");

app.use(errorHandler);