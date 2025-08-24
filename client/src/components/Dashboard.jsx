// --- File: Dashboard.jsx ---
// Fully fixed version: Smooth PDF upload, correct loader overlay, stable layout.

import React, { useState, useRef } from 'react';
import { Header } from './Header';
import { TicketDetails } from './TicketDetails';
import { Exchange } from './Exchange';

export const Dashboard = ({
  user,
  token,
  handleLogout,
  ticketData,
  setTicketData,
  processPDF,
  isLoading,
  error
}) => {
  const [showManualEntry, setShowManualEntry] = useState(false);
  const fileInputRef = useRef(null);

  // Update ticket data from TicketDetails
  const handleTicketUpdate = (updatedTicket) => {
    setTicketData(updatedTicket);
  };

  return (
    <div id="app-container" style={{ display: 'block' }}>
      <Header
        userName={user.name}
        handleLogout={handleLogout}
        token={token}
        onUseTicket={setTicketData}
      />

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

      {/* UPLOAD AREA */}
      {!showManualEntry && (
        <div
          className="upload-area"
          onClick={() => fileInputRef.current.click()}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          <div className="upload-icon">📄</div>

          <div className="upload-text">
            {!isLoading ? "Drop your PDF here or click to browse" : "🤖 Using AI to extract details..."}
          </div>

          {isLoading && (
            <div
              className="loading-overlay"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(255, 255, 255, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
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

      {/* Loading standalone (for fallback) */}
      {isLoading && showManualEntry && (
        <div className="loading" style={{ display: 'block' }}>
          <div className="loading-spinner"></div>
          <p>🤖 Using AI to extract details...</p>
        </div>
      )}

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
