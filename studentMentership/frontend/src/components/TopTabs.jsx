// components/TopTabs.jsx
import React from "react";

const tabs = ["Your Progress", "Academic Goals", "Session Attended", "Skills Development"];

export default function TopTabs() {
  return (
    <div className="border bg-card rounded-md flex">
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
