import React, { useState, useEffect } from 'react';
import { Plane, MapPin, Users, Star } from 'lucide-react';

export default function AestheticCard() {
    const [isHovered, setIsHovered] = useState(false);
    const [animationState, setAnimationState] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationState(prev => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div 
                className={`
                    relative w-96 h-[500px] rounded-3xl overflow-hidden cursor-pointer
                    bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20
                    backdrop-blur-xl border border-white/10
                    transform transition-all duration-700 ease-out
                    ${isHovered ? 'scale-105 shadow-2xl shadow-purple-500/25' : 'shadow-xl'}
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Floating Clouds */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white/5 rounded-full blur-sm animate-pulse"
                            style={{
                                width: `${40 + i * 10}px`,
                                height: `${20 + i * 5}px`,
                                top: `${10 + i * 15}%`,
                                left: `${-10 + (animationState * 25)}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + i * 0.5}s`
                            }}
                        />
                    ))}
                    
                    {/* Twinkling Stars */}
                    {[...Array(12)].map((_, i) => (
                        <Star
                            key={`star-${i}`}
                            className={`
                                absolute text-white/30 w-2 h-2 animate-pulse
                                ${animationState % 2 === i % 2 ? 'opacity-100' : 'opacity-30'}
                            `}
                            style={{
                                top: `${Math.random() * 80}%`,
                                left: `${Math.random() * 90}%`,
                                animationDelay: `${i * 0.2}s`
                            }}
                        />
                    ))}
                </div>

                {/* Main Content */}
                <div className="relative z-10 h-full flex flex-col p-8">
                    {/* Header Icon with Animation */}
                    <div className="flex justify-center mb-6">
                        <div className={`
                            relative p-4 rounded-full transition-all duration-500
                            ${isHovered ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 scale-110' : 'bg-white/10'}
                        `}>
                            <Plane 
                                className={`
                                    w-12 h-12 text-white transition-all duration-700
                                    ${isHovered ? 'rotate-12 text-blue-300' : 'rotate-0'}
                                `}
                            />
                            {/* Plane Trail Effect */}
                            <div className={`
                                absolute top-1/2 -left-8 w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-400/50
                                transition-all duration-1000 transform -translate-y-1/2
                                ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                            `} />
                        </div>
                    </div>

                    {/* Title with Gradient Text */}
                    <h3 className={`
                        text-3xl font-bold text-center mb-4 transition-all duration-500
                        bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent
                        ${isHovered ? 'scale-105' : 'scale-100'}
                    `}>
                        Travel Smarter
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-center text-lg leading-relaxed mb-8 transition-all duration-500">
                        Exchange seats, connect with fellow passengers, and make your journey 
                        <span className="text-blue-300 font-medium"> extraordinary</span>.
                    </p>

                    {/* Feature Icons */}
                    <div className="flex justify-center space-x-8 mb-8">
                        {[
                            { icon: MapPin, label: 'Destinations' },
                            { icon: Users, label: 'Community' },
                            { icon: Star, label: 'Premium' }
                        ].map(({ icon: Icon, label }, index) => (
                            <div 
                                key={label}
                                className={`
                                    flex flex-col items-center space-y-2 transition-all duration-500
                                    ${isHovered ? 'transform -translate-y-2' : ''}
                                `}
                                style={{ 
                                    transitionDelay: `${index * 200}ms` 
                                }}
                            >
                                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                                    <Icon className="w-5 h-5 text-white/80" />
                                </div>
                                <span className="text-xs text-gray-400">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Animated World Path */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-32 relative">
                            <svg width="100%" height="100%" viewBox="0 0 320 100" className="overflow-visible">
                                <defs>
                                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                                        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                        <feMerge> 
                                            <feMergeNode in="coloredBlur"/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>
                                
                                {/* World Path */}
                                <path
                                    d="M10,60 Q80,20 160,50 T310,40"
                                    fill="none"
                                    stroke="url(#pathGradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    filter="url(#glow)"
                                    className={`
                                        transition-all duration-1000
                                        ${isHovered ? 'opacity-100' : 'opacity-70'}
                                    `}
                                    strokeDasharray="500"
                                    strokeDashoffset={isHovered ? '0' : '500'}
                                />
                                
                                {/* Animated Plane on Path */}
                                <g className={`
                                    transition-all duration-3000 ease-in-out
                                    ${animationState >= 2 ? 'opacity-100' : 'opacity-0'}
                                `}>
                                    <circle
                                        cx={50 + (animationState * 70)}
                                        cy={50 - Math.sin((animationState * 70) / 50) * 15}
                                        r="3"
                                        fill="white"
                                        className="animate-pulse"
                                    />
                                </g>
                                
                                {/* Destination Markers */}
                                {[30, 120, 200, 290].map((x, i) => (
                                    <circle
                                        key={i}
                                        cx={x}
                                        cy={55 - Math.sin(x / 50) * 15}
                                        r="2"
                                        fill="rgba(255, 255, 255, 0.6)"
                                        className={`
                                            transition-all duration-500
                                            ${isHovered ? 'animate-ping' : ''}
                                        `}
                                        style={{ animationDelay: `${i * 200}ms` }}
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <div className="flex justify-center">
                        <button className={`
                            px-8 py-3 rounded-full font-medium text-white
                            bg-gradient-to-r from-blue-600 to-purple-600
                            hover:from-blue-500 hover:to-purple-500
                            transform transition-all duration-300 ease-out
                            ${isHovered ? 'scale-105 shadow-lg shadow-purple-500/25' : 'scale-100'}
                            backdrop-blur-sm border border-white/10
                        `}>
                            Start Your Journey
                        </button>
                    </div>
                </div>

                {/* Subtle Border Glow */}
                <div className={`
                    absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none
                    bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                `} />
            </div>
        </div>
    );
}
