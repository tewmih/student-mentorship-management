import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Student from "./student.js";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
const Petition = sequelize.define(
  "Petition",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mentee_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: MentorMenteeAssignment,
        key: "mentee_id",
      },
      onDelete: "CASCADE",
    },
    current_mentor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: MentorMenteeAssignment,
        key: "mentor_id",
      },
      onDelete: "CASCADE",
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
    resolved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Associations
Petition.belongsTo(Student, {
  as: "mentee",
  foreignKey: "mentee_id",
  targetKey: "student_id",
});
Petition.belongsTo(Student, {
  as: "current_mentor",
  foreignKey: "current_mentor_id",
  targetKey: "student_id",
});

export default Petition;
