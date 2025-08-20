import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const MentorshipSession = sequelize.define(
  "MentorshipSession",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mentor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: "mentors",
        key: "mentor_id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    session_type: {
      type: DataTypes.ENUM("group", "individual"),
      allowNull: false,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
    tableName: "mentorship_sessions",
  }
);

// Associations
MentorshipSession.belongsTo(User, { as: "mentor", foreignKey: "mentor_id" });

export default MentorshipSession;
