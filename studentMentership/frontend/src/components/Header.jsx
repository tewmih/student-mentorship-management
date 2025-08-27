import React, { useState } from "react";

// Main Navbar component
const Header = () => {
  // Use state to manage the badge counts, so they can be dynamic
  const [notificationCount, setNotificationCount] = useState(2);
  const [messageCount, setMessageCount] = useState(3);

  // A simple user data object for demonstration
  const user = {
    name: "Samantha",
    profilePic: "https://placehold.co/50x50/3498db/ffffff?text=S",
  };

  return (
    <div className="fixed w-full z-50 bg-gray-50 font-sans pb-4 antialiased">
      <nav className="flex items-center justify-end  bg-white py-4 shadow-md max-w-7xl ">
        {/* Right section: icons and user info */}
        <div className="flex items-center space-x-6">
          {/* Notification icon with badge */}
          <div className="relative">
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
              className="h-6 w-6 cursor-pointer text-gray-600 transition-colors duration-200 hover:text-blue-500"
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
          <div className="relative">
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
              className="h-6 w-6 cursor-pointer text-gray-600 transition-colors duration-200 hover:text-blue-500"
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
            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              Hello, {user.name}
            </span>
            <img
              src="/profile.jpg"
              alt={user.name}
              className="h-10 w-10 cursor-pointer mr-5 rounded-full object-cover shadow-sm"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
