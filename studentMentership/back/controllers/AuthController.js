import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";
import { ValidationError } from "sequelize";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

async function login(req, res) {
  const { student_id } = req.body;

  if (!student_id || typeof student_id !== "string") {
    return res.status(400).json({ student_id: ["Student ID is required."] });
  }

  try {
    // Use a different variable name
    let foundUser = await User.findOne({ where: { student_id } });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }
    // Create JWT token
    const token = jsonwebtoken.sign(
      {
        id: foundUser.id,
        role: foundUser.role,
        student_id: foundUser.student_id,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: foundUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const AuthController = { login };
