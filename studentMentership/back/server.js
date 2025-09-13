import express from "express";
import http from "http";
import sequelize from "./config/db.js";
import cors from "cors";
import { setupSocket } from "./socket.js";
import path from "path";
import dotenv from "dotenv";
import routes from "./routes/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api", routes);
// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Setup Socket.IO
setupSocket(server); // <-- attach socket.io to this server

// Connect to database and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection established successfully.");

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🌐 API available at http://localhost:${PORT}`);
      console.log(
        `🔒 JWT Secret: ${
          process.env.JWT_SECRET ? "Configured" : "NOT CONFIGURED"
        }`
      );
    });
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
})();
