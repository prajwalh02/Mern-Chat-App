import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

// const app = express();
dotenv.config();
const PORT = process.env.PORT;

const __dirname = path.resolve();

// Load environment variables from .env file
app.use(cors());
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.get("/", (req, res) => {
  // root route http://localhost:8000/
  res.send("Hello, World!");
});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is running on port ${PORT}`);
});
