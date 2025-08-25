import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js"; // User model
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
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // null for group chat
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    roomId: {
      type: DataTypes.STRING(50),
      allowNull: true, // group chat room
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    replyTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "messages", key: "id" },
      onDelete: "SET NULL",
    },
  },
  {
    timestamps: true,
    tableName: "messages",
  }
);
// Associations
Message.belongsTo(User, { as: "sender", foreignKey: "sender_id" });
Message.belongsTo(User, { as: "receiver", foreignKey: "receiver_id" });
Message.belongsTo(Message, { as: "reply", foreignKey: "replyTo" });

export default Message;
