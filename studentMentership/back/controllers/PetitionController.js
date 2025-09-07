import Petition from "../models/petition.js";
import Student from "../models/student.js";
import { Op } from "sequelize";
import Mentee from "../models/mentee.js";
import Mentor from "../models/mentor.js";

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
          model: Mentee,
          as: "mentee",
          attributes: ["id", "mentee_id"],
        },
        {
          model: Mentor,
          as: "currentMentor",
          attributes: ["id", "mentor_id"],
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

// Submit a petition (mentee requests mentor change)
async function submitPetition(req, res) {
  const { title, reason } = req.body;
  try {
    const user = req.user;

    // Check if mentee has a mentor assigned
    const assignment = await Mentee.findOne({
      where: { mentee_id: user.student_id },
    });

    if (!assignment || !assignment.mentor_id) {
      console.log("No mentor assigned--->");
      return res.status(404).json({ message: "No mentor assigned" });
    }

    const petition = await Petition.create({
      title,
      reason,
      current_mentor_id: assignment.mentor_id,
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
// Approve/Reject Petition and (if approved) change mentor
async function resolvePetition(req, res) {
  console.log("End point hitted !");
  try {
    const { id } = req.params;
    const { action, newMentorId } = req.body; // add newMentorId for reassignment
    // for debugging purpose
    const petition = await Petition.findByPk(id);
    console.log(petition);
    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }
    if (!["approved", "rejected"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }
    petition.status = action;
    petition.resolved_at = new Date();

    // ✅ If approved, change mentor
    if (action === "approved") {
      const menteeId = petition.mentee_id;
      const mentee = await Mentee.findOne({
        where: { mentee_id: menteeId },
      });
      console.log("Mentee found:", mentee);
      if (!mentee) {
        return res.status(404).json({ message: "Mentee not found" });
      }
      const oldMentorId = mentee.mentor_id;
      const newMentor = await Mentor.findOne({
        where: { mentor_id: newMentorId },
      });
      console.log("New Mentor found:", newMentor);
      if (!newMentor) {
        return res.status(404).json({ message: "New mentor not found" });
      }
      // Check if new mentor can take more mentees
      if (newMentor.mentee_assigned) {
        const menteeCount = await Mentee.count({
          where: { mentor_id: newMentorId },
        });
        if (menteeCount >= 10) {
          return res
            .status(400)
            .json({ message: "New mentor already has 10 mentees" });
        }
      }
      // Reassign mentee
      mentee.mentor_id = newMentorId;
      await mentee.save();

      // Update new mentor's mentee_assigned flag
      newMentor.mentee_assigned = true;
      await newMentor.save();

      // Update old mentor's mentee_assigned flag if needed
      if (oldMentorId) {
        const oldMentorMenteeCount = await Mentee.count({
          where: { mentor_id: oldMentorId },
        });
        if (oldMentorMenteeCount === 0) {
          const oldMentor = await Mentor.findByPk(oldMentorId);
          if (oldMentor) {
            oldMentor.mentee_assigned = false;
            await oldMentor.save();
          }
        }
      }
    }

    await petition.save();

    return res.json({
      message: `Petition ${action} successfully`,
      petition,
    });
  } catch (error) {
    console.error("Error resolving petition:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const PetitionController = {
  submitPetition,
  listPetitions,
  resolvePetition,
};
