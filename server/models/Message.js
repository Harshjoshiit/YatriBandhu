// --- File: models/Message.js ---
// Defines the schema for chat messages.

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        index: true, // Add an index for faster queries
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
