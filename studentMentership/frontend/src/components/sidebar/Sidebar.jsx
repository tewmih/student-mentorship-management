import React from "react";

function Sidebar({
  title = "Dashboard",
  navItems = [],
  activePage,
  setActivePage,
}) {
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
      <button className="mt-4 text-red-500">Logout</button>
    </div>
  );
}

export default Sidebar;
