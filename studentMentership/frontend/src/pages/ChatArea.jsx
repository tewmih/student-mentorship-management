import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Send,
  Check,
  CheckCheck,
  Paperclip,
  X,
} from "lucide-react";
// import { profileAPI } from "../services/userService.js";
import {profileAPI} from "../api/client.js";
import socket from "./client.js";
// import { useAuth } from "../contexts/AuthContext.jsx";
import { getConversation, markMessagesRead,uploadFile} from "./services.js";
import axios from "axios";
// import {uploadFile} from "../services/messageService.js"

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const [replyingTo, setReplyingTo] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // const { user } = useAuth();
  const currentUser = localStorage.getItem("student_id");


  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  // --- Fetch chat partner 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setChatUser(data);
        console.log("Fetched chat user:", data);
      } catch (err) {
        console.error("Error loading chat user:", err);
      }
    };
    if (id) fetchUser();
  }, [id]);

  // --- Fetch conversation
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getConversation(id);
        setMessages(data);

        await markMessagesRead(id);
        if (currentUser?._id) {
          socket.emit("markRead", { sender: id, receiver: currentUser });
        }
        requestAnimationFrame(() => scrollToBottom(false));
      } catch (err) {
        console.error("Error loading chat history:", err);
      }
    };

    if (id && currentUser) fetchMessages();
  }, [id, currentUser]);

  // --- Socket events
  useEffect(() => {
    if (!currentUser) return;

    socket.emit("join", currentUser._id);

    socket.on("onlineUsers", (users) => setIsOnline(users.includes(id)));
    socket.on("userOnline", ({ userId }) => userId === id && setIsOnline(true));
    socket.on("userOffline", ({ userId }) => userId === id && setIsOnline(false));

    socket.on("typing", ({ sender }) => sender === id && setIsTyping(true));
    socket.on("stopTyping", ({ sender }) => sender === id && setIsTyping(false));

    
    socket.on("newMessage", (msg) => {
      if (
        (msg.sender._id === id && msg.receiver._id === currentUser._id) ||
        (msg.sender._id === currentUser._id && msg.receiver._id === id)
      ) {
        setMessages((prev) => [...prev, msg]);
        if (msg.sender._id === id) {
          socket.emit("markRead", { sender: id, receiver: currentUser._id });
        }
      }
    });
    socket.on("messagesRead", ({ reader }) => {
      if (reader === id) {
        setMessages((prev) =>
          prev.map((m) =>
            m.sender._id === currentUser._id ? { ...m, isRead: true } : m
          )
        );
      }
    });

    socket.on("messageUpdated", (updated) => {
      setMessages((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("userOnline");
      socket.off("userOffline");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("newMessage");
      socket.off("messagesRead");
      socket.off("messageUpdated");
    };
  }, [id, currentUser]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);

  // --- Helpers
  const REACTIONS = ["😘", "😁", "👇", "💪", "🙋‍♂️"];

  const isImageUrlOrType = (val) => {
    if (!val) return false;
    const s = String(val).toLowerCase();
    return (
      s.includes("image/") ||
      s.endsWith(".png") ||
      s.endsWith(".jpg") ||
      s.endsWith(".jpeg") ||
      s.endsWith(".gif") ||
      s.endsWith(".webp")
    );
  };

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const summarizeReactions = (reactions = []) =>
    Object.entries(
      reactions.reduce((acc, r) => {
        acc[r.emoji] = (acc[r.emoji] || 0) + 1;
        return acc;
      }, {})
    ).map(([emoji, count]) => ({ emoji, count }));

  // --- Upload & attachments
  const handlePickFiles = () => fileInputRef.current?.click();

  const uploadFiles = async (files) => {
    const uploaded = [];
    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      try {
        const data = await uploadFile(form);
        uploaded.push({
          url: data?.url,
          name: data?.name || file.name,
          type: data?.type || file.type,
        });
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
    return uploaded;
  };

        
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const uploaded = await uploadFiles(files);
    setAttachments((prev) => [...prev, ...uploaded]);
    e.target.value = "";
  };

  const handleRemoveAttachment = (idx) =>
    setAttachments((prev) => prev.filter((_, i) => i !== idx));

  // --- Reply & react
  const handleStartReply = (msg) => setReplyingTo(msg);
  const handleCancelReply = () => setReplyingTo(null);

  const handleReact = (messageId, emoji) => {
    if (!currentUser) return;
    socket.emit("reactMessage", { messageId, userId: currentUser._id, emoji });
    setContextMenu(null);
  };

  // --- Typing & send
  const handleTyping = (e) => {
    setInput(e.target.value);
    if (!currentUser) return;
    socket.emit("typing", { sender: currentUser._id, receiver: id });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", { sender: currentUser._id, receiver: id });
    }, 1200);
  };

  const handleSend = () => {
    if (!currentUser) return;
    const hasText = input.trim().length > 0;
    const hasFiles = attachments.length > 0;
    if (!hasText && !hasFiles) return;

    socket.emit("sendMessage", {
      sender: currentUser._id,
      receiver: id,
      content: input.trim(),
      replyTo: replyingTo?._id || null,
      attachments: attachments.map((f) => f.url),
    });
    setInput("");
    setReplyingTo(null);
    setAttachments([]);
    socket.emit("stopTyping", { sender: currentUser._id, receiver: id });
  };

  // --- Render
  return (
    <div className="flex flex-col h-screen relative">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 p-4 border-b bg-white shadow-sm">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        {chatUser && (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img
                src={`http://localhost:4000${chatUser.profile_photo || "/uploads/default.png"}`}
                alt={chatUser.full_name || "user"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{chatUser.full_name || "User"}</span>
                {isOnline ? (
                  <span className="text-xs text-green-500">Online</span>
                ) : (
                  <span className="text-xs text-gray-400">Offline</span>
                )}
              </div>
            </div>
            {isTyping && (
              <span className="text-xs text-gray-500">{chatUser.full_name} is typing...</span>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-3 bg-gray-50">
        {messages.map((msg) => {
          const mine = msg.sender._id === currentUser?._id;
          const bubbleBase =
            "px-4 py-2 rounded-2xl max-w-[75%] break-words shadow-sm";
          const bubbleColors = mine
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none";

          const reacts = summarizeReactions(msg.reactions);

          let replyPreview = "";
          if (msg.replyTo) {
            if (typeof msg.replyTo === "object" && msg.replyTo.content) {
              replyPreview = msg.replyTo.content;
            } else if (typeof msg.replyTo === "string") {
              const found = messages.find((m) => m._id === msg.replyTo);
              replyPreview = found?.content || "";
            }
          }

          const files = (msg.attachments || []).map((a) =>
            typeof a === "string" ? { url: a } : a
          );

          return (
            <div
              key={msg._id}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({ x: e.pageX, y: e.pageY, message: msg });
              }}
              className={`flex ${mine ? "justify-end" : "justify-start"} relative mt-20`}>
              <div className={`${bubbleBase} ${bubbleColors}`}>
                {replyPreview && (
                  <div
                    className={`text-xs mb-2 pl-2 border-l-2 ${
                      mine
                        ? "border-white/50 text-white/80"
                        : "border-gray-400 text-gray-600"
                    }`}
                  >
                    Replying to: {replyPreview.slice(0, 140)}
                  </div>
                )}

                {msg.content && (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}

                {files.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {files.map((a, i) => {
                      const url = a.url?.startsWith("http")
                        ? a.url
                        : `http://localhost:4000${a.url || ""}`;
                      const looksImage =
                        isImageUrlOrType(a.type) || isImageUrlOrType(a.url || "");
                      return (
                        <div key={i} className="rounded-lg overflow-hidden">
                          {looksImage ? (
                            <img
                              src={url}
                              alt={a.name || "attachment"}
                              className="w-full h-36 object-cover"
                            />
                          ) : (
                            <a
                              className="block text-xs underline break-all"
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {a.name || a.url?.split("/").pop() || "file"}
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="text-xs flex justify-between items-center gap-2 mt-2">
                  <span className={mine ? "text-white/80" : "text-gray-600"}>
                    {formatTime(msg.createdAt)}
                  </span>

                  <div className="flex items-center gap-2">
                    {reacts.length > 0 && (
                      <div
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                          mine ? "bg-white/20" : "bg-white"
                        }`}
                      >
                        {reacts.map(({ emoji, count }) => (
                          <span key={emoji} className="text-sm leading-none">
                            {emoji}
                            {count > 1 ? ` ${count}` : ""}
                          </span>
                        ))}
                      </div>
                    )}
                    {mine &&
                      (msg.isRead ? (
                        <CheckCheck className="w-4 h-4 opacity-80" />
                      ) : (
                        <Check className="w-4 h-4 opacity-80" />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Right-click context menu */}
      {contextMenu && (
        <div
          className="absolute bg-white border rounded-lg shadow-lg z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onMouseLeave={() => setContextMenu(null)}
        >
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => {
              handleStartReply(contextMenu.message);
              setContextMenu(null);
            }}
          >
            Reply
          </button>
          <div className="flex px-2 py-1 gap-2">
            {REACTIONS.map((e) => (
              <button
                key={e}
                className="text-xl hover:scale-110 transition-transform"
                onClick={() => handleReact(contextMenu.message._id, e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reply preview */}
      {replyingTo && (
        <div className="px-3 py-2 bg-gray-100 border-t flex items-center justify-between gap-2">
          <div className="text-sm truncate">
            Replying to:{" "}
            <span className="font-medium">
              {replyingTo.content ? replyingTo.content.slice(0, 140) : "message"}
            </span>
          </div>
          <button
            className="p-1 rounded-full hover:bg-gray-200"
            onClick={handleCancelReply}
            aria-label="Cancel reply"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="px-3 py-2 bg-gray-100 border-t flex gap-2 overflow-x-auto">
          {attachments.map((a, i) => (
            <div key={i} className="relative">
              {isImageUrlOrType(a.type) || isImageUrlOrType(a.url) ? (
                <img
                  src={a.url.startsWith("http") ? a.url : `http://localhost:4000${a.url}`}
                  alt={a.name || "attachment"}
                  className="w-14 h-14 rounded-lg object-cover"
                />
              ) : (
                <div className="w-28 h-10 rounded bg-white border flex items-center px-2 text-xs">
                  {a.name || "file"}
                </div>
              )}
              <button
                className="absolute -top-2 -right-2 bg-white border rounded-full p-0.5 shadow hover:bg-gray-50"
                onClick={() => handleRemoveAttachment(i)}
                aria-label="Remove attachment"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-0 z-10 p-3 border-t bg-white flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={handlePickFiles}
          title="Attach files"
        >
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>

        <input
          type="text"
          value={input}
          onChange={handleTyping}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          onFocus={() => scrollToBottom(false)}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-60"
          disabled={!input.trim() && attachments.length === 0}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Chat;
