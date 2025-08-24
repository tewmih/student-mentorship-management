import React, { useState } from "react";

const dummyTasks = [
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
];

function Task() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [page, setPage] = useState(1);

  // Filter and sort dummy data
  const filteredTasks = dummyTasks.filter((t) =>
    t.task.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination (5 per page for now)
  const pageSize = 5;
  const totalPages = Math.ceil(filteredTasks.length / pageSize);
  const paginatedTasks = filteredTasks.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full max-w-3xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Task</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-3 py-1 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <span className="absolute left-2 top-1.5 text-gray-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              className="border rounded px-2 py-1 text-sm"
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
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-3 text-left font-medium">Number</th>
              <th className="py-2 px-3 text-left font-medium">Task</th>
              <th className="py-2 px-3 text-left font-medium">Due Date</th>
              <th className="py-2 px-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.map((task, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2 px-3 font-semibold">{task.number}</td>
                <td className="py-2 px-3">
                  <span className="font-bold bg-gray-100 px-2 py-1 rounded">
                    {task.task}
                  </span>
                </td>
                <td className="py-2 px-3">{task.dueDate}</td>
                <td className="py-2 px-3 capitalize">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <nav className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded border text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            {"<"}
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-2 py-1 rounded border text-sm ${
                page === i + 1
                  ? "bg-primary text-white border-primary"
                  : "bg-white"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-2 py-1 rounded border text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            {">"}
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Task;