// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const rsvpRoutes = require("./routes/rsvp.routes");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const { startQueue } = require("../jobs/email.queue");
// const rateLimit = require("express-rate-limit");
// const xss = require("xss-clean");
// const hpp = require("hpp");
// const connectDB = require("./config/database");
// const errorHandler = require("./middleware/error.middleware");

// // Route files
// const authRoutes = require("./routes/auth.routes");
// const eventRoutes = require("./routes/event.routes");
// const emailRoutes = require("./routes/email.routes");

// // Connect to database
// connectDB();

// const app = express();

// // Body parser
// app.use(express.json());

// // Security Middlewares
// app.use(helmet());
// app.use(cors());
// app.use(xss());
// app.use(hpp());
// startQueue();
// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 100,
// });
// app.use(limiter);

// // Dev logging
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // Mount routes
// app.use("/api/auth", authRoutes);
// app.use("/api/email", emailRoutes);
// app.use("/", eventRoutes); // Includes /w/:slug public routes and /api/events
// app.use("/", rsvpRoutes);
// // Error handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");

const connectDB = require("./config/database");
const errorHandler = require("./middleware/error.middleware");

// 🚨 Routes
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const emailRoutes = require("./routes/email.routes");
const rsvpRoutes = require("./routes/rsvp.routes");
const registryRoutes = require("./routes/registry.routes"); // ✅ ADDED
const guestRoutes = require("./routes/guest.routes");

const guestMediaRoutes = require("./routes/guestMedia.routes");
const qrRoutes = require("./routes/qr.routes");
const checkinRoutes = require("./routes/checkin.routes");
// OPTIONAL: queue (only if file exists)
const { startQueue } = require("./jobs/email.queue");

// Connect DB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(hpp());

// Start background jobs (optional safety check)
if (startQueue) startQueue();

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * =========================
 * ROUTES MOUNTING (CLEAN)
 * =========================
 */

// Auth
app.use("/api/auth", authRoutes);

// Email
app.use("/api/email", emailRoutes);

// Events (admin + public slug inside)
app.use("/api/events", eventRoutes);

// RSVP (public + admin logic)
app.use("/", rsvpRoutes);

// Registry (⭐ FIXED - THIS WAS MISSING)
app.use("/api/registry", registryRoutes);

app.use("/api/guests", guestRoutes);
app.use("/", guestMediaRoutes);
app.use("/api/qr", qrRoutes);

app.use("/api/checkin", checkinRoutes);
/**
 * =========================
 * ERROR HANDLER
 * =========================
 */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

/**
 * Handle crashes
 */
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
