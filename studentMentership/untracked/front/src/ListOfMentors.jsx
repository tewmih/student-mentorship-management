import React, { useEffect, useState } from "react";
import axios from "axios";

function ListOfMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch mentors from backend
  const fetchMentors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:4000/api/student-union/mentors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Flatten the nested structure to get Student info directly
      const flattenedMentors = data.map((app) => ({
        id: app.Mentor.id,
        student_id: app.Mentor.Student.student_id,
        full_name: app.Mentor.Student.full_name,
        email: app.Mentor.Student.email,
        department: app.Mentor.Student.department,
        mentee_assigned: app.Mentor.mentee_assigned,
        application_status: app.status, // optional if you want
      }));

      setMentors(flattenedMentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading mentors...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">List of Mentors</h1>
      {mentors.length === 0 ? (
        <p className="text-center text-gray-500">No mentors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b border-gray-300">ID</th>
                <th className="px-6 py-3 border-b border-gray-300">Student ID</th>
                <th className="px-6 py-3 border-b border-gray-300">Full Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Email</th>
                <th className="px-6 py-3 border-b border-gray-300">Department</th>
                <th className="px-6 py-3 border-b border-gray-300">Mentee Assigned</th>
                <th className="px-6 py-3 border-b border-gray-300">Application Status</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">{mentor.id}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{mentor.student_id}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{mentor.full_name}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{mentor.email}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{mentor.department}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{mentor.mentee_assigned ? "Yes" : "No"}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{mentor.application_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListOfMentors;
