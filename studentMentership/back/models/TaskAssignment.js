import Task from "./Task.js";
import Mentee from "./mentee.js";
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
const TaskAssignment = sequelize.define("TaskAssignment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "completed"),
    defaultValue: "pending",
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: "id",
    },
  },
  mentee_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: Mentee,
      key: "mentee_id",
    },
  },
  completionStatus: {
    type: DataTypes.ENUM("none", "pending", "approved", "rejected"),
    defaultValue: "none",
  },
});
// Relations
Task.hasMany(TaskAssignment, { foreignKey: "task_id", targetKey: "id" });
TaskAssignment.belongsTo(Task, {
  foreignKey: "task_id",
  targetKey: "id",
});
Mentee.hasMany(TaskAssignment, {
  foreignKey: "mentee_id",
  targetKey: "mentee_id",
});
TaskAssignment.belongsTo(Mentee, {
  foreignKey: "mentee_id",
  targetKey: "mentee_id",
});

export default TaskAssignment;
