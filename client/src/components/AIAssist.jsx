import React from 'react';

// This is the new AIAssist component with an improved, consistent UI.
const AIAssist = () => {
  return (
    <>
      {/* We inject a <style> tag here to keep the component self-contained.
        This is a clean way to handle complex styles like animations and gradients 
        without needing a separate CSS file.
      */}
      <style>{`
        .ai-assist-card-container {
          width: 100%;
          max-width: 400px; /* Set a max-width to prevent overflow */
          padding: 20px;
          align-self: stretch; 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .ai-assist-card-content {
          position: relative;
          background: linear-gradient(145deg, #e6f7ff, #e9fff9); /* Light teal/green gradient */
          border-radius: 24px;
          padding: 40px;
          border: 1px solid #d9f2ff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          overflow: hidden; /* Prevent glow orbs from overflowing */
        }

        .ai-assist-card-content:hover {
          transform: scale(1.03);
          border-color: #b3e0ff;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .ai-card-header {
          text-align: center;
          margin-bottom: 32px;
          position: relative;
        }

        .ai-icon {
          font-size: 60px;
          margin-bottom: 24px;
          display: inline-block;
          transition: transform 0.5s ease;
          animation: pulse-ai 2.5s ease-in-out infinite;
        }

        .ai-card-title {
          font-size: 28px;
          font-weight: bold;
          color: #005f73; /* Dark Teal */
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        .ai-card-subtitle {
          font-size: 18px;
          color: #0a9396; /* Lighter Teal */
          margin-bottom: 30px;
          font-weight: 500;
        }
        
        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .loading-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #0a9396;
          animation: bounce-ai 1.4s ease-in-out infinite both;
        }

        /* Keyframe animations */
        @keyframes pulse-ai {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes bounce-ai {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
      
      <div className="ai-assist-card-container">
        <div className="ai-assist-card-content">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="ai-card-header">
              <span className="ai-icon">🤖</span>
              <h1 className="ai-card-title">AI ASSISTANT</h1>
              <p className="ai-card-subtitle">COMING SOON...</p>
            </div>

            <div className="loading-dots">
              <div className="loading-dot" style={{ animationDelay: '0s' }}></div>
              <div className="loading-dot" style={{ animationDelay: '0.16s' }}></div>
              <div className="loading-dot" style={{ animationDelay: '0.32s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssist;
