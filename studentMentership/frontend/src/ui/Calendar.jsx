import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default react-calendar styles

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex justify-center  bg-gray-50">
      {/* Calendar */}
      <div className="bg-white rounded-xl  p-6 w-70">
        <h2 className="mb-4 text-center text-gray-700">My Schedule</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="w-full h-82 rounded  mt-12 react-calendar-custom"
        />
      </div>
    </div>
  );
}

export default CalendarComponent;
