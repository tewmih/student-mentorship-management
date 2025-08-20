import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";

const Mentee = sequelize.define(
  "Mentee",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentee_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      references: { model: User, key: "student_id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    mentor_assigned: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true, tableName: "mentees" }
);

Mentee.belongsTo(User, { foreignKey: "mentee_id", targetKey: "student_id" });

export default Mentee;
