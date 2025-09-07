// controllers/messageController.js
import Message from "../models/message.js";
import Student from "../models/student.js";
import { Op } from "sequelize";
import Mentee from "../models/mentee.js";

// ---------------- CREATE MESSAGE ----------------
export const createMessage = async (socket, data) => {
  try {
    const senderId = socket.user.id;
    const senderName = socket.user.full_name;

    const newMessage = await Message.create({
      sender_id: senderId,
      receiver_id: data.receiver_id || null,
      roomId: data.roomId || null,
      content: data.content, // ✅ fix here
      replyTo: data.replyTo || null,
    });
    // Fetch content of the replied message if exists
    let replyContent = null;
    if (data.replyTo) {
      const repliedMsg = await Message.findByPk(data.replyTo);
      replyContent = repliedMsg?.content || null;
    }

    return {
      id: newMessage.id,
      sender_id: newMessage.sender_id,
      username: senderName, // ✅ include for frontend
      receiver_id: newMessage.receiver_id,
      roomId: newMessage.roomId,
      content: newMessage.content, // ✅ return as "message" for frontend
      replyTo: newMessage.replyTo,
      createdAt: newMessage.createdAt,
    };
  } catch (error) {
    console.error("Error creating message:", error);
    return null;
  }
};

export const getAllMessages = async (req, res) => {
  const { roomId, student1, student2 } = req.query;
  try {
    let where = {};
    if (roomId) {
      where = { roomId };
    } else if (student1 && student2) {
      where = {
        [Op.or]: [
          { sender_id: student1, receiver_id: student2 },
          { sender_id: student2, receiver_id: student1 },
        ],
      };
    }

    const messages = await Message.findAll({
      where,
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const findMenteesForMentor = async (req, res) => {
  try {
    if (req.user.role === "mentor") {
      // If user is a mentor, fetch their mentees with associated Student info
      const mentorId = req.user.student_id;
      const mentees = await Mentee.findAll({
        where: { mentor_id: mentorId },
        include: [
          {
            model: Student,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      // Fetch mentor details
      const mentorDetails = await Student.findOne({
        where: { student_id: mentorId },

        attributes: { exclude: ["password"] },
      });

      return res.json({ mentees, mentor: mentorDetails });
    } else {
      // If user is a mentee, find their mentor and all mentees under that mentor
      const menteeId = req.user.student_id;

      const assignment = await Mentee.findOne({
        where: { mentee_id: menteeId },
      });

      if (!assignment) {
        return res.status(404).json({ message: "No mentor assigned." });
      }

      const mentorId = assignment.mentor_id;

      const mentees = await Mentee.findAll({
        where: { mentor_id: mentorId },
        include: [
          {
            model: Student,
            attributes: { exclude: ["password"] },
          },
        ],
      });

      const mentorDetails = await Student.findOne({
        where: { student_id: mentorId },
        // except password all
        attributes: { exclude: ["password"] },
      });

      return res.json({
        mentor: mentorDetails,
        mentees,
      });
    }
  } catch (error) {
    console.error("Error finding mentees/mentor:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
