import React from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/client.js";

function Sidebar({
  title = "Dashboard",
  navItems = [],
  activePage,
  setActivePage,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authAPI.logout();
    navigate("/login");
  };
  return (
    <div className="w-40  bg-background text-foreground h-screen flex flex-col justify-between pt-10 border border-border rounded-lg">
      <div>
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActivePage(item)}
              className={`cursor-pointer py-2 transition ${
                activePage === item
                  ? "bg-primary text-foreground"
                  : "hover:bg-border"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button 
        onClick={handleLogout}
        className="mt-4 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
