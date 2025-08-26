import Student from "../models/student.js";
import Mentor from "../models/mentor.js";
// Change role of a user by User ID
async function changeRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;
  // for debugging purpose
  console.log(`Changing role of user ${id} to ${role}`);
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    student.role = role;
    await student.save();
    return res.json({ message: "Role updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
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
export const AdminController = {
  listStudents,
  changeRole,
};
