import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Student = sequelize.define(
  "Student",
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
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true }, // new
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

    // Region (Ethiopia's federal states & chartered cities)
    region: {
      type: DataTypes.ENUM(
        "Tigray",
        "Afar",
        "Amhara",
        "Oromia",
        "Somali",
        "Benishangul-Gumuz",
        "Gambela",
        "Harari",
        "Sidama",
        "South West Ethiopia Peoples’ Region",
        "Central Ethiopia Region",
        "South Ethiopia Region",
        "Addis Ababa",
        "Dire Dawa"
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

    // New fields
    contact_link: { type: DataTypes.STRING(255), allowNull: true },
    bio: { type: DataTypes.STRING(500), allowNull: true },
    experience: { type: DataTypes.TEXT, allowNull: true },
    about: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: true,
    tableName: "students",
  }
);

export default Student;
