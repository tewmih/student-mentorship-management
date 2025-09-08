import { useState } from "react";
import { Edit3, Bell, Users, UserCircle } from "lucide-react";

export default function StudentUnionDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const profile = {
    name: "Alex Tesfa",
    department: "Computer Science",
    year: 3,
    profileImage: "https://i.pravatar.cc/150?img=12",
  };

  const mentorList = [
    { name: "Mentor 1", department: "Physics" },
    { name: "Mentor 2", department: "Mathematics" },
    { name: "Mentor 3", department: "Biology" },
  ];

  const notifications = [
    "New mentorship request submitted.",
    "Upcoming student meeting on Friday.",
    "Mentorship program deadline approaching."
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">Student Union</h2>
        <ul className="space-y-4">
          <li>
            <button onClick={() => setActiveTab("profile")} className="flex items-center space-x-2 text-blue-600 hover:underline">
              <UserCircle className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab("mentors")} className="flex items-center space-x-2 text-blue-600 hover:underline">
              <Users className="w-5 h-5" />
              <span>Mentor List</span>
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab("notifications")} className="flex items-center space-x-2 text-blue-600 hover:underline">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded shadow-md">
            <div className="flex items-center space-x-4">
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-gray-600">{profile.department}</p>
                <p className="text-gray-600">Year {profile.year}</p>
              </div>
              <Edit3 className="w-5 h-5 text-gray-500 cursor-pointer ml-auto" />
            </div>
          </div>
        )}

        {activeTab === "mentors" && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Mentor List</h2>
            <ul className="space-y-2">
              {mentorList.map((mentor, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded shadow">
                  <p className="font-semibold">{mentor.name}</p>
                  <p className="text-sm text-gray-500">{mentor.department}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <ul className="list-disc pl-5 space-y-2">
              {notifications.map((note, index) => (
                <li key={index} className="text-gray-700">{note}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}