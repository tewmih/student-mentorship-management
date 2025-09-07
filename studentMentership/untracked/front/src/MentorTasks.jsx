import React, { useState, useEffect } from "react";
import axios from "axios";

const MentorTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null); // store the task being edited
  const [formData, setFormData] = useState({ number: "", task: "", dueDate: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  const updateCompletionStatus = async (assignmentId, action) => {
    try {
      const newCompletionStatus = action === "approve" ? "approved" : "rejected";
      const newTaskStatus = action === "approve" ? "completed" : "in-progress";

      await axios.put(
        `http://localhost:4000/api/tasks/update-status/${assignmentId}`,
        { status: newTaskStatus, completionStatus: newCompletionStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prev) =>
        prev.map((task) => ({
          ...task,
          TaskAssignments: task.TaskAssignments.map((a) =>
            a.id === assignmentId
              ? {
                  ...a,
                  status: newTaskStatus,
                  completionStatus: newCompletionStatus,
                }
              : a
          ),
        }))
      );

      alert(action === "approve" ? "Completion approved!" : "Completion rejected");
    } catch (err) {
      console.error(err);
      alert("Failed to update completion status");
    }
  };

  // 📝 Enable edit mode
  const startEditing = (task) => {
    setEditingTask(task.id);
    setFormData({
      number: task.number,
      task: task.task,
      dueDate: task.dueDate.split("T")[0], // format yyyy-mm-dd
    });
  };

  // ❌ Cancel edit mode
  const cancelEditing = () => {
    setEditingTask(null);
    setFormData({ number: "", task: "", dueDate: "" });
  };

  // 💾 Save updated task
  const saveTaskUpdate = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/tasks/update/${taskId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, ...formData, dueDate: formData.dueDate } : t
        )
      );

      cancelEditing();
      alert("Task updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Mentor Task Dashboard</h2>
      {tasks.length === 0 ? (
        <p>No tasks created yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="mb-6 border p-4 rounded">
            {editingTask === task.id ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="border p-2 rounded mb-2 w-full"
                  placeholder="Task Number"
                />
                <input
                  type="text"
                  value={formData.task}
                  onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  className="border p-2 rounded mb-2 w-full"
                  placeholder="Task Description"
                />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="border p-2 rounded mb-2 w-full"
                />
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={() => saveTaskUpdate(task.id)}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold mb-2">
                  Task #{task.number}: {task.task} (Due:{" "}
                  {new Date(task.dueDate).toLocaleDateString()})
                </h3>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded mb-2"
                  onClick={() => startEditing(task)}
                >
                  Edit Task
                </button>
              </>
            )}

            {task.TaskAssignments.length > 0 ? (
              <table className="w-full border-collapse text-center mt-2">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Mentee</th>
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Completion Request</th>
                  </tr>
                </thead>
                <tbody>
                  {task.TaskAssignments.map((a) => (
                    <tr key={a.id}>
                      <td className="border px-4 py-2">
                        {a.Mentee.full_name || a.Mentee.mentee_id}
                      </td>
                      <td className="border px-4 py-2">{a.Mentee.mentee_id}</td>
                      <td className="border px-4 py-2">{a.status}</td>
                      <td className="border px-4 py-2">
                        {a.completionStatus === "pending" &&
                        a.status !== "completed" ? (
                          <div className="flex justify-center gap-2">
                            <button
                              className="px-2 py-1 bg-green-500 text-white rounded"
                              onClick={() => updateCompletionStatus(a.id, "approve")}
                            >
                              Approve
                            </button>
                            <button
                              className="px-2 py-1 bg-red-500 text-white rounded"
                              onClick={() => updateCompletionStatus(a.id, "reject")}
                            >
                              Reject
                            </button>
                          </div>
                        ) : a.completionStatus === "approved" ? (
                          <span className="text-green-500 font-semibold">
                            Approved → Completed
                          </span>
                        ) : a.completionStatus === "rejected" ? (
                          <span className="text-red-500 font-semibold">
                            Rejected
                          </span>
                        ) : (
                          <span className="text-gray-500">No request</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No mentees assigned yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MentorTasks;
