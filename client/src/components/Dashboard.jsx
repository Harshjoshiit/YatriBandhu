// --- File: Dashboard.jsx ---
// This is the main screen users see after logging in.
// FIXED: Now passes all required props to children components.

import React, { useState, useRef } from 'react';
import { Header } from './Header';
import { TicketDetails } from './TicketDetails';
import { Exchange } from './Exchange';
import AestheticCard from './Card'; 
import AIAssist from './AIAssist'; 

// --- Aesthetic Styles (Inline for this example) ---
const styles = {
    // Layout
    dashboardLayout: {
        minHeight: '100vh',
        backgroundColor: '#f4f7f6', // Light gray background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    appContainer: {
        width: '100%',
        maxWidth: '800px', // Constrain the main content width
        backgroundColor: '#ffffff', // White card for main content
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        padding: '30px',
        margin: '20px 0',
    },
    // Header & Typography
    mainHeader: {
        fontSize: '2em',
        color: '#007bff', // Primary Blue
        marginBottom: '5px',
        fontWeight: 600,
        textAlign: 'center',
    },
    subText: {
        color: '#6c757d', // Muted Gray
        marginBottom: '25px',
        textAlign: 'center',
        fontSize: '1.1em',
    },
    // Mode Selector
    modeSelector: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        borderRadius: '8px',
        padding: '5px',
        backgroundColor: '#e9ecef', // Light background for the selector
    },
    modeButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        backgroundColor: 'transparent',
        color: '#495057', // Dark text color
        flex: 1,
    },
    modeButtonActive: {
        backgroundColor: '#007bff', // Primary Blue
        color: '#ffffff',
        boxShadow: '0 4px 10px rgba(0, 123, 255, 0.3)',
    },
    // Upload Area
    uploadArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        border: '3px dashed #ced4da', // Dashed border
        borderRadius: '10px',
        padding: '30px',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
        '&:hover': {
            borderColor: '#007bff',
            backgroundColor: '#e6f7ff', // Very light blue hover effect
        },
    },
    uploadIcon: {
        fontSize: '3em',
        marginBottom: '10px',
        color: '#007bff',
    },
    uploadText: {
        fontSize: '1.1em',
        color: '#495057',
        fontWeight: 500,
        textAlign: 'center',
    },
    // Loading/Error
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
    },
    loadingSpinner: {
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        animation: 'spin 1s linear infinite',
        margin: '10px 0',
    },
    loadingText: {
        color: '#007bff',
    },
    errorText: {
        color: '#dc3545', // Red error color
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: '8px',
        margin: '15px 0',
    },
    // Footer
    footer: {
        width: '100%',
        maxWidth: '800px',
        textAlign: 'center',
        padding: '20px',
        color: '#6c757d',
        fontSize: '0.9em',
    },
    footerLink: {
        color: '#007bff',
        textDecoration: 'none',
        margin: '0 5px',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
};

// Keyframe for the spinner (cannot be defined in React inline style object,
// but for the sake of completeness in a real app, this would be in CSS/CSS-in-JS)
// For this example, we'll assume a global CSS keyframe is available.
// In a real project, you would need a CSS file or a library like styled-components.
// For now, let's keep the spinner as is, and focus on the rest of the styles.

export const Dashboard = ({ user, token, handleLogout, ticketData, setTicketData, processPDF, isLoading, error }) => {
    const [showManualEntry, setShowManualEntry] = useState(false); 
    const fileInputRef = useRef(null);

    // This function will be passed to TicketDetails to update the state here
    const handleTicketUpdate = (updatedTicket) => {
        setTicketData(updatedTicket);
    };
    
    // Helper function to merge styles for active state
    const getButtonStyles = (isActive) => ({
        ...styles.modeButton,
        ...(isActive ? styles.modeButtonActive : {}),
    });
 
    return (
        <>
        <div style={styles.dashboardLayout}>
            {/* AestheticCard and AIAssist are assumed to be sidebars or auxiliary components */}
            <AestheticCard />
            
            <div id="app-container" className="main-content" style={styles.appContainer}>
                {/* Header is assumed to be a separate component but placed here visually */}
                <Header userName={user.name} handleLogout={handleLogout} token={token} onUseTicket={setTicketData} />
                
                <div className="header">
                    <h2 style={styles.mainHeader}>🚂 TravelBuddy</h2>
                    <p style={styles.subText}>Upload your PDF ticket or enter details to find exchange partners</p>
                </div>

                <div className="mode-selector" style={styles.modeSelector}>
                    <button 
                        onClick={() => { setShowManualEntry(false); setTicketData(null); }} 
                        style={getButtonStyles(!showManualEntry)}
                    >
                        Upload Ticket
                    </button>
                    <button 
                        onClick={() => { setShowManualEntry(true); setTicketData(null); }} 
                        style={getButtonStyles(showManualEntry)}
                    >
                        Enter Manually
                    </button>
                </div>

                {!showManualEntry && (
                    <div 
                        className="upload-area" 
                        onClick={() => fileInputRef.current.click()} 
                        style={styles.uploadArea}
                    >
                        <div className="upload-icon" style={styles.uploadIcon}>📄</div>
                        <div className="upload-text" style={styles.uploadText}>Drop your PDF here or click to browse</div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={(e) => processPDF(e.target.files[0])} 
                            accept="application/pdf" 
                            style={{ display: 'none' }}
                        />
                    </div>
                )}

                {isLoading && (
                    <div className="loading" style={styles.loadingContainer}>
                        {/* The spinner is preserved but its style definition is assumed to exist via a global CSS animation */}
                        <div className="loading-spinner" style={styles.loadingSpinner}></div>
                        <p style={styles.loadingText}>🤖 Using AI to extract details...</p>
                    </div>
                )}
                
                {error && <p className="auth-error" style={styles.errorText}>{error}</p>}
                
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
            
            <AIAssist />
            
            <footer className="dashboard-footer" style={styles.footer}>
                <p>&copy; 2025 YatriBandhu. All Rights Reserved.</p>
                <div className="footer-links">
                    <a href="#" style={styles.footerLink}>Privacy Policy</a>
                    <span>&middot;</span>
                    <a href="#" style={styles.footerLink}>Terms of Service</a>
                </div>
            </footer>
        </div>
        </>
    );
};
