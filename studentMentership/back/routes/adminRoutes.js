import express from "express";
import { AdminController } from "../controllers/AdminController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
const router = express.Router();
router.use(authenticateJWT);
router.get(
  "/mentors",
  roleMiddleware(["admin", "student_union"]),
  AdminController.listMentors
);
router.use(roleMiddleware("admin"));
router.get("/users", AdminController.listUsers);
router.post("/assign-union/:id", AdminController.assignUnion);

export default router;
