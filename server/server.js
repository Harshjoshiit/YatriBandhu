// --- File: server.js ---
// Final version with the correct CORS configuration for a deployed MERN app.

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

// Import route files
import userRoutes from './routes/userRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Import the main socket handler
import socketHandler from './socket/index.js';

// Initial Configuration
dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

// --- CORS Configuration ---
const allowedOrigins = [
    "http://localhost:5173",        // Your Vite frontend in dev
    "https://yatribandhu.vercel.app"  // Your deployed frontend on Vercel
];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // This is important for cookies, authorization headers with HTTPS
};

// --- Socket.io Server Setup with correct CORS ---
const io = new Server(httpServer, {
    cors: corsOptions
});

const PORT = process.env.PORT || 3001;

// --- Middleware Setup ---
app.use(cors(corsOptions)); // Use the same CORS options for the REST API
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/notifications', notificationRoutes);

// Initialize Socket.io logic
socketHandler(io);

// Start the Server
httpServer.listen(PORT, () => {
    console.log(`🚀 Backend server is fully operational on http://localhost:${PORT}`);
});
