import MentorMenteeAssignment from "../models/mentorMenteeAssignment.js";
import MentorApplication from "../models/mentorApplication.js";
import Student from "../models/student.js";
import Sequelize, { where } from "sequelize";
import Mentee from "../models/mentee.js";
import Mentor from "../models/mentor.js";
import { Op } from "sequelize";
// List pending mentor applications
async function listApplications(req, res) {
  try {
    const applications = await MentorApplication.findAll({
      where: { status: "pending" },
    });

    // for each application there is mentor and for each mentor  we must find info from Student table
    const mentorIds = applications.map((app) => app.mentor_id);
    const mentors = await Student.findAll({
      where: { student_id: { [Sequelize.Op.in]: mentorIds } },
    });

    return res.json({ applications, mentors });
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

      const transaction = await MentorMenteeAssignment.sequelize.transaction();

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
}
async function assignMentor(req, res) {
  try {
    const { mentor_id, mentee_ids } = req.body;

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

    const transaction = await MentorMenteeAssignment.sequelize.transaction();

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
// list of all mentors
async function listMentors(req, res) {
  listMentorsWithoutMentees;
  // console.log("Fetching all mentors--->End point hitted!");
  try {
    const mentors = await Mentor.findAll({
      where: {
        mentee_assigned: true,
      },
    });
    // for each mentor find info from Student table
    const mentorIds = mentors.map((m) => m.mentor_id);
    const mentorStudents = await Student.findAll({
      where: {
        student_id: {
          [Op.in]: mentorIds,
        },
      },
    });
    return res.json(mentorStudents);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
// list mentors without mentees
async function listMentorsWithoutMentees(req, res) {
  // first find  approved mentorapplication with respective mentor then based on that mentor find  mentee_assigned=false in mentor table
  const applications = await MentorApplication.findAll({
    where: { status: "approved" },
  });
  console.log("Approved mentor applications:", applications);
  // find mentee ids
  const menteeIds = applications.map((app) => app.mentor_id);
  try {
    const mentors = await Mentor.findAll({
      where: {
        mentee_assigned: false,
        mentor_id: { [Op.in]: menteeIds },
      },
    });
    console.log("Mentors without mentees:", mentors);

    return res.json(mentors);
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
    if (!mentee) {
      return res.status(404).json({ message: "Mentee not found" });
    }
    const oldMentorId = mentee.mentor_id;
    // check if o mentor has mentee_assigned=false
    const newMentor = await Mentor.findByPk(newMentorId);
    if (oldMentor) {
      oldMentor.mentee_assigned = false;
      await oldMentor.save();
    }
    // Update the mentor ID for the mentee
    mentee.mentor_id = newMentorId;
    await mentee.save();
    // if mentor hasn't already mentees add it in MentorMenteeAssignment
    const mentorAssignment = await MentorMenteeAssignment.findOne({
      where: { mentor_id: newMentorId, mentee_id: menteeId },
    });
    if (!mentorAssignment) {
      await MentorMenteeAssignment.create({
        mentor_id: newMentorId,
        mentee_id: menteeId,
      });
    }

    // and update in MentorMenteeAssignment too!
    await MentorMenteeAssignment.update(
      { mentor_id: newMentorId },
      { where: { mentee_id: menteeId } }
    );
    // if old mentor has only one mentee, unassign them
    const oldMentor = await Mentor.findByPk(oldMentorId);
    if (oldMentor) {
      const menteeCount = await Mentee.count({
        where: { mentor_id: oldMentorId },
      });
      if (menteeCount === 0) {
        oldMentor.mentee_assigned = false;
        await oldMentor.save();
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
  listMentorsWithoutMentees,
  changeMentor,
};
