// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// fake users data
const users = [
  {
    id: "20230101",
    password: "password",
    role: "mentor",
    name: "Alice Mentor",
  },
  { id: "20230202", password: "password", role: "mentee", name: "Bob Mentee" },
  {
    id: "20230303",
    password: "password",
    role: "admin",
    name: "Charlie Admin",
  },
  {
    id: "20230404",
    password: "password",
    role: "studentunion",
    name: "David Union",
  },
];

// fake departments data
const departments = [
  { name: "ECE", value: 58635, color: "#1aa367" },
  { name: "ECE", value: 58635, color: "#1aa367" },
  { name: "ECE", value: 58635, color: "#1aa367" },
  { name: "Civil", value: 74779, color: "#1aa367" },
  { name: "Software", value: 19027, color: "#1aa367" },
  { name: "Mechanical", value: 43887, color: "#1aa367" },
  { name: "Food Science", value: 9142, color: "#1aa367" },
];

// in-memory storage for mentor applications
let mentorApplications = [];

// GET endpoint for departments
app.get("/api/departments", (req, res) => {
  // Simulate a network delay to make the spinner visible
  setTimeout(() => {
    res.json(departments);
  }, 2000); // 2-second delay
});

// POST endpoint for mentor applications
app.post("/api/mentor-applications", (req, res) => {
  const newApplication = {
    id: mentorApplications.length + 1,
    ...req.body,
    status: "pending", // default status
    createdAt: new Date(),
  };

  mentorApplications.push(newApplication);
  console.log("📩 New Mentor Application:", newApplication);

  res.status(201).json(newApplication);
});

// GET endpoint for mentor applications (optional, for testing)
app.get("/api/mentor-applications", (req, res) => {
  res.json(mentorApplications);
});

// New endpoint for sessions
const sessions = [
  {
    number: "04",
    session: "Biology Project",
    dueDate: "05/01/2026",
    status: "In-Progress",
  },
  {
    number: "06",
    session: "Chemistry Study Guide",
    dueDate: "10/01/2026",
    status: "Pending",
  },
  {
    number: "03",
    session: "History Essay",
    dueDate: "15/12/2025",
    status: "Pending",
  },
  {
    number: "02",
    session: "Math Assignment",
    dueDate: "25/12/2025",
    status: "In-Progress",
  },
  {
    number: "05",
    session: "Physics Lab Report",
    dueDate: "28/12/2025",
    status: "Completed",
  },
];

// GET endpoint for sessions
app.get("/api/sessions", (req, res) => {
  res.json(sessions);
  console.log(sessions);
});

// New endpoint for tasks
const tasks = [
  {
    number: "001",
    task: "Complete report",
    dueDate: "2025-08-25",
    status: "Completed",
  },
  {
    number: "001",
    task: "Complete report",
    dueDate: "2025-08-25",
    status: "Completed",
  },
  {
    number: "002",
    task: "Prepare presentation",
    dueDate: "2025-08-27",
    status: "Pending",
  },
  {
    number: "002",
    task: "Prepare presentation",
    dueDate: "2025-08-27",
    status: "Pending",
  },
  {
    number: "003",
    task: "Team meeting",
    dueDate: "2025-08-26",
    status: "In-Progress",
  },
];

// GET endpoint for tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Updated endpoint for login with multiple roles
app.post("/api/auth/login", (req, res) => {
  const { student_id, password } = req.body;

  // Find user based on credentials
  const user = users.find(
    (u) => u.id === student_id && u.password === password
  );

  if (user) {
    const token = `fake-jwt-token-for-${user.id}`;
    res.json({ user, token });
  } else {
    res.status(401).json({ message: "Invalid student ID or password." });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Fake API running at http://localhost:${PORT}`);
});
