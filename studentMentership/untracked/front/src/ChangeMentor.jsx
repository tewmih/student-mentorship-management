import React, { useState, useEffect } from "react";
import axios from "axios";

const ChangeMentor = ({ menteeId }) => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch available mentors (with mentee_assigned=false or <10 mentees)
    const fetchMentors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/student-union/availablementors",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMentors(res.data || []);
      } catch (err) {
        console.error("Error fetching mentors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [token]);

  const handleChangeMentor = async () => {
    if (!selectedMentor) return alert("Please select a mentor");

    try {
      await axios.put(
        "http://localhost:4000/api/student-union/change-mentor",
        {
          menteeId,         
          newMentorId: selectedMentor,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Mentor changed successfully!");
      setSelectedMentor("");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to change mentor. Check if the mentor can accept more mentees."
      );
    }
  };

  if (loading) return <p className="text-center mt-10">Loading mentors...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Change Mentor</h2>
      <select
        value={selectedMentor}
        onChange={(e) => setSelectedMentor(e.target.value)}
        className="border px-2 py-1 w-full mb-4"
      >
        <option value="">Select a mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor.mentor_id} value={mentor.mentor_id}>
            {mentor.full_name || mentor.mentor_id} ({mentor.email || "No email"})
          </option>
        ))}
      </select>
      <button
        onClick={handleChangeMentor}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!selectedMentor}
      >
        Request Change
      </button>
    </div>
  );
};

export default ChangeMentor;
