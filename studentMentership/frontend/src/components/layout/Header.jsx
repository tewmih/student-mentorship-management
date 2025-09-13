import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle.jsx";
import { authAPI } from "../../api/client.js";
import { toast } from "sonner";
import { FaUser, FaCog } from "react-icons/fa";

// Main Navbar component
const Header = () => {
  // Use state to manage the badge counts, so they can be dynamic
  const [notificationCount, setNotificationCount] = useState(2);
  const [messageCount, setMessageCount] = useState(3);
  const [user, setUser] = useState({
    name: "User",
    profilePic: "https://placehold.co/50x50/3498db/ffffff?text=U",
  });
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Get user data from localStorage
  useEffect(() => {
    const studentId = localStorage.getItem("student_id");
    const role = localStorage.getItem("role");
    if (studentId) {
      setUser({
        name: studentId,
        profilePic:
          "https://placehold.co/50x50/3498db/ffffff?text=" +
          studentId.charAt(0),
        role: role,
      });
    }
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is on dropdown or its children
      const dropdownElement = document.querySelector('[data-dropdown="true"]');
      if (dropdownElement && dropdownElement.contains(event.target)) {
        return; // Don't close if clicking inside dropdown
      }

      // Check if click is on profile icon
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return; // Don't close if clicking on profile icon
      }

      // Close dropdown if clicking outside
      setDropDown(false);
    };

    if (dropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDown]);

  return (
    <div className="fixed w-full z-50 bg-background text-foreground font-sans pb-4 antialiased mx-auto mb-2">
      <div className="flex items-center justify-between bg-background text-foreground py-4 shadow-md max-w-7xl border border-border px-6">
        {/* Left section: Logo and navigation links */}
        <NavLink className="flex items-center space-x-8" to="/">
          <img
            src="/Logo.png"
            alt="student mentorship logo"
            className="h-12 w-12"
          />
        </NavLink>
        <div className="flex flex-row space-x-6">
          <button className="hover:text-purple-600 cursor-pointer select-none">
            AboutUs
          </button>
          <button className="hover:text-purple-600 cursor-pointer select-none">
            Contact
          </button>
        </div>

        {/* Right section: icons and user info */}
        <div className="flex items-center space-x-6">
          {/* Theme toggle icon to the left, separated with more space */}
          <ThemeToggle />
          {/* Notification icon with badge */}
          <div
            className="relative"
            onClick={() => {
              navigate("/profile", {
                state: { currentPage: "Notification" },
                replace: true, // This replaces the current history entry
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
          <div
            className="relative cursor-pointer"
            onClick={() => {
              navigate(
                `/${
                  localStorage.getItem("role") == "student_union"
                    ? "student-union"
                    : localStorage.getItem("role")
                }`,
                {
                  state: { currentPage: "Messages" },
                  replace: true, // This replaces the current history entry
                }
              );
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
          <div
            className="flex items-center space-x-3 cursor-pointer relative"
            onClick={() => setDropDown(!dropDown)}
            ref={dropdownRef}
          >
            <div className="flex flex-col items-center space-x-3 cursor-pointer">
              {/* <span className="hidden text-sm font-medium text-foreground/60 sm:block">
                Hello, {user.name}
              </span> */}
              <FaUser className="h-7 w-7 mr-3 rounded-full object-cover shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown positioned completely outside the navbar */}
      {dropDown && <DropDown setDropDown={setDropDown} />}
    </div>
  );
};

export default Header;

function DropDown({ setDropDown }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
    setDropDown(false);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setDropDown(false);
  };

  const handleLogoutClick = () => {
    authAPI.logout();
    toast.success("Logged out successfully");
    setDropDown(false);
    navigate("/login");
  };

  return (
    <div
      className="fixed top-16 right-6 bg-background text-foreground p-2 rounded-lg shadow-lg border border-border min-w-[160px] z-50"
      data-dropdown="true"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col space-y-1">
        {/* Profile Option */}
        <button
          onClick={handleProfileClick}
          className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200 w-full text-left cursor-pointer"
        >
          <FaUser className="h-4 w-4" />
          <span>Profile</span>
        </button>

        {/* Settings Option */}
        <button
          onClick={handleSettingsClick}
          className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200 w-full text-left cursor-pointer"
        >
          <FaCog className="h-4 w-4" />
          <span>Settings</span>
        </button>

        {/* Divider */}
        <div className="border-t border-border my-1"></div>

        {/* Logout Option */}
        <button
          onClick={handleLogoutClick}
          className="flex items-center space-x-3 px-3 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 w-full text-left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
            <polyline points="16,17 21,12 16,7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
