import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { EventBus } from '@/mock-server/EventBus';
import { 
  ShieldAlert, Award, Star, AlertTriangle, Plus, 
  CheckCircle2, Search, Filter, Clock, User, MessageSquare
} from 'lucide-react';
import styles from './teacher.module.css';

interface BehaviourRecord {
  id: number;
  studentName: string;
  studentId: string;
  className: string;
  type: 'positive' | 'warning' | 'achievement';
  category: string;
  points: number;
  note: string;
  date: string;
  loggedBy: string;
}

const mockBehaviourRecords: BehaviourRecord[] = [
  {
    id: 1,
    studentName: 'Lucas Martin',
    studentId: 'GFA-2025-10045',
    className: 'Grade 9 - C',
    type: 'positive',
    category: 'Peer Assistance & Leadership',
    points: +10,
    note: 'Stayed back after lab session to help clean apparatus and mentor struggling classmates.',
    date: '2026-04-07 11:30 AM',
    loggedBy: 'Dr. Robert Vance'
  },
  {
    id: 2,
    studentName: 'Sarah Doe',
    studentId: 'GFA-2025-10042',
    className: 'Grade 10 - A',
    type: 'achievement',
    category: 'Academic Excellence Star',
    points: +25,
    note: 'Scored highest score 98% in Midterm Science Olympiad qualifying round.',
    date: '2026-04-06 02:15 PM',
    loggedBy: 'Dr. Robert Vance'
  },
  {
    id: 3,
    studentName: 'Ethan Hunt',
    studentId: 'GFA-2025-10048',
    className: 'Grade 10 - A',
    type: 'warning',
    category: 'Classroom Distraction',
    points: -5,
    note: 'Repeatedly using mobile gaming app during physics lecture despite prior verbal warning.',
    date: '2026-04-05 10:15 AM',
    loggedBy: 'Dr. Robert Vance'
  }
];

export const TeacherBehaviourPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [records, setRecords] = useState<BehaviourRecord[]>(mockBehaviourRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [studentName, setStudentName] = useState('Lucas Martin');
  const [type, setType] = useState<'positive' | 'warning' | 'achievement'>('positive');
  const [category, setCategory] = useState('Classroom Participation');
  const [points, setPoints] = useState(10);
  const [note, setNote] = useState('');

  const tabs = [
    { id: 'timeline', label: 'Observation Timeline', count: records.length },
    { id: 'positive', label: 'Positive Behaviour (+Merits)' },
    { id: 'warnings', label: 'Warnings & Infractions' },
    { id: 'achievements', label: 'Achievements' }
  ];

  const handleRecordBehaviour = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: BehaviourRecord = {
      id: Date.now(),
      studentName,
      studentId: 'GFA-2025-10045',
      className: 'Grade 10 - A',
      type,
      category,
      points: type === 'warning' ? -Math.abs(points) : Math.abs(points),
      note: note || 'Observed good effort during classroom activities.',
      date: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      loggedBy: 'Dr. Robert Vance'
    };

    setRecords(prev => [newRecord, ...prev]);
    setShowAddModal(false);
    setToastMessage(`Behaviour Record added for ${studentName}! Parent notified & Student Profile updated.`);

    // Workflow Event
    EventBus.publish('BEHAVIOUR_RECORDED', {
      record: newRecord,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || r.note.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'positive') return matchesSearch && r.type === 'positive';
    if (activeTab === 'warnings') return matchesSearch && r.type === 'warning';
    if (activeTab === 'achievements') return matchesSearch && r.type === 'achievement';
    return matchesSearch;
  });

  return (
    <div className={styles.container}>
      <PageHeader
        title="Student Behaviour & Discipline"
        subtitle="Track positive merit points, observation notes, warnings, and student achievements"
        actions={
          <Button size="sm" onClick={() => setShowAddModal(true)}>
            <Plus size={16} style={{ marginRight: '6px' }} />
            Record Behaviour / Award
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
        <Card style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderRadius: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={22} style={{ margin: 'auto' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Merits</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>+142 Points</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderRadius: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={22} style={{ margin: 'auto' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Star Badges</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>38 Awarded</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderRadius: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={22} style={{ margin: 'auto' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Warnings Issued</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>5 Cases</h3>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-color)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', width: '260px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search student or note..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100%' }}
          />
        </div>
      </div>

      {/* Observation Feed Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredRecords.map(rec => (
          <Card key={rec.id} style={{ padding: '18px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: rec.type === 'positive' ? '#ECFDF5' : rec.type === 'achievement' ? '#FEF3C7' : '#FEF2F2',
                  color: rec.type === 'positive' ? '#059669' : rec.type === 'achievement' ? '#D97706' : '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem'
                }}>
                  {rec.points > 0 ? `+${rec.points}` : rec.points}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                    {rec.studentName} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>({rec.className})</span>
                  </h4>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                    {rec.category}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Badge variant={rec.type === 'positive' ? 'success' : rec.type === 'achievement' ? 'info' : 'danger'}>
                  {rec.type.toUpperCase()}
                </Badge>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {rec.date}
                </span>
              </div>
            </div>

            <p style={{ margin: '12px 0 8px 0', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
              "{rec.note}"
            </p>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '16px' }}>
              <span>Logged by: {rec.loggedBy}</span>
              <span>Parent Notified: Yes ✓</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Record Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', maxWidth: '480px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 800 }}>Record Student Behaviour</h3>
            <form onSubmit={handleRecordBehaviour} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Student</label>
                <select value={studentName} onChange={e => setStudentName(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <option value="Lucas Martin">Lucas Martin (Grade 9 - C)</option>
                  <option value="Sarah Doe">Sarah Doe (Grade 10 - A)</option>
                  <option value="Ethan Hunt">Ethan Hunt (Grade 10 - A)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Record Type</label>
                <select value={type} onChange={e => setType(e.target.value as any)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <option value="positive">Positive (+ Merit Points)</option>
                  <option value="achievement">Achievement Badge</option>
                  <option value="warning">Warning / Infraction (- Points)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Category</label>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Observation Note</label>
                <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Write specific details about the event..." style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit">Save & Notify Parent</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
