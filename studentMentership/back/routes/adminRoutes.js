import express from "express";
import { AdminController } from "../controllers/AdminController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleWare.js";
const router = express.Router();
router.use(authenticateJWT);
router.use(roleMiddleware("admin"));
router.post("/change-role/:id", AdminController.changeRole);

export default router;
