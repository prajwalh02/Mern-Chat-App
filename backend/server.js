import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDb.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Load environment variables from .env file

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     // root route http://localhost:5000/
//     res.send("Hello, World!");
// })


app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
})