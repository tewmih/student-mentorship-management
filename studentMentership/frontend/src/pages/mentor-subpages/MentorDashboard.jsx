import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import StatsCard from "../../components/barGraph/stats-card";
import { Users } from "lucide-react";
import DonutChart from "../../ui/chart/DonutChart";
import LineChart from "../../ui/chart/LineChart";
import MenteeList from "../../components/My-mentee";

const MentorDashboard = () => {
  const menteesData = [
    { id: "1", name: "Alice", avatar: "/avatars/alice.png" },
    { id: "2", name: "Bob", avatar: "/avatars/bob.png" },
    { id: "3", name: "Charlie", avatar: "/avatars/charlie.png" },
  ];
  const [activePage, setActivePage] = useState("Dashboard");

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

  // Define the data for the navigation items as an array of strings.
  const navItems = [
    "Dashboard",
    "Give Tasks",
    "Schedule",
    "Settings",
    "Profile",
  ];
  return (
    <div className="flex flex-row bg-gray-50">
      <div className=" rounded-lg  px-5 w-full">
        <div className="flex flex-row justify-between h-20 bg-white mb-5  w-auto">
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
        </div>
        <div className="flex flex-col bg-white sm:flex-row justify-center items-center">
          <DonutChart />
          <LineChart
            data={progressData}
            title="Your past Progress"
            tooltipLabel="progress"
          />
        </div>
      </div>
      <div>
        <MenteeList mentees={menteesData} />
      </div>
    </div>
  );
};

export default MentorDashboard;
