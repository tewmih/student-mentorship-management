import express from "express";
import { MenteeController } from "../controllers/MenteeController.js";
import { SessionController } from "../controllers/SessionController.js";
import { PetitionController } from "../controllers/PetitionController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import router from "./studentRoutes.js";

router.use(authenticateJWT, roleMiddleware("mentee"));
router.get("/mentor", MenteeController.viewAssignedMentor);
router.get("/sessions", SessionController.listMySessions);
router.post("/petition", PetitionController.submitPetition);
router.post("/session/:id/feedback", SessionController.submitFeedback);

export default router;
