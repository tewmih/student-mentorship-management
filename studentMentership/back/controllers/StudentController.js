import axios from "axios";
import Student from "../models/student.js";
import Sequelize from "sequelize";
// Fetch students from another Node API and upsert into DB
async function fetchFromNode(req, res) {
  const nodeApiUrl = "http://localhost:3000/students";
  try {
    const response = await axios.get(nodeApiUrl);
    if (!response.data) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch students from Node API",
      });
    }
    const students = response.data;
    // Use a transaction for atomic upsert
    const sequelize = Student.sequelize;
    await sequelize.transaction(async (t) => {
      for (const row of students) {
        await Student.upsert(
          {
            student_id: row.StudentID,
            full_name: row.FullName,
            email: row.Email,
            department: row.Department,
            year: row.Year,
            status: row.Status,
            username: row.StudentID,
          },
          { transaction: t }
        );
      }
    });

    return res.json({
      success: true,
      message: "Students imported successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to import students: " + error.message,
    });
  }
}

export const StudentController = {
  fetchFromNode,
};
