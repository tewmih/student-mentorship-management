import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopUp.jsx";
import Mentee from "./pages/Mentee.jsx";
//this is the home page of the app

// App component that sets up the routes for the application
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/meteedashboard" element={<Mentee />} />
                    <Route path="/login" element={<LoginPopup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
