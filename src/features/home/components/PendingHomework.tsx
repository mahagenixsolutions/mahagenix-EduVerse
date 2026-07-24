import React from 'react';
import { Card } from '@/components/ui/Card';
import { BookOpen } from 'lucide-react';

export const PendingHomework: React.FC = () => {
  const homework = [
    {
      id: 1,
      title: 'Calculus Exercises 1-20',
      subject: 'Mathematics',
      status: 'due',
      dueDate: 'Due Today, 11:59 PM',
      color: '#EAB308' // yellow/orange
    },
    {
      id: 2,
      title: 'Lab Report: Kinematics',
      subject: 'Physics',
      status: 'completed',
      dueDate: 'Completed',
      color: '#10B981' // green
    },
    {
      id: 3,
      title: 'Read Chapter 4 & 5',
      subject: 'English',
      status: 'due_later',
      dueDate: 'Due Wednesday',
      color: '#F59E0B' // orange
    }
  ];

  return (
    <Card style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <p style={{ margin: 0, fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>
          Pending Homework
        </p>
        <a href="/learn/homework" style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>
          View All
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        {homework.map(hw => (
          <div 
            key={hw.id} 
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
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.08)',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <BookOpen size={18} />
            </div>

            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                {hw.title}
              </h4>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {hw.subject}
              </span>
            </div>

            {/* Status badge */}
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '4px 8px',
              borderRadius: '99px',
              background: hw.status === 'completed' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
              color: hw.status === 'completed' ? '#10B981' : '#D97706',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}>
              {hw.dueDate}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
