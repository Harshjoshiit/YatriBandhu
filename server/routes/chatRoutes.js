// --- File: routes/chatRoutes.js ---
// Defines the API endpoints for chat.

import express from 'express';
import { getChatMessages, clearChatHistory } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/:chatId')
    .get(protect, getChatMessages)
    .delete(protect, clearChatHistory);

export default router;
