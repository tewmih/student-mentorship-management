// controllers/messageController.js
import Message from "../models/Message.js";
import User from "../models/user.js";
import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import { Op } from "sequelize";

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

    return {
      _id: newMessage.id,
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

// ---------------- FIND MENTEES / MENTOR ----------------
export const findMenteesForMentor = async (req, res) => {
  try {
    if (req.user.role === "mentor") {
      // If user is a mentor, fetch their mentees
      const mentorId = req.user.student_id;
      const assignments = await MentorMenteeAssignment.findAll({
        where: { mentor_id: mentorId },
      });
      const mentees = assignments.map((a) => a.mentee_id);
      // for each mentee find user info using student_id=mentee_id
      const menteeDetails = await User.findAll({
        where: { student_id: mentees },
      });
      // for mentor find user info using student_id=mentorId
      const mentorDetails = await User.findOne({
        where: { student_id: mentorId },
      });
      return res.json({ mentees: menteeDetails, mentor: mentorDetails });
    } else {
      // If user is a mentee, find their mentor and all mentees under that mentor
      const menteeId = req.user.student_id;

      const assignment = await MentorMenteeAssignment.findOne({
        where: { mentee_id: menteeId },
      });

      if (!assignment) {
        return res.status(404).json({ message: "No mentor assigned." });
      }

      const mentorId = assignment.mentor_id;
      const mentees = await MentorMenteeAssignment.findAll({
        where: { mentor_id: mentorId },
      });
      const menteeDetails = await User.findAll({
        where: { student_id: mentees.map((a) => a.mentee_id) },
      });
      const mentorDetails = await User.findOne({
        where: { student_id: mentorId },
      });
      // adding mentorDetails to  menteeDetails
      // menteeDetails.push(mentorDetails);
      return res.json({
        mentor: mentorDetails,
        mentees: menteeDetails,
      });
    }
  } catch (error) {
    console.error("Error finding mentees/mentor:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllMessages = async (req, res) => {
  const { roomId, user1, user2 } = req.query;
  try {
    let where = {};
    if (roomId) {
      where = { roomId };
    } else if (user1 && user2) {
      where = {
        [Op.or]: [
          { sender_id: user1, receiver_id: user2 },
          { sender_id: user2, receiver_id: user1 },
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
