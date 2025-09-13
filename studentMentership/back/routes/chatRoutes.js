import {
  findMenteesForMentor,
  getAllMessages,
  getInbox,
  getConversation,
  markMessagesRead,
} from "../controllers/MessageController.js";
import authenticateJWT from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(authenticateJWT);
router.get("/mentees", findMenteesForMentor);
router.get("/messages", getAllMessages);
router.get("/inbox", getInbox);
router.get("/conversation/:userId", getConversation);
router.put("/:userId/read", markMessagesRead);

export default router;
