import express from "express";
import http from "http"; // <-- import http
import sequelize from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import menteeRoutes from "./routes/menteeRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import studentUnionRoutes from "./routes/studentUnionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import setupSocket from "./socket.js";
import chatRoutes from "./routes/chatRoutes.js";
import attendanceRoutes from "./routes/attendenceRoutes.js";
import path from "path";
import taskRoutes from "./routes/taskRoutes.js";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/api/task", taskRoutes);

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Setup Socket.IO
setupSocket(server); // <-- attach socket.io to this server

// Connect to database and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection established successfully.");

    server.listen(4000, () => {
      // <-- use server.listen instead of app.listen
      console.log("Server is running on port 4000");
    });
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
})();
