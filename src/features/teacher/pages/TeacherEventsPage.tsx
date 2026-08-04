import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { MockServer, type CalendarEvent } from '@/mock-server/MockServer';
import { TeacherEventHeader } from '../components/events/TeacherEventHeader';
import { TeacherEventStats } from '../components/events/TeacherEventStats';
import { TeacherEventCreateModal } from '../components/events/TeacherEventCreateModal';
import styles from './teacher.module.css';

export const TeacherEventsPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    const data = await MockServer.getEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreateEventSubmit = async (data: {
    title: string;
    category: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    fee: number;
    description: string;
  }) => {
    await MockServer.createEvent({
      ...data,
      category: data.category as CalendarEvent['category'],
      type: 'event',
      color: '#5FAF88',
      status: 'published',
    });
    loadEvents();
  };

  const filteredEvents = events.filter((e) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'published' && e.status === 'published') ||
      (activeTab === 'drafts' && e.status === 'draft');

    const matchesQuery =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.location ?? '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesQuery;
  });

  const totalRegs = events.reduce((acc) => acc + 0, 0);
  const totalRev = events.reduce(
    (acc, curr) => acc + (curr.fee || 0),
    0,
  );

  const tabItems = [
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'published', label: 'Published', count: events.filter((e) => e.status === 'published').length },
    { id: 'drafts', label: 'Drafts', count: events.filter((e) => e.status === 'draft').length },
  ];

  return (
    <div className={styles.teacherPageContainer}>
      <TeacherEventHeader onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      <TeacherEventStats
        totalEvents={events.length}
        totalRegistrations={totalRegs}
        totalRevenue={totalRev}
        upcomingCount={events.filter((e) => e.status === 'published').length}
      />

      <div className={styles.tableFilterSection}>
        <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} />
        <input
          type="text"
          placeholder="Filter event records..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.eventsGrid}>
        {filteredEvents.map((evt) => (
          <Card key={evt.id} className={styles.eventCard}>
            <div className={styles.cardHeaderRow}>
              <h4>{evt.title}</h4>
              <Badge variant={evt.status === 'published' ? 'success' : 'warning'}>
                {evt.status}
              </Badge>
            </div>
            <p className={styles.eventSnippet}>{evt.description}</p>
            <div className={styles.metaRow}>
              <span>📅 {evt.date}</span>
              <span>📍 {evt.location}</span>
              <span>🎟️ Registered</span>
            </div>
            <div className={styles.cardFooter}>
              <Button variant="outline" size="sm" style={{ width: '100%' }}>
                Manage Registrations
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <TeacherEventCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEventSubmit}
      />
    </div>
  );
};
