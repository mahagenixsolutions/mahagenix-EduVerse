import React from 'react';
import { Medal, Star, Trophy } from 'lucide-react';

export const AchievementsPreview: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: 'Math Olympiad — Gold Medal',
      detail: 'Sep 2025 • Competition',
      icon: Medal,
      color: '#F97316',
      bg: '#FFF7ED',
    },
    {
      id: 2,
      title: '100% Attendance — April',
      detail: 'Apr 2025 • Attendance',
      icon: Star,
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      id: 3,
      title: 'Science Fair — Best Project',
      detail: 'Jul 2025 • Academic',
      icon: Trophy,
      color: '#10B981',
      bg: '#ECFDF5',
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
          Recent Achievements
        </p>
        <a
          href="/app/profile"
          style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}
        >
          View All
        </a>
      </div>

      {/* Achievements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {achievements.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '12px',
                background: '#F8FAFC',
                border: '1px solid #F1F5F9',
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '7px',
                  background: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={13} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 1px 0', fontSize: '13.5px', fontWeight: 600, color: '#1E293B', lineHeight: 1.3 }}>
                  {item.title}
                </p>
                <div style={{ fontSize: '0.675rem', color: '#64748B', fontWeight: 400 }}>
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
