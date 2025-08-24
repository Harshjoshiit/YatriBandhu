// --- File: server.js ---
// Final version with the correct and robust CORS configuration for deployment.

import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import cors from 'cors';

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

// --- ROBUST CORS Configuration ---
const allowedOrigins = [
    "http://localhost:5173",
    "https://yatribandhu.vercel.app"
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
};

// --- Socket.io Server Setup with correct CORS ---
const io = new Server(httpServer, {
    cors: corsOptions
});

const PORT = process.env.PORT || 3001;

// --- Middleware Setup ---
app.use(cors(corsOptions)); // Use the CORS options for the REST API
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
