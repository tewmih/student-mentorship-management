import Notification from "../models/notification.js";
import Student from "../models/student.js";
import { Op } from "sequelize";

// Get all notifications for the authenticated user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    const offset = (page - 1) * limit;
    
    // Build where clause
    const whereClause = { user_id: userId };
    if (unreadOnly === 'true') {
      whereClause.isRead = false;
    }
    
    // Get notifications with pagination
    const notifications = await Notification.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Student,
          as: "user",
          attributes: ["full_name", "profile_photo_url"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    
    // Get unread count
    const unreadCount = await Notification.count({
      where: { user_id: userId, isRead: false },
    });
    
    res.json({
      success: true,
      data: {
        notifications: notifications.rows,
        pagination: {
          total: notifications.count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(notifications.count / limit),
        },
        unreadCount,
      },
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// Mark a specific notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const notification = await Notification.findOne({
      where: { id, user_id: userId },
    });
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
    
    await notification.update({
      isRead: true,
      readAt: new Date(),
    });
    
    res.json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// Mark all notifications as read for the user
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const updatedCount = await Notification.update(
      { isRead: true, readAt: new Date() },
      { where: { user_id: userId, isRead: false } }
    );
    
    res.json({
      success: true,
      message: "All notifications marked as read",
      data: { updatedCount: updatedCount[0] },
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};

// Delete a specific notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const notification = await Notification.findOne({
      where: { id, user_id: userId },
    });
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
    
    await notification.destroy();
    
    res.json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};

// Clear all notifications for the user
export const clearAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const deletedCount = await Notification.destroy({
      where: { user_id: userId },
    });
    
    res.json({
      success: true,
      message: "All notifications cleared",
      data: { deletedCount },
    });
  } catch (error) {
    console.error("Error clearing all notifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear all notifications",
      error: error.message,
    });
  }
};

// Get notification preferences (placeholder for future implementation)
export const getPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // For now, return default preferences
    // In the future, this could be stored in a separate UserPreferences table
    const defaultPreferences = {
      emailNotifications: true,
      pushNotifications: true,
      sessionReminders: true,
      taskDeadlines: true,
      messageNotifications: true,
      mentorUpdates: true,
      systemAnnouncements: true,
    };
    
    res.json({
      success: true,
      data: defaultPreferences,
    });
  } catch (error) {
    console.error("Error fetching notification preferences:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification preferences",
      error: error.message,
    });
  }
};

// Update notification preferences (placeholder for future implementation)
export const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = req.body;
    
    // For now, just return success
    // In the future, this would save to a UserPreferences table
    console.log("Notification preferences updated for user:", userId, preferences);
    
    res.json({
      success: true,
      message: "Notification preferences updated successfully",
      data: preferences,
    });
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notification preferences",
      error: error.message,
    });
  }
};

// Helper function to create a notification (used by other controllers)
export const createNotification = async (notificationData) => {
  try {
    const notification = await Notification.create(notificationData);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

// Helper function to create notifications for multiple users
export const createBulkNotifications = async (notificationsData) => {
  try {
    const notifications = await Notification.bulkCreate(notificationsData);
    return notifications;
  } catch (error) {
    console.error("Error creating bulk notifications:", error);
    throw error;
  }
};

// Get notification statistics
export const getNotificationStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const stats = await Notification.findAll({
      where: { user_id: userId },
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN "isRead" = false THEN 1 END')), 'unreadCount']
      ],
      group: ['type'],
      raw: true,
    });
    
    const totalUnread = await Notification.count({
      where: { user_id: userId, isRead: false },
    });
    
    res.json({
      success: true,
      data: {
        stats,
        totalUnread,
      },
    });
  } catch (error) {
    console.error("Error fetching notification stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification statistics",
      error: error.message,
    });
  }
};
