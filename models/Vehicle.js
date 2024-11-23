import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    available: { type: Boolean, default: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Vehicle', vehicleSchema);
