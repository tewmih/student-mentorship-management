import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    number: "",
    dueDate: "",
    task: "",
  });

  const [mentees, setMentees] = useState([]);
  const [selectedMentees, setSelectedMentees] = useState([]);

  // Fetch mentees from backend
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/mentor/mentees",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Use res.data.mentees if your backend returns { mentees: [...] }
        setMentees(res.data.mentees || res.data);
		console.log("Fetched Mentees:", res.data.mentees || res.data);
      } catch (err) {
        console.error("Error fetching mentees:", err);
      }
    };
    fetchMentees();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // Handle mentee selection (send mentee_id, not numeric id)
  const handleMenteeSelect = (student_id) => {
    if (selectedMentees.includes(student_id)) {
      setSelectedMentees(selectedMentees.filter((m) => m !== student_id));
    } else {
      setSelectedMentees([...selectedMentees, student_id]);
    }
  };

  // Submit task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedMentees.length === 0) {
      alert("Please select at least one mentee");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/tasks/create",
        {
          ...taskData,
          mentees: selectedMentees, // array of mentee_ids (strings)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Task created and assigned successfully!");
      setTaskData({ number: "", dueDate: "", task: "" });
      setSelectedMentees([]);
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Number */}
        <input
          type="number"
          name="number"
          placeholder="Task Number"
          value={taskData.number}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Task Description */}
        <input
          type="text"
          name="task"
          placeholder="Task Description"
          value={taskData.task}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Due Date */}
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        {/* Select Mentees */}
        <div>
          <h3 className="font-semibold mb-2">Assign to Mentees:</h3>
          {mentees.map((mentee) => (
            <label key={mentee.id} className="block">
              <input
                type="checkbox"
                checked={selectedMentees.includes(mentee.student_id)}
                onChange={() => handleMenteeSelect(mentee.student_id)}
              />
              <span className="ml-2">{mentee.full_name}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
