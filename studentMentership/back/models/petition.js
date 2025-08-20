import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.js";
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
        model: "mentees",
        key: "mentee_id",
      },
      onDelete: "CASCADE",
    },
    current_mentor_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: "mentors",
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
    timestamps: true, // createdAt & updatedAt
    tableName: "petitions",
  }
);

// Associations
Petition.belongsTo(User, { as: "mentee", foreignKey: "mentee_id" });
Petition.belongsTo(User, {
  as: "current_mentor",
  foreignKey: "current_mentor_id",
});

export default Petition;
