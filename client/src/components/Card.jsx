import React from 'react';

// This is the final, redesigned AestheticCard component.
// It fixes all overflow issues and uses a lighter, beige theme.
const AestheticCard = () => {
  return (
    <>
      {/* We inject a <style> tag here to keep the component self-contained.
        This is a clean way to handle complex styles like animations and gradients 
        without needing a separate CSS file.
      */}
      <style>{`
        .aesthetic-card-container {
          width: 100%;
          max-width: 400px; /* Set a max-width to prevent overflow */
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .aesthetic-card-content {
          position: relative;
          background: #fdfaf2; /* Light beige background */
          border-radius: 24px;
          padding: 40px;
          border: 1px solid #f2eee3;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          overflow: hidden; /* Prevent glow orbs from overflowing */
        }

        .aesthetic-card-content:hover {
          transform: scale(1.03);
          border-color: #e0d9c6;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .glow-orb-1 {
          position: absolute;
          top: -40px;
          left: -40px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(0, 123, 255, 0.1), transparent 70%);
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite alternate;
        }

        .glow-orb-2 {
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(255, 87, 34, 0.1), transparent 70%);
          border-radius: 50%;
          animation: pulse 5s ease-in-out infinite alternate-reverse;
        }

        .card-header {
          text-align: center;
          margin-bottom: 32px;
          position: relative;
        }

        .plane-icon {
          font-size: 50px;
          margin-bottom: 16px;
          display: inline-block;
          transition: transform 0.5s ease;
          animation: float 3s ease-in-out infinite;
        }

        .aesthetic-card-content:hover .plane-icon {
            transform: scale(1.1) rotate(5deg);
        }

        .card-title {
          font-size: 36px;
          font-weight: bold;
          color: #1A202C;
          margin-bottom: 12px;
        }

        .card-subtitle {
          color: #4A5568;
          line-height: 1.6;
          font-size: 16px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          padding: 16px;
          margin-bottom: 12px;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.4s ease;
        }

        .feature-item:hover {
            transform: translateX(10px);
            background: rgba(0, 123, 255, 0.05);
            border-color: rgba(0, 123, 255, 0.2);
        }

        .feature-icon {
          font-size: 28px;
          margin-right: 16px;
        }

        .feature-text .title {
          font-size: 18px;
          font-weight: bold;
          color: #1A202C;
          margin-bottom: 2px;
        }

        .feature-text .desc {
          font-size: 14px;
          color: #718096;
        }

        /* --- NEW: Floating Text Animation --- */
        .floating-text {
            animation: float-light 4s ease-in-out infinite;
            transition: transform 0.5s ease;
        }
        .aesthetic-card-content:hover .floating-text {
            transform: translateY(-5px);
        }


        /* Keyframe animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-light {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulse {
          from { transform: scale(0.8); opacity: 0.5; }
          to { transform: scale(1.2); opacity: 0.8; }
        }
      `}</style>
      
      <div className="aesthetic-card-container">
        <div className="aesthetic-card-content">
          <div className="glow-orb-1"></div>
          <div className="glow-orb-2"></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="card-header">
              <span className="plane-icon">✈️</span>
              <div className="floating-text">
                <h1 className="card-title">Travel Smarter</h1>
                <p className="card-subtitle">
                  Exchange seats, connect with fellow passengers, and make your journey extraordinary.
                </p>
              </div>
            </div>

            <div>
              {[
                {icon: '👥', title: 'Community', desc: 'Connect with travelers'},
                {icon: '⭐', title: 'Premium', desc: 'Upgrade your experience'}
              ].map((item, i) => (
                <div key={i} className="feature-item">
                  <span className="feature-icon">{item.icon}</span>
                  <div className="feature-text">
                    <div className="title">{item.title}</div>
                    <div className="desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AestheticCard;
