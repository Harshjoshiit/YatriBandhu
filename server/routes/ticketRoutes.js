// --- File: routes/ticketRoutes.js ---
// Defines all API endpoints related to tickets.

import express from 'express';
import { parsePdfWithGrok } from '../controllers/grokController.js';
import { saveTicket, getMyTickets, updateTicket, requestExchange, checkAvailability, deleteTicket } from '../controllers/ticketController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// This route is public because a user isn't logged in when they first upload a ticket.
router.post('/parse-pdf', parsePdfWithGrok);

// These routes are protected and require a valid token
router.route('/')
    .get(protect, getMyTickets)
    .post(protect, saveTicket);

router.route('/:id')
    .put(protect, updateTicket)
    .delete(protect, deleteTicket);

router.put('/:id/exchange', protect, requestExchange);
router.get('/:id/availability', protect, checkAvailability);

export default router;
