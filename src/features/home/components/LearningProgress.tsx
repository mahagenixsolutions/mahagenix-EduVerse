import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { MoreVertical } from 'lucide-react';

export const LearningProgress: React.FC = () => {
  const subjects = [
    { subject: 'Mathematics', progress: 72, color: '#10B981' }, // green
    { subject: 'Physics', progress: 58, color: '#3B82F6' }, // blue
    { subject: 'English', progress: 85, color: '#34D399' }, // light green
    { subject: 'Computer Science', progress: 90, color: '#8B5CF6' }, // purple
    { subject: 'Chemistry', progress: 45, color: '#F59E0B' } // orange
  ];

  // SVG calculations for circular ring
  const sqSize = 130;
  const strokeWidth = 10;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * 72) / 100;

  return (
    <Card style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>
          Learning Progress
        </p>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: '4px' }}>
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Circular Donut Ring Chart */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px 0' }}>
        <div style={{ position: 'relative', width: sqSize, height: sqSize }}>
          <svg width={sqSize} height={sqSize} viewBox={viewBox}>
            {/* Background circle */}
            <circle
              className="circle-background"
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              stroke="#F3F4F6"
              fill="none"
            />
            {/* Foreground circle */}
            <circle
              className="circle-progress"
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              stroke="var(--primary-color)"
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
          </svg>
          {/* Inner content */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
              72%
            </span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-light)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Overall Progress
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {subjects.map(sub => (
          <div key={sub.subject} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '110px', fontWeight: 500 }}>
              {sub.subject}
            </span>
            <div style={{ flex: 1 }}><ProgressBar value={sub.progress} color={sub.color} size="sm" /></div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', width: '28px', textAlign: 'right' }}>
              {sub.progress}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
