import React from 'react';
import { BookOpen, Code, Sigma } from 'lucide-react';

export const ContinueLearning: React.FC = () => {
  const items = [
    {
      id: 1,
      title: 'Quadratic Equations — Completing the Square',
      course: 'Mathematics',
      duration: '12 min',
      progress: 85,
      icon: Sigma,
      color: '#10B981',
      bg: '#ECFDF5',
    },
    {
      id: 2,
      title: 'Shakespeare — Hamlet Act 3 Analysis',
      course: 'English Literature',
      duration: '9 min read',
      progress: 60,
      icon: BookOpen,
      color: '#C026D3',
      bg: '#FDF4FF',
    },
    {
      id: 3,
      title: 'Binary Trees — Traversal Algorithms',
      course: 'Computer Science',
      duration: '18 min',
      progress: 90,
      icon: Code,
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
  ];

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
        gap: '14px',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#1E293B' }}>
          Continue Learning
        </p>
        <a
          href="/learn"
          style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}
        >
          View All
        </a>
      </div>

      {/* Item List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <Icon size={15} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: '0 0 2px 0',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#1E293B',
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </p>
                <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '5px', fontWeight: 400 }}>
                  {item.course} • {item.duration}
                </div>

                {/* Progress Bar & Percentage */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '999px',
                      background: '#F1F5F9',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${item.progress}%`,
                        height: '100%',
                        borderRadius: '999px',
                        background: item.color,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.675rem', fontWeight: 600, color: '#64748B', width: '26px', textAlign: 'right' }}>
                    {item.progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
