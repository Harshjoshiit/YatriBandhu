// --- File: controllers/notificationController.js ---
// New controller to handle notification logic.

import Notification from '../models/Notification.js';

// @desc    Get all notifications for a logged-in user
// @route   GET /api/notifications
export const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
export const markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification && notification.user.toString() === req.user._id.toString()) {
            notification.isRead = true;
            await notification.save();
            res.json({ message: 'Notification marked as read' });
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
