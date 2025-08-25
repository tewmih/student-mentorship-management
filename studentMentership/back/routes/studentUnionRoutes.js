import express from "express";
import { StudentUnionController } from "../controllers/StudentUnionController.js";
import { PetitionController } from "../controllers/PetitionController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
const router = express.Router();
router.use(authenticateJWT, roleMiddleware(["student_union", "admin"]));
router.get("/mentor-applications", StudentUnionController.listApplications);
router.get("/accepted-mentors", StudentUnionController.listAcceptedMentors);
router.post(
  "/mentor-applications/:id/approve",
  StudentUnionController.approveApplication
);
router.post(
  "/mentor-applications/:id/reject",
  StudentUnionController.rejectApplication
);
router.post("/assign-mentor", StudentUnionController.assignMentor);
router.get("/petitions", PetitionController.listPetitions);
router.post("/petitions/:id/resolve", PetitionController.resolvePetition);
router.get("/users", StudentUnionController.listUsers);

export default router;
