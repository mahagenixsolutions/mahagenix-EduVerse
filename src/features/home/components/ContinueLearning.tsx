import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CheckSquare, BookOpen, Layers } from 'lucide-react';

export const ContinueLearning: React.FC = () => {
  const items = [
    {
      id: 1,
      title: 'Quadratic Equations — Completing the Square',
      course: 'Mathematics',
      duration: '12 min',
      progress: 85,
      icon: CheckSquare,
      color: '#10B981', // green
      bg: 'rgba(16, 185, 129, 0.08)'
    },
    {
      id: 2,
      title: 'Shakespeare — Hamlet Act 3 Analysis',
      course: 'English Literature',
      duration: '9 min read',
      progress: 60,
      icon: BookOpen,
      color: '#EC4899', // pink
      bg: 'rgba(236, 72, 153, 0.08)'
    },
    {
      id: 3,
      title: 'Binary Trees — Traversal Algorithms',
      course: 'Computer Science',
      duration: '18 min',
      progress: 90,
      icon: Layers,
      color: '#6366F1', // blue/purple
      bg: 'rgba(99, 102, 241, 0.08)'
    }
  ];

  return (
    <Card style={{ padding: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <p style={{ margin: 0, fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>
          Continue Learning
        </p>
        <a href="/learn" style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>
          View All
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        {items.map(item => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
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
                background: item.bg,
                color: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={18} />
              </div>

              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                  {item.title}
                </h4>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.course} • {item.duration}
                </span>
                
                {/* Progress row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', width: '100%' }}>
                  <div style={{ flex: 1, minWidth: 0 }}><ProgressBar value={item.progress} size="sm" color={item.color} /></div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', width: '28px', textAlign: 'right', flexShrink: 0 }}>
                    {item.progress}%
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
