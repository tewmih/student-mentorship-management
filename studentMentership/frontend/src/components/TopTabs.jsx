// components/TopTabs.jsx
import React from "react";

const tabs = [
  "Your Progress",
  "Academic Goals",
  "Session Attended",
  "Skills Development",
];

export default function TopTabs() {
  return (
    <div className="border fixed w-full  bg-background text-foreground border border-border flex h-15 ">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className="flex-1 py-3 text-center hover:bg-primary-foreground transition"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
