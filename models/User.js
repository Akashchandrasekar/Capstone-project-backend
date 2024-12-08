import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // Added custom error message
    unique: true,
    trim: true, // Removes extra spaces
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Added custom error message
    unique: true,
    trim: true, // Removes extra spaces
    lowercase: true, // Ensures email is stored in lowercase
    match: [/.+\@.+\..+/, "Invalid email format"], // Regex for email validation
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"], // Enforce minimum password length
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"], // Restricts values to "admin" or "user"
    default: "user",
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

const User = mongoose.model("User", userSchema);
export default User;
