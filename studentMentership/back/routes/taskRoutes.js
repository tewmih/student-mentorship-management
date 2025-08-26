import express from "express";
import {
  createTask,
  getTasks,
  getTasksByMentee,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Mentor assigns a task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Get tasks for a specific mentee
router.get("/mentee/:menteeId", getTasksByMentee);

// Update a task (status, dueDate, description)
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
