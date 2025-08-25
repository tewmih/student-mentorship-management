import User from "../models/user.js";
// Assign Student Union Role to a user by User ID
async function assignUnion(req, res) {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role;
    await user.save();
    return res.json({ message: "Role updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
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

// list of all mentors
async function listMentors(req, res) {
  try {
    const mentors = await User.findAll({ where: { role: "mentor" } });
    return res.json(mentors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const AdminController = {
  listUsers,
  assignUnion,
  listMentors,
};
