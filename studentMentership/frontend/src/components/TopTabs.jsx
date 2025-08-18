// components/TopTabs.jsx
import React from "react";
import {Bell, Search, User} from "lucide-react";




export default function TopTabs() {
   return (
    <div className="flex items-center justify-between  pl-65 pr-15 py-4 bg-white shadow-md">
      
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="w-5 h-5 text-gray-500" />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500 transition-colors" />
        <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-500 transition-colors" />
      </div>
      
    </div>
  );
}
