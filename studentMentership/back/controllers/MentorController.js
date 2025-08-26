import Session from "../models/session.js";
import Student from "../models/student.js";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import Mentor from "../models/mentor.js";
import MentorApplication from "../models/mentorApplication.js";
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

    const mentees = await Student.findAll({
      where: { student_id: { [Op.in]: menteeIds } },
    });

    return res.json({ mentees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
//

async function submitApplication(req, res) {
  // first check mentor hasn't assigned
  const existingMentor = await Mentor.findOne({
    where: { mentor_id: req.user.student_id, mentee_assigned: true },
  });
  if (existingMentor) {
    return res.status(400).json({ message: "Mentor already assigned" });
  }

  try {
    const student = req.user; // extracted from JWT
    const { motivation, experience, region } = req.body;

    // Validation
    if (!motivation || !region) {
      return res
        .status(400)
        .json({ message: "Motivation and region are required" });
    }
    //  inserting into mentor table
    const mentor = await Mentor.create({
      mentor_id: student.student_id,
    });
    // Create mentor application
    const application = await MentorApplication.create({
      mentor_id: student.student_id, // get from JWT
      motivation,
      experience: experience || null,
      region,
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Submit application error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
export const MentorController = {
  listMentees,
  submitApplication,
};
