import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopUp.jsx";
import Mentee from "./pages/Mentee.jsx";
import MentorDeshboard from "./fatures/MentorDashboard.jsx";
import Task from "./fatures/Task.jsx";
// App component that sets up the routes for the application
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menteedashboard" element={<Mentee />} />
                    <Route path="/login" element={<LoginPopup />} />
                    <Route path="/mentordeshboard" element={<MentorDeshboard />} />
                    <Route path="/tasks" element={<Task />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
