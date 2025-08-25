// --- File: src/components/AestheticCard.jsx ---

import React from 'react';

// This is a decorative component with enhanced animations.
export const AestheticCard = () => {
    return (
        <div className="aesthetic-card">
            <div className="card-content">
                <div className="card-icon">
                    {/* A simple, elegant plane icon */}
                    <svg xmlns="http://www.w.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 5.2 5.2c.3.3.8.4 1.1.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                    </svg>
                </div>
                <h3>Travel Smarter</h3>
                <p>Exchange seats, connect with fellow passengers, and make your journey better.</p>
                
                {/* --- NEW: Travel Animation --- */}
                <div className="travel-animation">
                    <svg width="100%" viewBox="0 0 900 450">
                        <path 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="world-path"
                            d="M1,258 C10,253,25,228,58,225 C92,222,110,243,129,248 C148,253,161,242,183,235 C205,228,214,233,234,242 C254,251,269,248,285,238 C301,228,303,222,323,221 C343,220,359,233,378,241 C397,249,411,245,423,234 C435,223,436,214,451,211 C466,208,479,219,496,226 C513,233,525,228,539,218 C553,208,561,202,577,203 C593,204,603,216,620,223 C637,230,649,225,662,215 C675,205,681,194,697,192 C713,190,724,202,740,208 C756,214,767,208,779,198 C791,188,798,179,814,178 C830,177,839,188,854,195 C869,202,880,198,890,189"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
