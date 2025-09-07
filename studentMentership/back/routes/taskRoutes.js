import express from "express";
import {
  createTask,
  getTasks,
  getTasksByMentee,
  updateTask,
  deleteTask,
  updateTaskStatus,
  requestCompletion,
} from "../controllers/taskController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
const router = express.Router();
router.use(authenticateJWT);
router.use(roleMiddleware(["mentor", "mentee"]));
router.get("/myown", getTasksByMentee);
router.put("/update-status/:assignmentId", updateTaskStatus);
router.post("/request-completion/:assignmentId", requestCompletion);
// only for mentor
router.use(roleMiddleware("mentor"));
router.post("/create", createTask);
router.get("/", getTasks);
router.put("/update/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
