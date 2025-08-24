import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopUp.jsx";
import Mentee from "./pages/Mentee.jsx";
import Footer from "./components/Footer.jsx";
// import Header from "./components/Home.jsx";
import Header from "./components/Header.tsx";
import MenteeAtUnion from "./features/Mentee.jsx";
import Dashboard from "./features/StudentDashboard.jsx";
import AASTUStudent from "./features/AASTUStudent.jsx";
import Mentor from "./features/Mentor.jsx";
import Chat from "./features/Chat.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menteedashboard" element={<Mentee />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/studentunion">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="aastustudent" element={<AASTUStudent />} />
            <Route path="menteeatunion" element={<MenteeAtUnion />} />
            <Route path="mentoratunion" element={<Mentor />} />
            <Route path="chatatunion" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mentee" element={<Mentee />} />
                    <Route path="/login" element={<LoginPopup />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
