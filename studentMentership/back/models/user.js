import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.STRING(20), allowNull: false, unique: true },

    // Default password
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "123",
    },

    full_name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },

    role: {
      type: DataTypes.ENUM("admin", "student_union", "mentor", "mentee"),
      defaultValue: "mentee",
    },

    department: { type: DataTypes.STRING(100), allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },

    // Region (students come from different regions)
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

    // Profile and cover photos
    profile_photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cover_photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

export default User;
