// components/UpcomingSessions.jsx
import React from "react";

const sessions = [
  {
    title: "Time Management Workshop",
    time: "today at 3 pm",
    type: "Group",
    status: "Confirmed",
  },
  {
    title: "One-on-One: Check-in",
    time: "tomorrow at 2:00 PM",
    type: "Individual",
    status: "Confirmed",
  },
  {
    title: "Study Group",
    time: "Monday at 1:00 PM",
    type: "Group",
    status: "Pending",
  },
];

export default function UpcomingSessions() {
  return (
    <div className="w-300 p-50 ml-40">
      <div className="border rounded-lg p-4 space-y-4 ">
        <h2 className="font-bold">Upcoming Sessions</h2>
        {sessions.map((s, i) => (
          <div
            key={i}
            className="border rounded-md p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{s.title}</p>
              <p className="text-sm text-gray-500">{s.time}</p>
              <p className="text-xs text-gray-400">{s.status}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{s.type}</p>
              <button className="mt-1 bg-blue-500 text-white px-3 py-1 rounded-md">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
