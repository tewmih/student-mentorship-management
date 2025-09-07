import {
  findMenteesForMentor,
  getAllMessages,
} from "../controllers/MessageController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(authenticateJWT);
router.get("/mentees", findMenteesForMentor);
router.get("/messages", getAllMessages);

export default router;
