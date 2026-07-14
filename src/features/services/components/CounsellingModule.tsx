import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar, User, Video, MapPin, Check, Heart, Shield } from 'lucide-react';

interface CounsellingModuleProps {
  onBack: () => void;
}

interface Appointment {
  id: number;
  mentor: string;
  role: string;
  date: string;
  time: string;
  mode: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  notes?: string;
}

export const CounsellingModule: React.FC<CounsellingModuleProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'history'>('schedule');
  const [mentor, setMentor] = useState('Dr. Helen Vance (School Counsellor)');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [mode, setMode] = useState('Offline');
  const [topic, setTopic] = useState('');

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 3002,
      mentor: 'Dr. Helen Vance',
      role: 'School Counsellor',
      date: '2026-07-12',
      time: '11:00 AM',
      mode: 'Offline (Counselling Room 102)',
      status: 'Upcoming',
      notes: 'Initial stress management & time orientation'
    },
    {
      id: 3001,
      mentor: 'Mr. Robert Wilson',
      role: 'Career Mentor',
      date: '2026-06-25',
      time: '02:00 PM',
      mode: 'Online (MS Teams Meeting)',
      status: 'Completed',
      notes: 'Reviewed university engineering programs. Recommended standard algorithms syllabus.'
    }
  ]);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !topic.trim()) return;

    const id = Math.floor(Math.random() * 900) + 3000;
    const mentorName = mentor.split(' (')[0];
    const mentorRole = mentor.includes('Counsellor') ? 'School Counsellor' : 'Career Mentor';

    const newApp: Appointment = {
      id,
      mentor: mentorName,
      role: mentorRole,
      date,
      time,
      mode: mode === 'Offline' ? 'Offline (Counselling Room 102)' : 'Online (MS Teams Meeting)',
      status: 'Upcoming',
      notes: topic
    };

    setAppointments(prev => [newApp, ...prev]);
    setDate('');
    setTopic('');
    setActiveTab('history');
    alert(`Appointment booked successfully with ${mentorName} on ${date} at ${time}!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button 
            onClick={onBack} 
            style={{ 
              background: 'none', border: 'none', color: '#10B981', fontWeight: 600, 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, marginBottom: '8px'
            }}
          >
            ← Back to Services
          </button>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Mental Wellness & Career Mentoring
          </h2>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => setActiveTab('schedule')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'schedule' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'schedule' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
          >
            Schedule Slot
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '0.82rem', fontWeight: 600,
              background: activeTab === 'history' ? 'var(--surface-color)' : 'transparent',
              color: activeTab === 'history' ? 'var(--text-main)' : 'var(--text-light)',
              cursor: 'pointer'
            }}
          >
            My Appointments ({appointments.length})
          </button>
        </div>
      </div>

      {activeTab === 'schedule' ? (
        /* Booking form */
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
          <Card style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Book Mentoring Slot</h3>
            
            <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Select Mentor / Counsellor</label>
                  <select 
                    value={mentor}
                    onChange={e => setMentor(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                  >
                    <option>Dr. Helen Vance (School Counsellor)</option>
                    <option>Mr. Robert Wilson (Career Mentor)</option>
                    <option>Mrs. Davis (Academic Counselor)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Session Mode</label>
                  <select 
                    value={mode}
                    onChange={e => setMode(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                  >
                    <option>Offline</option>
                    <option>Online</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Choose Date</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Select Time Slot</label>
                  <select 
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                  >
                    <option>09:00 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>03:30 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>What is the topic / issue?</label>
                <textarea 
                  placeholder="Tell us what you would like to discuss (e.g., Exam anxiety, career choices, college recommendations)..."
                  rows={4}
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none', resize: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit"
                style={{
                  background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
                  padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16,185,129,0.1)'
                }}
              >
                Schedule Session
              </button>
            </form>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'linear-gradient(135deg, rgba(244,63,94,0.03) 0%, rgba(99,102,241,0.03) 100%)', border: '1px solid rgba(244,63,94,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F43F5E' }}>
                <Heart size={20} />
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700 }}>100% Confidentiality</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.4 }}>
                All counseling discussions are confidential. Sessions are led by accredited counsellors to support student wellness.
              </p>
            </Card>

            <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(16, 185, 129, 0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981' }}>
                <Shield size={20} />
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700 }}>Mentorship Guidelines</h4>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.4 }}>
                For online MS Teams links, please check the dashboard 15 minutes before the session starts to connect with your mentor.
              </p>
            </Card>
          </div>
        </div>
      ) : (
        /* History list */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {appointments.map(app => (
            <Card key={app.id} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--surface-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)'
                  }}>
                    <User size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{app.mentor}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{app.role}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px',
                    background: app.status === 'Upcoming' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                    color: app.status === 'Upcoming' ? '#D97706' : '#10B981'
                  }}>
                    {app.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{app.date} • {app.time}</span>
                </div>
              </div>

              {/* Mode & location details */}
              <div style={{ display: 'flex', gap: '24px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                {app.mode.includes('Online') ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Video size={14} color="#3B82F6" /> {app.mode}</span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color="#10B981" /> {app.mode}</span>
                )}
              </div>

              {/* Counselor notes */}
              {app.notes && (
                <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <strong>Session Notes:</strong> {app.notes}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
