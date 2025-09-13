import React from "react";
import LineChart from "../../ui/chart/LineChart";
import DonutChart from "../../ui/chart/DonutChart";
function MentorDashboard() {
  const progressData = [
    { label: "February", value: 72, date: "Feb 14th, 2020" },
    { label: "March", value: 18, date: "Mar 22nd, 2020" },
    { label: "April", value: 45, date: "Apr 8th, 2020" },
    { label: "May", value: 89, date: "May 15th, 2020" },
    { label: "June", value: 34, date: "Jun 3rd, 2020" },
    { label: "July", value: 67, date: "Jul 12th, 2020" },
    { label: "August", value: 23, date: "Aug 28th, 2020" },
    { label: "September", value: 56, date: "Sep 5th, 2020" },
    { label: "October", value: 99, date: "Oct 18th, 2020" },
    { label: "November", value: 78, date: "Nov 9th, 2020" },
    { label: "December", value: 41, date: "Dec 25th, 2020" },
  ];
  return (
    <div className="w-full h-full flex flex-row gap-4 bg-background text-foreground border border-border rounded-lg">
      <div className="w-1/2 h-full">
        <DonutChart
          percentage={22}
          title="Customer Growth"
          activeColor="#10b981"
          backgroundColor="#d1fae5"
        />
      </div>
      <LineChart
        data={progressData}
        title="Your past Progress"
        tooltipLabel="progress"
      />
    </div>
  );
}

export default MentorDashboard;
