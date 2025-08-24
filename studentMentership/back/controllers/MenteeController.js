import User from "../models/user.js";
import MentorApplication from "../models/mentorApplication.js";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";

async function viewAssignedMentor(req, res) {
  try {
    const menteeId = req.user.student_id;
    // For debugging purpose
    console.log("Fetching assigned mentor for mentee:", menteeId);
    const assignedMentor = await MentorMenteeAssignment.findOne({
      where: { mentee_id: menteeId },
    });
    // for debugging purpose
    console.log("Assigned mentor:", assignedMentor);
    if (!assignedMentor) {
      return res.status(404).json({ message: "No mentor assigned" });
    }

    // Get mentor user info
    const mentorUser = await User.findOne({
      where: { student_id: assignedMentor.mentor_id },
    });

    return res.json({
      assignedMentor,
      mentorUser,
      mentorUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const MenteeController = { viewAssignedMentor };
