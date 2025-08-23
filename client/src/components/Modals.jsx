// --- File: Modals.jsx ---
// The Notifications modal is now fully connected.

import React, { useState, useEffect } from 'react';
import { fetchMyTickets, deleteTicket, fetchNotifications, markNotificationRead } from '../utils/api';

// A generic Modal wrapper
const Modal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <div className="modal-header"><h4>{title}</h4><button onClick={onClose} className="modal-close">&times;</button></div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

// My Tickets Modal Content
export const MyTicketsModal = ({ isOpen, onClose, token, onUseTicket }) => {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        if (isOpen) {
            fetchMyTickets(token).then(setTickets).catch(err => console.error("Failed to fetch tickets:", err));
        }
    }, [isOpen, token]);

    const handleDelete = async (ticketId) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteTicket(ticketId, token);
                setTickets(tickets.filter(ticket => ticket._id !== ticketId));
            } catch (error) {
                alert("Could not delete the ticket.");
            }
        }
    };

    return (
        <Modal title="My Recent Tickets" isOpen={isOpen} onClose={onClose}>
            {tickets.length > 0 ? tickets.map((ticket) => (
                <div key={ticket._id} className="ticket-list-item">
                    <p><strong>Train No:</strong> {ticket.trainNo}</p>
                    <p><strong>PNR:</strong> {ticket.pnr}</p>
                    <div className="ticket-actions">
                        <button onClick={() => onUseTicket(ticket)} className="btn btn-primary">Use This</button>
                        <button onClick={() => handleDelete(ticket._id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            )) : <p>You have not uploaded any tickets yet.</p>}
        </Modal>
    );
};

// Notifications Modal Content
export const NotificationsModal = ({ isOpen, onClose, token }) => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        if (isOpen) {
            fetchNotifications(token).then(setNotifications).catch(err => console.error("Failed to fetch notifications:", err));
        }
    }, [isOpen, token]);

    const handleNotificationClick = async (notificationId) => {
        try {
            await markNotificationRead(notificationId, token);
            setNotifications(notifications.map(n => n._id === notificationId ? { ...n, isRead: true } : n));
            // Add navigation logic here if needed
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };
    
    return (
        <Modal title="Notifications" isOpen={isOpen} onClose={onClose}>
            {notifications.length > 0 ? notifications.map((note) => (
                 <div key={note._id} className={`notification-item ${!note.isRead ? 'unread' : ''}`} onClick={() => handleNotificationClick(note._id)}>
                    <p><strong>{note.senderName}</strong> sent a message</p>
                    <p className="msg-snippet">"{note.messageSnippet}"</p>
                </div>
            )) : <p>No notifications yet.</p>}
        </Modal>
    );
};
