import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/navigation/PageHeader';
import { MockServer, type CalendarEvent } from '@/mock-server/MockServer';
import { 
  ChevronLeft, ChevronRight, ChevronDown, Calendar, 
  MapPin, Clock, Info, CheckCircle, Ticket, X 
} from 'lucide-react';
import styles from './school.module.css';

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState('October 2026');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(15); // Default to 15th (Ooty trip day)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Exact calendar days matching October 2026
  const calendarDays = [
    { value: 27, isCurrentMonth: false },
    { value: 28, isCurrentMonth: false },
    { value: 29, isCurrentMonth: false },
    { value: 30, isCurrentMonth: false },
    { value: 1, isCurrentMonth: true },
    { value: 2, isCurrentMonth: true },
    { value: 3, isCurrentMonth: true },
    { value: 4, isCurrentMonth: true },
    { value: 5, isCurrentMonth: true },
    { value: 6, isCurrentMonth: true },
    { value: 7, isCurrentMonth: true },
    { value: 8, isCurrentMonth: true },
    { value: 9, isCurrentMonth: true },
    { value: 10, isCurrentMonth: true },
    { value: 11, isCurrentMonth: true },
    { value: 12, isCurrentMonth: true },
    { value: 13, isCurrentMonth: true },
    { value: 14, isCurrentMonth: true },
    { value: 15, isCurrentMonth: true, hasEvent: true }, // Ooty trip
    { value: 16, isCurrentMonth: true },
    { value: 17, isCurrentMonth: true },
    { value: 18, isCurrentMonth: true },
    { value: 19, isCurrentMonth: true },
    { value: 20, isCurrentMonth: true },
    { value: 21, isCurrentMonth: true },
    { value: 22, isCurrentMonth: true, hasEvent: true }, // Basketball
    { value: 23, isCurrentMonth: true },
    { value: 24, isCurrentMonth: true },
    { value: 25, isCurrentMonth: true },
    { value: 26, isCurrentMonth: true },
    { value: 27, isCurrentMonth: true },
    { value: 28, isCurrentMonth: true },
    { value: 29, isCurrentMonth: true },
    { value: 30, isCurrentMonth: true },
    { value: 31, isCurrentMonth: true },
    { value: 1, isCurrentMonth: false, hasEvent: true }, // Coding hackathon (Nov 1)
    { value: 2, isCurrentMonth: false },
    { value: 3, isCurrentMonth: false },
    { value: 4, isCurrentMonth: false },
    { value: 5, isCurrentMonth: false },
    { value: 6, isCurrentMonth: false },
    { value: 7, isCurrentMonth: false }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await MockServer.getEvents();
      // Only display published events
      setEvents(allEvents.filter(e => e.status === 'published'));
    };
    fetchEvents();
  }, []);

  const handleDayClick = (day: typeof calendarDays[0]) => {
    if (!day.isCurrentMonth) return;
    setSelectedDay(day.value);
    
    // Find events matching this day
    const dateStr = `2026-10-${day.value.toString().padStart(2, '0')}`;
    const dayEvts = events.filter(e => e.date === dateStr);
    setSelectedDayEvents(dayEvts);
  };

  // Trigger default selection on mount or when events load
  useEffect(() => {
    if (events.length > 0 && selectedDay !== null) {
      const dateStr = `2026-10-${selectedDay.toString().padStart(2, '0')}`;
      setSelectedDayEvents(events.filter(e => e.date === dateStr));
    }
  }, [events, selectedDay]);

  const handleRegisterEvent = (eventId: number) => {
    setSelectedEvent(null);
    navigate(`/school/events?id=${eventId}`);
  };

  return (
    <div className={styles.container || ''} style={{ paddingBottom: '40px' }}>
      <PageHeader 
        title="School Calendar" 
        subtitle="Manage your class timetable, test schedules, and school excursions"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'School', path: '/school' }, { label: 'Calendar' }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '32px', marginTop: '24px' }}>
        {/* Calendar Monthly view */}
        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: 'var(--text-main)' }}><ChevronLeft size={18} /></button>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{currentMonth}</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: 'var(--text-main)' }}><ChevronRight size={18} /></button>
            </div>
            <button style={{ padding: '6px 16px', borderRadius: '99px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Today</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {calendarDays.map((day, idx) => {
              const isSelected = selectedDay === day.value && day.isCurrentMonth;
              const hasEv = day.hasEvent;
              return (
                <div 
                  key={idx}
                  onClick={() => handleDayClick(day)}
                  style={{
                    height: '64px', borderRadius: '12px', border: '1px solid',
                    borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
                    background: isSelected ? 'var(--nav-active)' : 'var(--surface-color)',
                    cursor: day.isCurrentMonth ? 'pointer' : 'default',
                    opacity: day.isCurrentMonth ? 1 : 0.4,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? 'var(--primary-hover)' : 'var(--text-main)' }}>{day.value}</span>
                  {hasEv && (
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)',
                      alignSelf: 'center', marginBottom: '2px'
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Selected Day Agenda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              Agenda for Oct {selectedDay}, 2026
            </h3>

            {selectedDayEvents.length === 0 ? (
              <div style={{ padding: '24px 12px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                <Calendar size={32} style={{ color: 'var(--border-color)', marginBottom: '8px' }} />
                <p>No special school events scheduled for this day.</p>
                <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '16px', paddingTop: '16px', textAlign: 'left' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>Standard Timetable</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span>08:30 AM - Chemistry</span>
                      <strong style={{ color: 'var(--text-muted)' }}>Room 402</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span>10:00 AM - Physics Lab</span>
                      <strong style={{ color: 'var(--text-muted)' }}>Lab B</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span>01:15 PM - Mathematics</span>
                      <strong style={{ color: 'var(--text-muted)' }}>Room 205</strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedDayEvents.map(e => (
                  <div 
                    key={e.id}
                    onClick={() => setSelectedEvent(e)}
                    className="hover-lift"
                    style={{
                      padding: '16px', borderRadius: '16px', border: '1px solid', borderColor: e.color || 'var(--border-color)',
                      background: 'var(--surface-color)', cursor: 'pointer', position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: e.color }}>{e.category}</span>
                      <Badge variant="info">{e.time}</Badge>
                    </div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{e.title}</h4>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.78rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {e.location}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', fontWeight: 600 }}>Click to view details &rarr;</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Detailed Event Modal overlay */}
      {selectedEvent && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '520px', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setSelectedEvent(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 700 }}>{selectedEvent.title}</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: selectedEvent.color, background: `${selectedEvent.color}15`, padding: '4px 10px', borderRadius: '99px', width: 'fit-content' }}>
              {selectedEvent.category}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                <Calendar size={16} /> <span>{selectedEvent.date} ({selectedEvent.time})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                <MapPin size={16} /> <span>{selectedEvent.venue} ({selectedEvent.location})</span>
              </div>
              {selectedEvent.fee !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                  <Ticket size={16} /> <span>Registration Fee: <strong>₹{selectedEvent.fee}</strong></span>
                </div>
              )}
            </div>

            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {selectedEvent.description}
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <Button variant="outline" onClick={() => setSelectedEvent(null)} style={{ flex: 1 }}>Close</Button>
              <Button variant="primary" onClick={() => handleRegisterEvent(selectedEvent.id)} style={{ flex: 1 }}>
                Go to Registration
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
