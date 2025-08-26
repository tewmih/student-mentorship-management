import jsonwebtoken from "jsonwebtoken";
import Student from "../models/student.js";
import { ValidationError } from "sequelize";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
// Setup Nodemailer (replace with your own email and app password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iinventme26@gmail.com",
    pass: "inxc liwf cuhk afhq", // Use app password for Gmail
  },
});

// --------------------- FORGOT PASSWORD ---------------------
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // const email = req.body.email?.trim().toLowerCase();
    console.log(email);
    const student = await Student.findOne({
      where: { email },
    });
    if (!student) return res.status(400).json({ message: "Student not found" });
    const token = jsonwebtoken.sign(
      { id: student.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: "iinventme26@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `<p>Click this link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// --------------------- RESET PASSWORD ---------------------
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    // Verify JWT
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    // Find student
    const student = await Student.findByPk(decoded.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Check if new password is same as old password
    if (password === student.password) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password",
      });
    }

    // Save plain password (⚠️ for dev only!)
    student.password = password;
    await student.save();

    // Send confirmation email
    await transporter.sendMail({
      from: "iinventme26@gmail.com",
      to: student.email,
      subject: "Password Reset Successful",
      html: `<p>Your password has been reset successfully.</p>`,
    });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).json({
      message: "Invalid or expired token",
      error: err.message,
    });
  }
};

async function login(req, res) {
  const { student_id, password } = req.body;
  // Validation
  if (!student_id || typeof student_id !== "string") {
    return res.status(400).json({ student_id: ["Student ID is required."] });
  }
  if (!password || typeof password !== "string") {
    return res.status(400).json({ password: ["Password is required."] });
  }
  try {
    let foundStudent = await Student.findOne({ where: { student_id } });
    // console.log(foundStudent);
    if (!foundStudent) {
      return res.status(404).json({ message: "Student not found." });
    }
    // // Compare password with hashed password
    // const isMatch = await bcrypt.compare(password, foundUser.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid credentials." });
    // }
    // just compare password without hashing -this will be next level

    if (password !== foundStudent.password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    console.log(foundStudent.role);
    // Create JWT token
    const token = jsonwebtoken.sign(
      {
        id: foundStudent.id,
        student_id: foundStudent.student_id,
        role: foundStudent.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.json({
      token,
      student_id: foundStudent.student_id,
      role: foundStudent.role,
      id: foundStudent.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
// --------------------- CHANGE PASSWORD ---------------------
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const studentId = req.user.id; // assuming you set user in middleware from JWT
    // Find student
    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    // Check old password matches
    if (student.password !== oldPassword) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    // Prevent same password
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New password must be different from old password" });
    }
    // Update and save
    student.password = newPassword; // plain (dev only)
    await student.save();
    // send to email
    await transporter.sendMail({
      from: "iinventme26@gmail.com",
      to: student.email,
      subject: "Password Change Successful",
      html: `<p>Your password has been changed successfully.</p>`,
    });
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const AuthController = {
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};
