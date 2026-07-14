import React from 'react';

export const HomeHero: React.FC = () => (
  <section style={{
    background: 'linear-gradient(to right, #0D7C66 30%, #11997E 65%, #94B3EB 100%)',
    borderRadius: '24px',
    padding: '36px 48px',
    color: 'white',
    minHeight: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(13, 124, 102, 0.1)',
    marginBottom: '24px'
  }}>
    {/* Overlay text on the left */}
    <div style={{ position: 'relative', zIndex: 2, maxWidth: '50%' }}>
      <h1 style={{ 
        fontSize: '1.95rem', 
        fontWeight: 700, 
        marginBottom: '10px', 
        color: 'white', 
        fontFamily: "'Century Gothic', sans-serif",
        letterSpacing: '-0.5px'
      }}>
        Welcome back, Sarah! 👋
      </h1>
      <p style={{ 
        opacity: 0.95, 
        fontSize: '0.9rem', 
        margin: 0, 
        lineHeight: 1.4,
        fontFamily: "'Century Gothic', sans-serif"
      }}>
        You have 2 upcoming exams, 1 pending homework, and a 12-day learning streak.
      </p>
    </div>

    {/* Right-aligned 3D illustration fitting the banner height perfectly with zero cropping */}
    <img 
      src="/hero_learning_illustration.png" 
      alt="Learning Illustration"
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        height: '100%',
        width: 'auto',
        objectFit: 'contain',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  </section>
);
