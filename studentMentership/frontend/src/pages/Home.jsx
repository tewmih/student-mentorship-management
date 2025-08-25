import React, { useState } from "react";
import Header from "../components/Home.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import Stats from "../components/Stats.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import Footer from "../components/Footer.jsx";
import LoginPopup from "./Login.jsx";


const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div>
        <ThemeToggle />
        <Header setShowLogin={setShowLogin} />
        <div className="h-[100vh]">
          <Stats />
          <FeaturesSection />
        </div>        
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
