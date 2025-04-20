import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDb.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Load environment variables from .env file
app.use(cors());
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  // root route http://localhost:000/
  res.send("Hello, World!");
});

// drop db
app.post("/cleardb", async (req, res) => {
  try {
    await connectToMongoDb(); // ensure connection is established

    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.dropDatabase();
      res.status(200).json({ message: "Database dropped successfully" });
    } else {
      res.status(500).json({ message: "Database not connected" });
    }
  } catch (error) {
    console.error("Error dropping database:", error.message);
    res
      .status(500)
      .json({ message: "Failed to drop database", error: error.message });
  }
});

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is running on port ${PORT}`);
});
