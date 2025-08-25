import React from 'react';

const AestheticCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-md w-full group">
        {/* Glowing orbs */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-r from-violet-500/30 to-pink-500/30 rounded-full blur-xl animate-bounce"></div>
        
        {/* Main Card with magical border */}
        <div className="relative bg-gray-800/40 backdrop-blur-2xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-1000 hover:scale-110 hover:rotate-1 group-hover:shadow-2xl group-hover:shadow-purple-500/25">
          
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm group-hover:blur-none transition-all duration-700 -z-10"></div>
          
          {/* Header with floating plane */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
            <div className="text-5xl mb-4 hover:scale-125 transition-transform duration-500 cursor-pointer animate-bounce" style={{animationDelay: '0.5s'}}>✈️</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 transition-all duration-1000 cursor-pointer">
              Travel Smarter
            </h1>
            <p className="text-gray-300 mt-4 leading-relaxed hover:text-white transition-colors duration-500">
              Exchange seats, connect with fellow passengers, and make your journey extraordinary.
            </p>
          </div>

          {/* Glamorous Features */}
          <div className="space-y-4">
            {[
              { icon: '📍', title: 'Destinations', desc: 'Discover amazing places', color: 'blue' },
              { icon: '👥', title: 'Community', desc: 'Connect with travelers', color: 'purple' },
              { icon: '⭐', title: 'Premium', desc: 'Upgrade your experience', color: 'pink' }
            ].map((item, i) => (
              <div key={i} className={`group/item relative p-5 rounded-2xl bg-gradient-to-r from-gray-700/20 to-gray-600/20 hover:from-${item.color}-500/10 hover:to-${item.color}-400/10 border border-gray-600/30 hover:border-${item.color}-400/50 transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-${item.color}-500/25`} style={{animationDelay: `${i * 0.2}s`}}>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-500">{item.icon}</div>
                  <div>
                    <h3 className={`font-bold text-white group-hover/item:text-${item.color}-300 transition-colors duration-500`}>{item.title}</h3>
                    <p className="text-sm text-gray-400 group-hover/item:text-gray-200 transition-colors duration-500">{item.desc}</p>
                  </div>
                </div>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${item.color}-500/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-700`}></div>
              </div>
            ))}
          </div>

          {/* Spectacular CTA Button */}
          <div className="mt-8 text-center">
            <button className="group/btn relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-110 hover:-rotate-1 animate-pulse">
              <span className="relative z-10 group-hover/btn:scale-105 transition-transform duration-300">🚀 Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover/btn:scale-100 transition-transform duration-300 rounded-2xl"></div>
            </button>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-6 right-6 text-3xl opacity-30 animate-spin hover:opacity-80 transition-opacity duration-500" style={{animationDuration: '15s'}}>🌍</div>
          <div className="absolute bottom-6 left-6 text-2xl opacity-40 animate-pulse hover:opacity-90 transition-opacity duration-500">☁️</div>
          <div className="absolute top-1/2 left-2 text-lg opacity-20 animate-bounce" style={{animationDelay: '2s'}}>⭐</div>
        </div>
      </div>
    </div>
  );
};

export default AestheticCard;
