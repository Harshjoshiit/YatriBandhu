import React from 'react';

const AestheticCard = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #4c3d7a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    particle: {
      position: 'absolute',
      borderRadius: '50%',
      animation: 'float 3s ease-in-out infinite'
    },
    card: {
      position: 'relative',
      maxWidth: '400px',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '40px',
      border: '1px solid rgba(147, 51, 234, 0.3)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer'
    },
    cardHover: {
      transform: 'scale(1.05) rotate(1deg)',
      border: '1px solid rgba(147, 51, 234, 0.6)',
      boxShadow: '0 40px 80px rgba(147, 51, 234, 0.3)'
    },
    glowOrb1: {
      position: 'absolute',
      top: '-30px',
      left: '-30px',
      width: '120px',
      height: '120px',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))',
      borderRadius: '50%',
      filter: 'blur(40px)',
      animation: 'pulse 2s ease-in-out infinite'
    },
    glowOrb2: {
      position: 'absolute',
      bottom: '-30px',
      right: '-30px',
      width: '80px',
      height: '80px',
      background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6), rgba(192, 132, 252, 0.6))',
      borderRadius: '50%',
      filter: 'blur(30px)',
      animation: 'bounce 2s ease-in-out infinite'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      position: 'relative'
    },
    plane: {
      fontSize: '60px',
      marginBottom: '20px',
      display: 'block',
      transition: 'transform 0.5s ease',
      animation: 'float 3s ease-in-out infinite'
    },
    title: {
      fontSize: '42px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #60a5fa, #a855f7, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '16px',
      transition: 'all 0.8s ease'
    },
    subtitle: {
      color: '#d1d5db',
      lineHeight: '1.6',
      fontSize: '16px',
      transition: 'color 0.5s ease'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      marginBottom: '16px',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer'
    },
    featureIcon: {
      fontSize: '32px',
      marginRight: '16px',
      transition: 'transform 0.5s ease'
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '4px',
      transition: 'color 0.5s ease'
    },
    featureDesc: {
      fontSize: '14px',
      color: '#9ca3af',
      transition: 'color 0.5s ease'
    },
    button: {
      display: 'block',
      margin: '40px auto 0',
      padding: '16px 40px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'white',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
      border: 'none',
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'glow 2s ease-in-out infinite alternate'
    },
    decorativeElement: {
      position: 'absolute',
      opacity: 0.3,
      transition: 'all 0.5s ease'
    }
  };

  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    @keyframes glow {
      0% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
      100% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(59, 130, 246, 0.4); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Background particles */}
        <div style={{...styles.particle, top: '10%', left: '10%', width: '4px', height: '4px', background: '#60a5fa'}}></div>
        <div style={{...styles.particle, top: '20%', right: '15%', width: '2px', height: '2px', background: '#a855f7'}}></div>
        <div style={{...styles.particle, bottom: '30%', left: '20%', width: '3px', height: '3px', background: '#ec4899'}}></div>
        
        <div style={{position: 'relative', maxWidth: '400px', width: '100%'}}>
          <div style={styles.glowOrb1}></div>
          <div style={styles.glowOrb2}></div>
          
          <div 
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.card)}
          >
            <div style={styles.header}>
              <span 
                style={styles.plane}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2) rotate(10deg)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
              >
                ✈️
              </span>
              <h1 style={styles.title}>Travel Smarter</h1>
              <p style={styles.subtitle}>
                Exchange seats, connect with fellow passengers, and make your journey extraordinary.
              </p>
            </div>

            <div>
              {[
                {icon: '📍', title: 'Destinations', desc: 'Discover amazing places', color: '#60a5fa'},
                {icon: '👥', title: 'Community', desc: 'Connect with travelers', color: '#a855f7'},
                {icon: '⭐', title: 'Premium', desc: 'Upgrade your experience', color: '#ec4899'}
              ].map((item, i) => (
                <div 
                  key={i}
                  style={styles.featureItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = `rgba(255, 255, 255, 0.1)`;
                    e.currentTarget.style.boxShadow = `0 10px 30px rgba(${item.color === '#60a5fa' ? '96, 165, 250' : item.color === '#a855f7' ? '168, 85, 247' : '236, 72, 153'}, 0.3)`;
                    e.currentTarget.querySelector('.icon').style.transform = 'scale(1.3) rotate(15deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.querySelector('.icon').style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  <span className="icon" style={styles.featureIcon}>{item.icon}</span>
                  <div>
                    <div style={styles.featureTitle}>{item.title}</div>
                    <div style={styles.featureDesc}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1) rotate(-2deg)';
                e.target.style.boxShadow = '0 20px 40px rgba(147, 51, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.5)';
              }}
            >
              🚀 Start Your Journey
            </button>

            <div style={{...styles.decorativeElement, top: '20px', right: '20px', fontSize: '24px', animation: 'spin 15s linear infinite'}}>🌍</div>
            <div style={{...styles.decorativeElement, bottom: '20px', left: '20px', fontSize: '20px', animation: 'float 3s ease-in-out infinite'}}>☁️</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AestheticCard;
