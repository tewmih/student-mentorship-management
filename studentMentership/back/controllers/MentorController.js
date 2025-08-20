import MentorApplication from "../models/mentorApplication.js";
import session from "../models/session.js";
import User from "../models/user.js";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import Mentor from "../models/mentor.js";
import { Op } from "sequelize";

// List mentees assigned to the logged-in mentor
async function listMentees(req, res) {
  try {
    const mentorId = req.user.student_id; // From JWT middleware

    const assignments = await MentorMenteeAssignment.findAll({
      where: { mentor_id: mentorId },
    });

    // extract mentee IDs
    const menteeIds = assignments.map((a) => a.mentee_id);

    const mentees = await User.findAll({
      where: { student_id: { [Op.in]: menteeIds } },
    });

    return res.json({ mentees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Submit a mentor application
async function submitApplication(req, res) {
  try {
    const user = req.user;
    // for debugging purpose
    console.log("User submitting application:", user);
    const { motivation, department, full_name, email } = req.body;

    if (!motivation || !department || !full_name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //  inserting into mentor table
    const mentor = await Mentor.create({
      mentor_id: user.student_id,
    });

    const application = await MentorApplication.create({
      motivation,
      department,
      full_name,
      email,
      mentor_id: user.student_id,
    });
    // for debugging purpose
    console.log("Submitting mentor application", {
      user_id: User.id,
      request_data: req.body,
    });

    return res.status(201).json(application);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Create a mentorship session
async function createSession(req, res) {
  try {
    const { mentor_id, title, description, scheduled_at, session_type } =
      req.body;

    if (!mentor_id || !title || !scheduled_at || !session_type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!["group", "individual"].includes(session_type)) {
      return res.status(400).json({ message: "Invalid session type" });
    }

    const session = await MentorshipSession.create({
      mentor_id,
      title,
      description,
      scheduled_at,
      session_type,
    });

    return res.status(201).json(session);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const MentorController = {
  listMentees,
  submitApplication,
  createSession,
};
