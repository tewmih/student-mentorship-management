import React, { useState, useEffect } from "react";
import axios from "axios";

const MenteeTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/tasks/myown/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  const handleStatusChange = async (task, newStatus) => {
    if (task.status === "completed") return; // cannot change completed tasks
    try {
      await axios.put(
        `http://localhost:4000/api/tasks/update-status/${task.id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const requestCompletion = async (task) => {
    if (task.status !== "in-progress") {
      alert("Task must be in-progress to request completion");
      return;
    }
    try {
      await axios.post(
        `http://localhost:4000/api/tasks/request-completion/${task.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completionStatus: "pending" } : t
        )
      );
      alert("Completion request sent to mentor!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to request completion");
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">My Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="border px-4 py-2">Task Number</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Due Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Completion Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="text-center">
                <td className="border px-4 py-2">{task.Task.number}</td>
                <td className="border px-4 py-2">{task.Task.task}</td>
                <td className="border px-4 py-2">
                  {new Date(task.Task.dueDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {task.status === "completed" ? (
                    <span>Completed</span>
                  ) : (
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                    </select>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {task.completionStatus === "none" ? (
                    <button
                      className="px-2 py-1 bg-yellow-400 text-white rounded"
                      onClick={() => requestCompletion(task)}
                    >
                      Request Completion
                    </button>
                  ) : task.completionStatus === "pending" ? (
                    <span className="text-blue-500">Request Sent (Pending)</span>
                  ) : task.completionStatus === "approved" ? (
                    <span className="text-green-600 font-semibold">
                      Approved → Task Completed
                    </span>
                  ) : (
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => requestCompletion(task)}
                    >
                      Re-request (Rejected)
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MenteeTasks;
