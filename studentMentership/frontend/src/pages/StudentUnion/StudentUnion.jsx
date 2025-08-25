import AASTUStudent from "../../features/AASTUStudent";
import Chat from "../../features/Chat";
import Mentee from "../../features/Mentee";
import Mentor from "../../features/Mentor";
import StudentDashboard from "../../features/StudentDashboard";
import React, { useState } from "react";
// import {
//   Bell,
//   Home,
//   LogOut,
//   MessageSquare,
//   PersonStanding,
//   Settings,
//   User,
//   ListTodo,
//   CalendarDays,
//   FileText,
// } from "lucide-react";

function Sidebar({
  title = "Dashboard",
  navItems = [],
  activePage,
  setActivePage,
}) {
  return (
    <div className="max-w- bg-white shadow-md h-screen flex flex-col justify-between p-4 rounded-r-2xl">
      <div>
        <h2 className="text-xl font-bold mb-6 text-gray-800">{title}</h2>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActivePage(item)}
              className={`cursor-pointer p-2 rounded-md transition ${
                activePage === item
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button className="mt-4 text-red-500 font-medium">Logout</button>
    </div>
  );
}

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
        return <PlaceholderPage pageName="Tasks" />;
      case "Application":
        return <PlaceholderPage pageName="Application" />;
      case "Schedule":
        return <PlaceholderPage pageName="Schedule" />;
      case "Settings":
        return <PlaceholderPage pageName="Settings" />;
      case "Logout":
        return <PlaceholderPage pageName="Logout" />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex h-screen  bg-gray-50 font-sans">
      <Sidebar
        title="Student Union"
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {renderContent()}
    </div>
  );
}

export default StudentUnion;
