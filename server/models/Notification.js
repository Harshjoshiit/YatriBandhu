// --- File: models/Notification.js ---
// New Mongoose model for notifications.

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    senderName: { type: String, required: true },
    messageSnippet: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    // You can add more fields here like chatId to link to a conversation
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
