import { useState } from "react";
import AASTUStudent from "../../features/Admin/AASTUStudent";
// import Chat from "../../features/Admin/Chat";
import Mentee from "../../features/Admin/Mentee";
import Mentor from "../../features/Admin/Mentor";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentUnion from "../../features/Admin/StudentUnion";
function Admin() {
  const navItems = [
    "AASTU Student",
    "AASTU Student Union",
    "AASTU Mentor",
    "AASTU Mentee",
    "Settings",
  ];

  const [activePage, setActivePage] = useState("AASTU Student");

  const renderContent = () => {
    switch (activePage) {
      case "AASTU Student":
        return <AASTUStudent />;
      case "AASTU Student Union":
        return <StudentUnion />;
      case "AASTU Mentor":
        return <Mentor />;
      case "AASTU Mentee":
        return <Mentee />;

      case "Settings":
        return <PlaceholderPage pageName="Settings" />;
      case "Logout":
        return <PlaceholderPage pageName="Logout" />;
      default:
        return <AASTUStudent />;
    }
  };
  return (
    <div className="flex flex-1 pt-20">
      <Sidebar
        title="Admin"
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

export default Admin;
