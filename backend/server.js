import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Load environment variables from .env file

 app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// app.get("/", (req, res) => {
//     // root route http://localhost:5000/
//     res.send("Hello, World!");
// })


app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
})