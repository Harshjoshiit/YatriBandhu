// --- File: controllers/chatController.js ---
// Contains the logic for fetching and clearing chat messages.

import Message from '../models/Message.js';

// @desc    Get messages for a specific chat
// @route   GET /api/chats/:chatId
export const getChatMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId }).populate('sender', 'name').sort({ createdAt: 'asc' });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Clear chat history for a specific chat
// @route   DELETE /api/chats/:chatId
export const clearChatHistory = async (req, res) => {
    try {
        // In a real app, you might want to add more checks to ensure the user is part of this chat
        await Message.deleteMany({ chatId: req.params.chatId });
        res.json({ message: 'Chat history cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
