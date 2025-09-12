import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar.jsx";
import MentorDashboard from "./mentor-subpages/MentorDashboard.jsx";
import Mentee from "./mentor-subpages/Mentee";
import Messages from "./mentor-subpages/Messages";
import Task from "./mentor-subpages/GivenTask.jsx";
import Schedule from "./mentor-subpages/Schedule.jsx";
import MentorApplicationForm from "../features/mentor/Application.jsx";
import { useLocation } from "react-router-dom";

// Placeholder until you create real components
const PlaceholderPage = ({ pageName }) => <div>{pageName} Page</div>;
const StudentDashboard = () => <div>Student Dashboard</div>;

function MentorPage() {
  const [activePage, setActivePage] = useState("Dashboard");
  const location = useLocation();
  console.log(location);
  const navItems = [
    "Dashboard",
    "My Mentee",
    "Task",
    "Schedule",
    "Application",
    "Messages",
    "Settings",
  ];
   // Check for navigation state when component mounts
   useEffect(() => {
    if (location.state?.currentPage) {
      setActivePage(location.state.currentPage);
    }
  }, [location.state]);

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <MentorDashboard />;
      case "My Mentee":
        return <Mentee />;
      case "Task":
        return <Task />;
      case "Schedule": // fixed case
        return <Schedule />;
      case "Application": // fixed case
        return <MentorApplicationForm />;
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
    <div className="flex flex-1 pt-20">
      <Sidebar
        title="Mentor"
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
        className=""
      />
      <div className="flex-1  py-2 px-5 overflow-y-auto bg-background text-foreground border border-border rounded-lg">
        {renderContent(activePage)}
      </div>
    </div>
  );
}

export default MentorPage;
