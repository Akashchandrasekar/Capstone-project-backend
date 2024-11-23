import Vehicle from '../models/Vehicle.js';

// Get all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

// Create a new vehicle
export const createVehicle = async (req, res) => {
  const { make, model, year, pricePerDay, available, image } = req.body;

  try {
    const vehicle = new Vehicle({
      make,
      model,
      year,
      pricePerDay,
      available,
      image,
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
};
