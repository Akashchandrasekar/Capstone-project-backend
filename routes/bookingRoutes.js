import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
} from '../controllers/bookingController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getBookings);
router.get('/:id', protect, getBookingById);
router.delete('/:id', protect, cancelBooking);

export default router;
