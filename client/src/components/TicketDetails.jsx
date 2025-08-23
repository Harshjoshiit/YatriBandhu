// --- File: TicketDetails.jsx ---
// This component is now fully connected to save edits and create manual entries.

import React, { useState, useEffect } from 'react';
import { updateTicket, saveTicket } from '../utils/api'; // Import both save and update functions

export const TicketDetails = ({ initialData, token, onTicketUpdate, isManualEntry }) => {
    const [isEditing, setIsEditing] = useState(isManualEntry);
    const [ticket, setTicket] = useState(initialData || {});

    useEffect(() => {
        setTicket(initialData || {});
        // Automatically enter edit mode for manual entry or if there's no data
        if (isManualEntry || !initialData) {
            setIsEditing(true);
        }
    }, [initialData, isManualEntry]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setTicket(prev => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            if (ticket._id) {
                // If the ticket has an ID, it's an existing ticket that needs to be updated.
                const updated = await updateTicket(ticket._id, ticket, token);
                onTicketUpdate(updated); // Notify the parent component of the update
                setIsEditing(false);
            } else {
                // If there's no ID, it's a new manual entry that needs to be saved.
                const saved = await saveTicket(ticket, token);
                onTicketUpdate(saved); // Update the parent state with the new ticket, which now has an ID
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Failed to save changes:", error);
            alert("Could not save changes. Please ensure all fields are filled correctly.");
        }
    };

    return (
        <div id="card" className="card show">
            <div className="card-header">
                <h3><span className="train-icon">🎫</span>Ticket Details</h3>
                <button onClick={() => setIsEditing(!isEditing)} className="icon-btn" title="Edit Ticket">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
            </div>
            <div className="detail-row">
                <span className="detail-label">👤 Name</span>
                <input type="text" className="detail-value" id="name" value={ticket.name || ''} readOnly={!isEditing} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
                <span className="detail-label"># PNR</span>
                <input type="text" className="detail-value" id="pnr" value={ticket.pnr || ''} readOnly={!isEditing} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
                <span className="detail-label">🚆 Train No</span>
                <input type="text" className="detail-value" id="trainNo" value={ticket.trainNo || ''} readOnly={!isEditing} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
                <span className="detail-label">📍 From</span>
                <input type="text" className="detail-value" id="src" value={ticket.src || ''} readOnly={!isEditing} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
                <span className="detail-label">🎯 To</span>
                <input type="text" className="detail-value" id="dest" value={ticket.dest || ''} readOnly={!isEditing} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
                <span className="detail-label">🚃 Coach</span>
                <input type="text" className="detail-value" id="coach" value={ticket.coach || ''} readOnly={!isEditing} onChange={handleInputChange} />
            </div>
            <div className="detail-row">
                <span className="detail-label">💺 Seat/Berth</span>
                <input type="text" className="detail-value" id="seat" value={ticket.seat || ''} readOnly={!isEditing} onChange={handleInputChange} />
            </div>
            
            {isEditing && (
                <div style={{ marginTop: '20px' }}>
                    <button onClick={handleSaveChanges} className="btn btn-primary" style={{ width: '100%' }}>Save Changes</button>
                </div>
            )}
        </div>
    );
};
