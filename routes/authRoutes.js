import express from "express";
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword 
} from "../controllers/authController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js"; // Import necessary middleware

const router = express.Router();

// Public Routes
router.post("/register", registerUser); // User registration
router.post("/login", loginUser); // User login
router.post("/forgot-password", forgotPassword); // Forgot password
router.post("/reset-password/:id/:token", resetPassword); // Reset password

// Protected Routes
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ 
    message: "Welcome to your profile", 
    user: req.user 
  });
});

// Admin-Only Routes
router.post("/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome Admin" });
});

export default router;
