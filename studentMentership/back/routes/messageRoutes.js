// const express = require("express");
// const router = express.Router();
// const MessageController = require("../controllers/MessageController");
// const authenticateJWT = require("../middlewares/authMiddleware");

// router.use(authenticateJWT);

// router.post("/send", MessageController.sendMessage);
// router.get("/", MessageController.getMessages);
// module.exports = router;

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
