import React, { useState, useEffect } from "react";

function Session() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/mentee/sessions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setSessions(data.sessions || []);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading sessions...</div>;
  }

  if (sessions.length === 0) {
    return <div className="text-center mt-10">No sessions available.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Sessions</h1>
      {sessions.map((session) => (
        <div
          key={session.id}
          className="border rounded-lg shadow p-6 bg-white hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
          <p className="text-gray-700 mb-1">
            <strong>Description:</strong> {session.description || "No description"}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Scheduled At:</strong>{" "}
            {new Date(session.scheduled_at).toLocaleString()}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Type:</strong> {session.session_type.toUpperCase()}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Created At: {new Date(session.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Session;
