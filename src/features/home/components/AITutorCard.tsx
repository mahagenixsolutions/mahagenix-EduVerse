import React from 'react';
import { Card } from '@/components/ui/Card';
import { EventBus } from '@/mock-server/EventBus';

export const AITutorCard: React.FC = () => (
  <Card style={{
    background: 'linear-gradient(135deg, #F0EDFF 0%, #E3DCFF 100%)',
    border: '1px solid rgba(197, 180, 255, 0.4)',
    borderRadius: '24px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.05)'
  }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', zIndex: 2, maxWidth: '65%' }}>
      <p style={{ margin: 0, fontSize: '13.8px', fontWeight: 600, color: '#3A2E80', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>Stuck on a concept?</p>
      <p style={{ margin: 0, fontSize: '0.82rem', color: '#5B4FDB', lineHeight: 1.4 }}>
        EduVerse AI Tutor is ready to help you with Physics and Math.
      </p>
      <button style={{
        background: '#fff',
        border: '1px solid rgba(139, 92, 246, 0.15)',
        color: '#5B4FDB',
        borderRadius: '12px',
        padding: '8px 16px',
        fontSize: '0.8rem',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'all 180ms ease'
      }}
      onClick={() => EventBus.publish('OPEN_AI_ASSISTANT')}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
      >
        Ask AI Tutor ✨
      </button>
    </div>
    
    {/* Illustration image on the right */}
    <img 
      src="/ai_tutor_robot.png" 
      alt="AI Tutor Robot"
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        top: 0,
        height: '100%',
        width: 'auto',
        objectFit: 'contain',
        pointerEvents: 'none',
        zIndex: 1,
        borderTopRightRadius: '24px',
        borderBottomRightRadius: '24px'
      }}
    />
  </Card>
);
