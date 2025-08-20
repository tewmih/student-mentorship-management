import express from "express";
import { MentorController } from "../controllers/MentorController.js";
import { SessionController } from "../controllers/SessionController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
const router = express.Router();
router.use(authenticateJWT, roleMiddleware("mentor"));
router.post("/application", MentorController.submitApplication);
router.get("/mentees", MentorController.listMentees);
router.post("/sessions", SessionController.createSession);
router.get("/sessions", SessionController.listSessions);
router.post("/session/:id/resources", SessionController.uploadResource);

export default router;
