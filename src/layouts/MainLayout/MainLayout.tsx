import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { useRole } from '@/contexts/RoleContext';
import { MockServer } from '@/mock-server/MockServer';
import { EventBus } from '@/mock-server/EventBus';
import { Button } from '@/components/ui/Button';
import { Calendar, X } from 'lucide-react';
import { AIAssistantDrawer } from './AIAssistantDrawer';
import styles from './layout.module.css';

const SkeletonPageLoader: React.FC<{ pathname: string }> = ({ pathname }) => {
  const isHome = pathname === '/';
  const isTableLayout = pathname.includes('attendance') || pathname.includes('results') || pathname.includes('assignments') || pathname.includes('notes') || pathname.includes('practice') || pathname.includes('calendar') || pathname.includes('events');
  const isProfileLayout = pathname.includes('profile') || pathname.includes('activity');

  if (isHome) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
        {/* Skeleton Hero Cover */}
        <div className="skeleton" style={{ height: '160px', borderRadius: '18px', width: '100%' }}></div>

        {/* Skeleton Quick Actions */}
        <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton" style={{ flex: 1, height: '110px', borderRadius: '18px' }}></div>
          ))}
        </div>

        {/* Skeleton Continue Learning */}
        <div className="skeleton" style={{ height: '70px', borderRadius: '18px', width: '100%' }}></div>

        {/* Main Grid */}
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '24px', width: '100%' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="skeleton" style={{ height: '280px', borderRadius: '18px' }}></div>
            <div className="skeleton" style={{ height: '220px', borderRadius: '18px' }}></div>
            <div className="skeleton" style={{ height: '180px', borderRadius: '18px' }}></div>
          </div>
          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="skeleton" style={{ height: '210px', borderRadius: '18px' }}></div>
            <div className="skeleton" style={{ height: '230px', borderRadius: '18px' }}></div>
            <div className="skeleton" style={{ height: '170px', borderRadius: '18px' }}></div>
            <div className="skeleton" style={{ height: '190px', borderRadius: '18px' }}></div>
            <div className="skeleton" style={{ height: '120px', borderRadius: '18px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (isTableLayout) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
        {/* Title */}
        <div className="skeleton" style={{ width: '220px', height: '34px', borderRadius: '12px' }}></div>
        {/* Path breadcrumbs */}
        <div className="skeleton" style={{ width: '160px', height: '18px', borderRadius: '4px' }}></div>
        {/* Large Table Shape Card */}
        <div className="skeleton" style={{ width: '100%', height: '480px', borderRadius: '18px' }}></div>
      </div>
    );
  }

  if (isProfileLayout) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
        {/* Banner Profile Cover */}
        <div className="skeleton" style={{ width: '100%', height: '160px', borderRadius: '18px' }}></div>

        <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '24px', width: '100%' }}>
          {/* Info Side card */}
          <div className="skeleton" style={{ height: '350px', borderRadius: '18px' }}></div>
          {/* Activity Logs cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="skeleton" style={{ height: '160px', borderRadius: '18px' }}></div>
            <div className="skeleton" style={{ height: '160px', borderRadius: '18px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: Services Page, Messages, settings, etc.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      {/* Title */}
      <div className="skeleton" style={{ width: '180px', height: '34px', borderRadius: '12px' }}></div>
      
      {/* Grid of Cards */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', width: '100%' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton" style={{ height: '220px', borderRadius: '18px' }}></div>
        ))}
      </div>
    </div>
  );
};

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useRole();
  const [pageLoading, setPageLoading] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  
  useEffect(() => {
    const unsubAI = EventBus.subscribe('OPEN_AI_ASSISTANT', () => {
      setAiDrawerOpen(true);
    });
    return () => {
      unsubAI();
    };
  }, []);

  const [toasts, setToasts] = useState<{ 
    notificationId: number; 
    title: string; 
    description: string; 
    type: string; 
    eventId?: number;
    coverImage?: string;
    date?: string;
    time?: string;
  }[]>([]);

  const fetchUnreadEventToasts = async () => {
    if (currentUser?.role !== 'student') return;
    const allNotif = await MockServer.getNotifications();
    const unread = allNotif.filter(n => !n.read);
    
    const toastItems: any[] = [];
    for (const notif of unread) {
      if (notif.type === 'event_new' && notif.eventId) {
        const event = await MockServer.getEventById(notif.eventId);
        if (event) {
          toastItems.push({
            notificationId: notif.id,
            title: `🎒 ${event.title}`,
            description: 'A new school event has been announced.',
            type: 'event_new',
            eventId: event.id,
            coverImage: event.coverImage,
            date: event.date,
            time: event.time
          });
        }
      } else if (['event_reminder', 'homework', 'event_cancel'].includes(notif.type)) {
        let prefix = '🔔 ';
        if (notif.type === 'event_reminder') prefix = '⏰ ';
        if (notif.type === 'homework') prefix = '📝 ';
        if (notif.type === 'event_cancel') prefix = '⚠️ ';
        
        toastItems.push({
          notificationId: notif.id,
          title: `${prefix}${notif.title}`,
          description: notif.description,
          type: notif.type,
          eventId: notif.eventId
        });
      }
    }
    setToasts(toastItems);
  };

  useEffect(() => {
    fetchUnreadEventToasts();

    const unsub = EventBus.subscribe('NOTIFICATION_DISPATCHED', () => {
      if (currentUser?.role === 'student') {
        fetchUnreadEventToasts();
      }
    });

    // Simulation: Pop up 4 announcements sequentially every 3 seconds for visual testing
    let simulationTimer: any;
    if (currentUser?.role === 'student') {
      let counter = 0;
      const titles = [
        '🎒 Science Excursion Trip',
        '📝 Chemistry Lab Submission',
        '⏰ Basketball Finals Notice',
        '⚠️ Seminar Time Rescheduled'
      ];
      const descriptions = [
        'A new science exhibition trip is scheduled for next Friday.',
        'Please submit your chemistry lab reports by 4:00 PM today.',
        'The inter-school basketball finals will begin shortly in the arena.',
        'The coding workshop has been moved from 10:00 AM to 11:30 AM.'
      ];
      const types = ['event_new', 'homework', 'event_reminder', 'event_cancel'];
      const coverImages = [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400',
        'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?q=80&w=400',
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400'
      ];
      const dates = ['18 Oct 2026', '10 Jul 2026', '12 Jul 2026', '15 Jul 2026'];
      const times = ['09:00 AM', '04:00 PM', '11:00 AM', '11:30 AM'];

      simulationTimer = setInterval(() => {
        if (counter >= 4) {
          clearInterval(simulationTimer);
          return;
        }

        const id = 9000 + counter;
        const newToast = {
          notificationId: id,
          title: titles[counter],
          description: descriptions[counter],
          type: types[counter],
          coverImage: coverImages[counter],
          date: dates[counter],
          time: times[counter]
        };

        setToasts(prev => {
          if (prev.some(t => t.notificationId === id)) return prev;
          return [...prev, newToast];
        });

        counter++;
      }, 3000);
    }

    return () => {
      unsub();
      if (simulationTimer) clearInterval(simulationTimer);
    };
  }, [currentUser]);

  const handleDismissToast = async (notifId: number) => {
    await MockServer.markNotificationRead(notifId);
    setToasts(prev => prev.filter(t => t.notificationId !== notifId));
  };

  const handleViewToastDetails = async (notifId: number, eventId: number) => {
    await MockServer.markNotificationRead(notifId);
    setToasts(prev => prev.filter(t => t.notificationId !== notifId));
    navigate(`/school/events?id=${eventId}`);
  };

  useEffect(() => {
    // Trigger brief skeleton loader on all subpage transitions
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 600); // 600ms transition time
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContentContainer}>
        <TopNav />
        <main className={styles.contentArea}>
          {pageLoading ? <SkeletonPageLoader pathname={location.pathname} /> : <Outlet />}
        </main>
      </div>
      <BottomNav />

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />

      {/* Floating Notifications Toast Container */}
      {currentUser?.role === 'student' && toasts.length > 0 && (
        <div className={styles.toastContainer} style={{ height: '340px', display: 'block', position: 'fixed', bottom: '24px', right: '24px', zIndex: 100000 }}>
          {toasts.map((toast, index) => {
            const depth = toasts.length - 1 - index;
            const style = {
              position: 'absolute' as const,
              bottom: 0,
              right: 0,
              width: '100%',
              zIndex: 100 - depth,
              transform: `translateY(${depth * -12}px) scale(${1 - depth * 0.04})`,
              opacity: depth > 2 ? 0 : 1 - depth * 0.15,
              pointerEvents: depth === 0 ? ('auto' as const) : ('none' as const),
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '24px',
              padding: '20px',
              boxShadow: depth === 0 ? '0 20px 50px rgba(15, 23, 42, 0.12)' : '0 4px 12px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '12px'
            };

            // Custom badge per type
            const getBadgeText = (type: string) => {
              if (type === 'event_new') return '✨ New Event';
              if (type === 'homework') return '✨ New Homework';
              if (type === 'event_reminder') return '⏰ Reminder';
              return '⚠️ Alert';
            };

            const getBadgeColor = (type: string) => {
              if (type === 'event_new') return '#10B981';
              if (type === 'homework') return '#8B5CF6';
              return '#F59E0B';
            };

            return (
              <div key={toast.notificationId} style={style}>
                {/* Top header bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: getBadgeColor(toast.type),
                    background: `${getBadgeColor(toast.type)}12`,
                    padding: '4px 10px',
                    borderRadius: '99px'
                  }}>
                    {getBadgeText(toast.type)}
                  </span>
                  <button 
                    onClick={() => handleDismissToast(toast.notificationId)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', display: 'flex' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Body Row: side by side thumbnail and details */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  {toast.coverImage && (
                    <img 
                      src={toast.coverImage} 
                      alt="Thumbnail"
                      style={{
                        width: '88px',
                        height: '88px',
                        borderRadius: '16px',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {toast.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                      {toast.type === 'event_new' ? 'A new event has been announced!' : toast.description}
                    </p>
                    {toast.date && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px', fontSize: '0.72rem', color: 'var(--text-light)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          📅 {toast.date}
                        </span>
                        {toast.type === 'event_new' && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            📍 Ooty, Tamil Nadu
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  {toast.eventId ? (
                    <button 
                      onClick={() => handleViewToastDetails(toast.notificationId, toast.eventId!)}
                      style={{
                        flex: 1,
                        background: '#15803D', // solid green matching screenshot
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 16px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'background 150ms'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#166534'}
                      onMouseLeave={e => e.currentTarget.style.background = '#15803D'}
                    >
                      View Details
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        handleDismissToast(toast.notificationId);
                        navigate('/messages/notifications');
                      }}
                      style={{
                        flex: 1,
                        background: 'var(--primary-color)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px 16px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Open Center
                    </button>
                  )}
                  <button 
                    onClick={() => handleDismissToast(toast.notificationId)}
                    style={{
                      background: '#fff',
                      color: 'var(--text-main)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '10px 20px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'background 150ms'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
