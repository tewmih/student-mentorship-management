import React from "react";

const mentor = {
  name: "Samantha",
  image: "https://randomuser.me/api/portraits/women/44.jpg", // Replace with actual image if needed
  intro:
    "hello my name is samantha and 3rd year Electrical and computer engineering student",
  contacts: [
    { label: "gmail", value: "gmail" },
    { label: "whats up", value: "whats up" },
  ],
};

function MentorSidebar() {
  return (
    <div className="bg-white rounded-xl p-4 w-full sm:h-[98%]  flex flex-col gap-2 text-[13px]">
      <div className="font-normal text-xs mb-1">My Mentor</div>
      <div className="border rounded-lg flex items-center justify-between px-3 py-2 mb-2">
        <span className="text-gray-700 text-sm">
          Hello, <span className="font-medium">{mentor.name}</span>
        </span>
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-9 h-9 rounded-full object-cover ml-2 border"
        />
      </div>
      <div
        className="text-[13px] text-gray-800 mb-4"
        style={{ lineHeight: "1.2" }}
      >
        {mentor.intro}
      </div>
      <div className="mt-2 mb-1 font-normal text-[13px]">Get in touch</div>
      <div className="flex flex-col gap-2">
        {mentor.contacts.map((c, idx) => (
          <div key={idx} className="text-[13px] text-gray-900">
            {c.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorSidebar;
