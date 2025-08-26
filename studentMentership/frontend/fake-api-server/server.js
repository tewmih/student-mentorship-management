// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// students data from the Canvas
const students = [
  {
    id: 1,
    student_id: "ST-001-2023",
    password: "hashed_password_1",
    full_name: "Samuel Abate",
    username: "sam_abate",
    email: "sam.abate@example.com",
    role: "mentee",
    department: "Computer Science",
    year: 4,
    status: "active",
    region: "Addis Ababa",
    profile_photo: "https://example.com/profile/sam.jpg",
    cover_photo: "https://example.com/cover/sam.jpg",
    contact_link: "https://linkedin.com/in/samabate",
    bio: "A passionate computer science student with an interest in web development and data science.",
    experience: "Internship at a tech startup, participated in a hackathon.",
    about:
      "Originally from Addis Ababa, I am a final-year student looking for mentorship.",
  },
  {
    id: 2,
    student_id: "ST-002-2023",
    password: "hashed_password_2",
    full_name: "Hana Kebede",
    username: "hana_kebede",
    email: "hana.kebede@example.com",
    role: "mentor",
    department: "Electrical Engineering",
    year: 5,
    status: "active",
    region: "Oromia",
    profile_photo: null,
    cover_photo: null,
    contact_link: null,
    bio: "Electrical Engineering graduate, currently working as a software engineer. Happy to mentor students in my field.",
    experience:
      "5 years of experience in the tech industry, specializing in embedded systems.",
    about:
      "I'm a seasoned professional with a passion for helping the next generation of engineers.",
  },
  {
    id: 3,
    student_id: "ST-003-2023",
    password: "hashed_password_3",
    full_name: "Aisha Omar",
    username: "aisha_o",
    email: "aisha.o@example.com",
    role: "student_union",
    department: "Law",
    year: 3,
    status: "inactive",
    region: "Somali",
    profile_photo: "https://example.com/profile/aisha.png",
    cover_photo: null,
    contact_link: "https://twitter.com/aisha_o",
    bio: "Third-year law student and proud member of the student union. Dedicated to advocating for student rights.",
    experience: "Organized several university events and led a debate club.",
    about:
      "My focus is on human rights law and social justice. I believe in making a positive impact on campus.",
  },
  {
    id: 4,
    student_id: "ST-004-2023",
    password: "hashed_password_4",
    full_name: "Kebede Getahun",
    username: "kgetahun",
    email: "kebede.g@example.com",
    role: "mentee",
    department: "IT Administration",
    year: 0,
    status: "active",
    region: "Amhara",
    profile_photo: null,
    cover_photo: null,
    contact_link: null,
    bio: null,
    experience: null,
    about: null,
  },
  {
    id: 5,
    student_id: "ST-005-2023",
    password: "hashed_password_5",
    full_name: "Lidiya Tadesse",
    username: "lidiya_t",
    email: "lidiya.t@example.com",
    role: "mentor",
    department: "Civil Engineering",
    year: 2,
    status: "active",
    region: "Tigray",
    profile_photo: "https://example.com/profile/lidiya.jpg",
    cover_photo: "https://example.com/cover/lidiya.jpg",
    contact_link: "https://linkedin.com/in/lidiyatadesse",
    bio: "Second-year civil engineering student passionate about infrastructure and sustainable development.",
    experience:
      "Volunteered for a local construction project and participated in academic conferences.",
    about:
      "I am seeking guidance on career paths within the civil engineering sector.",
  },
  {
    id: 6,
    student_id: "ST-006-2023",
    password: "hashed_password_6",
    full_name: "Dawit Tesfaye",
    username: "dawit_t",
    email: "dawit.t@example.com",
    role: "student_union",
    department: "Medicine",
    year: 1,
    status: "active",
    region: "Dire Dawa",
    profile_photo: null,
    cover_photo: null,
    contact_link: "https://telegram.me/dawitt",
    bio: "First-year medical student with a strong drive to learn and contribute to the healthcare sector.",
    experience:
      "Shadowed doctors at a local clinic, volunteered for a health awareness campaign.",
    about:
      "I am looking for a mentor to guide me through my initial years in medical school.",
  },
  {
    id: 7,
    student_id: "ST-007-2023",
    password: "hashed_password_7",
    full_name: "Aster Fantaye",
    username: "aster_f",
    email: "aster.f@example.com",
    role: "mentee",
    department: "Political Science",
    year: 4,
    status: "active",
    region: "Benishangul-Gumuz",
    profile_photo: "https://example.com/profile/aster.jpg",
    cover_photo: "https://example.com/cover/aster.jpg",
    contact_link: "https://twitter.com/asterf",
    bio: "Fourth-year student deeply involved in university governance and student politics. Committed to promoting inclusivity on campus.",
    experience:
      "Served as a student representative, organized inter-departmental workshops.",
    about: "My academic interest is in international relations and policy.",
  },
  {
    id: 8,
    student_id: "ST-008-2023",
    password: "hashed_password_8",
    full_name: "Jemal Hussein",
    username: "jemal_h",
    email: "jemal.h@example.com",
    role: "mentor",
    department: "Economics",
    year: 5,
    status: "active",
    region: "Harari",
    profile_photo: null,
    cover_photo: null,
    contact_link: "https://linkedin.com/in/jemalhussein",
    bio: "Experienced professional in financial consulting and economic analysis. I enjoy mentoring students interested in finance.",
    experience:
      "Worked as a financial analyst for 7 years, published several research papers.",
    about:
      "I believe that a strong theoretical foundation is crucial for practical success in economics.",
  },
  {
    id: 9,
    student_id: "ST-009-2023",
    password: "hashed_password_9",
    full_name: "Sara Mekonnen",
    username: "sara_m",
    email: "sara.m@example.com",
    role: "student_union",
    department: "Architecture",
    year: 3,
    status: "active",
    region: "South Ethiopia Region",
    profile_photo: "https://example.com/profile/sara.jpg",
    cover_photo: null,
    contact_link: "https://behance.net/saram",
    bio: "Third-year architecture student specializing in urban design and sustainable building.",
    experience:
      "Completed a design project for a community center, participated in a national architecture competition.",
    about:
      "I'm looking for a mentor with experience in green architecture and urban planning.",
  },
  {
    id: 10,
    student_id: "ST-010-2023",
    password: "hashed_password_10",
    full_name: "Tigist Hailu",
    username: "tigist_h",
    email: "tigist.h@example.com",
    role: "mentee",
    department: "Biomedical Engineering",
    year: 2,
    status: "inactive",
    region: "Gambela",
    profile_photo: "https://example.com/profile/tigist.jpg",
    cover_photo: null,
    contact_link: null,
    bio: "Second-year biomedical engineering student with a focus on medical devices.",
    experience: "Built a prototype for a low-cost diagnostic tool.",
    about:
      "I am seeking advice on summer research opportunities and graduate school preparation.",
  },
];

// fake users data for login
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
    //
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

// NEW: GET endpoint to return all students data
app.get("/api/students", (req, res) => {
  res.json(students);
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Fake API running at http://localhost:${PORT}`);
});
