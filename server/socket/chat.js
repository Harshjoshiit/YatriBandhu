// --- File: socket/chat.js ---
// Handles all real-time events related to chat, now including block/unblock events.

import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

export const handleChatEvents = (io, socket) => {
    socket.on('joinRoom', (chatId) => {
        socket.join(chatId);
    });

    socket.on('sendMessage', async (data) => {
        try {
            // 1. Save the message to the database
            const message = new Message({
                chatId: data.chatId,
                sender: data.senderId,
                recipient: data.recipientId,
                text: data.text,
            });
            const savedMessage = await message.save();

            // 2. Create a notification for the recipient
            const sender = await User.findById(data.senderId);
            const notification = new Notification({
                user: data.recipientId, // The user who receives the notification
                senderName: sender ? sender.name : 'A user',
                messageSnippet: data.text.substring(0, 50) + (data.text.length > 50 ? '...' : ''),
                chatId: data.chatId,
            });
            await notification.save();

            // 3. Broadcast the message and a notification event to the room
            socket.to(data.chatId).emit('receiveMessage', savedMessage);
            io.to(data.chatId).emit('newNotification', { userId: data.recipientId });

        } catch (error) {
            console.error("Error in sendMessage event:", error);
            socket.emit('messageError', { message: "Could not send or save your message." });
        }
    });

    socket.on('typing', (data) => {
        socket.to(data.chatId).emit('typing', { user: data.user });
    });

    socket.on('stopTyping', (data) => {
        socket.to(data.chatId).emit('stopTyping', { user: data.user });
    });

    // --- NEW: Listen for and broadcast block/unblock events ---
    socket.on('blockUser', (data) => {
        // Broadcast to the other user in the room that they have been blocked
        socket.to(data.chatId).emit('userBlocked', { blockerId: data.blockerId });
    });

    socket.on('unblockUser', (data) => {
        // Broadcast to the other user that they have been unblocked
        socket.to(data.chatId).emit('userUnblocked');
    });
};
