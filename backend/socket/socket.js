import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create an HTTP server instance using the Express app
const server = http.createServer(app);

// Initialize a new Socket.IO server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],  // Allow frontend origin
        methods: ["GET", "POST"],
    }
});

// Helper function to get the socket ID of a specific user
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// Store mapping of userId to socketId for connected users
const userSocketMap = {};  // { userId: socketId }

// Handle new client connections
io.on("connection", (socket) => {
    console.log("A user is connected", socket.id);

    // Extract userId from the connection handshake query
    const userId = socket.handshake.query.userId;

    // If userId is valid, add it to the user-socket map
    if(userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    // Notify all connected clients about the currently online users
    io.emit("getOnlineUser", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUser", Object.keys(userSocketMap));
    }); 
});

export { app, io, server };  