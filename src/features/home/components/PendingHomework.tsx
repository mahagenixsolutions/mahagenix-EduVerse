import React from 'react';
import { BookOpen, User } from 'lucide-react';

export const PendingHomework: React.FC = () => {
  const items = [
    {
      id: 1,
      title: 'Calculus Exercises 1-20',
      subject: 'Mathematics',
      dueTag: 'Due Today',
      tagBg: '#FEF2F2',
      tagColor: '#EF4444',
      icon: BookOpen,
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
    },
    {
      id: 2,
      title: 'Lab Report: Kinematics',
      subject: 'Physics',
      dueTag: 'Due Tomorrow',
      tagBg: '#FFF7ED',
      tagColor: '#F97316',
      icon: BookOpen,
      iconBg: '#EFF6FF',
      iconColor: '#3B82F6',
    },
    {
      id: 3,
      title: 'Read Chapter 4 & 5',
      subject: 'English',
      dueTag: 'Due Wed, 21 May',
      tagBg: '#F1F5F9',
      tagColor: '#64748B',
      icon: User,
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
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
          Pending Homework
        </p>
        <a
          href="/app/homework"
          style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}
        >
          View All
        </a>
      </div>

      {/* List of cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((hw) => {
          const Icon = hw.icon;
          return (
            <div
              key={hw.id}
              style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                border: '1px solid #F1F5F9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: hw.iconBg,
                    color: hw.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: '0 0 1px 0',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#1E293B',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {hw.title}
                  </p>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 400 }}>
                    {hw.subject}
                  </div>
                </div>
              </div>

              {/* Due Tag Pill */}
              <span
                style={{
                  background: hw.tagBg,
                  color: hw.tagColor,
                  fontSize: '0.675rem',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {hw.dueTag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
