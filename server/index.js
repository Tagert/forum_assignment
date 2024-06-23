import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./src/routes/user.routes.js";
import questionRoutes from "./src/routes/question.routes.js";
import answerRoutes from "./src/routes/answer.routes.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log("err:", err);
  });

app.use(userRoutes);
app.use(questionRoutes);
app.use(answerRoutes);

app.use((req, res) => {
  return res.status(404).json({ status: "Endpoint does not exist" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Express started on http://localhost:${process.env.PORT}`);
});

export { io };
