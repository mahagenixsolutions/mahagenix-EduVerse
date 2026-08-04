import React from 'react';

export const LearningProgress: React.FC = () => {
  const subjects = [
    { subject: 'Mathematics', progress: 72, color: '#10B981' },
    { subject: 'Physics', progress: 58, color: '#8B5CF6' },
    { subject: 'English', progress: 85, color: '#3B82F6' },
    { subject: 'Computer Science', progress: 90, color: '#06B6D4' },
    { subject: 'Chemistry', progress: 45, color: '#F97316' },
  ];

  const sqSize = 90;
  const strokeWidth = 7;
  const radius = (sqSize - strokeWidth) / 2;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * 72) / 100;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '18px 20px',
        border: '1px solid #F1F5F9',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
        Learning Progress
      </p>

      {/* Side-by-Side: Left Gauge + Right Subject Progress List */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
        {/* Donut Radial Gauge */}
        <div style={{ position: 'relative', width: sqSize, height: sqSize, flexShrink: 0 }}>
          <svg width={sqSize} height={sqSize} viewBox={`0 0 ${sqSize} ${sqSize}`}>
            <circle
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              stroke="#F1F5F9"
              fill="none"
            />
            <circle
              cx={sqSize / 2}
              cy={sqSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              stroke="#10B981"
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            />
          </svg>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', lineHeight: 1 }}>
              72%
            </span>
            <span style={{ fontSize: '0.575rem', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
              Overall Progress
            </span>
          </div>
        </div>

        {/* Right Subjects Progress Bars */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {subjects.map((sub) => (
            <div key={sub.subject} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', fontWeight: 500, color: '#475569' }}>
                <span>{sub.subject}</span>
                <span style={{ fontWeight: 600, color: '#1E293B' }}>{sub.progress}%</span>
              </div>
              <div style={{ height: '3.5px', width: '100%', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${sub.progress}%`, height: '100%', background: sub.color, borderRadius: '999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
