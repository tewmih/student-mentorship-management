import React from "react";
import Header from "../components/Header.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import Stats from "../components/Stats.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import Footer from "../components/Footer.jsx";
import { useState } from "react";
import LoginPopup from "../components/LoginPopUp.jsx";

const Home = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>}
            <div>
                <ThemeToggle />
                <Header setShowLogin={setShowLogin} />
                <Stats />
                <FeaturesSection />
                <Footer />
            </div>
        </>
    );
};

export default Home;
