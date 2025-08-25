import express from "express";
import {
  takeAttendance,
  getAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/take", takeAttendance); // Save/update attendance
router.get("/:session_id", getAttendance); // Get attendance for a session

export default router;
