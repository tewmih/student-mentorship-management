import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Student from "./student.js";

const Mentor = sequelize.define(
  "Mentor",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      references: { model: Student, key: "student_id" }, // Must be UNIQUE in Student
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    mentee_assigned: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true, tableName: "mentors" }
);

Mentor.belongsTo(Student, { foreignKey: "mentor_id", targetKey: "student_id" });

export default Mentor;
