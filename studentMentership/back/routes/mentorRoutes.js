import express from "express";
import { MentorController } from "../controllers/MentorController.js";
import { SessionController } from "../controllers/SessionController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleWare.js";
const router = express.Router();
router.use(authenticateJWT, roleMiddleware("mentor"));

router.post("/application", MentorController.submitApplication);
router.get("/mentees", MentorController.listMentees);
router.post("/session/create", SessionController.createSession);
router.get("/session", SessionController.listSessionsForMentor);
router.get("/session/my", SessionController.listSessionsForMentor);

export default router;
