import React, { useState, useMemo } from "react";

const Task = ({ tasks = [], title, actionType }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Use useMemo to filter and sort the tasks efficiently,
  // preventing unnecessary re-calculations on every render
  const filteredAndSortedTasks = useMemo(() => {
    // 1. Filter tasks based on the search term
    let filtered = tasks.filter(
      (t) =>
        // Add a check to ensure t.task exists before calling toLowerCase()
        t.task && t.task.toLowerCase().includes(search.toLowerCase())
    );

    // 2. Sort the filtered tasks based on the selected sort option
    const sorted = filtered.sort((a, b) => {
      if (sortBy === "Name") {
        return a.task.localeCompare(b.task);
      }
      if (sortBy === "Due Date") {
        // Assuming date format is DD/MM/YYYY for comparison
        const dateA = new Date(a.dueDate.split("/").reverse().join("-"));
        const dateB = new Date(b.dueDate.split("/").reverse().join("-"));
        return dateA - dateB;
      }
      if (sortBy === "Status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

    return sorted;
  }, [tasks, search, sortBy]); // Re-calculate only when tasks, search, or sortBy changes

  // 3. Apply pagination to the filtered and sorted tasks
  const totalPages = Math.ceil(filteredAndSortedTasks.length / pageSize);
  const paginatedTasks = filteredAndSortedTasks.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-3xl mx-auto">
      {/* Header with title, search, and sort controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="">{title}</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-3 py-1 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to first page on new search
              }}
            />
            {/* Search icon (using inline SVG for simplicity) */}
            <span className="absolute left-2 top-1.5 text-gray-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 20L17 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500 hidden sm:block">
              Sort by:
            </span>
            <select
              className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Name">Name</option>
              <option value="Due Date">Due Date</option>
              <option value="Status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-center font-medium text-gray-500">
                Number
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-500">
                {actionType}
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-500">
                Due Date
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-gray-700">{task.number}</td>
                  <td className="py-3 px-4">
                    <span className="text-gray-800 px-2 py-1 rounded-lg">
                      {task.task}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{task.dueDate}</td>
                  <td className="py-3 px-4 capitalize">
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs 
                        ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      `}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button className="text-start bg-blue-500 rounded-lg p-2">
          Add More
        </button>
        <nav className="flex items-center gap-1">
          {/* Previous page button */}
          <button
            className="px-2 py-1 rounded-lg border text-sm text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            {"<"}
          </button>

          {/* Page number buttons */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`
                px-3 py-1 rounded-lg text-sm font-medium transition
                ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }
              `}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* Next page button */}
          <button
            className="px-2 py-1 rounded-lg border text-sm text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            {">"}
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Task;
