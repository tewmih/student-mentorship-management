import React, { useState } from "react";
import Header from "../components/layout/Header.jsx";
import Stats from "../components/Stats.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import LoginPopup from "./Login.jsx";


const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div>
        {/* <ThemeToggle /> */}
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
