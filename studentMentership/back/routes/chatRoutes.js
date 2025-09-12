import {
  findMenteesForMentor,
  getAllMessages,
  getInbox,
} from "../controllers/MessageController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(authenticateJWT);
router.get("/mentees", findMenteesForMentor);
router.get("/messages", getAllMessages);
router.get("/inbox", getInbox);

export default router;
