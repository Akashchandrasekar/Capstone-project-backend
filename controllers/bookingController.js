import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';

// Create a new booking
export const createBooking = async (req, res) => {
  const { vehicleId, startDate, endDate, totalPrice } = req.body;

  try {
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle || !vehicle.available) {
      return res.status(400).json({ message: 'Vehicle not available' });
    }

    const booking = new Booking({
      vehicle: vehicleId,
      user: req.user.id,
      startDate,
      endDate,
      totalPrice,
    });

    await booking.save();
    vehicle.available = false;
    await vehicle.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('vehicle user', '-password');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('vehicle user', '-password');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const vehicle = await Vehicle.findById(booking.vehicle);
    if (vehicle) {
      vehicle.available = true;
      await vehicle.save();
    }

    await booking.remove();
    res.status(200).json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error });
  }
};
