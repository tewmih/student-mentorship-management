import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { createMessage } from "./controllers/MessageController.js";

const onlineUsers = {}; // store online users globally

function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });

  // Socket authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const { id, student_id } = socket.user;
    console.log(id, student_id);
    console.log(`User connected: ${student_id}`);

    onlineUsers[student_id] = socket.student_id;
    io.emit("update_user_status", { uId: student_id, status: "online" });

    // Join a room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`${socket.user.student_id} joined room ${roomId}`);
    });

    // ---------------- SEND MESSAGE ----------------
    socket.on("send_message", async (data) => {
      const newMessage = await createMessage(socket, data);
      if (!newMessage) return;

      if (data.roomId) {
        io.to(data.roomId).emit("receive_message", newMessage);
      } else {
        const receiverSocketId = onlineUsers[data.receiver_id];
        // if (receiverSocketId) {
        //   io.to(receiverSocketId).emit("receive_message", newMessage);
        // }
        io.emit("receive_message", newMessage);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${student_id}`);
      delete onlineUsers[student_id];
      io.emit("update_user_status", { uId: student_id, status: "offline" });
    });
  });

  return io;
}

export default setupSocket;
