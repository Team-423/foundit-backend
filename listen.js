require("dotenv").config();
const http = require("http");
const app = require("./src/app.js");
const connectDB = require("./src/db/connection.js");
const { Server } = require("socket.io");

const { PORT = 9090 } = process.env;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://glittering-madeleine-f055b9.netlify.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  },
});

const chats = {}; // { chatId: [ { sender, message, timestamp } ] }

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("joinChat", ({ chatId }) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined chat room: ${chatId}`);

    if (chats[chatId]) {
      socket.emit("chatHistory", chats[chatId]);
    }
  });

  socket.on("sendMessage", ({ chatId, sender, message }) => {
    const msg = { sender, message, timestamp: new Date() };

    if (!chats[chatId]) {
      chats[chatId] = [];
    }
    chats[chatId].push(msg);

    io.to(chatId).emit("receiveMessage", msg);

    console.log(`Message in chat ${chatId} from ${sender}: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Listening on ${PORT} with socket.io...`);
    });
  })
  .catch((err) => {
    console.error("❌ Server startup failed due to DB connection issue:", err);
  });
