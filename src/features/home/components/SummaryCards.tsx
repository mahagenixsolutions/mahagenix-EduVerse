import React from 'react';
import { Card } from '@/components/ui/Card';
import { CheckSquare, BookOpen, Clock, Star, CreditCard } from 'lucide-react';

export const SummaryCards: React.FC = () => {
  const cards = [
    {
      title: 'Attendance',
      value: '92%',
      label: 'This Month',
      icon: CheckSquare,
      color: '#10B981', // green
      bg: 'rgba(16, 185, 129, 0.08)'
    },
    {
      title: 'Homework',
      value: '3',
      label: 'Pending',
      icon: BookOpen,
      color: '#8B5CF6', // purple
      bg: 'rgba(139, 92, 246, 0.08)'
    },
    {
      title: 'Timetable',
      value: 'Today',
      label: '5 Classes',
      icon: Clock,
      color: '#F59E0B', // orange
      bg: 'rgba(245, 158, 11, 0.08)'
    },
    {
      title: 'Results',
      value: 'Good',
      label: 'Average',
      icon: Star,
      color: '#EC4899', // pink
      bg: 'rgba(236, 72, 153, 0.08)'
    },
    {
      title: 'Fees',
      value: '₹2,450',
      label: 'Due',
      icon: CreditCard,
      color: '#3B82F6', // blue
      bg: 'rgba(59, 130, 246, 0.08)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
      gap: '12px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      marginBottom: '24px'
    }}>
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <Card key={card.title} style={{
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: card.bg,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={18} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {card.title}
              </span>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {card.value}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '2px' }}>
                {card.label}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
