import express from "express";
import {
  register,
  login,
  verify2FA,
  getCurrentUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-2fa", verify2FA);

// Protected routes
router.get("/me", authMiddleware, getCurrentUser);

export default router;
