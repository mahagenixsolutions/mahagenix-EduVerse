import React from 'react';
import { Card } from '@/components/ui/Card';
import { Sigma, Atom, Book, Coffee, Monitor } from 'lucide-react';

export const TodaySchedule: React.FC = () => {
  const schedule = [
    {
      time: '08:00 AM',
      subject: 'Mathematics',
      detail: 'Room 101 • Mr. Smith',
      icon: Sigma,
      color: '#10B981', // green
      bg: 'rgba(16, 185, 129, 0.04)'
    },
    {
      time: '08:50 AM',
      subject: 'Physics',
      detail: 'Lab 3 • Mrs. Davis',
      icon: Atom,
      color: '#8B5CF6', // purple
      bg: 'rgba(139, 92, 246, 0.04)'
    },
    {
      time: '09:40 AM',
      subject: 'English',
      detail: 'Room 105 • Mr. Wilson',
      icon: Book,
      color: '#F59E0B', // yellow
      bg: 'rgba(245, 158, 11, 0.04)'
    },
    {
      time: '10:25 AM',
      subject: 'Break',
      detail: 'Cafeteria',
      icon: Coffee,
      color: '#6B7280', // gray
      bg: 'rgba(107, 114, 128, 0.04)'
    },
    {
      time: '10:45 AM',
      subject: 'Computer Science',
      detail: 'Lab 1 • Mr. Johnson',
      icon: Monitor,
      color: '#3B82F6', // blue
      bg: 'rgba(59, 130, 246, 0.04)'
    }
  ];

  return (
    <Card style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap', width: '100%' }}>
        <p style={{ margin: 0, fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>
          Today's Schedule
        </p>
        <a href="/learn/attendance" style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>
          View Timetable
        </a>
      </div>

      {/* Timeline container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative', width: '100%' }}>
        {schedule.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.time} style={{ display: 'flex', gap: '8px', alignItems: 'stretch', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
              {/* Left Column: Time */}
              <div style={{
                width: '56px',
                fontSize: '0.72rem',
                color: 'var(--text-light)',
                fontWeight: 600,
                textAlign: 'right',
                paddingTop: '16px',
                flexShrink: 0
              }}>
                {item.time}
              </div>

              {/* Middle Column: Line and Dot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '16px', flexShrink: 0 }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  border: '2px solid var(--surface-color)',
                  zIndex: 2,
                  marginTop: '19px'
                }} />
                {idx !== schedule.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '29px',
                    bottom: '-4px',
                    width: '2px',
                    backgroundColor: 'var(--border-color)',
                    zIndex: 1
                  }} />
                )}
              </div>

              {/* Right Column: Card */}
              <div 
                className="hover-lift"
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'var(--surface-color)',
                  border: '1px solid var(--border-color)',
                  borderLeft: `4px solid ${item.color}`,
                  borderRadius: '16px',
                  padding: '10px 12px',
                  margin: '4px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.01)',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, overflow: 'hidden' }}>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.subject}
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.detail}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
