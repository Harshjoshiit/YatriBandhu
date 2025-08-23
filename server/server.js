// --- File: server.js ---
// Final version, importing and using all routes and the modular socket handler.

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
const io = new Server(httpServer, {
    cors: {
        origin: "*", // In production, you should restrict this to your frontend's URL
    }
});

const PORT = process.env.PORT || 3001;

// Middleware Setup
app.use(cors());
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
