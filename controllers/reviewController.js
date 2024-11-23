import Review from '../models/Review.js';
import Vehicle from '../models/Vehicle.js';

// Create a review
export const createReview = async (req, res) => {
  const { vehicleId, rating, comment } = req.body;

  try {
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const review = new Review({
      user: req.user.id,
      vehicle: vehicleId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};

// Get reviews for a vehicle
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ vehicle: req.params.vehicleId }).populate('user', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};
