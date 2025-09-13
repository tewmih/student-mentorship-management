import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Student from "./student.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "students", key: "id" },
      onDelete: "CASCADE",
    },

    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // null for group chat
      references: { model: "students", key: "id" },
      onDelete: "CASCADE",
    },

    roomId: {
      type: DataTypes.STRING(50),
      allowNull: true, // group chat room
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: true, // message may be attachment-only
    },

    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    replyTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "messages", key: "id" },
      onDelete: "SET NULL",
    },

    attachments: {
      type: DataTypes.JSON, // array of file URLs/paths
      allowNull: true,
      defaultValue: [],
    },

    reactions: {
      type: DataTypes.JSON, // [{ user: id, emoji: "👍" }]
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
    tableName: "messages",
  }
);

// 🔗 Associations
Message.belongsTo(Student, {
  as: "sender",
  foreignKey: "sender_id",
  targetKey: "student_id",
});
Message.belongsTo(Student, {
  as: "receiver",
  foreignKey: "receiver_id",
  targetKey: "student_id",
});
Message.belongsTo(Message, { as: "reply", foreignKey: "replyTo" });

export default Message;
