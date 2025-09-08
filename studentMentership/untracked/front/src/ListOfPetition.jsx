import React, { useEffect, useState } from "react";
import axios from "axios";

function ListOfPetition() {
  const [petitions, setPetitions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState({});
  const [showMentorSelect, setShowMentorSelect] = useState({});
  const token = localStorage.getItem("token");

  // Fetch petitions
  const fetchPetitions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:4000/api/student-union/petitions",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setPetitions(data.petitions);
    } catch (err) {
      console.error("Error fetching petitions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available mentors
  const fetchMentors = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/student-union/availablementors",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMentors(Array.isArray(data) ? data : data.mentors || []);
    } catch (err) {
      console.error("Error fetching mentors:", err);
    }
  };

  useEffect(() => {
    fetchPetitions();
    fetchMentors();
  }, []);

  // Handle approve/reject action
  const handleAction = async (id, action) => {
    try {
      if (action === "approved" && !selectedMentor[id]) {
        alert("Please select a mentor first!");
        return;
      }

      const payload =
        action === "approved" ? { action, newMentorId: selectedMentor[id] } : { action };

      const response = await axios.post(
        `http://localhost:4000/api/student-union/petitions/${id}/resolve`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Backend response:", response.data);

      // Update status locally
      setPetitions((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: action } : p))
      );
      setShowMentorSelect((prev) => ({ ...prev, [id]: false }));
    } catch (err) {
      console.error(`Error ${action} petition:`, err.response || err);
      alert("Something went wrong! Check console.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading petitions...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Union - Petitions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b">Title</th>
              <th className="px-6 py-3 border-b">Reason</th>
              <th className="px-6 py-3 border-b">Mentee</th>
              <th className="px-6 py-3 border-b">Mentor</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {petitions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No petitions found.
                </td>
              </tr>
            ) : (
              petitions.map((p) => {
                // Filter mentors to exclude the current mentor
                const availableMentorsForPetition = mentors.filter(
                  (m) => m.mentor_id !== p.currentMentor?.mentor_id
                );

                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{p.title}</td>
                    <td className="px-6 py-4 border-b">{p.reason}</td>
                    <td className="px-6 py-4 border-b">{p.mentee?.mentee_id}</td>
                    <td className="px-6 py-4 border-b">{p.currentMentor?.mentor_id}</td>
                    <td
                      className={`px-6 py-4 border-b font-semibold ${
                        p.status === "approved"
                          ? "text-green-600"
                          : p.status === "rejected"
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}
                    >
                      {p.status.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 border-b">
                      {p.status === "pending" ? (
                        <div className="flex flex-col space-y-2">
                          {!showMentorSelect[p.id] ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  setShowMentorSelect((prev) => ({ ...prev, [p.id]: true }))
                                }
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleAction(p.id, "rejected")}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2 items-center">
                              <select
                                value={selectedMentor[p.id] || ""}
                                onChange={(e) =>
                                  setSelectedMentor((prev) => ({ ...prev, [p.id]: e.target.value }))
                                }
                                className="px-2 py-1 border rounded"
                              >
                                <option value="">Select Mentor</option>
                                {availableMentorsForPetition.map((m) => (
                                  <option key={m.id} value={m.mentor_id}>
                                    {m.Student?.full_name || "Unnamed"} ({m.mentor_id}) -{" "}
                                    {m.mentee_count} mentees
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleAction(p.id, "approved")}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                disabled={!selectedMentor[p.id]}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  setShowMentorSelect((prev) => ({ ...prev, [p.id]: false }))
                                }
                                className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500 font-semibold">Actioned</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfPetition;
