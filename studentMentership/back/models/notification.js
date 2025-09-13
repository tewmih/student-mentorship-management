import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Student from "./student.js";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "students", key: "id" },
      onDelete: "CASCADE",
    },
    
    type: {
      type: DataTypes.ENUM(
        "message",
        "task_assigned",
        "task_completed",
        "task_deadline",
        "session_reminder",
        "session_scheduled",
        "mentor_assigned",
        "petition_created",
        "petition_approved",
        "petition_rejected",
        "system_announcement"
      ),
      allowNull: false,
    },
    
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    
    // Related entity information (flexible JSON structure)
    relatedData: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
      comment: "Stores related entity IDs and metadata (e.g., {messageId: 123, taskId: 456})"
    },
    
    // Priority level for notification
    priority: {
      type: DataTypes.ENUM("low", "medium", "high", "urgent"),
      defaultValue: "medium",
    },
    
    // Action URL for frontend navigation
    actionUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    
    // Expiration date for the notification
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "notifications",
    indexes: [
      {
        fields: ["user_id", "isRead"]
      },
      {
        fields: ["type"]
      },
      {
        fields: ["createdAt"]
      }
    ]
  }
);

// 🔗 Associations
Notification.belongsTo(Student, {
  as: "user",
  foreignKey: "user_id",
  targetKey: "id",
});

Student.hasMany(Notification, {
  as: "notifications",
  foreignKey: "user_id",
  targetKey: "id",
});

export default Notification;
