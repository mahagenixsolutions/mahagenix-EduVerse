import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { assignments } from '@/mock/learning';
import { FileText } from 'lucide-react';
import styles from './learn.module.css';

const STATUS_VARIANT = { 'in-progress': 'info', 'submitted': 'warning', 'not-started': 'default', 'graded': 'success' } as const;

export const AssignmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [
    { id: 'all', label: 'All', count: assignments.length },
    { id: 'in-progress', label: 'In Progress', count: assignments.filter(a => a.status === 'in-progress').length },
    { id: 'graded', label: 'Graded', count: assignments.filter(a => a.status === 'graded').length },
  ];
  const filtered = activeTab === 'all' ? assignments : assignments.filter(a => a.status === activeTab);

  return (
    <div>
      <PageHeader title="Assignments" subtitle="View and manage your assignments" breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Assignments' }]} />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.pageList}>
        {filtered.map(a => (
          <div key={a.id} className={styles.pageItem}>
            <div className={styles.itemIcon} style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary-color)' }}>
              <FileText size={22} />
            </div>
            <div className={styles.itemContent}>
              <p className={styles.itemTitle}>{a.title}</p>
              <p>{a.subject} • {a.type} • Due: {a.dueDate} • {a.totalMarks} marks</p>
            </div>
            <div className={styles.itemActions}>
              {a.obtained !== null && <span style={{ fontWeight: 600, color: 'var(--success)' }}>{a.obtained}/{a.totalMarks}</span>}
              <Badge variant={STATUS_VARIANT[a.status]}>{a.status.replace('-', ' ')}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
