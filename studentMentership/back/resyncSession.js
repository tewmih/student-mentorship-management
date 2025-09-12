import sequelize from "./config/db.js";
// import MentorshipSession from "./models/session.js";
// import SessionAttendance from "./models/sessionAttendance.js";
import Petition from "./models/petition.js";

import Mentee from "./models/mentee.js";
import Message from "./models/message.js";
async function resyncSession() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    // // Drop only this table
    await Message.drop();
    // console.log("Mentee table dropped");
    // Recreate the table
    await Message.sync({ force: true });
    console.log("Message table re-synced successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

resyncSession();
