import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { number, status, dueDate, task, mentorId, menteeId } = req.body;

    const newTask = await Task.create({
      number,
      status,
      dueDate,
      task,
      mentorId,
      menteeId,
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  console.log("Fetching all tasks");
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tasks by mentee
export const getTasksByMentee = async (req, res) => {
  try {
    const { menteeId } = req.params;
    const tasks = await Task.findAll({ where: { menteeId } });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task status
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, dueDate, task } = req.body;

    const updated = await Task.update(
      { status, dueDate, task },
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

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
