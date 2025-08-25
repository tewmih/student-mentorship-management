"use client";
import React, { useState } from "react";
import TasksTable from "../../ui/TaskTable";
import Sidebar from "../../components/sidebar/Sidebar";
import Mentee from "../Mentee";
function Task() {
  const [activePage, setActivePage] = useState("Dashboard");
  const navItems = ["Dashboard", "Analytics", "Settings", "Profile"];

  const tasks = [
    {
      id: "1",
      number: "001",
      task: "Complete report",
      dueDate: "2025-08-25",
      status: "completed",
    },
    {
      id: "2",
      number: "002",
      task: "Prepare presentation",
      dueDate: "2025-08-27",
      status: "pending",
    },
    {
      id: "1",
      number: "001",
      task: "Complete report",
      dueDate: "2025-08-25",
      status: "completed",
    },
    {
      id: "2",
      number: "002",
      task: "Prepare presentation",
      dueDate: "2025-08-27",
      status: "pending",
    },
    {
      id: "3",
      number: "003",
      task: "Team meeting",
      dueDate: "2025-08-26",
      status: "in-progress",
    },
  ];

  return (
    <div className="flex flex-row bg-gray-50">
      <Sidebar
        title="My App"
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="w-full">
        <TasksTable tasks={tasks} />
      </div>
    </div>
  );
}

export default Task;
