import { useState } from "react";
import AASTUStudent from "../../features/AASTUStudent";
import Chat from "../../features/Chat";
import Mentee from "../../features/Mentee";
import Mentor from "../../features/Mentor";
import StudentDashboard from "../../features/StudentDashboard";
import Task from "../../features/GivenTask";
import Sidebar from "../../components/sidebar/Sidebar";
import Schedule from "../../features/Schedule";

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
        return <PlaceholderPage pageName="Application" />;
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
      <div className="flex-1  py-2 px-5 overflow-y-auto">
        {renderContent(activePage)}
      </div>
    </div>
  );
}

export default StudentUnion;
