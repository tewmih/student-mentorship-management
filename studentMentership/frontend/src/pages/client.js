import { io } from "socket.io-client";
const Socket = io("http://localhost:4000", {
  // // withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default Socket;
