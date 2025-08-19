import React from "react";
import { Bell, Search, User } from "lucide-react";


export default function TopTabs() {
    return (
        <div className="fixed top-0 right-0 left-3 flex items-center text-foreground justify-between  pl-65 pr-15 py-4 bg-background shadow-md">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5" />
            </div>

            <div className="flex items-center gap-4">
                <Bell className="w-6 h-6  cursor-pointer hover:text-blue-500 transition-colors" />
                <User className="w-6 h-6  cursor-pointer hover:text-blue-500 transition-colors" />
            </div>
        </div>
    );
}
