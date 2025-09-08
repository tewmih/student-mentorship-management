import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyMentor() {
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/mentee/mentor",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Keep the full response with both mentor and assignedMentor
        setMentorData(response.data);
        console.log("Mentor data fetched successfully:", response.data);

        // Save mentor_id in localStorage
        if (response.data.mentor?.id) {
          localStorage.setItem("mentor_id", response.data.mentor.id);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching mentor");
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading mentor...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  if (!mentorData)
    return <p className="text-center text-gray-500 mt-10">No mentor assigned.</p>;

  const { mentor: mentorUser, assignedMentor } = mentorData;

  // Get initials from mentor's full name
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((n) => n[0].toUpperCase()).join("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">My Assigned Mentor</h1>

      <div className="flex items-center gap-4 p-4 border rounded-lg shadow bg-white">
        {/* Avatar */}
        <div className="w-14 h-14 flex items-center justify-center bg-indigo-600 text-white rounded-full text-lg font-bold">
          {getInitials(mentorUser?.full_name)}
        </div>

        {/* Mentor Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{mentorUser?.full_name || "N/A"}</h3>
          <p><strong>Student ID:</strong> {mentorUser?.student_id || "N/A"}</p>
          <p><strong>Email:</strong> {mentorUser?.email || "N/A"}</p>
          <p><strong>Department:</strong> {mentorUser?.department || "N/A"}</p>
          <p>
            <strong>Role:</strong>{" "}
            {mentorUser?.role?.replace("_", " ").toUpperCase() || "N/A"}
          </p>
          <p>
            <strong>Assigned At:</strong>{" "}
            {assignedMentor ? new Date(assignedMentor.assigned_at).toLocaleString() : "N/A"}
          </p>
        </div>

        {/* Chat Button */}
        <button
          onClick={() => navigate(`/chat/${mentorUser?.student_id}`)}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          title={`Chat with ${mentorUser?.full_name || ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.5 0-2.91-.356-4.127-.975L3 21l1.975-4.873A7.969 7.969 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MyMentor;
