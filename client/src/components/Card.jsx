import React, { useState } from 'react';

export default function TravelCard() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`
                relative w-80 h-96 rounded-2xl overflow-hidden cursor-pointer
                bg-gradient-to-br from-blue-900 to-purple-900
                transform transition-transform duration-300 ease-out
                ${isHovered ? 'scale-105' : 'scale-100'}
                shadow-2xl
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background dots */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 bg-white rounded-full"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                {/* Plane icon using simple SVG */}
                <div className={`
                    mb-6 p-4 rounded-full bg-white bg-opacity-20
                    transform transition-all duration-300
                    ${isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'}
                `}>
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-white mb-4">
                    Travel Smarter
                </h3>

                {/* Description */}
                <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                    Exchange seats, connect with fellow passengers, and make your journey 
                    <span className="text-blue-300 font-semibold"> extraordinary</span>.
                </p>

                {/* Simple feature indicators */}
                <div className="flex justify-center space-x-6 mb-8">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                            📍
                        </div>
                        <span className="text-xs text-gray-300">Destinations</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                            👥
                        </div>
                        <span className="text-xs text-gray-300">Community</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                            ⭐
                        </div>
                        <span className="text-xs text-gray-300">Premium</span>
                    </div>
                </div>

                {/* Travel path */}
                <div className="w-full mb-6">
                    <div className="flex items-center justify-between">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-2"></div>
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                </div>

                {/* CTA Button */}
                <button className={`
                    px-8 py-3 rounded-full font-semibold text-white
                    bg-gradient-to-r from-blue-600 to-purple-600
                    hover:from-blue-500 hover:to-purple-500
                    transform transition-all duration-200
                    ${isHovered ? 'scale-105' : 'scale-100'}
                    shadow-lg
                `}>
                    Start Your Journey
                </button>
            </div>

            {/* Hover overlay */}
            <div className={`
                absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 
                opacity-0 transition-opacity duration-300
                ${isHovered ? 'opacity-10' : 'opacity-0'}
            `}></div>
        </div>
    );
}
