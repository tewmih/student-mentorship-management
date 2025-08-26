import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Student from "./student.js";
import Mentor from "./mentor.js";
const Mentee = sequelize.define(
  "Mentee",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentee_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      references: { model: Student, key: "student_id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    // when mentor deleted it must be deleted !
    mentor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: { model: Mentor, key: "mentor_id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    mentor_assigned: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true, tableName: "mentees" }
);

Mentee.belongsTo(Student, { foreignKey: "mentee_id", targetKey: "student_id" });

export default Mentee;
