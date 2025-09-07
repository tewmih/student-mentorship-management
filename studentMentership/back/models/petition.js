import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import Mentee from "./mentee.js";
import Mentor from "./mentor.js";

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
        model: Mentee,
        key: "mentee_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    current_mentor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: Mentor,
        key: "mentor_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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

// 🔗 Associations
Petition.belongsTo(Mentee, {
  as: "mentee",
  foreignKey: "mentee_id",
  targetKey: "mentee_id",
});

Petition.belongsTo(Mentor, {
  as: "currentMentor",
  foreignKey: "current_mentor_id",
  targetKey: "mentor_id",
});

export default Petition;
