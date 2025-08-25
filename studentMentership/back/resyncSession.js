import sequelize from "./config/db.js";
// import MentorshipSession from "./models/session.js";
// import SessionAttendance from "./models/sessionAttendance.js";
import Message from "./models/Message.js";
async function resyncSession() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    // Drop only this table
    await Message.drop();
    console.log("SessionAttendance table dropped");
    // Recreate the table
    await Message.sync({ force: true });
    console.log("SessionAttendance table re-synced successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

resyncSession();
