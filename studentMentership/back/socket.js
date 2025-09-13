import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "./models/message.js";
import Student from "./models/student.js";
import Notification from "./models/notification.js";

let io;
const onlineUsers = new Map();

// Helper function to create notifications
const createNotification = async (notificationData) => {
  try {
    const notification = await Notification.create(notificationData);
    
    // Emit real-time notification to the user
    const userSocketId = onlineUsers.get(notificationData.user_id.toString());
    if (userSocketId) {
      io.to(userSocketId).emit("newNotification", notification);
    }
    
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

export const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // --- Socket authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log("User connected:", userId, "Socket ID:", socket.id);

    // --- Add to online users
    socket.join(userId);
    onlineUsers.set(userId, socket.id);

    // Notify everyone about online users
    socket.emit("onlineUsers", Array.from(onlineUsers.keys()));
    socket.broadcast.emit("userOnline", { userId });

    // --- Typing events
    socket.on("typing", ({ receiver }) => {
      io.to(receiver).emit("typing", { sender: userId });
    });

    socket.on("stopTyping", ({ receiver }) => {
      io.to(receiver).emit("stopTyping", { sender: userId });
    });

    // --- Send message
    socket.on(
      "sendMessage",
      async ({ receiver, content, replyTo, attachments }) => {
        try {
          const created = await Message.create({
            sender_id: userId,
            receiver_id: receiver,
            content,
            replyTo,
            attachments,
          });

          const message = await Message.findOne({
            where: { id: created.id },
            include: [
              {
                model: Student,
                as: "sender",
                attributes: ["full_name", "profile_photo_url"],
              },
              {
                model: Student,
                as: "receiver",
                attributes: ["full_name", "profile_photo_url"],
              },
            ],
          });

          io.to(receiver).emit("newMessage", message);
          io.to(userId).emit("newMessage", message);
          
          // Create notification for new message
          await createNotification({
            user_id: receiver,
            type: "message",
            title: "New Message",
            message: `You received a new message from ${message.sender.full_name}`,
            relatedData: { messageId: message.id, senderId: userId },
            actionUrl: `/chat/${userId}`,
            priority: "medium"
          });
        } catch (err) {
          console.error("Error sending message:", err.message);
        }
      }
    );

    // --- React to message
    socket.on("reactMessage", async ({ messageId, emoji }) => {
      try {
        const msg = await Message.findByPk(messageId);
        if (!msg) return;

        let reactions = msg.reactions || [];
        const existing = reactions.find((r) => r.user === userId);

        if (existing) {
          if (existing.emoji === emoji) {
            reactions = reactions.filter((r) => r.user !== userId); // remove
          } else {
            existing.emoji = emoji; // update
          }
        } else {
          reactions.push({ user: userId, emoji }); // add
        }

        await msg.update({ reactions });

        io.to(msg.receiver_id.toString()).emit("messageUpdated", msg);
        io.to(msg.sender_id.toString()).emit("messageUpdated", msg);
      } catch (err) {
        console.error("Error reacting to message:", err.message);
      }
    });

    // --- Mark messages as read
    socket.on("markRead", ({ sender }) => {
      io.to(sender).emit("messagesRead", { reader: userId });
    });

    // --- Notification events
    socket.on("markNotificationRead", async ({ notificationId }) => {
      try {
        const notification = await Notification.findOne({
          where: { id: notificationId, user_id: userId },
        });
        
        if (notification) {
          await notification.update({ isRead: true, readAt: new Date() });
          socket.emit("notificationUpdated", notification);
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    });

    socket.on("getUnreadCount", async () => {
      try {
        const unreadCount = await Notification.count({
          where: { user_id: userId, isRead: false },
        });
        socket.emit("unreadCount", unreadCount);
      } catch (error) {
        console.error("Error getting unread count:", error);
      }
    });

    // --- Disconnect
    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      io.emit("userOffline", { userId });
      console.log("User disconnected:", userId);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};

// Function to send notification to a specific user
export const sendNotificationToUser = async (userId, notificationData) => {
  try {
    const notification = await createNotification({
      ...notificationData,
      user_id: userId,
    });
    
    // Emit to the user if they're online
    const userSocketId = onlineUsers.get(userId.toString());
    if (userSocketId) {
      io.to(userSocketId).emit("newNotification", notification);
    }
    
    return notification;
  } catch (error) {
    console.error("Error sending notification to user:", error);
    throw error;
  }
};

// Function to send notification to multiple users
export const sendNotificationToUsers = async (userIds, notificationData) => {
  try {
    const notifications = [];
    
    for (const userId of userIds) {
      const notification = await createNotification({
        ...notificationData,
        user_id: userId,
      });
      notifications.push(notification);
    }
    
    return notifications;
  } catch (error) {
    console.error("Error sending notifications to users:", error);
    throw error;
  }
};
