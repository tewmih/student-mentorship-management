import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const Mentor = sequelize.define(
  "Mentor",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      references: { model: User, key: "student_id" }, // Must be UNIQUE in User
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    mentee_assigned: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true, tableName: "mentors" }
);

Mentor.belongsTo(User, { foreignKey: "mentor_id", targetKey: "student_id" });

export default Mentor;
