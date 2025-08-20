import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import user from "./user.js";
import MentorshipSession from "./session.js";

const SessionAttendance = sequelize.define(
  "SessionAttendance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "mentorship_sessions",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    mentee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    attended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "session_attendance",
  }
);

// Associations
SessionAttendance.belongsTo(MentorshipSession, {
  as: "session",
  foreignKey: "session_id",
});
SessionAttendance.belongsTo(user, { as: "mentee", foreignKey: "mentee_id" });

export default SessionAttendance;
