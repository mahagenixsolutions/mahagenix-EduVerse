import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { EventBus } from '@/mock-server/EventBus';
import { 
  Users, Calendar, Clock, Plus, CheckCircle2, 
  Video, MapPin, FileText, Phone, Mail, Check
} from 'lucide-react';
import styles from './teacher.module.css';

interface MeetingItem {
  id: number;
  parentName: string;
  studentName: string;
  className: string;
  date: string;
  time: string;
  mode: 'virtual' | 'in_person';
  status: 'scheduled' | 'completed' | 'cancelled';
  agenda: string;
  followUp?: string;
}

const mockMeetings: MeetingItem[] = [
  {
    id: 1,
    parentName: 'Sofia Martin',
    studentName: 'Lucas Martin',
    className: 'Grade 9 - C',
    date: '2026-04-10',
    time: '03:30 PM',
    mode: 'virtual',
    status: 'scheduled',
    agenda: 'Discuss midterm math progress, peer mentorship performance, and upcoming science project guidelines.',
    followUp: 'Send weekly algebra practice worksheets'
  },
  {
    id: 2,
    parentName: 'Arthur Doe',
    studentName: 'Sarah Doe',
    className: 'Grade 10 - A',
    date: '2026-04-12',
    time: '04:00 PM',
    mode: 'in_person',
    status: 'scheduled',
    agenda: 'Science Olympiad state level qualification review & advanced physics mentoring plan.',
    followUp: 'Share state olympiad registration form'
  },
  {
    id: 3,
    parentName: 'Eleanor Hunt',
    studentName: 'Ethan Hunt',
    className: 'Grade 10 - A',
    date: '2026-04-02',
    time: '02:15 PM',
    mode: 'in_person',
    status: 'completed',
    agenda: 'Classroom focus & mobile distraction review session with counselor.',
    followUp: 'Weekly progress report to be emailed every Friday'
  }
];

export const TeacherParentMeetingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [meetings, setMeetings] = useState<MeetingItem[]>(mockMeetings);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [parentName, setParentName] = useState('Sofia Martin');
  const [studentName, setStudentName] = useState('Lucas Martin');
  const [date, setDate] = useState('2026-04-16');
  const [time, setTime] = useState('04:00 PM');
  const [mode, setMode] = useState<'virtual' | 'in_person'>('virtual');
  const [agenda, setAgenda] = useState('Term progress review & academic feedback.');

  const tabs = [
    { id: 'scheduled', label: 'Scheduled Meetings', count: meetings.filter(m => m.status === 'scheduled').length },
    { id: 'notes', label: 'Meeting Notes & Agenda' },
    { id: 'followup', label: 'Parent Follow-ups' },
    { id: 'history', label: 'Meeting History' }
  ];

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeeting: MeetingItem = {
      id: Date.now(),
      parentName,
      studentName,
      className: 'Grade 10 - A',
      date,
      time,
      mode,
      status: 'scheduled',
      agenda
    };

    setMeetings(prev => [newMeeting, ...prev]);
    setShowScheduleModal(false);
    setToastMessage(`Parent Meeting scheduled with ${parentName}! Invitation & calendar link sent.`);

    // Workflow Event
    EventBus.publish('MEETING_SCHEDULED', {
      meeting: newMeeting,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredMeetings = meetings.filter(m => {
    if (activeTab === 'scheduled') return m.status === 'scheduled';
    if (activeTab === 'history') return m.status === 'completed';
    return true;
  });

  return (
    <div className={styles.container}>
      <PageHeader
        title="Parent Meetings & PTM Scheduler"
        subtitle="Schedule 1-on-1 parent meetings, record meeting summaries, and track follow-up action items"
        actions={
          <Button size="sm" onClick={() => setShowScheduleModal(true)}>
            <Plus size={16} style={{ marginRight: '6px' }} />
            Schedule Parent Meeting
          </Button>
        }
      />

      {toastMessage && (
        <div style={{
          padding: '12px 20px',
          background: 'var(--success-bg, #ECFDF5)',
          color: 'var(--success, #059669)',
          borderRadius: '12px',
          border: '1px solid #A7F3D0',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600
        }}>
          <CheckCircle2 size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Upcoming PTMs</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
              {meetings.filter(m => m.status === 'scheduled').length} Scheduled
            </h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completed Meetings</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>24 This Term</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Follow-ups</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>3 Action Items</h3>
          </div>
        </Card>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
        {filteredMeetings.map(m => (
          <Card key={m.id} style={{ padding: '20px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Meeting with {m.parentName}
                  </h4>
                  <Badge variant={m.mode === 'virtual' ? 'info' : 'success'}>
                    {m.mode === 'virtual' ? '📹 Virtual Call' : '🏢 In-Person'}
                  </Badge>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Student: <strong style={{ color: 'var(--text-main)' }}>{m.studentName}</strong> ({m.className})
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} /> {m.date} at {m.time}
                </span>
                {m.mode === 'virtual' && m.status === 'scheduled' && (
                  <Button size="sm">
                    <Video size={15} style={{ marginRight: '6px' }} /> Join Meeting
                  </Button>
                )}
              </div>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: '14px', borderRadius: '12px', marginBottom: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                MEETING AGENDA & TOPICS
              </span>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                {m.agenda}
              </p>
            </div>

            {m.followUp && (
              <div style={{ fontSize: '0.82rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                📌 Follow-up Action Item: {m.followUp}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', maxWidth: '480px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 800 }}>Schedule Parent Meeting (PTM)</h3>
            <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Student & Parent</label>
                <select value={studentName} onChange={e => {
                  setStudentName(e.target.value);
                  if (e.target.value === 'Lucas Martin') setParentName('Sofia Martin');
                  if (e.target.value === 'Sarah Doe') setParentName('Arthur Doe');
                  if (e.target.value === 'Ethan Hunt') setParentName('Eleanor Hunt');
                }} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <option value="Lucas Martin">Lucas Martin (Parent: Sofia Martin)</option>
                  <option value="Sarah Doe">Sarah Doe (Parent: Arthur Doe)</option>
                  <option value="Ethan Hunt">Ethan Hunt (Parent: Eleanor Hunt)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Time Slot</label>
                  <input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 04:00 PM" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Meeting Mode</label>
                <select value={mode} onChange={e => setMode(e.target.value as any)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <option value="virtual">Virtual Video Call (EduVerse Meet)</option>
                  <option value="in_person">In-Person (School Meeting Room A)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Agenda & Note</label>
                <textarea rows={3} value={agenda} onChange={e => setAgenda(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <Button type="button" variant="outline" onClick={() => setShowScheduleModal(false)}>Cancel</Button>
                <Button type="submit">Send Meeting Invitation</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
