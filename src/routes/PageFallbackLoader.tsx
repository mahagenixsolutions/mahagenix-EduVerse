import React from 'react';

export const PageFallbackLoader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '24px',
      width: '100%',
    }}
  >
    <div
      className="skeleton"
      style={{ width: '200px', height: '32px', borderRadius: '12px' }}
    />
    <div
      className="skeleton"
      style={{ width: '100%', height: '320px', borderRadius: '18px' }}
    />
  </div>
);
