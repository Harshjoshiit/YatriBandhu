// --- File: Header.jsx ---
// This component is now fully functional, with logic to open the modals.

import React, { useState } from 'react';
import { MyTicketsModal, NotificationsModal } from './Modals';

export const Header = ({ userName, handleLogout, token, onUseTicket }) => {
    const [showTickets, setShowTickets] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0); // In a real app, this would update via sockets

    return (
        <>
            <div className="app-header">
                <div className="welcome-message">
                    <p>Welcome, {userName}!</p>
                </div>
                <div className="header-actions">
                    <button onClick={() => setShowTickets(true)} className="icon-btn" title="My Tickets">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
                    </button>
                    <button onClick={() => setShowNotifications(true)} className="icon-btn" title="Notifications">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                        {notificationCount > 0 && 
                            <span className="notification-badge">{notificationCount}</span>
                        }
                    </button>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>

            <MyTicketsModal
                isOpen={showTickets}
                onClose={() => setShowTickets(false)}
                token={token}
                onUseTicket={onUseTicket}
            />
            <NotificationsModal
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                token={token}
            />
        </>
    );
};
