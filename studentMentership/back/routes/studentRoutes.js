import express from "express";
import { StudentController } from "../controllers/StudentController.js";
// import authenticateJWT from "../middlewares/authMiddleware.js";
const router = express.Router();
// router.use(authenticateJWT);

router.get("/fetch", StudentController.fetchFromNode);

export default router;
