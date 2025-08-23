// --- File: models/Ticket.js ---
// Defines the schema for the Ticket collection.

import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
    pnr: { type: String, required: true },
    trainNo: { type: String, required: true },
    name: { type: String, required: true },
    src: { type: String, required: true },
    dest: { type: String, required: true },
    coach: { type: String, required: true },
    seat: { type: String, required: true },
    desiredCoach: { type: String },
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
