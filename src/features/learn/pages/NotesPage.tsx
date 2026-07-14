import React from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { notes } from '@/mock/learning';
import { FileText, Bookmark } from 'lucide-react';
import styles from './learn.module.css';

export const NotesPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="Notes" subtitle="Your digital notes and study materials" breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Notes' }]} />
      <div className={styles.notesGrid}>
        {notes.map(note => (
          <Card key={note.id} hoverable className={styles.noteCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)' }}>
                <FileText size={20} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{note.subject}</span>
              </div>
              {note.bookmarked && <Bookmark size={16} fill="var(--warning)" color="var(--warning)" />}
            </div>
            <p className={styles.itemTitle} style={{ marginTop: '12px' }}>{note.title}</p>
            <div className={styles.noteMeta}>
              <span>{note.pages} pages</span>
              <span>{note.updatedAt}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
