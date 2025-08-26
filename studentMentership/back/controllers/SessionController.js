import MentorshipSession from "../models/session.js";
import SessionAttendance from "./../models/sessionAttendance.js";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import Student from "../models/student.js";
// Mentor schedules a new mentorship session
async function createSession(req, res) {
  try {
    const { title, description, scheduled_at, session_type } = req.body;
    const mentor_id = req.user.student_id; // JWT middleware
    if (!title || !scheduled_at || !session_type) {
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

// List sessions assigned to logged-in mentee
async function listMySessions(req, res) {
  try {
    const mentee_id = req.user.student_id; // From JWT middleware
    // Find mentor for this mentee from MentorMenteeAssignment
    const assignment = await MentorMenteeAssignment.findOne({
      where: { mentee_id },
    });
    if (!assignment) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    const mentor_id = assignment.mentor_id;
    // find all sessions created by this mentor
    const sessions = await MentorshipSession.findAll({
      where: { mentor_id },
    });
    return res.json({ sessions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
// List sessions for logged-in mentor
// async function listSessions(req, res) {
//   try {
//     const mentor_id = req.user.student_id;
//     const sessions = await MentorshipSession.findAll({
//       where: { mentor_id },
//       order: [["createdAt", "DESC"]],
//     });
//     return res.json({ sessions });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// }

// Mentee submits feedback for a session
async function submitFeedback(req, res) {
  try {
    const session_id = req.params.id;
    const mentee_id = req.user.id;
    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ message: "Feedback is required" });
    }

    const attendance = await SessionAttendance.findOne({
      where: { session_id, mentee_id },
    });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    attendance.feedback = feedback;
    await attendance.save();

    return res.json({ message: "Feedback submitted successfully", attendance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
// list all sessions created by a mentor
const listSessionsForMentor = async (req, res) => {
  try {
    const mentor_id = req.user.student_id;
    // find latest one
    const sessions = await MentorshipSession.findAll({
      where: { mentor_id },
      order: [["createdAt", "DESC"]],
    });
    return res.json({ sessions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const SessionController = {
  createSession,
  // listSessions,
  listMySessions,
  listSessionsForMentor,
  submitFeedback,
};
