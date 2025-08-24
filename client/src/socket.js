// --- File: src/socket.js ---
// This new file manages the single, persistent WebSocket connection for the entire app.

import { io } from "socket.io-client";

// This logic correctly switches the URL based on the environment variable you set in Vercel.
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

// Create the socket instance.
// The 'transports' option is a great way to avoid connection issues on some networks.
const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Force WebSocket connection to avoid polling issues
});

export default socket;
