import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopUp.jsx";
import Mentee from "./pages/Mentee.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.tsx";
import MenteeAtUnion from "./features/Mentee.jsx";
import Dashboard from "./features/StudentDashboard.jsx";
import AASTUStudent from "./features/AASTUStudent.jsx";
import Mentor from "./features/Mentor.jsx";
import Chat from "./features/Chat.jsx";
import Task from "./features/mentor/Task.jsx";
import MentorPage from "./pages/MentorPage.jsx";
import StudentUnion from "./pages/StudentUnion/StudentUnion.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menteedashboard" element={<Mentee />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/mentordashboard" element={<MentorPage />}  />
          <Route path="/studentunion" element={<StudentUnion />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
