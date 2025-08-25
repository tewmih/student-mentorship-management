import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import MentorDashboard from "./mentor-subpages/MentorDashboard.jsx";
import MenteeAnalysis from "./mentor-subpages/MenteeAnalysis";
import Messages from "./mentor-subpages/Messages";
import GiveTask from "./mentor-subpages/GiveTasks";

// Placeholder until you create real components
const PlaceholderPage = ({ pageName }) => <div>{pageName} Page</div>;
const StudentDashboard = () => <div>Student Dashboard</div>;

function MentorPage() {
  const navItems = [
    "Dashboard",
    "Your-Mentees",
    "Give-Tasks",
    "Upcomming-Sessions",
    "Messages",
    "Settings",
  ];

  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <MentorDashboard />;
      case "Your-Mentees":
        return <MenteeAnalysis />;
      case "Give-Tasks":
        return <GiveTask />;
      case "Upcomming-Sessions": // fixed case
        return <div>UpcomingSessions</div>;
      case "Messages":
        return <Messages />;
      case "Settings":
        return <PlaceholderPage pageName="Settings" />;
      case "Logout":
        return <PlaceholderPage pageName="Logout" />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar
        title="Dashboard"
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
}

export default MentorPage;

