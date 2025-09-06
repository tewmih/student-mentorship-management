import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle.jsx";
import { authAPI } from "../../api/client.js";
import { toast } from "sonner";

// Main Navbar component
const Header = () => {
  // Use state to manage the badge counts, so they can be dynamic
  const [notificationCount, setNotificationCount] = useState(2);
  const [messageCount, setMessageCount] = useState(3);
  const [user, setUser] = useState({
    name: "User",
    profilePic: "https://placehold.co/50x50/3498db/ffffff?text=U",
  });

  const navigate = useNavigate();

  // Get user data from localStorage
  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    const role = localStorage.getItem("role");
    if (studentId) {
      setUser({
        name: studentId,
        profilePic: "https://placehold.co/50x50/3498db/ffffff?text=" + studentId.charAt(0),
        role: role
      });
    }
  }, []);
  return (
    <div className="fixed w-full z-50 bg-background text-foreground font-sans pb-4 antialiased mx-auto mb-2">
      <nav className="flex items-center justify-between bg-background text-foreground py-4 shadow-md max-w-7xl border border-border rounded-lg px-6">
        {/* Left section: Logo and navigation links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">StudentMentorship</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate("/mentee")}
              className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate("/mentor")}
              className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium"
            >
              Mentor
            </button>
            <button 
              onClick={() => navigate("/studentunion")}
              className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium"
            >
            Union
            </button>
          </div>
        </div>
        
        {/* Right section: icons and user info */}
        <div className="flex items-center space-x-6">
          {/* Theme toggle icon to the left, separated with more space */}
            <ThemeToggle />
          {/* Notification icon with badge */}
          <div className="relative"
          onClick={() => {
            navigate("/profile", { 
              state: { currentPage: "Notification" },
              replace: true // This replaces the current history entry
            });
          }}
          >
            {/* Replaced react-icons with inline SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer text-foreground transition-colors duration-200 hover:text-blue-500"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 01-3.46 0"></path>
            </svg>
            {notificationCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                {notificationCount}
              </span>
            )}
          </div>

          {/* Message icon with badge */}
          <div className="relative cursor-pointer"
          onClick={() => {
            navigate("/mentee", { 
              state: { currentPage: "Message" },
              replace: true // This replaces the current history entry
            });
          }}
          >
            {/* Replaced react-icons with inline SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer text-foreground transition-colors duration-200 hover:text-blue-500"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
            </svg>
            {messageCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                {messageCount}
              </span>
            )}
          </div>

          {/* User profile section */}
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <span className="hidden text-sm font-medium text-foreground/60 sm:block">
                Hello, {user.name}
              </span>
              <img
                src={user.profilePic}
                alt={user.name}
                className="h-10 w-10 mr-3 rounded-full object-cover shadow-sm"
              />
            </div>
            
            {/* Logout button */}
            <button
              onClick={() => {
                authAPI.logout();
                toast.success("Logged out successfully");
                navigate("/login");
              }}
              className="px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
