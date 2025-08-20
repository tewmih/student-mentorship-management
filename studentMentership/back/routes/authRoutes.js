import express from "express";
const router = express.Router();
import { AuthController } from "../controllers/AuthController.js";
// Public login route
router.post("/login", AuthController.login);

export default router;
