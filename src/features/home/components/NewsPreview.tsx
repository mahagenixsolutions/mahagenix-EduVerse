import React from 'react';
import { Card } from '@/components/ui/Card';

export const NewsPreview: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      category: 'EVENT',
      title: 'Annual Science Fair Registration Open',
      time: '2 hrs ago',
      color: '#10B981' // green
    },
    {
      id: 2,
      category: 'NOTICE',
      title: 'Holiday Notice: Diwali Break',
      time: '1 day ago',
      color: '#3B82F6' // blue
    },
    {
      id: 3,
      category: 'SPORTS',
      title: 'Varsity Basketball Team Tryouts',
      time: '2 days ago',
      color: '#F59E0B' // orange
    }
  ];

  return (
    <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>
          School News
        </p>
        <a href="/messages" style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>
          See All
        </a>
      </div>

      {/* news list vertical layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {newsItems.map((item, idx) => (
          <div 
            key={item.id}
            style={{
              paddingBottom: idx === newsItems.length - 1 ? 0 : '12px',
              borderBottom: idx === newsItems.length - 1 ? 'none' : '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: item.color,
              letterSpacing: '0.5px'
            }}>
              {item.category}
            </span>
            <h4 style={{
              margin: 0,
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.3
            }}>
              {item.title}
            </h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
