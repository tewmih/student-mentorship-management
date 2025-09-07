import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Mentor from "./mentor.js";
import Mentee from "./mentee.js";
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
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mentor_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: Mentor,
      key: "mentor_id",
    },
  },
});

Mentor.hasMany(Task, { foreignKey: "mentor_id", targetKey: "mentor_id" });
Task.belongsTo(Mentor, { foreignKey: "mentor_id", targetKey: "mentor_id" });
export default Task;
