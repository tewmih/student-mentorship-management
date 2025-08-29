import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import LoginPopUp from "../pages/Login";

const Home = ({ setShowLogin }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Temporary: navigate directly to dashboard
    navigate("/login");

    // Later: use this instead for popup
    setShowLogin(true);
  };
  return (
    <header className=" text-foreground h-[100vh] py-12 border border-border rounded-lg">
      <div className="container flex h-full flex-col md:flex-row justify-between items-center gap-8">
        {/* Left text section */}
        <div className=" text-left  space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-glow">
            Student Mentorship Program Platform
          </h1>
          <p className="text-lg text-foreground/60">
            Connecting freshmen with senior student mentors to create meaningful
            relationships, foster academic growth, and build a supportive
            university community.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGetStarted}
              className="cosmic-button cursor-pointer"
            >
              Get Started
            </button>
            <button className="px-6 py-2 rounded-full cursor-pointer border border-border font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
              Learn More
            </button>
          </div>
        </div>

        {/* Right image section */}
        <div className="">
          <img
            src="/Container.png"
            alt="Mentorship Illustration"
            className="w-auto h-100 card-hover rounded-lg shadow-md"
          />
        </div>
      </div>
    </header>
  );
};

export default Home;
