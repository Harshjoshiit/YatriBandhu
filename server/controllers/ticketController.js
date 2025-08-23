// --- File: controllers/ticketController.js ---
// Contains all business logic for ticket management and seat exchange.

import Ticket from '../models/Ticket.js';

// @desc    Save a new ticket
// @route   POST /api/tickets
export const saveTicket = async (req, res) => {
    const { pnr, trainNo, name, src, dest, coach, seat } = req.body;
    try {
        const ticket = new Ticket({ user: req.user._id, pnr, trainNo, name, src, dest, coach, seat });
        const createdTicket = await ticket.save();
        res.status(201).json(createdTicket);
    } catch (error) {
        res.status(400).json({ message: 'Error saving ticket', error });
    }
};

// @desc    Get all tickets for a logged-in user
// @route   GET /api/tickets
export const getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a ticket
// @route   PUT /api/tickets/:id
export const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket && ticket.user.toString() === req.user._id.toString()) {
            ticket.pnr = req.body.pnr || ticket.pnr;
            ticket.trainNo = req.body.trainNo || ticket.trainNo;
            ticket.name = req.body.name || ticket.name;
            ticket.src = req.body.src || ticket.src;
            ticket.dest = req.body.dest || ticket.dest;
            ticket.coach = req.body.coach || ticket.coach;
            ticket.seat = req.body.seat || ticket.seat;
            const updatedTicket = await ticket.save();
            res.json(updatedTicket);
        } else {
            res.status(404).json({ message: 'Ticket not found or user not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a ticket's desiredCoach
// @route   PUT /api/tickets/:id/exchange
export const requestExchange = async (req, res) => {
    const { desiredCoach } = req.body;
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket && ticket.user.toString() === req.user._id.toString()) {
            ticket.desiredCoach = desiredCoach.toUpperCase();
            const updatedTicket = await ticket.save();
            res.json(updatedTicket);
        } else {
            res.status(404).json({ message: 'Ticket not found or user not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Check for available seat exchanges
// @route   GET /api/tickets/:id/availability
export const checkAvailability = async (req, res) => {
    try {
        const myTicket = await Ticket.findById(req.params.id);
        if (!myTicket || !myTicket.desiredCoach) {
            return res.status(404).json({ message: 'Your ticket or desired coach not found' });
        }
        const potentialMatches = await Ticket.find({
            trainNo: myTicket.trainNo,
            coach: myTicket.desiredCoach,
            desiredCoach: myTicket.coach,
            user: { $ne: req.user._id }
        }).populate('user', 'name email');
        res.json(potentialMatches);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
export const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket && ticket.user.toString() === req.user._id.toString()) {
            await ticket.deleteOne();
            res.json({ message: 'Ticket removed' });
        } else {
            res.status(404).json({ message: 'Ticket not found or user not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
