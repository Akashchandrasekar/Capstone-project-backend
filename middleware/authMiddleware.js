import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Authentication Middleware
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and has a valid token format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token Missing or Invalid" });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and attach to the request object (exclude sensitive fields like password)
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Attach user details (including role) to the request object for further processing
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    // Specific JWT error handling
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // General error handling
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin Middleware
export const adminMiddleware = (req, res, next) => {
  try {
    // Ensure the user object is attached by `authMiddleware`
    if (!req.user) {
      return res.status(401).json({ message: "User Not Authenticated" });
    }

    // Check if the user has the admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins Only" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
