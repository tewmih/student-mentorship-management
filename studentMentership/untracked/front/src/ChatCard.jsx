import React from "react";
import { FaComments } from "react-icons/fa"; // Chat icon from react-icons

function ChatCard({ chat = {}, isSelected = false, onClick }) {
  const {
    id = "",
    name = "Unknown",
    type = "private",
    avatarUrl,
    status = "offline",
    lastMessage = "No messages yet",
  } = chat;

  return (
    <div
      onClick={() => onClick(chat)}
      className={`flex items-center p-3 rounded cursor-pointer hover:bg-gray-100 transition ${
        isSelected ? "bg-gray-200" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src={avatarUrl || `https://i.pravatar.cc/40?u=${id}`}
          alt={name}
          className="w-10 h-10 rounded-full"
        />
        {type === "private" && (
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white ${
              status === "online" ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        )}
      </div>

      {/* Chat Info */}
      <div className="ml-3 flex-1">
        <p className="font-medium flex items-center gap-2">
          {name}
          {type === "private" && <FaComments className="text-blue-500" />}
        </p>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>

      {/* Group badge */}
      {type === "group" && (
        <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded">
          Group
        </span>
      )}
    </div>
  );
}

// Example usage with fake data
export function ChatCardExample() {
  const fakeChats = [
    {
      id: "1",
      name: "John Doe",
      type: "private",
      status: "online",
      lastMessage: "Hey, are you available?",
    },
    {
      id: "2",
      name: "Design Team",
      type: "group",
      lastMessage: "Meeting at 3 PM",
    },
    {
      id: "3",
      name: "Jane Smith",
      type: "private",
      status: "offline",
      lastMessage: "Thanks for your help!",
    },
  ];

  const handleClick = (chat) => alert(`Clicked on ${chat.name}`);

  return (
    <div className="max-w-md mx-auto space-y-2 mt-10">
      {fakeChats.map((chat) => (
        <ChatCard
          key={chat.id}
          chat={chat}
          onClick={handleClick}
          isSelected={false}
        />
      ))}
    </div>
  );
}

export default ChatCard;
