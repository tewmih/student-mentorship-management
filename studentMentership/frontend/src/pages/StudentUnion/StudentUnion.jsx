import { useState } from "react";
import AASTUStudent from "../../features/studentunion/AASTUStudent.jsx";
import Chat from "../../features/studentunion/Chat.jsx";
import Mentee from "../../features/studentunion/Mentee.jsx";
import Mentor from "../../features/studentunion/Mentor.jsx";
import StudentDashboard from "../../features/studentunion/StudentDashboard.jsx";
import Task from "../../features/studentunion/GivenTask.jsx";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Schedule from "../../features/studentunion/Schedule.jsx";

import ApplicationList from "../../features/studentunion/ApplicationList.jsx";

function StudentUnion() {
  const navItems = [
    "Dashboard",
    "AASTU Student",
    "AASTU Mentee",
    "AASTU Mentor",
    "Task",
    "Application",
    "Schedule",
    "Messages",
    "Settings",
  ];

  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <StudentDashboard />;
      case "AASTU Student":
        return <AASTUStudent />;
      case "AASTU Mentee":
        return <Mentee />;
      case "AASTU Mentor":
        return <Mentor />;
      case "Messages":
        return <Chat />;
      case "Task":
        return <Task />;
      case "Application":
        return <ApplicationList />;
      case "Schedule":
        return <Schedule />;
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
        title="Student Union"
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

export default StudentUnion;
