import React from 'react';
import { Card } from '@/components/ui/Card';
import { Award, Star, Trophy } from 'lucide-react';

export const AchievementsPreview: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: 'Math Olympiad — Gold Medal',
      detail: 'Sep 2025 • Competition',
      icon: Trophy,
      color: '#F59E0B', // gold
      bg: 'rgba(245, 158, 11, 0.08)'
    },
    {
      id: 2,
      title: '100% Attendance — August',
      detail: 'Aug 2025 • Attendance',
      icon: Star,
      color: '#3B82F6', // blue
      bg: 'rgba(59, 130, 246, 0.08)'
    },
    {
      id: 3,
      title: 'Science Fair — Best Project',
      detail: 'Jul 2025 • Academic',
      icon: Award,
      color: '#EAB308', // yellow-gold
      bg: 'rgba(234, 179, 8, 0.08)'
    }
  ];

  return (
    <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>
          Recent Achievements
        </p>
        <a href="/profile" style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>
          View All
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {achievements.map(a => {
          const Icon = a.icon;
          return (
            <div 
              key={a.id} 
              className="hover-lift"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 16px',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                background: 'var(--surface-color)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: a.bg,
                color: a.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {a.title}
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                  {a.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
