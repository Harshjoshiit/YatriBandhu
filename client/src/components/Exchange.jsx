// --- File: src/components/Exchange.jsx ---
// This component is now fully connected and fixed to resolve build errors.

import React, { useState } from 'react';
import ChatModal from './ChatModal'; // Use default import
import { requestExchange, checkAvailability } from '../utils/api';

export const Exchange = ({ ticketData, user, token }) => {
    const [desiredCoach, setDesiredCoach] = useState('');
    const [availability, setAvailability] = useState([]);
    const [chatPartner, setChatPartner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckAvailability = async () => {
        if (!ticketData || !ticketData._id) {
            alert("A saved ticket is required to find an exchange.");
            return;
        }
        if (!desiredCoach) {
            alert("Please enter your desired coach.");
            return;
        }

        setIsLoading(true);
        setError('');
        setAvailability([]);

        try {
            await requestExchange(ticketData._id, desiredCoach, token);
            const matches = await checkAvailability(ticketData._id, token);
            setAvailability(matches);
            if (matches.length === 0) {
                alert("No matching exchange partners found at the moment.");
            }
        } catch (err) {
            setError(err.message);
            alert(`An error occurred: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const openChat = (partner) => {
        setChatPartner(partner);
    };

    return (
        <>
            <div id="exchange-section" className="feature-section" style={{ display: 'block' }}>
                <h4>Find a Seat Exchange</h4>
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Enter desired coach (e.g., B2)"
                        value={desiredCoach}
                        onChange={(e) => setDesiredCoach(e.target.value)}
                    />
                </div>
                <button onClick={handleCheckAvailability} className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                    {isLoading ? 'Checking...' : 'Request and Check Availability'}
                </button>
                
                {error && <p className="auth-error">{error}</p>}

                {availability.length > 0 && (
                    <div className="table-container">
                        <table id="availability-table" style={{ display: 'table' }}>
                            <thead>
                                <tr><th>Name</th><th>Seat</th><th>Connect</th></tr>
                            </thead>
                            <tbody>
                                {availability.map(match => (
                                    <tr key={match._id}>
                                        <td data-label="Name">{match.user.name}</td>
                                        <td data-label="Seat">{match.seat}</td>
                                        <td data-label="Connect">
                                            <button onClick={() => openChat(match.user)} className="connect-btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {chatPartner && (
                <ChatModal 
                    isOpen={!!chatPartner}
                    onClose={() => setChatPartner(null)}
                    chatPartner={chatPartner}
                    currentUser={user}
                    token={token}
                />
            )}
        </>
    );
};
