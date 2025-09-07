import React, { useEffect, useState } from "react";
import axios from "axios";

function MentorApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/student-union/mentor-applications",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        setApplications(response.data.applications); // use applications directly
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching data");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getInitials = (name = "") => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleAccept = async (app) => {
    try {
      await axios.post(
        `http://localhost:4000/api/student-union/mentor-applications/${app.id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(`Application for ${app.Mentor?.Student?.full_name || app.mentor_id} accepted!`);

      setApplications((prev) =>
        prev.map((a) => (a.id === app.id ? { ...a, status: "approved" } : a))
      );
    } catch {
      alert("Error accepting application");
    }
  };

  const handleReject = async (app) => {
    try {
      await axios.post(
        `http://localhost:4000/api/student-union/mentor-applications/${app.id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(`Application for ${app.Mentor?.Student?.full_name || app.mentor_id} rejected!`);

      setApplications((prev) =>
        prev.map((a) => (a.id === app.id ? { ...a, status: "rejected" } : a))
      );
    } catch {
      alert("Error rejecting application");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading applications...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Mentor Applications</h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => {
            const student = app.Mentor?.Student;
            return (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg mr-4">
                    {getInitials(student?.full_name || app.mentor_id)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {student?.full_name || app.mentor_id}
                    </h3>
                    <p className="text-gray-600">
                      <strong>Student ID:</strong> {student?.student_id || app.mentor_id}
                    </p>
                    <p className="text-gray-600">
                      <strong>Email:</strong> {student?.email || "-"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Department:</strong> {student?.department || "-"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Motivation:</strong> {app.motivation}
                    </p>
                    {app.experience && (
                      <p className="text-gray-600">
                        <strong>Experience:</strong> {app.experience}
                      </p>
                    )}
                    <p className="text-gray-600">
                      <strong>Region:</strong> {app.region}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {app.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAccept(app)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(app)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
                  ) : app.status === "approved" ? (
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded font-semibold text-center">
                      Approved
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-200 text-red-800 rounded font-semibold text-center">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MentorApplications;
