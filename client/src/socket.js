// --- File: src/socket.js ---
// This file manages the single, persistent WebSocket connection for the entire app.

import { io } from "socket.io-client";

// This logic correctly switches the URL based on the environment variable you set in Vercel.
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

// Create the socket instance.
// Allowing 'polling' as a fallback is crucial for services like Render's free tier.
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"], // Allow polling as a fallback
});

export default socket;
