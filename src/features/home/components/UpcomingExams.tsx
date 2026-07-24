import React from 'react';
import { Card } from '@/components/ui/Card';

export const UpcomingExams: React.FC = () => {
  const exams = [
    {
      id: 1,
      month: 'OCT',
      day: '15',
      subject: 'Mathematics',
      type: 'Mid Term',
      countdown: 'In 4 days',
      color: '#10B981' // green
    },
    {
      id: 2,
      month: 'OCT',
      day: '18',
      subject: 'Chemistry',
      type: 'Mid Term',
      countdown: 'In 7 days',
      color: '#3B82F6' // blue
    }
  ];

  return (
    <Card style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <p style={{ margin: 0, fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>
          Upcoming Exams
        </p>
        <a href="/learn" style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>
          View All
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        {exams.map(exam => (
          <div 
            key={exam.id} 
            className="hover-lift"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              background: 'var(--surface-color)',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
          >
            {/* Left Column: Date block */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              backgroundColor: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--primary-color)', letterSpacing: '0.5px' }}>
                {exam.month}
              </span>
              <strong style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '-2px' }}>
                {exam.day}
              </strong>
            </div>

            {/* Middle Column: Details */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {exam.subject}
              </h4>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {exam.type}
              </span>
            </div>

            {/* Right Column: Countdown */}
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#EF4444', flexShrink: 0, whiteSpace: 'nowrap' }}>
              {exam.countdown}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
