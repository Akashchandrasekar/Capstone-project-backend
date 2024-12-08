import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // Ensure correct path and naming consistency

const router = express.Router();

// Routes
// Create a new booking
router.post("/", authMiddleware, createBooking);

// Get all bookings for the authenticated user
router.get("/", authMiddleware, getBookings);

// Get details of a specific booking by ID
router.get("/:id", authMiddleware, getBookingById);

// Cancel a booking by ID
router.delete("/:id", authMiddleware, cancelBooking);

export default router;
