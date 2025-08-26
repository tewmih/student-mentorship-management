import Student from "../models/student.js";
import MentorApplication from "../models/mentorApplication.js";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";

async function viewAssignedMentor(req, res) {
  console.log("Viewing assigned mentor for mentee:", req.user.student_id);
  try {
    const menteeId = req.user.student_id;

    const assignedMentor = await MentorMenteeAssignment.findOne({
      where: { mentee_id: menteeId },
    });
    if (!assignedMentor) {
      return res.status(404).json({ message: "No mentor assigned" });
    }
    console.log("Assigned mentor found:", assignedMentor);

    // Get mentor student info
    const mentor = await Student.findOne({
      where: { student_id: assignedMentor.mentor_id },
    });

    return res.json({
      assignedMentor,
      mentor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const MenteeController = { viewAssignedMentor };
