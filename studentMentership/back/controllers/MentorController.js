import Session from "../models/session.js";
import Student from "../models/student.js";
import Mentor from "../models/mentor.js";
import MentorApplication from "../models/mentorApplication.js";
import { Op } from "sequelize";
import Mentee from "../models/mentee.js";

// List mentees assigned to the logged-in mentor
async function listMentees(req, res) {
  try {
    const mentorId = req.user.student_id; // From JWT middleware

    const assignments = await Mentee.findAll({
      where: { mentor_id: mentorId },
    });
    if (assignments.length === 0) {
      return res.status(404).json({ message: "No mentees assigned" });
    } // extract mentee IDs
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
    const { motivation, experience, region, year, department } = req.body;

    // 1. Validate applicant is at least second year
    if (!year || year < 2) {
      return res
        .status(400)
        .json({ message: "Only students from 2nd year and above can apply as mentors" });
    }

    // 2. Fetch year and department from request body (already done above)
    // Validation for required fields
    if (!motivation || !region || !department) {
      return res
        .status(400)
        .json({ message: "Motivation, region, year, and department are required" });
    }

    // Update student's year and department if provided
    await Student.update(
      { year, department },
      { where: { student_id: student.student_id } }
    );

    // inserting into mentor table
    const mentor = await Mentor.create({
      mentor_id: student.student_id,
    });
    
    // 3. Add application to student union's application list (MentorApplication table)
    const application = await MentorApplication.create({
      mentor_id: student.student_id, // get from JWT
      motivation,
      experience: experience || null,
      region,
    });

    return res.status(201).json({
      message: "Application submitted successfully and added to student union review list",
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
