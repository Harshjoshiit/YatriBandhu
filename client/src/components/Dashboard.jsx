// --- File: Dashboard.jsx ---
// Fixed: PDF upload area keeps layout stable, overlay loader for AI extraction.

import React, { useState, useRef } from 'react';
import { Header } from './Header';
import { TicketDetails } from './TicketDetails';
import { Exchange } from './Exchange';

export const Dashboard = ({ user, token, handleLogout, ticketData, setTicketData, processPDF, isLoading, error }) => {
    const [showManualEntry, setShowManualEntry] = useState(false);
    const fileInputRef = useRef(null);

    // Update ticket state from child component
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
                <button
                    onClick={() => { setShowManualEntry(false); setTicketData(null); }}
                    className={`btn ${!showManualEntry ? 'active' : ''}`}
                >
                    Upload Ticket
                </button>
                <button
                    onClick={() => { setShowManualEntry(true); setTicketData(null); }}
                    className={`btn ${showManualEntry ? 'active' : ''}`}
                >
                    Enter Manually
                </button>
            </div>

            {/* Upload area */}
            {!showManualEntry && (
                <div className="upload-area" onClick={() => fileInputRef.current.click()} style={{ position: 'relative' }}>
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">Drop your PDF here or click to browse</div>

                    {/* Overlay loader */}
                    {isLoading && (
                        <div className="loading-overlay" style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(255, 255, 255, 0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none' // allows underlying clicks if needed
                        }}>
                            <div className="loading-spinner"></div>
                            <p>🤖 Using AI to extract details...</p>
                        </div>
                    )}

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => processPDF(e.target.files[0])}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                    />
                </div>
            )}

            {error && <p className="auth-error">{error}</p>}

            {/* TicketDetails */}
            {(ticketData || showManualEntry) && !isLoading && (
                <TicketDetails 
                    initialData={ticketData} 
                    token={token} 
                    onTicketUpdate={handleTicketUpdate}
                    isManualEntry={showManualEntry} 
                />
            )}

            {/* Exchange component */}
            {ticketData && ticketData._id && !isLoading && (
                <Exchange 
                    ticketData={ticketData} 
                    user={user} 
                    token={token} 
                />
            )}
        </div>
    );
};
