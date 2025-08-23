// --- File: routes/notificationRoutes.js ---
// New route file for notifications.

import express from 'express';
import { getMyNotifications, markNotificationAsRead } from '../controllers/notificationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMyNotifications);
router.put('/:id/read', protect, markNotificationAsRead);

export default router;
