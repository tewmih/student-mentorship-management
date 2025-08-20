// server.js
import express from "express";
import sequelize from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import menteeRoutes from "./routes/menteeRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import studentUnionRoutes from "./routes/studentUnionRoutes.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/node", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/mentee", menteeRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/student-union", studentUnionRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection established successfully.");

    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
})();
