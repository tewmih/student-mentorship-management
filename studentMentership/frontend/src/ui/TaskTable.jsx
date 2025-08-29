"use client";
import React from "react";

/**
 * A utility object to map task statuses to Tailwind CSS styles.
 * This makes the component more readable and maintainable.
 */
const statusStyles = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
};

/**
 * TasksTable component that displays a list of tasks in a table format.
 * It's a "use client" component, meaning it runs on the client-side.
 * @param {object} props - The component props.
 * @param {Array<object>} props.tasks - An array of task objects to display.
 */
const TasksTable = ({ tasks }) => {
  return (
    <div className="bg-background text-foreground border border-border rounded-lg">
      {/* Table header section */}
      <div className="p-6 border-b border-foreground/20">
        <h2 className="text-lg font-semibold text-foreground">Your Tasks</h2>
      </div>

      {/* Main table content, wrapped for horizontal scrolling on smaller screens */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table head */}
          <thead className="bg-background text-foreground border border-border">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-foreground/60 uppercase">
                Number
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-foreground/60 uppercase">
                Task
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-foreground/60 uppercase">
                Due Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="divide-y divide-gray-200">
            {/* Map over the tasks array to render a table row for each task */}
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {task.number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{task.task}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {task.dueDate}
                </td>
                <td className="px-6 py-4">
                  {/* Corrected className with template literals to merge styles */}
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      statusStyles[task.status]
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksTable;
