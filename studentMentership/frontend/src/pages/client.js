import { io } from "socket.io-client";
const socket = io("http://localhost:4000", {
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default socket;
