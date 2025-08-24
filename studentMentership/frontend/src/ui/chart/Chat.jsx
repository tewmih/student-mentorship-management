import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiPaperclip,
  FiSmile,
  FiSend,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { BsPinAngle } from "react-icons/bs";

const ChatComponent = ({
  // Chat mode configuration
  showSidebar = true,
  chatType = "group", // "group" or "individual"

  // Data props
  messages = [],
  chatList = [],
  pinnedChats = [],
  currentUser = null,

  // WebSocket handlers
  onSendMessage = () => {},
  onTyping = () => {},
  onSearchChats = () => {},
  onSelectChat = () => {},

  // Styling props
  className = "",
  sidebarWidth = "w-80",

  // Optional props
  placeholder = "Type message...",
  showAttachment = true,
  showEmoji = true,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentMessages, setCurrentMessages] = useState(messages);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    if (chat.messages) {
      setCurrentMessages(chat.messages);
    } else {
      setCurrentMessages([]);
    }
    onSelectChat(chat);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        text: newMessage,
        timestamp: new Date(),
        sender: currentUser,
        chatId: selectedChat?.id,
      };
      onSendMessage(messageData);
      setNewMessage("");
      setIsTyping(false);
    }
  };

  const handleTyping = (value) => {
    setNewMessage(value);
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      onTyping(true);
    } else if (isTyping && value.length === 0) {
      setIsTyping(false);
      onTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const ChatListItem = ({ chat, onSelect }) => (
    <div
      onClick={() => onSelect(chat)}
      className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
        selectedChat?.id === chat.id
          ? "bg-blue-50 border-l-4 border-blue-500"
          : ""
      }`}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {chat.avatar ? (
          <img
            src="profile.jpg"
            alt={chat.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm font-medium text-gray-600">
            {chat.name?.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">
            {chat.name}
          </p>
          <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
        </div>
        <p className="text-sm text-blue-500 truncate">
          {chat.isTyping ? "Typing..." : chat.lastMessage}
        </p>
      </div>
    </div>
  );

  const Sidebar = () => {
    const filteredPinnedChats = pinnedChats.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredChatList = chatList.filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div
        className={`
          md:relative absolute top-0 left-0 h-full z-10 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? "w-16" : sidebarWidth
          } 
          md:shadow-none ${!isSidebarCollapsed ? "shadow-lg" : ""}
        `}
      >
        {isSidebarCollapsed ? (
          <div className="flex flex-col items-center py-4 space-y-3">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors mb-2"
            >
              <FiMenu className="w-5 h-5" />
            </button>

            {filteredPinnedChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all ${
                  selectedChat?.id === chat.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {chat.avatar ? (
                  <img
                    src="profile.jpg"
                    alt={chat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium text-gray-600">
                    {chat.name?.charAt(0)}
                  </span>
                )}
              </div>
            ))}

            {filteredChatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all ${
                  selectedChat?.id === chat.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {chat.avatar ? (
                  <img
                    src="profile.jpg"
                    alt={chat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium text-gray-600">
                    {chat.name?.charAt(0)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      onSearchChats(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={toggleSidebar}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredPinnedChats.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    <BsPinAngle className="w-3 h-3" />
                    Pinned Chats
                  </div>
                  <div className="space-y-2">
                    {filteredPinnedChats.map((chat) => (
                      <ChatListItem
                        key={chat.id}
                        chat={chat}
                        onSelect={handleChatSelect}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                  All Messages
                </div>
                <div className="space-y-2">
                  {filteredChatList.length > 0 ? (
                    filteredChatList.map((chat) => (
                      <ChatListItem
                        key={chat.id}
                        chat={chat}
                        onSelect={handleChatSelect}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      {searchQuery ? "No chats found" : "No messages"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const Message = ({ message, isOwn }) => (
    <div className={`flex gap-3 mb-4 ${isOwn ? "flex-row-reverse" : ""}`}>
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
        {message.sender?.avatar ? (
          <img
            src="profile.jpg"
            alt={message.sender.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs font-medium text-gray-600">
            {message.sender?.name?.charAt(0)}
          </span>
        )}
      </div>
      <div className={`flex flex-col ${isOwn ? "items-end" : ""}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-900">
            {message.sender?.name}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
            isOwn
              ? "bg-blue-500 text-white rounded-br-md"
              : "bg-gray-100 text-gray-900 rounded-bl-md"
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    </div>
  );

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div
      className={`
      flex relative h-screen bg-white rounded-lg shadow-sm  w-full ${className}
    `}
    >
      {chatType === "group" && <Sidebar />}

      <div className={`flex-1 flex flex-col bg-white h-full`}>
        {chatType === "group" && selectedChat && (
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {selectedChat.avatar ? (
                  <img
                    src="profile.jpg"
                    alt={selectedChat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {selectedChat.name?.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {selectedChat.name}
              </h3>
            </div>
          </div>
        )}

        {chatType === "group" && !selectedChat ? (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500 text-lg">
              Select a chat to start messaging
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {currentMessages.map((message, index) => (
                  <Message
                    key={message.id || index}
                    message={message}
                    isOwn={message.sender?.id === currentUser?.id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex items-center gap-3">
                {showEmoji && (
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FiSmile className="w-5 h-5" />
                  </button>
                )}

                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={newMessage}
                    onChange={(e) => handleTyping(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pr-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {showAttachment && (
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <FiPaperclip className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
