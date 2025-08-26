import express from "express";
import {
  createTask,
  getTasks,
  getTasksByMentee,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();
// Mentor assigns a task
router.use(authenticateJWT);
router.use(roleMiddleware(["mentor", "mentee"]));
router.get("/", getTasks);
router.get("/mentee/:menteeId", getTasksByMentee);
router.use(roleMiddleware("mentor"));
router.post("/", createTask);
// Update a task (status, dueDate, description)
router.put("/:id", updateTask);
// Delete a task
router.delete("/:id", deleteTask);
export default router;
