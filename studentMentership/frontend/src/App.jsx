import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopUp.jsx";
import Mentee from "./pages/Mentee.jsx";
import Footer from "./components/Footer.jsx";
// import Header from "./components/Home.jsx";
import Header from "./components/Header.tsx";

// App component that sets up the routes for the application
function App() {
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
