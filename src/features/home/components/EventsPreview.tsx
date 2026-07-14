import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { MockServer, type CalendarEvent, type Registration } from '@/mock-server/MockServer';
import { Calendar, ChevronRight } from 'lucide-react';

export const EventsPreview: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [regs, setRegs] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardEvents = async () => {
    setLoading(true);
    const allEvents = await MockServer.getEvents();
    const studentRegs = await MockServer.getStudentRegistrations('GFA-2025-10042');
    
    // Only published events
    setEvents(allEvents.filter(e => e.status === 'published').slice(0, 3));
    setRegs(studentRegs);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboardEvents();
  }, []);

  const getEventReg = (eventId: number) => {
    return regs.find(r => r.eventId === eventId);
  };

  // Match the hardcoded countdowns from the screenshot for visual fidelity
  const getMockCountdown = (eventId: number) => {
    if (eventId === 101) return 'In 87 days left';
    if (eventId === 102) return 'In 102 days left';
    if (eventId === 103) return 'In 110 days left';
    return '';
  };

  return (
    <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.8px', fontWeight: 600, color: 'var(--text-main)', fontFamily: '"Century Gothic", "Inter", sans-serif' }}>
          <Calendar size={20} color="var(--primary-color)" /> Upcoming School Events
        </p>
        <button 
          onClick={() => navigate('/school/events')}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            cursor: 'pointer',
            transition: 'background 150ms'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--border-color)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
        >
          Explore All
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="skeleton" style={{ height: '80px', borderRadius: '16px' }} />
          <div className="skeleton" style={{ height: '80px', borderRadius: '16px' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {events.map(event => {
            const reg = getEventReg(event.id);
            const countdown = getMockCountdown(event.id);
            
            return (
              <div 
                key={event.id}
                className="hover-lift"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  background: 'var(--surface-color)',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/school/events?id=${event.id}`)}
              >
                {/* Event thumbnail (embedded rounded box) */}
                <div 
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '12px',
                    backgroundImage: `url(${event.coverImage || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=200'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0
                  }}
                />

                {/* Event details */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      fontSize: '0.68rem', 
                      background: 'rgba(95, 175, 136, 0.08)', 
                      color: 'var(--primary-color)', 
                      padding: '2px 8px', 
                      borderRadius: '99px', 
                      fontWeight: 700 
                    }}>
                      {event.category}
                    </span>
                    {countdown && (
                      <span style={{ fontSize: '0.68rem', color: '#F59E0B', fontWeight: 700 }}>
                        • {countdown}
                      </span>
                    )}
                  </div>

                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {event.title}
                  </h4>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    {event.date} • {event.location}
                  </span>

                  {/* Status pill row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-light)' }}>
                    <span>Status:</span>
                    {reg ? (
                      reg.status === 'registered' ? (
                        <span style={{ display: 'inline-flex', gap: '4px' }}>
                          <span style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10B981', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Registered</span>
                          <span style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10B981', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Paid</span>
                        </span>
                      ) : (
                        <span style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#D97706', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Interested</span>
                      )
                    ) : (
                      <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Not Registered</span>
                    )}
                  </div>
                </div>

                {/* Circular action button */}
                <button
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--primary-color)',
                    flexShrink: 0
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
