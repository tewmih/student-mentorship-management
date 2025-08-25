import Petition from "../models/petition.js";
import User from "../models/user.js";
import { Op } from "sequelize";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import Mentee from "../models/mentee.js";
import Mentor from "../models/mentor.js";

// Submit a petition (mentee requests mentor change)
async function submitPetition(req, res) {
  const user = req.user;
  // first i have to check mentee has mentor assigned ! from MentorMenteeAssignment
  const assignment = await MentorMenteeAssignment.findOne({
    where: { mentee_id: user.student_id },
  });

  if (!assignment) {
    return res.status(404).json({ message: "No mentor assigned" });
  }

  try {
    // finding current mentor id from  MentorMenteeAssignment table
    const findMentor = await MentorMenteeAssignment.findOne({
      where: { mentee_id: user.student_id },
    });
    const current_mentor_id = findMentor.mentor_id;
    if (!current_mentor_id) {
      return res.status(404).json({ message: "Current mentor not found" });
    }
    const { title, reason } = req.body;
    if (!title || !reason || !current_mentor_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const petition = await Petition.create({
      title,
      reason,
      current_mentor_id,
      mentee_id: user.student_id,
    });
    return res
      .status(201)
      .json({ message: "Petition submitted successfully", petition });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function listPetitions(req, res) {
  try {
    const petitions = await Petition.findAll({
      attributes: [
        "id",
        "title",
        "reason",
        "status",
        "resolved_at",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: User,
          as: "mentee",
          attributes: ["id", "student_id", "full_name"],
        },
        {
          model: User,
          as: "current_mentor",
          attributes: ["id", "student_id", "full_name"],
        },
      ],
      order: [["createdAt", "DESC"]], // optional: newest petitions first
    });

    return res.json({ success: true, petitions });
  } catch (error) {
    console.error("Error listing petitions:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
// Resolve petition (approve/reject)
async function resolvePetition(req, res) {
  console.log("End point hitted !");
  try {
    const { id } = req.params;
    const { status, new_mentor_id } = req.body; // status: "approved" or "rejected"
    const petition = await Petition.findByPk(id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    petition.status = status;
    petition.resolved_at = new Date();

    if (status === "approved" && new_mentor_id) {
      // Update mentor assignment
      const assignment = await petition.getMentee(); // or query MentorMenteeAssignment table
      // You can implement logic to update mentor assignment here
    }

    await petition.save();

    return res.json({ message: `Petition ${status} successfully`, petition });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const PetitionController = {
  submitPetition,
  listPetitions,
  resolvePetition,
};
