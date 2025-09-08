import React, { useState, useEffect } from "react";

function AssignStudentUnion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newRole, setNewRole] = useState("");
  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/student-union/students",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Change role API
  const changeRole = async () => {
    if (!selectedStudent || !newRole) return;
    // 1️⃣ Update UI immediately
    setStudents((prev) =>
      prev.map((student) =>
        student.student_id === selectedStudent.student_id
          ? { ...student, role: newRole }
          : student
      )
    );
    // 2️⃣ Close modal
    setSelectedStudent(null);
    setNewRole("");
    // 3️⃣ Send API request
    try {
      const res = await fetch(
        `http://localhost:4000/api/admin/change-role/${selectedStudent.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );
      if (!res.ok) {
        console.error("Failed to change role on server");
        // Optional: revert UI if server fails
      }
      else{
        alert("Role changed successfully");
      }
    } catch (error) {
      console.error("Error changing student role:", error);
      // Optional: revert UI if API fails
    }
  };
  const filteredStudents = students.filter((student) =>
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return <div className="text-center mt-10">Loading students...</div>;
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Manage Student Roles
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search students by ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 border-b border-gray-300">
                Student ID
              </th>
              <th className="text-left px-6 py-3 border-b border-gray-300">
                Full Name
              </th>
              <th className="text-left px-6 py-3 border-b border-gray-300">
                Current Role
              </th>
              <th className="text-left px-6 py-3 border-b border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.student_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">
                    {student.student_id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {student.full_name}
                  </td>
                  <td
                    className={`px-6 py-4 border-b border-gray-200 font-semibold ${
                      student.role === "student_union"
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    {student.role.replace("_", " ").toUpperCase()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <button
                      type="button"
                      onClick={() => setSelectedStudent(student)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Change Role for {selectedStudent.full_name}
            </h2>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
              <option value="">-- Select Role --</option>
              <option value="mentee">mentee</option>
              <option value="student_union">student_union</option>
              <option value="mentor">mentor</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={changeRole}
                disabled={!newRole}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignStudentUnion;
