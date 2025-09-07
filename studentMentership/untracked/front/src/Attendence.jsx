import React, { useState } from "react";
import axios from "axios";

function Attendance({ sessionId }) {
  const token = localStorage.getItem("token");

  const [mentees, setMentees] = useState([]);
  // fetch real mentees endpoint is :http://localhost:4000/api/mentor/mentees
  const fetchMentees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/mentor/mentees", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMentees(response.data);
    } catch (error) {
      console.error("Error fetching mentees:", error);
    }
  };

  const toggleAttendance = (mentee_id) => {
    setMentees((prev) =>
      prev.map((m) =>
        m.mentee_id === mentee_id ? { ...m, attended: !m.attended } : m
      )
    );
  };
  const saveAttendance = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/attendance/take/${sessionId}`,
        { mentees },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("❌ Failed to save attendance");
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Take Attendance</h2>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Mentee ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Attended</th>
          </tr>
        </thead>
        <tbody>
          {mentees.map((mentee, index) => (
            <tr key={mentee.mentee_id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{mentee.mentee_id}</td>
              <td className="border px-4 py-2">{mentee.name}</td>
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={mentee.attended}
                  onChange={() => toggleAttendance(mentee.mentee_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={saveAttendance}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Attendance
      </button>
    </div>
  );
}

export default Attendance;
