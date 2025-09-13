import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Replace with your backend URL
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const sendMessage = async (receiverId, content) => {
  const res = await api.post("/messages", { receiverId, content });
  return res.data;
};

export const getConversation = async (userId) => {
  const res = await api.get(`/chat/conversation/${userId}`);
  return res.data;
};

export const markMessagesRead = async (userId) => {
  const res = await api.put(`/chat/${userId}/read`);
  return res.data;
};
export const getUnreadCount = async () => {
  const res = await api.get("/chat/unread-count");
  return res.data.count;
};
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", formData);
  const res = await api.post("/files/upload", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getInbox = async () => {
  const res = await api.get("/messages/inbox");
  return res.data;
};
