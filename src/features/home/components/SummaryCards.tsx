import React from 'react';
import { CalendarCheck, BookOpen, Calendar, Star, CreditCard } from 'lucide-react';

export const SummaryCards: React.FC = () => {
  const cards = [
    {
      id: 'attendance',
      title: 'Attendance',
      value: '92%',
      label: 'This Month',
      icon: CalendarCheck,
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
      sparklineColor: '#10B981',
      borderLeft: 'none',
    },
    {
      id: 'homework',
      title: 'Homework',
      value: '3',
      label: 'Pending',
      icon: BookOpen,
      iconBg: '#FFF7ED',
      iconColor: '#F97316',
      sparklineColor: '#F97316',
      borderLeft: 'none',
    },
    {
      id: 'timetable',
      title: 'Timetable',
      value: 'Today',
      label: '5 Classes',
      icon: Calendar,
      iconBg: '#EFF6FF',
      iconColor: '#3B82F6',
      sparklineColor: '#3B82F6',
      borderLeft: 'none',
    },
    {
      id: 'results',
      title: 'Results',
      value: 'Good',
      label: 'Average',
      icon: Star,
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
      sparklineColor: '#10B981',
      borderLeft: 'none',
    },
    {
      id: 'fees',
      title: 'Fees Due',
      value: '₹2,450',
      label: 'Due',
      icon: CreditCard,
      iconBg: '#FEF2F2',
      iconColor: '#EF4444',
      sparklineColor: null,
      borderLeft: '4px solid #EF4444',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '18px',
        width: '100%',
        marginBottom: '28px',
      }}
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '22px',
              padding: '22px',
              border: '1px solid #F1F5F9',
              borderLeft: card.borderLeft,
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
          >
            {/* Top Row: Icon + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: card.iconBg,
                  color: card.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={18} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
                {card.title}
              </span>
            </div>

            {/* Middle Row: Large Stat Value */}
            <div
              style={{
                fontSize: card.value === 'Today' || card.value === 'Good' ? '1.45rem' : '1.65rem',
                fontWeight: 800,
                color: '#0F172A',
                margin: '12px 0 10px 0',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {card.value}
            </div>

            {/* Bottom Row: Subtext + Sparkline Curve */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.775rem', color: '#94A3B8', fontWeight: 500 }}>
                {card.label}
              </span>

              {/* Sparkline Curve Graph */}
              {card.sparklineColor && (
                <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                  <path
                    d="M 2 15 C 10 18, 16 8, 24 12 C 32 16, 38 4, 46 6"
                    stroke={card.sparklineColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
