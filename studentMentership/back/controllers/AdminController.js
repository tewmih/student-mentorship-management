import User from "../models/user.js";
async function listUsers(req, res) {
  try {
    const users = await User.findAll();

    return res.json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
// Assign Student Union Role to a user by User ID
async function assignUnion(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "student_union";
    await user.save();

    return res.json({ message: "Role updated to Student Union successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Assign Student Union Role to a user by User ID
async function assignUnion(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "student_union";
    await user.save();

    return res.json({ message: "Role updated to Student Union successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  listUsers,
  assignUnion,
};
