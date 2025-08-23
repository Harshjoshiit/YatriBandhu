// --- File: routes/userRoutes.js ---
// Defines the API endpoints for user authentication and blocking.

import express from 'express';
import { registerUser, authUser, blockUser, unblockUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);

// Block/Unblock routes
router.post('/block/:id', protect, blockUser);
router.delete('/block/:id', protect, unblockUser);

export default router;
