import React from "react";

function ChatButtons() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-4 px-2 bg-background text-foreground rounded-xl min-h-[400px]">
      <div className="w-full flex flex-col gap-8 mt-4">
        <div className="w-full flex justify-center">
          <button
            className="flex items-center gap-4 bg-background text-foreground rounded-xl shadow-md px-6 py-4 min-w-[180px] transition hover:shadow-lg focus:outline-none"
            style={{ minHeight: 60 }}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-background text-foreground">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="13"
                  rx="2"
                  fill="#34d399"
                />
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="13"
                  rx="2"
                  fill="#e8faf3"
                />
                <rect x="5" y="6" width="14" height="9" rx="1" fill="#34d399" />
                <rect x="5" y="6" width="14" height="9" rx="1" fill="#e8faf3" />
                <rect x="8" y="18" width="8" height="2" rx="1" fill="#34d399" />
              </svg>
            </span>
            <span className="font-semibold text-[15px] text-foreground">
              Group chat
            </span>
          </button>
        </div>

        <div className="w-full flex justify-center">
          <button
            className="flex items-center gap-4 bg-background text-foreground rounded-xl shadow-md px-6 py-4 min-w-[180px] transition hover:shadow-lg focus:outline-none"
            style={{ minHeight: 60 }}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e8faf3]">
              {/* Same icon for demo, can be replaced */}
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="13"
                  rx="2"
                  fill="#34d399"
                />
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="13"
                  rx="2"
                  fill="#e8faf3"
                />
                <rect x="5" y="6" width="14" height="9" rx="1" fill="#34d399" />
                <rect x="5" y="6" width="14" height="9" rx="1" fill="#e8faf3" />
                <rect x="8" y="18" width="8" height="2" rx="1" fill="#34d399" />
              </svg>
            </span>
              <span className="font-semibold text-[15px] text-foreground">
              Individual chat
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatButtons;
