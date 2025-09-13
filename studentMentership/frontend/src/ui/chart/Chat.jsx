import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [mentorId, setMentorId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [chatHistory, setChatHistory] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem("id"), 10);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // -------- FETCH MENTEES --------
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/mentees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mentees = res.data.mentees || [];
        setUsers(mentees.filter((mentee) => mentee.id !== userId));
        const loggedUser = mentees.find((m) => m.id === userId);
        setLoggedInUser(loggedUser || {});
        setMentorId(res.data.mentor.student_id);
      } catch (err) {
        console.error("Error fetching mentees:", err);
      }
    };
    fetchMentees();
  }, [token, userId]);

  // -------- SETUP ROOMS --------
  useEffect(() => {
    if (mentorId) setRooms([{ id: mentorId, name: mentorId }]);
  }, [mentorId]);

  // -------- SOCKET --------
  useEffect(() => {
    if (!token) return;
    const socketIo = io("http://localhost:4000", { auth: { token } });
    setSocket(socketIo);

    socketIo.on("update_user_status", ({ uId, status }) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.student_id === uId ? { ...user, status } : user
        )
      );
    });

    socketIo.on("receive_message", (message) => {
      const key = message.roomId
        ? `room_${message.roomId}`
        : `user_${[message.sender_id, message.receiver_id].sort().join("_")}`;
      setChatHistory((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), message],
      }));
    });

    return () => socketIo.disconnect();
  }, [token]);
  // -------- LOAD MESSAGES --------
  useEffect(() => {
    if (!socket) return;

    const loadMessages = async () => {
      try {
        if (selectedRoom) {
          socket.emit("join_room", selectedRoom.id);
          const res = await axios.get(
            `http://localhost:4000/api/chat/messages?roomId=${selectedRoom.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setChatHistory((prev) => ({
            ...prev,
            [`room_${selectedRoom.id}`]: res.data,
          }));
        }

        if (selectedUser) {
          const res = await axios.get(
            `http://localhost:4000/api/chat/messages?student1=${userId}&student2=${selectedUser.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const key = `user_${[userId, selectedUser.id].sort().join("_")}`;
          setChatHistory((prev) => ({ ...prev, [key]: res.data }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadMessages();
  }, [socket, selectedRoom, selectedUser, token, userId]);
  // -------- SEND MESSAGE --------
  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;
    const data = {
      content: newMessage,
      receiver_id: selectedUser?.id || null,
      roomId: selectedRoom?.id || null,
      replyTo: replyTo?.id || null,
    };
    socket.emit("send_message", data);
    setNewMessage("");
    setReplyTo(null);
  };
  // -------- DISPLAYED MESSAGES --------
  const displayedMessages = selectedRoom
    ? chatHistory[`room_${selectedRoom.id}`] || []
    : selectedUser
    ? chatHistory[`user_${[userId, selectedUser.id].sort().join("_")}`] || []
    : [];
  return (
    <div className="flex h-screen bg-background text-foreground border-r">
      {/* -------- SIDEBAR -------- */}
      <div className="w-1/4 bg-background text-foreground border-r border-gray-300 flex flex-col">
        {/* Logged-in user */}
        <div className="flex items-center p-4 border-b border-gray-300 bg-background text-foreground">
          <div className="relative">
            <img
              src={`https://i.pravatar.cc/40?u=${userId}`}
              alt="me"
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-background text-foreground"></span>
          </div>
          <div className="ml-3">
            <p className="font-medium">{loggedInUser.full_name}</p>
            <p className="text-sm  text-green-500 dark:text-green-400">
              Online
            </p>
          </div>
        </div>
        {/* Rooms */}
        <div className="p-2 border-b border-gray-300 ">
          <p className="text-gray-500 mb-1 font-semibold">Groups</p>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                selectedRoom?.id === room.id ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setSelectedRoom(room);
                setSelectedUser(null);
              }}
            >
              {room.name}
            </div>
          ))}
        </div>
        {/* Mentees */}
        <div className="flex-1 overflow-y-auto">
          <p className="text-gray-500 mb-1 font-semibold p-2">Mentees</p>
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${
                selectedUser?.id === user.id ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setSelectedUser(user);
                setSelectedRoom(null);
              }}
            >
              <div className="relative">
                <img
                  src={`https://i.pravatar.cc/40?u=${user.id}`}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>
              <div className="ml-3">
                <p className="font-medium">{user.full_name}</p>
                <p className="text-sm text-gray-500">{user.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* -------- CHAT AREA -------- */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedUser || selectedRoom ? (
            displayedMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-3 ${
                  msg.sender_id === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs break-words ${
                    msg.sender_id === userId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.replyTo && (
                    <p className="text-sm text-gray-600 border-l-2 border-gray-400 pl-2 mb-1">
                      Replying to:{" "}
                      {displayedMessages.find((m) => m.id === msg.replyTo)
                        ?.content || "deleted message"}
                    </p>
                  )}
                  <p className="font-semibold">
                    {msg.sender_id === userId
                      ? loggedInUser.full_name
                      : selectedUser?.full_name}
                  </p>
                  <p>{msg.content}</p>
                  <button
                    onClick={() => {
                      setReplyTo(msg);
                      inputRef.current?.focus();
                    }}
                    className={`text-xs mt-1 ${
                      msg.sender_id === userId
                        ? "text-white/90"
                        : "text-blue-500"
                    }`}
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              Select a mentee or group to start chatting
            </p>
          )}
        </div>
        {/* Message input */}
        <div className="p-4 border-t border-gray-300 flex flex-col">
          {replyTo && (
            <div className="text-sm text-gray-600 mb-1">
              Replying to: "{replyTo.content}"
              <button
                onClick={() => setReplyTo(null)}
                className="ml-2 text-red-500"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex">
            <input
              ref={inputRef} // ✅ attach ref
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                selectedUser
                  ? `Message ${selectedUser.full_name}...`
                  : selectedRoom
                  ? `Message ${selectedRoom.name}...`
                  : "Select a mentee or group first"
              }
              className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={!selectedUser && !selectedRoom}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              disabled={!selectedUser && !selectedRoom}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
