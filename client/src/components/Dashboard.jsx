// --- File: Dashboard.jsx ---
// This is the main screen users see after logging in.
// FIXED: Now passes all required props to children components.

import React, { useState, useRef } from 'react';
import { Header } from './Header';
import { TicketDetails } from './TicketDetails';
import { Exchange } from './Exchange';

export const Dashboard = ({ user, token, handleLogout, ticketData, setTicketData, processPDF, isLoading, error }) => {
    const [showManualEntry, setShowManualEntry] = useState(false);
    const fileInputRef = useRef(null);

    // This function will be passed to TicketDetails to update the state here
    const handleTicketUpdate = (updatedTicket) => {
        setTicketData(updatedTicket);
    };

    return (
        <div id="app-container" style={{ display: 'block' }}>
            <Header userName={user.name} handleLogout={handleLogout} token={token} onUseTicket={setTicketData} />
            <div className="header">
                <h2>🚂 TravelBuddy</h2>
                <p>Upload your PDF ticket or enter details to find exchange partners</p>
            </div>

            <div className="mode-selector">
                <button onClick={() => { setShowManualEntry(false); setTicketData(null); }} className={`btn ${!showManualEntry ? 'active' : ''}`}>Upload Ticket</button>
                <button onClick={() => { setShowManualEntry(true); setTicketData(null); }} className={`btn ${showManualEntry ? 'active' : ''}`}>Enter Manually</button>
            </div>

            {!showManualEntry && (
                <div className="upload-area" onClick={() => fileInputRef.current.click()}>
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">Drop your PDF here or click to browse</div>
                    <input type="file" ref={fileInputRef} onChange={(e) => processPDF(e.target.files[0])} accept="application/pdf" style={{ display: 'none' }}/>
                </div>
            )}

            {isLoading && <div className="loading" style={{display: 'block'}}><div className="loading-spinner"></div><p>Processing...</p></div>}
            {error && <p className="auth-error">{error}</p>}
            
            {(ticketData || showManualEntry) && (
                <TicketDetails 
                    initialData={ticketData} 
                    token={token} 
                    onTicketUpdate={handleTicketUpdate}
                    isManualEntry={showManualEntry} 
                />
            )}

            {ticketData && ticketData._id && (
                <Exchange 
                    ticketData={ticketData} 
                    user={user} 
                    token={token} 
                />
            )}
        </div>
    );
};
