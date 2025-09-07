import React, { useState, useEffect } from "react";
import axios from "axios";

function ListOfStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/student-union/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching students");
        setLoading(false);
      });
  }, []);

  const filteredStudents = students.filter((student) =>
    student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading students...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">List of Students</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Student ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 border-b border-gray-300">Student ID</th>
              <th className="text-left px-6 py-3 border-b border-gray-300">Full Name</th>
              <th className="text-left px-6 py-3 border-b border-gray-300">Email</th>
              <th className="text-left px-6 py-3 border-b border-gray-300">Department</th>
              <th className="text-left px-6 py-3 border-b border-gray-300">Year</th>
              <th className="text-left px-6 py-3 border-b border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 border-b border-gray-200">{student.student_id}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{student.full_name}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{student.email}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{student.department}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{student.year}</td>
                  <td
                    className={`px-6 py-4 border-b border-gray-200 font-semibold ${
                      student.status === "active" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfStudents;
