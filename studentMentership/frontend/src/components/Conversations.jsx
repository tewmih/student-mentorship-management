import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Conversations() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);

  // Current user from local storage / context
  const user = { _id: localStorage.getItem("userId") || "u1" };

  // Fetch mentees and mentor (optional)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/chat/mentees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched users:", res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch conversations / inbox
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/chat/inbox", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setConversations(res.data);
        console.log("Fetched conversations:", res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };
    if (user?._id) fetchConversations();
  }, [user?._id]);

  const openChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="p-4 border-b font-semibold text-gray-700 text-xl">
        Conversations
      </div>

      {conversations.length === 0 ? (
        <div className="p-6 text-center text-gray-400">
          No conversations yet.
        </div>
      ) : (
        <div className="divide-y max-h-[70vh] overflow-y-auto">
          {conversations.map((c) => {
            const isUnread = c.unreadCount > 0;
            return (
              <div
                key={c._id}
                onClick={() => openChat(c.user._id)}
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition duration-200"
              >
                <img
                  src={c.user.avatar || "https://via.placeholder.com/150"}
                  alt={c.user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-medium text-gray-800 ${
                        isUnread ? "text-black" : ""
                      }`}
                    >
                      {c.user.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(c.lastMessage.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p
                      className={`text-sm truncate ${
                        isUnread ? "font-semibold text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {c.lastMessage.content || "New conversation"}
                    </p>
                    {isUnread && (
                      <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Conversations;
