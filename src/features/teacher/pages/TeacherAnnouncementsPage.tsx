import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { PageHeader } from '@/components/navigation/PageHeader';
import { useAnnouncements } from '@/features/announcements/hooks/useAnnouncements';
import { teacherAnnouncements } from '@/mock/teacher';
import { Megaphone, Plus, Edit3, Trash2, X } from 'lucide-react';
import styles from './teacher.module.css';

export const TeacherAnnouncementsPage: React.FC = () => {
  const { announcements, publishAnnouncement, isPublishing } = useAnnouncements();
  const [activeTab, setActiveTab] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annPriority, setAnnPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [annAudience, setAnnAudience] = useState('All Classes');

  const allItems = [...teacherAnnouncements, ...announcements.map(a => ({ ...a, status: 'published' as const, audience: 'All Classes' }))];
  const published = allItems.filter(a => a.status === 'published');
  const drafts = allItems.filter(a => a.status === 'draft');

  const tabs = [
    { id: 'all', label: 'All', count: allItems.length },
    { id: 'published', label: 'Published', count: published.length },
    { id: 'draft', label: 'Drafts', count: drafts.length },
  ];

  let filtered = allItems;
  if (activeTab === 'published') filtered = published;
  else if (activeTab === 'draft') filtered = drafts;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;
    await publishAnnouncement({
      title: annTitle, content: annContent, priority: annPriority,
      author: 'Mr. John Smith',
    });
    setAnnTitle(''); setAnnContent(''); setAnnPriority('medium'); setShowCreate(false);
  };

  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Create, manage, and publish announcements"
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Announcements' }]}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <Button variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} /> Create Announcement
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        {filtered.length === 0 && (
          <Card style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Megaphone size={32} />
            <p style={{ marginTop: 'var(--space-2)' }}>No announcements yet.</p>
          </Card>
        )}
        {filtered.map(ann => (
          <Card key={ann.id} style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', flexShrink: 0 }}>
                  <Megaphone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.938rem', fontWeight: 600 }}>{ann.title}</h4>
                  <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>{ann.content.slice(0, 120)}{ann.content.length > 120 ? '...' : ''}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{ann.author}</span>
                    <span>{ann.date}</span>
                    <span>Audience: {ann.audience}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
                <Badge variant={ann.priority === 'high' ? 'danger' : ann.priority === 'medium' ? 'warning' : 'default'}>{ann.priority}</Badge>
                <Badge variant={ann.status === 'published' ? 'success' : 'default'}>{ann.status}</Badge>
                {ann.status === 'draft' && <Button size="sm" variant="primary">Publish</Button>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Announcement Modal */}
      {showCreate && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Create Announcement</h3>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input type="text" value={annTitle} onChange={e => setAnnTitle(e.target.value)} placeholder="e.g. Physics Lab Extension" required />
              </div>
              <div className={styles.formGroup}>
                <label>Priority</label>
                <select value={annPriority} onChange={e => setAnnPriority(e.target.value as any)}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Audience</label>
                <select value={annAudience} onChange={e => setAnnAudience(e.target.value)}>
                  <option>All Classes</option><option>Grade 10-A</option><option>Grade 10-B</option><option>Grade 11-A</option><option>Grade 9-C</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Content</label>
                <textarea value={annContent} onChange={e => setAnnContent(e.target.value)} placeholder="Write the full announcement content here..." required rows={4} />
              </div>
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setShowCreate(false)} type="button">Cancel</Button>
                <Button variant="primary" type="submit" disabled={isPublishing}>
                  {isPublishing ? 'Publishing...' : 'Publish Announcement'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
