import React from 'react';

export const NewsPreview: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      category: 'EVENT',
      title: 'Annual Science Fair Registration Open',
      time: '2 hrs ago',
      color: '#2563EB',
    },
    {
      id: 2,
      category: 'NOTICE',
      title: 'Holiday Notice: Diwali Break',
      time: '1 day ago',
      color: '#7C3AED',
    },
    {
      id: 3,
      category: 'SPORTS',
      title: 'Varsity Basketball Team Tryouts',
      time: '2 days ago',
      color: '#EF4444',
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
          School News
        </p>
        <a
          href="/app/school/events"
          style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}
        >
          View All
        </a>
      </div>

      {/* News List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {newsItems.map((item, idx) => (
          <div
            key={item.id}
            style={{
              paddingBottom: idx === newsItems.length - 1 ? 0 : '8px',
              borderBottom: idx === newsItems.length - 1 ? 'none' : '1px solid #F1F5F9',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                color: item.color,
                letterSpacing: '0.05em',
              }}
            >
              {item.category}
            </span>
            <p
              style={{
                margin: 0,
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#1E293B',
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </p>
            <span style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: 400 }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
