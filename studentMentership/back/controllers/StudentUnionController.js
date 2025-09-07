import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import MentorApplication from "../models/mentorApplication.js";
import Student from "../models/student.js";
import Sequelize, { where } from "sequelize";
import Mentee from "../models/mentee.js";
import Mentor from "../models/mentor.js";
import { Op } from "sequelize";
// List all mentor applications
async function listApplications(req, res) {
  try {
    const applications = await MentorApplication.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Mentor,
          include: [
            {
              model: Student,
              attributes: ["student_id", "full_name", "email", "department"],
            },
          ],
        },
      ],
    });

    return res.json({ applications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// List accepted mentors
async function listAcceptedMentors(req, res) {
  console.log("Listing accepted mentors");
  try {
    const mentors = await MentorApplication.findAll({
      where: { status: "approved" },
    });
    console.log(mentors);
    return res.json(mentors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
// Approve a mentor application
async function approveApplication(req, res) {
  try {
    const { id } = req.params;
    // for debugging purpose
    console.log(id);
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

  async function assignMentor(req, res) {
    try {
      const { mentor_id, mentee_ids } = req.body;
      console.log("Assigning mentor:", mentor_id, "to mentees:", mentee_ids);

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

      const validMentees = await Student.findAll({
        where: { student_id: mentee_ids },
      });

      if (validMentees.length !== mentee_ids.length) {
        return res.status(400).json({ message: "Some mentees not found" });
      }

      const transaction = await Mentee.sequelize.transaction();

      try {
        await Mentor.update(
          { mentee_assigned: true },
          { where: { mentor_id }, transaction }
        );

        for (const menteeId of mentee_ids) {
          await Mentee.upsert(
            { mentee_id: menteeId, mentor_assigned: true, mentor_id },
            { transaction }
          );

          await Mentee.upsert(
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
}

// List all students
async function listStudents(req, res) {
  try {
    const students = await Student.findAll();
    return res.json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// students who don't have mentor
async function listStudentsWithoutMentor(req, res) {
  try {
    // 1. Get all mentee assignments (students who already have mentor)
    const mentees = await Mentee.findAll({ attributes: ["mentee_id"] });
    const menteeIds = mentees.map((m) => m.mentee_id);

    // 2. Get all students with role "mentee" but not in mentee table
    const studentsWithoutMentor = await Student.findAll({
      where: {
        role: "mentee", // Only fetch students whose role is mentee
        student_id: {
          [Op.notIn]: menteeIds.length > 0 ? menteeIds : [0],
        },
      },
    });

    // 3. Return them in response
    return res.json(studentsWithoutMentor);
  } catch (error) {
    console.error("Error fetching students without mentor:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
async function listMentors(req, res) {
  try {
    const mentors = await MentorApplication.findAll({
      where: { status: "approved" },
      include: [
        {
          model: Mentor,
          include: [
            {
              model: Student,
            },
          ],
        },
      ],
    });

    return res.json(mentors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function assignMentor(req, res) {
  try {
    const { mentor_id, mentee_ids } = req.body;
    if (!mentor_id || !Array.isArray(mentee_ids) || mentee_ids.length === 0) {
      return res
        .status(400)
        .json({ message: "mentor_id and mentee_ids are required" });
    }
    const mentorUser = await Mentor.findOne({ where: { mentor_id } });
    if (!mentorUser) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    // Count existing mentees assigned to this mentor
    const existingMenteesCount = await Mentee.count({
      where: { mentor_id },
    });

    // Check if mentor has mentee_assigned true and limit to 10 mentees
    if (
      mentorUser.mentee_assigned &&
      existingMenteesCount + mentee_ids.length > 10
    ) {
      return res.status(400).json({
        message: `Cannot assign more mentees. Mentor already has ${existingMenteesCount} mentees assigned.`,
      });
    }
    const transaction = await Mentee.sequelize.transaction();
    try {
      // Mark mentor as having mentees assigned
      await Mentor.update(
        { mentee_assigned: true },
        { where: { mentor_id }, transaction }
      );

      for (const menteeId of mentee_ids) {
        // Upsert mentee assignment
        await Mentee.upsert(
          {
            mentee_id: menteeId,
            mentor_id,
            mentor_assigned: true,
            assigned_at: new Date(),
          },
          { transaction }
        );
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
// list available  mentors
async function lisavailablementors(req, res) {
  try {
    // Find all mentors
    const mentors = await Mentor.findAll({
      include: [
        {
          model: Student,
          attributes: ["student_id", "full_name", "email"], // Student info
        },
      ],
    });

    // Filter mentors based on mentee_assigned or current mentee count
    const availableMentors = [];

    for (const mentor of mentors) {
      const menteeCount = await Mentee.count({
        where: { mentor_id: mentor.mentor_id },
      });

      if (!mentor.mentee_assigned || menteeCount < 10) {
        availableMentors.push({
          ...mentor.toJSON(),
          mentee_count: menteeCount,
        });
      }
    }

    return res.json(availableMentors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Change mentor for mentees
async function changeMentor(req, res) {
  const { menteeId, newMentorId } = req.body;

  try {
    const mentee = await Mentee.findByPk(menteeId);
    if (!mentee) return res.status(404).json({ message: "Mentee not found" });

    const oldMentorId = mentee.mentor_id;

    const newMentor = await Mentor.findByPk(newMentorId);
    if (!newMentor)
      return res.status(404).json({ message: "New mentor not found" });

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

    return res.json({ message: "Mentor changed successfully" });
  } catch (error) {
    console.error("Error changing mentor:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const StudentUnionController = {
  listApplications,
  listAcceptedMentors,
  approveApplication,
  rejectApplication,
  assignMentor,
  listStudents,
  listStudentsWithoutMentor,
  listMentors,
  lisavailablementors,
  changeMentor,
};
