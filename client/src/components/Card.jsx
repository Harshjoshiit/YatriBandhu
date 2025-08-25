// --- File: src/components/AestheticCard.jsx ---
// This is the final version with a fixed layout and a new, lighter, beige theme.

import React, { useState } from 'react';
import { Plane, MapPin, Users, Star } from 'lucide-react';

export const AestheticCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`
                aesthetic-card
                relative w-full h-full rounded-2xl overflow-hidden cursor-pointer
                bg-beige-100 border border-beige-200
                transform transition-transform duration-300 ease-out
                ${isHovered ? 'scale-105' : 'scale-100'}
                shadow-lg
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a0aec0\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                {/* Icon */}
                <div className={`
                    mb-4 p-4 rounded-full bg-black bg-opacity-5
                    transform transition-all duration-300
                    ${isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'}
                `}>
                    <Plane className="w-10 h-10 text-gray-700" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Travel Smarter
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base mb-6 leading-relaxed">
                    Exchange seats, connect with fellow passengers, and make your journey extraordinary.
                </p>

                {/* Feature Icons */}
                <div className="flex justify-center space-x-4 mb-6">
                    <div className="flex flex-col items-center">
                        <div className="p-2 rounded-lg bg-black bg-opacity-5 mb-1">
                            <MapPin className="w-5 h-5 text-gray-700" />
                        </div>
                        <span className="text-xs text-gray-500">Destinations</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-2 rounded-lg bg-black bg-opacity-5 mb-1">
                            <Users className="w-5 h-5 text-gray-700" />
                        </div>
                        <span className="text-xs text-gray-500">Community</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-2 rounded-lg bg-black bg-opacity-5 mb-1">
                            <Star className="w-5 h-5 text-gray-700" />
                        </div>
                        <span className="text-xs text-gray-500">Premium</span>
                    </div>
                </div>

                {/* CTA Button */}
                <button className={`
                    px-6 py-2 rounded-full font-semibold text-white
                    bg-gradient-to-r from-blue-500 to-indigo-500
                    hover:from-blue-600 hover:to-indigo-600
                    transform transition-all duration-200
                    ${isHovered ? 'scale-105' : 'scale-100'}
                    shadow-md
                `}>
                    Start Your Journey
                </button>
            </div>
        </div>
    );
};
