import React, { useEffect, useState } from "react";
import axios from "axios";

function getInitials(name) {
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

function MyMentee() {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/mentor/mentees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      })
      .then((res) => {
        setMentees(res.data.mentees);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mentees:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading mentees...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-center">My Mentees</h1>

      {mentees.length === 0 ? (
        <p className="text-center text-gray-500">No mentees assigned yet.</p>
      ) : (
        <ul className="space-y-6">
          {mentees.map((mentee) => (
            <li
              key={mentee.id}
              className="flex items-center border rounded-lg p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold mr-6">
                {getInitials(mentee.full_name)}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {mentee.full_name}
                </h2>
                <div className="text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Student ID:</span>{" "}
                    {mentee.student_id}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {mentee.email}
                  </p>
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {mentee.department}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyMentee;
