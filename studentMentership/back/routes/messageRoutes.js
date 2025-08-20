const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.use(authenticateJWT);

router.post("/send", MessageController.sendMessage);
router.get("/", MessageController.getMessages);

module.exports = router;
