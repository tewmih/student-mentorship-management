import React from "react";

function ChatButton({ title, icon, onClick }) {
  return (
    <div className="w-full flex justify-center">
      <button
        onClick={onClick}
        className="flex items-center gap-4 bg-background text-foreground rounded-xl shadow-md px-6 py-4 min-w-[180px] transition hover:shadow-lg focus:outline-none border border-border"
        style={{ minHeight: 60 }}
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e8faf3]">
          {icon}
        </span>
        <span className="font-semibold text-[15px] text-foreground">{title}</span>
      </button>
    </div>
  );
}

export default ChatButton;
