import React from "react";

function Header() {
  return (
    <header className="w-full h-12 flex items-center justify-between px-4 border border-blue-400 bg-white">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img
          src="/logo192.png"
          alt="Logo"
          className="h-8 w-8 mr-3"
          style={{ objectFit: "contain" }}
        />
        <span className="font-bold text-blue-500 text-lg hidden sm:inline">MentorApp</span>
      </div>
      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Icon 1 */}
        <button className="p-1 rounded hover:bg-blue-100 transition">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="3" fill="#3BB3F6" />
            <rect x="7" y="7" width="10" height="10" rx="2" fill="#fff" />
          </svg>
        </button>
        {/* Icon 2 */}
        <button className="p-1 rounded hover:bg-blue-100 transition">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="3" fill="#3BB3F6" />
            <rect x="9" y="7" width="6" height="10" rx="2" fill="#fff" />
          </svg>
        </button>
        {/* User Info */}
        <span className="text-sm text-gray-700 mr-2">Hello, Samantha</span>
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full border border-gray-200 object-cover"
        />
      </div>
    </header>
  );
}

export default Header;