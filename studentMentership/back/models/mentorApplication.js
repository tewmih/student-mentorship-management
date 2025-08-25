import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";
import mentor from "./mentor.js";

const MentorApplication = sequelize.define(
  "MentorApplication",
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
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
    motivation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    region: {
      type: DataTypes.ENUM(
        "Tigray",
        "Amhara",
        "Oromia",
        "SNNP",
        "Afar",
        "Somali"
      ),
      allowNull: false,
      defaultValue: "Tigray",
    },
  },
  {
    timestamps: true,
    tableName: "mentor_applications",
  }
);

MentorApplication.belongsTo(mentor, {
  foreignKey: "mentor_id",
  targetKey: "mentor_id",
  onDelete: "CASCADE",
});

export default MentorApplication;
