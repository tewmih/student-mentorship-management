import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import MentorApplication from "../models/mentorApplication.js";
import User from "../models/user.js";
import Sequelize from "sequelize";
import Mentee from "../models/mentee.js";
import Mentor from "../models/mentor.js";

// List pending mentor applications
async function listApplications(req, res) {
  try {
    const applications = await MentorApplication.findAll({
      where: { status: "pending" },
    });
    return res.json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// List accepted mentors
async function listAcceptedMentors(req, res) {
  // for debugging
  console.log("Fetching accepted mentors");
  try {
    const mentors = await MentorApplication.findAll({
      where: { status: "approved" },
    });
    return res.json(mentors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
// Approve a mentor application
async function approveApplication(req, res) {
  console.log("Approving application:", req.params.id);
  try {
    const { id } = req.params;
    const application = await MentorApplication.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "approved";
    await application.save();

    return res.json(application);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Reject a mentor application
async function rejectApplication(req, res) {
  try {
    const { id } = req.params;
    const application = await MentorApplication.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "rejected";
    await application.save();

    return res.json(application);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// // Assign mentor to mentees
// async function assignMentor(req, res) {
//   // for debuggig purpose
//   console.log("Assigning mentor:", req.body);
//   try {
//     const { mentor_id, mentee_ids } = req.body;

//     if (!mentor_id || !Array.isArray(mentee_ids) || mentee_ids.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "mentor_id and mentee_ids are required" });
//     }

//     const mentorApp = await MentorApplication.findByPk(mentor_id);
//     if (!mentorApp) {
//       return res.status(404).json({ message: "Mentor application not found" });
//     }

//     const transaction = await MentorMenteeAssignment.sequelize.transaction();

//     try {
//       for (const menteeId of mentee_ids) {
//         await MentorMenteeAssignment.upsert(
//           {
//             mentor_id,
//             mentee_id: menteeId,
//             assigned_at: new Date(),
//           },
//           { transaction }
//         );
//       }

//       // Update mentor application status
//       mentorApp.status = "assigned";
//       await mentorApp.save({ transaction });

//       await transaction.commit();
//       return res.json({ message: "Mentor assigned successfully" });
//     } catch (err) {
//       await transaction.rollback();
//       throw err;
//     }
//   } catch (error) {
//     console.error("Error assigning mentor:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// List all users
async function listUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function assignMentor(req, res) {
  console.log("Assigning mentor:", req.body);

  try {
    const { mentor_id, mentee_ids } = req.body;
    console.log("Received mentor_id:", mentor_id);

    if (!mentor_id || !Array.isArray(mentee_ids) || mentee_ids.length === 0) {
      return res
        .status(400)
        .json({ message: "mentor_id and mentee_ids are required" });
    }

    const mentorUser = await Mentor.findOne({
      where: { mentor_id: mentor_id },
    });
    if (!mentorUser) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    const validMentees = await User.findAll({
      where: { student_id: mentee_ids },
    });

    if (validMentees.length !== mentee_ids.length) {
      return res.status(400).json({ message: "Some mentees not found" });
    }

    const transaction = await MentorMenteeAssignment.sequelize.transaction();

    try {
      await Mentor.update(
        { mentee_assigned: true },
        { where: { mentor_id }, transaction }
      );

      for (const menteeId of mentee_ids) {
        await Mentee.upsert(
          { mentee_id: menteeId, mentor_assigned: true },
          { transaction }
        );

        await MentorMenteeAssignment.upsert(
          {
            mentor_id,
            mentee_id: menteeId,
            assigned_at: new Date(),
          },
          { transaction }
        );
      }

      const mentorApp = await MentorApplication.findOne({
        where: { mentor_id },
        transaction,
      });
      if (mentorApp) {
        mentorApp.status = "assigned";
        await mentorApp.save({ transaction });
      }

      await transaction.commit();
      return res.json({ message: "Mentor assigned successfully" });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  } catch (error) {
    console.error("Error assigning mentor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const StudentUnionController = {
  listApplications,
  listAcceptedMentors,
  approveApplication,
  rejectApplication,
  assignMentor,
  listUsers,
};
