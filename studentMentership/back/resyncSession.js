// import sequelize from "./config/db.js";
// // import MentorshipSession from "./models/session.js";
// // import SessionAttendance from "./models/sessionAttendance.js";
// import Mentee from "./models/mentee.js";
// import Message from "./models/Message.js";
// async function resyncSession() {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected");

//     // Drop only this table
//     await Mentee.drop();
//     console.log("Mentee table dropped");
//     // Recreate the table
//     await Mentee.sync({ force: true });
//     console.log("Mentee table re-synced successfully");
//     process.exit(0);
//   } catch (err) {
//     console.error("Error:", err);
//     process.exit(1);
//   }
// }

// resyncSession();

import sequelize from "./config/db.js";
// import MentorshipSession from "./models/session.js";
// import SessionAttendance from "./models/sessionAttendance.js";
import Mentee from "./models/mentee.js";
import Message from "./models/Message.js";
import MentorMenteeAssignment from "./models/mentorMenteeAssignment.js";
async function resyncSession() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    // Drop only this table
    await MentorMenteeAssignment.drop();
    console.log("MentorMenteeAssignment table dropped");
    // Recreate the table
    await MentorMenteeAssignment.sync({ force: true });
    console.log("MentorMenteeAssignment table re-synced successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

resyncSession();
