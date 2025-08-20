import MentorshipSession from "../models/session.js";
import SessionAttendance from "./../models/SessionAttendance.js";
import User from "../models/user.js";
// Mentor schedules a new mentorship session
async function createSession(req, res) {
  try {
    const { title, description, scheduled_at, session_type } = req.body;
    const mentor_id = req.user.id; // JWT middleware

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

// List sessions for logged-in mentor
async function listSessions(req, res) {
  try {
    const mentor_id = req.user.id;

    const sessions = await MentorshipSession.findAll({
      where: { mentor_id },
      include: [
        {
          model: SessionAttendance,
          as: "attendees",
          include: [
            {
              model: User,
              as: "mentee",
              attributes: ["id", "full_name", "student_id"],
            },
          ],
        },
      ],
    });

    return res.json({ sessions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// List sessions assigned to logged-in mentee
async function listMySessions(req, res) {
  try {
    const mentee_id = req.user.id;

    const attendances = await SessionAttendance.findAll({
      where: { mentee_id },
      include: [
        {
          model: MentorshipSession,
          as: "session",
          include: [
            {
              model: User,
              as: "mentor",
              attributes: ["id", "full_name", "student_id"],
            },
          ],
        },
      ],
    });

    return res.json({ attendances });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Upload resource (file) for a specific session
async function uploadResource(req, res) {
  try {
    const session_id = req.params.id;
    const { file_url } = req.body; // Assuming you store file URL in DB

    if (!file_url) {
      return res.status(400).json({ message: "File URL is required" });
    }

    const session = await MentorshipSession.findByPk(session_id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Assuming you have a resources field or a separate Resource model
    // Here we just log for simplicity
    console.log(`Resource uploaded for session ${session_id}: ${file_url}`);

    return res.json({ message: "Resource uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

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

export const SessionController = {
  createSession,
  listSessions,
  listMySessions,
  uploadResource,
  submitFeedback,
};
