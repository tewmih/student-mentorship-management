// controllers/profileController.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { validationResult } from "express-validator";
import user from "../models/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Show profile
export const showProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await user.findByPk(userId);
    if (!result) return res.status(404).json({ message: "Student not found" });
    return res.json({
      email: result.email,
      year: result.year,
      student_id: result.student_id,
      full_name: result.full_name,
      department: result.department,
      profile_photo: result.profile_photo,
      cover_photo: result.cover_photo,
      bio: result.bio,
      experience: result.experience,
      about: result.about,
      role: result.role,
      profile_photo_url: result.profile_photo
        ? `${req.protocol}://${req.get("host")}/uploads/${result.profile_photo}`
        : null,
      cover_photo_url: result.cover_photo
        ? `${req.protocol}://${req.get("host")}/uploads/${result.cover_photo}`
        : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  try {
    const userId = req.user.id;
    const result = await user.findByPk(userId);
    if (!result) return res.status(404).json({ message: "Student not found" });

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Handle profile photo
    if (req.files?.profile_photo?.[0]) {
      if (result.profile_photo) {
        const oldPath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          result.profile_photo
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      result.profile_photo = req.files.profile_photo[0].filename;
    }

    // Handle cover photo
    if (req.files?.cover_photo?.[0]) {
      if (result.cover_photo) {
        const oldPath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          result.cover_photo
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      result.cover_photo = req.files.cover_photo[0].filename;
    }

    // Update other fields (only if provided)
    const fields = [
      "bio",
      "experience",
      "about",
      "full_name",
      "email",
      "year",
      "department",
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) result[field] = req.body[field];
    });

    await result.save();

    res.json({
      email: result.email,
      year: result.year,
      student_id: result.student_id,
      full_name: result.full_name,
      department: result.department,
      profile_photo: result.profile_photo,
      cover_photo: result.cover_photo,
      bio: result.bio,
      experience: result.experience,
      about: result.about,
      role: result.role,
      profile_photo_url: result.profile_photo
        ? `${req.protocol}://${req.get("host")}/uploads/${result.profile_photo}`
        : null,
      cover_photo_url: result.cover_photo
        ? `${req.protocol}://${req.get("host")}/uploads/${result.cover_photo}`
        : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
