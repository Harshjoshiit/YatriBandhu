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
  "https://yatri-bandhu.vercel.app",
  "https://www.yatri-bandhu.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


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
