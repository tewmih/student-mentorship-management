const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.use(authenticateJWT);

// Get notifications with optional filtering and pagination
router.get("/", NotificationController.getNotifications);

// Get notification statistics
router.get("/stats", NotificationController.getNotificationStats);

// Mark a specific notification as read
router.patch("/:id/read", NotificationController.markAsRead);

// Mark all notifications as read
router.patch("/read-all", NotificationController.markAllAsRead);

// Delete a specific notification
router.delete("/:id", NotificationController.deleteNotification);

// Clear all notifications
router.delete("/", NotificationController.clearAllNotifications);

// Get notification preferences
router.get("/preferences", NotificationController.getPreferences);

// Update notification preferences
router.put("/preferences", NotificationController.updatePreferences);

module.exports = router;
