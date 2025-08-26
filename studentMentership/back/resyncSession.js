import sequelize from "./config/db.js";
// import MentorshipSession from "./models/session.js";
// import SessionAttendance from "./models/sessionAttendance.js";
import Task from "../modles/task.js";
import Mentee from "./models/mentee.js";
import Message from "./models/Message.js";
async function resyncSession() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    // // Drop only this table
    // await Mentee.drop();
    // console.log("Mentee table dropped");
    // Recreate the table
    await Task.sync({ force: true });
    console.log("Mentee table re-synced successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

resyncSession();
