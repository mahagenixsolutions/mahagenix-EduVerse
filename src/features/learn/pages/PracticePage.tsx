import React from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { practiceTests } from '@/mock/learning';
import { ClipboardList, Clock, HelpCircle } from 'lucide-react';
import styles from './learn.module.css';

export const PracticePage: React.FC = () => {
  return (
    <div>
      <PageHeader title="Practice Tests" subtitle="Sharpen your skills with timed quizzes" breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Practice' }]} />
      <div className={styles.practiceGrid}>
        {practiceTests.map(test => (
          <Card key={test.id} hoverable>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Badge variant={test.bestScore ? 'success' : 'default'}>{test.bestScore ? `Best: ${test.bestScore}%` : 'Not attempted'}</Badge>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{test.attempts} attempts</span>
            </div>
            <p className={styles.itemTitle}>{test.title}</p>
            <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginTop: '4px' }}>{test.subject}</p>
            <div className={styles.testMeta}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><HelpCircle size={14} /> {test.questions} Qs</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {test.duration}</span>
            </div>
            <Button variant="outline" size="sm" fullWidth style={{ marginTop: '16px' }}>
              {test.bestScore ? 'Retake' : 'Start Test'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
