import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getAllUsers,
} from "../controllers/authController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser); // User registration
router.post("/login", loginUser); // User login
router.post("/forgot-password", forgotPassword); // Forgot password
router.post("/reset-password/:token", resetPassword); // Reset password

// Protected Routes
router.post("/logout", authMiddleware, logoutUser); // Logout a user
router.get("/users", authMiddleware, adminMiddleware, getAllUsers); // Get all users (admin-only)
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Profile Access Granted", user: req.user });
});

export default router;
