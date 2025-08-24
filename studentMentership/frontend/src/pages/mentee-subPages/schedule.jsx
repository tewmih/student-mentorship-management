import React, { useState } from "react";

// Simple calendar for demo purposes
function Calendar({ selectedDate, onSelect }) {
  // March 2021
  const days = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, null, null, null],
  ];
  return (
    <div className="bg-white rounded-xl shadow p-6 w-72">
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-400 hover:text-gray-600" disabled>
          &lt;
        </button>
        <div className="font-semibold text-gray-700">
          March <span className="font-normal text-gray-500">2021</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600" disabled>
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-1">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.flat().map((day, idx) =>
          day ? (
            <button
              key={idx}
              className={`w-8 h-8 rounded-full transition ${
                selectedDate === day
                  ? "bg-blue-500 text-white font-bold"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
              onClick={() => onSelect(day)}
            >
              {day}
            </button>
          ) : (
            <div key={idx} />
          )
        )}
      </div>
    </div>
  );
}

function UpcomingSessionCard({ subject }) {
  return (
    <div className="flex items-center bg-white rounded-xl shadow mb-4 px-5 py-3 w-full max-w-xs">
      <span className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-4">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="3" fill="#3BB3F6" />
          <rect x="7" y="7" width="10" height="10" rx="2" fill="#fff" />
        </svg>
      </span>
      <span className="font-semibold text-gray-700">{subject}</span>
    </div>
  );
}

function Schedule() {
  const [selectedDate, setSelectedDate] = useState(13);

  return (
    <div className="flex justify-center items-start gap-12 py-12 bg-gray-50 min-h-screen">
      {/* Calendar */}
      <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />

      {/* Upcoming Sessions */}
      <div className="flex flex-col items-start">
        <h2 className="font-bold text-lg mb-6 ml-2">Upcomming session</h2>
        <UpcomingSessionCard subject="Psychology" />
        <UpcomingSessionCard subject="Psychology" />
        <UpcomingSessionCard subject="Psychology" />
      </div>
    </div>
  );
}

export default Schedule;