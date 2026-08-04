import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  Megaphone, Calendar, Clock, Search, Filter, 
  CheckCircle2, Sparkles, AlertTriangle, ArrowRight
} from 'lucide-react';
import styles from './school.module.css';

interface Announcement {
  id: number;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  author: string;
  content: string;
  read: boolean;
}

const mockAnnouncements: Announcement[] = [
  { id: 1, title: 'Annual Day 2026 Registration Open', category: 'Cultural', priority: 'high', date: 'Apr 07, 2026', author: 'Principal Office', content: 'Registrations for the Annual Day stage performances and band auditions close this Friday.', read: true },
  { id: 2, title: 'Term 2 Final Exam Timetable Released', category: 'Exam', priority: 'high', date: 'Apr 06, 2026', author: 'Examination Board', content: 'The complete date sheet for Grade 9 to 12 final examinations is now available on the Student Hub.', read: true },
  { id: 3, title: 'Holiday Notice: Dr. Ambedkar Jayanti', category: 'Holiday', priority: 'medium', date: 'Apr 05, 2026', author: 'School Administration', content: 'The school will remain closed on April 14th on account of Dr. Ambedkar Jayanti. Regular classes resume April 15th.', read: false },
  { id: 4, title: 'State Merit Scholarship Application Window', category: 'Scholarship', priority: 'medium', date: 'Apr 03, 2026', author: 'Academic Counseling', content: 'Students with 90%+ in Midterms can apply for the state merit grant before April 30th.', read: true }
];

export const AnnouncementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'all', label: 'All Notices', count: announcements.length },
    { id: 'high', label: 'High Priority' },
    { id: 'unread', label: 'Unread Notices', count: announcements.filter(a => !a.read).length }
  ];

  const handleMarkRead = (id: number) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const filtered = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.content.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'high') return matchesSearch && a.priority === 'high';
    if (activeTab === 'unread') return matchesSearch && !a.read;
    return matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="School Announcements & Notice Board"
        subtitle="Stay updated with official school notices, exam timetables, holiday updates, and principal circulars"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'School', path: '/school' }, { label: 'Announcements' }]}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-color)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', width: '260px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100%' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map(item => (
          <Card key={item.id} style={{ padding: '20px', borderRadius: '18px', borderLeft: !item.read ? '4px solid var(--primary-color)' : '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge variant={item.priority === 'high' ? 'danger' : 'info'}>
                  {item.category.toUpperCase()}
                </Badge>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Published by: <strong>{item.author}</strong> • {item.date}
                </span>
              </div>

              {!item.read && (
                <Button size="sm" variant="outline" onClick={() => handleMarkRead(item.id)}>
                  Mark as Read
                </Button>
              )}
            </div>

            <p style={{ fontSize: '13.5px', fontWeight: 600, margin: '0 0 6px 0', color: '#1E293B', lineHeight: 1.3 }}>
              {item.title}
            </p>

            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B', lineHeight: 1.4 }}>
              {item.content}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
