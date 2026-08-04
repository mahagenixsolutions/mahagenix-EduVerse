import React from 'react';
import { Sigma, Grid, BookOpen, Coffee, Code } from 'lucide-react';

export const TodaySchedule: React.FC = () => {
  const schedule = [
    {
      time: '08:00 AM',
      subject: 'Mathematics',
      detail: 'Room 101 • Mr. Smith',
      icon: Sigma,
      color: '#10B981',
      bg: '#ECFDF5',
    },
    {
      time: '08:50 AM',
      subject: 'Physics',
      detail: 'Lab 3 • Mrs. Davis',
      icon: Grid,
      color: '#8B5CF6',
      bg: '#F3E8FF',
    },
    {
      time: '09:40 AM',
      subject: 'English',
      detail: 'Room 105 • Ms. Wilson',
      icon: BookOpen,
      color: '#F97316',
      bg: '#FFF7ED',
    },
    {
      time: '10:25 AM',
      subject: 'Break',
      detail: 'Cafeteria',
      icon: Coffee,
      color: '#64748B',
      bg: '#F1F5F9',
    },
    {
      time: '10:45 AM',
      subject: 'Computer Science',
      detail: 'Lab 1 • Mr. Johnson',
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
          Today's Schedule
        </p>
        <a
          href="/app/school/events"
          style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}
        >
          View Timetable
        </a>
      </div>

      {/* Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {schedule.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.time} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Time Label */}
              <div
                style={{
                  width: '56px',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: '#64748B',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {item.time}
              </div>

              {/* Vertical Bar Indicator */}
              <div
                style={{
                  width: '2.5px',
                  height: '24px',
                  borderRadius: '999px',
                  background: item.color,
                  flexShrink: 0,
                }}
              />

              {/* Icon Box */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={14} />
              </div>

              {/* Subject & Room */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 1px 0', fontSize: '13.5px', fontWeight: 600, color: '#1E293B' }}>
                  {item.subject}
                </p>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 400 }}>
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
