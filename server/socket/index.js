// --- File: socket/index.js ---
// This is the main handler for all Socket.io connections and events.

import { handleChatEvents } from './chat.js';
// We can add notification events here later
// import { handleNotificationEvents } from './notifications.js';

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`🔌 New client connected: ${socket.id}`);

        // Delegate chat-related events to the chat handler
        handleChatEvents(io, socket);

        // Delegate notification-related events here in the future
        // handleNotificationEvents(io, socket);

        socket.on('disconnect', () => {
            console.log(`👋 Client disconnected: ${socket.id}`);
        });
    });
};

export default socketHandler;
