import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import menteeRoutes from "./routes/menteeRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import studentUnionRoutes from "./routes/studentUnionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import chatRoutes from "./routes/chatRoutes.js";
import attendanceRoutes from "./routes/attendenceRoutes.js";
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api/node", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/mentee", menteeRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/student-union", studentUnionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/attendance", attendanceRoutes);
