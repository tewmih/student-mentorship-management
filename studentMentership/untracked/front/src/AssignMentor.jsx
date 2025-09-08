import React, { useEffect, useState } from "react";
import axios from "axios";

function AssignMentor() {
  const [mentors, setMentors] = useState([]);
  const [freshmen, setFreshmen] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [loadingFreshmen, setLoadingFreshmen] = useState(false);
  const [error, setError] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedFreshmen, setSelectedFreshmen] = useState([]);
  const [activeMentorId, setActiveMentorId] = useState(null);

  // Fetch mentors
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/student-union/availablementors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setMentors(res.data))
      .catch((err) => setError(err.message || "Error fetching mentors"))
      .finally(() => setLoadingMentors(false));
  }, []);

  // Fetch freshmen only when a mentor is selected
  const fetchFreshmen = () => {
    setLoadingFreshmen(true);
    axios
      .get("http://localhost:4000/api/student-union/studentsWithoutMentor", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const mentees = res.data.filter((user) => user.role === "mentee");
        setFreshmen(mentees);
      })
      .catch((err) => setError(err.message || "Error fetching freshmen"))
      .finally(() => setLoadingFreshmen(false));
  };

  // Filter freshmen by student_id and region
  const filteredFreshmen = freshmen.filter(
    (f) =>
      f.student_id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion === "" || f.region === selectedRegion)
  );

  // Toggle selection by student_id
  const toggleFreshman = (student_id) => {
    setSelectedFreshmen((prev) =>
      prev.includes(student_id)
        ? prev.filter((sid) => sid !== student_id)
        : [...prev, student_id]
    );
  };

  // Assign mentor to selected freshmen
  const handleAssign = (mentor) => {
    if (selectedFreshmen.length === 0) {
      alert("Please select at least one freshman.");
      return;
    }

    // Prevent assigning if mentee count >= 10
    if (mentor.mentee_count >= 10) {
      alert("This mentor already has 10 mentees and cannot take more.");
      return;
    }

    setAssigning(true);
    axios
      .post(
        "http://localhost:4000/api/student-union/assign-mentor",
        {
          mentor_id: mentor.mentor_id,
          mentee_ids: selectedFreshmen,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        alert(
          `Mentor ${mentor.full_name || mentor.mentor_id} assigned successfully!`
        );
        setSelectedFreshmen([]);
        setActiveMentorId(null);
      })
      .catch(() => alert("Error assigning mentor"))
      .finally(() => setAssigning(false));
  };

  if (loadingMentors)
    return (
      <p className="text-center text-gray-500 mt-10">Loading mentors...</p>
    );
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Assign Mentors to Freshmen
      </h2>

      {mentors.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No mentors available to assign.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {mentors.map((mentor) => {
            const isFull = mentor.mentee_count >= 10;
            return (
              <div
                key={mentor.mentor_id}
                className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {mentor.full_name || mentor.mentor_id} (
                      {mentor.mentee_count} mentees)
                    </h3>
                    {mentor.mentee_assigned && !isFull && (
                      <span className="text-sm text-yellow-600">
                        Currently assigned, can take more
                      </span>
                    )}
                    {isFull && (
                      <span className="text-sm text-red-600 font-semibold">
                        Full (10 mentees)
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (activeMentorId === mentor.mentor_id) {
                        setActiveMentorId(null);
                      } else {
                        setActiveMentorId(mentor.mentor_id);
                        fetchFreshmen();
                      }
                    }}
                    disabled={isFull}
                    className={`px-4 py-2 rounded text-white transition ${
                      isFull
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {activeMentorId === mentor.mentor_id
                      ? "Cancel"
                      : "Assign to Freshmen"}
                  </button>
                </div>

                {activeMentorId === mentor.mentor_id && !isFull && (
                  <div className="mt-4 flex flex-col gap-2">
                    {/* Search by ID */}
                    <input
                      type="text"
                      placeholder="Search freshman by ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full max-w-md border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                    />

                    {/* Filter by region */}
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full max-w-md border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                    >
                      <option value="">All Regions</option>
                      <option value="Tigray">Tigray</option>
                      <option value="Amhara">Amhara</option>
                      <option value="Oromia">Oromia</option>
                      <option value="SNNP">SNNP</option>
                      <option value="Afar">Afar</option>
                      <option value="Somali">Somali</option>
                    </select>

                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded p-4">
                      {loadingFreshmen ? (
                        <p className="text-center text-gray-500">
                          Loading freshmen...
                        </p>
                      ) : filteredFreshmen.length === 0 ? (
                        <p className="text-gray-500 text-center">
                          No freshmen found.
                        </p>
                      ) : (
                        filteredFreshmen.map((f) => (
                          <label
                            key={f.student_id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={selectedFreshmen.includes(f.student_id)}
                              onChange={() => toggleFreshman(f.student_id)}
                              className="w-4 h-4"
                            />
                            <span>
                              {f.full_name} ({f.student_id}) - {f.region}
                            </span>
                          </label>
                        ))
                      )}
                    </div>

                    <button
                      onClick={() => handleAssign(mentor)}
                      disabled={assigning}
                      className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
                    >
                      {assigning ? "Assigning..." : "Confirm Assignment"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AssignMentor;
