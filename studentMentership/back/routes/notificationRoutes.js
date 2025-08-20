const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.use(authenticateJWT);

router.get("/", NotificationController.getNotifications);
router.post("/:id/read", NotificationController.markAsRead);

module.exports = router;
