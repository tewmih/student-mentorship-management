import React from "react";

function Sidebar({
  title = "Dashboard",
  navItems = [],
  activePage,
  setActivePage,
}) {
  return (
    <div className="w-40  bg-card h-screen flex flex-col justify-between pt-10">
      <div>
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActivePage(item)}
              className={`cursor-pointer p-2 rounded-md transition ${
                activePage === item
                  ? "bg-primary text-white"
                  : "hover:bg-border"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button className="mt-4 text-red-500">Logout</button>
    </div>
  );
}

export default Sidebar;
