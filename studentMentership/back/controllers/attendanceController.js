import SessionAttendance from "../models/sessionAttendance.js";
import Mentee from "../models/mentee.js";

// 1️⃣ Take attendance (create or update)
export const takeAttendance = async (req, res) => {
  try {
    const { session_id, attendees } = req.body;

    if (!session_id || !attendees) {
      return res
        .status(400)
        .json({ msg: "Session ID and attendance required" });
    }

    const results = await Promise.all(
      attendees.map(async (item) => {
        return SessionAttendance.upsert({
          session_id,
          mentee_id: item.mentee_id,
          attended: item.attended,
        });
      })
    );

    res.json({ msg: "Attendance saved successfully", data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 2️⃣ Get attendance for a session
export const getAttendance = async (req, res) => {
  try {
    const { session_id } = req.params;

    if (!session_id)
      return res.status(400).json({ msg: "Session ID required" });

    const attendance = await SessionAttendance.findAll({
      where: { session_id },
      include: [{ model: Mentee, attributes: ["name"] }],
      order: [["mentee_id", "ASC"]],
    });

    res.json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
