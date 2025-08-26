import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Mentor from "./Mentor.js";
import Mentee from "./Mentee.js";
const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    defaultValue: "pending",
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Mentor.hasMany(Task, { foreignKey: "mentor_id" });
Task.belongsTo(Mentor, { foreignKey: "mentor_id", targetKey: "mentor_id" });
Mentee.hasMany(Task, { foreignKey: "mentee_id" });
Task.belongsTo(Mentee, { foreignKey: "mentee_id", targetKey: "mentee_id" });

export default Task;
