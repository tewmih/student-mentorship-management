import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Mentor from "./mentor.js";
import Mentee from "./mentee.js";

const MentorMenteeAssignment = sequelize.define(
  "MentorMenteeAssignment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: { model: Mentor, key: "mentor_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    mentee_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: { model: Mentee, key: "mentee_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    assigned_at: { type: DataTypes.DATE, allowNull: true },
  },
  { timestamps: true, tableName: "mentor_mentee_assignments" }
);

// Associations
MentorMenteeAssignment.belongsTo(Mentor, {
  as: "mentor",
  foreignKey: "mentor_id",
});
MentorMenteeAssignment.belongsTo(Mentee, {
  as: "mentee",
  foreignKey: "mentee_id",
});

export default MentorMenteeAssignment;
