import Task from "../models/Task.js";
import TaskAssignment from "../models/TaskAssignment.js";
import Mentee from "../models/mentee.js";

// ✅ Create Task and assign to mentees
export const createTask = async (req, res) => {
  const mentorId = req.user.student_id;
  try {
    const { number, dueDate, task, mentees } = req.body;
    // 1. Create the main Task
    const newTask = await Task.create({
      number,
      dueDate,
      task,
      mentor_id: mentorId,
    });
    console.log("Created Task:", newTask.toJSON());
    // 2. Assign to mentees
    if (mentees && mentees.length > 0) {
      const assignments = mentees.map((menteeId) => ({
        task_id: newTask.id,
        mentee_id: menteeId,
        status: "pending",
      }));
      await TaskAssignment.bulkCreate(assignments);
    }
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all tasks (with mentee assignments)
export const getTasks = async (req, res) => {
  // based  on mentor id
  const mentorId = req.user.student_id;
  try {
    const tasks = await Task.findAll({
      include: {
        model: TaskAssignment,
        include: { model: Mentee }, // show mentee info too
      },
      where: { mentor_id: mentorId },
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get tasks for a specific mentee
export const getTasksByMentee = async (req, res) => {
  try {
    const menteeId = req.user.student_id;
    console.log(menteeId);

    const assignments = await TaskAssignment.findAll({
      where: { mentee_id: menteeId },
      include: { model: Task }, // include task details
    });

    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update task definition (mentor edits task info)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, dueDate, task } = req.body;

    const updated = await Task.update(
      { number, dueDate, task },
      { where: { id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update a mentee's task status
export const updateTaskStatus = async (req, res) => {
  // for debugging purpose
  console.log("End point hitted !");
  try {
    const { assignmentId } = req.params;
    const { status } = req.body;
    const updated = await TaskAssignment.update(
      { status },
      { where: { id: assignmentId } }
    );
    // if mentor approves completion
    if (status === "completed") {
      const assignment = await TaskAssignment.findByPk(assignmentId);
      if (assignment) {
        assignment.completionStatus = "approved";
        await assignment.save();
      }
    }

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Task status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete task (also deletes assignments)
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete assignments first
    await TaskAssignment.destroy({ where: { task_id: id } });

    // Delete task
    const deleted = await Task.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const requestCompletion = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const userId = req.user.student_id;
    const userRole = req.user.role;

    if (userRole !== "mentee") {
      return res
        .status(403)
        .json({ message: "Only mentees can request completion" });
    }

    const assignment = await TaskAssignment.findByPk(assignmentId);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    if (assignment.mentee_id !== userId) {
      return res.status(403).json({ message: "You cannot request this task" });
    }

    if (assignment.status !== "in-progress") {
      return res
        .status(400)
        .json({ message: "Task must be in-progress to request completion" });
    }
    assignment.completionStatus = "pending";
    await assignment.save();

    res.status(200).json({ message: "Completion request sent to mentor" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
