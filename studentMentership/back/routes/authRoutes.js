import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/AuthController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";

// Public login route
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password/:token", AuthController.resetPassword);
router.post("/change-password", authenticateJWT, AuthController.changePassword);

export default router;
