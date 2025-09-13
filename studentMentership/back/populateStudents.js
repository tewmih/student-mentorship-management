import sequelize from "./config/db.js";
import Student from "./models/student.js";

// Sample Ethiopian names and data
const ethiopianStudents = [
  {
    student_id: "ETS0001/14",
    full_name: "Abebe Kebede",
    username: "abebe.kebede",
    email: "abebe.kebede@aastu.edu.et",
    role: "mentee",
    department: "Computer Science",
    year: 3,
    region: "Oromia",
    bio: "Passionate about software development and artificial intelligence."
  },
  {
    student_id: "ETS0002/14",
    full_name: "Kebede Tesfaye",
    username: "kebede.tesfaye",
    email: "kebede.tesfaye@aastu.edu.et",
    role: "mentee",
    department: "Information Technology",
    year: 2,
    region: "Amhara",
    bio: "Interested in web development and database management."
  },
  {
    student_id: "ETS0003/14",
    full_name: "Tigist Alemayehu",
    username: "tigist.alemayehu",
    email: "tigist.alemayehu@aastu.edu.et",
    role: "mentee",
    department: "Software Engineering",
    year: 4,
    region: "Addis Ababa",
    bio: "Focused on mobile app development and user experience design."
  },
  {
    student_id: "ETS0004/14",
    full_name: "Meron Getachew",
    username: "meron.getachew",
    email: "meron.getachew@aastu.edu.et",
    role: "mentee",
    department: "Computer Science",
    year: 3,
    region: "Tigray",
    bio: "Enthusiastic about machine learning and data science."
  },
  {
    student_id: "ETS0005/14",
    full_name: "Yonas Assefa",
    username: "yonas.assefa",
    email: "yonas.assefa@aastu.edu.et",
    role: "mentor",
    department: "Information Technology",
    year: 5,
    region: "Oromia",
    bio: "Senior student with experience in full-stack development."
  },
  {
    student_id: "ETS0006/14",
    full_name: "Selamawit Gebremedhin",
    username: "selamawit.gebremedhin",
    email: "selamawit.gebremedhin@aastu.edu.et",
    role: "mentee",
    department: "Software Engineering",
    year: 2,
    region: "Amhara",
    bio: "Passionate about cybersecurity and network administration."
  },
  {
    student_id: "ETS0007/14",
    full_name: "Dawit Hailu",
    username: "dawit.hailu",
    email: "dawit.hailu@aastu.edu.et",
    role: "mentor",
    department: "Computer Science",
    year: 4,
    region: "Addis Ababa",
    bio: "Experienced in cloud computing and DevOps practices."
  },
  {
    student_id: "ETS0008/14",
    full_name: "Hirut Worku",
    username: "hirut.worku",
    email: "hirut.worku@aastu.edu.et",
    role: "student_union",
    department: "Information Technology",
    year: 4,
    region: "Oromia",
    bio: "Active in student leadership and community development."
  },
  {
    student_id: "ETS0009/14",
    full_name: "Bereket Tadesse",
    username: "bereket.tadesse",
    email: "bereket.tadesse@aastu.edu.et",
    role: "mentee",
    department: "Software Engineering",
    year: 3,
    region: "Tigray",
    bio: "Interested in game development and computer graphics."
  },
  {
    student_id: "ETS0010/14",
    full_name: "Alemayehu Tsegaye",
    username: "alemayehu.tsegaye",
    email: "alemayehu.tsegaye@aastu.edu.et",
    role: "admin",
    department: "Computer Science",
    year: 5,
    region: "Addis Ababa",
    bio: "System administrator with expertise in database management."
  }
];

async function populateStudents() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Clear existing students (optional - remove this if you want to keep existing data)
    await Student.destroy({ where: {} });
    console.log("🗑️  Existing students cleared.");

    // Insert new students
    const createdStudents = await Student.bulkCreate(ethiopianStudents);
    console.log(`✅ Successfully created ${createdStudents.length} students:`);
    
    // Display created students
    createdStudents.forEach((student, index) => {
      console.log(`${index + 1}. ${student.full_name} (${student.student_id}) - ${student.role} - ${student.department}`);
    });

    console.log("\n🎉 Student population completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error populating students:", error);
    process.exit(1);
  }
}

// Run the population script
populateStudents();
