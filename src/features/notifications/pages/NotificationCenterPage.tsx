import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { MockServer, type NotificationItem } from '@/mock-server/MockServer';
import { EventBus } from '@/mock-server/EventBus';
import { 
  Bell, Check, Trash2, Calendar, CreditCard, DollarSign, 
  Clock, AlertCircle, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react';
import styles from './notifications.module.css';

export const NotificationCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, unread, events

  const loadNotifications = async () => {
    setLoading(true);
    const data = await MockServer.getNotifications();
    setNotifications(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications();

    const unsub = EventBus.subscribe('NOTIFICATION_DISPATCHED', () => {
      loadNotifications();
    });

    return () => unsub();
  }, []);

  const handleMarkRead = async (id: number) => {
    await MockServer.markNotificationRead(id);
    loadNotifications();
  };

  const handleMarkAllRead = async () => {
    await MockServer.markNotificationsRead();
    loadNotifications();
  };

  const handleDelete = async (id: number) => {
    await MockServer.deleteNotification(id);
    loadNotifications();
  };

  const handleOpenEvent = (eventId?: number) => {
    if (eventId) {
      navigate(`/school/events?id=${eventId}`);
    } else {
      navigate('/school/events');
    }
  };

  // Get appropriate icon for notification types
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'event_new':
        return <Calendar size={18} />;
      case 'payment_success':
        return <DollarSign size={18} />;
      case 'registration_success':
        return <CheckCircle2 size={18} />;
      case 'event_reminder':
        return <Clock size={18} />;
      case 'event_cancel':
        return <AlertCircle size={18} />;
      case 'homework':
        return <FileText size={18} />;
      case 'attendance':
        return <CheckCircle2 size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  // Get icon theme class
  const getIconClass = (type: NotificationItem['type']) => {
    switch (type) {
      case 'event_new':
        return `${styles.iconWrap} ${styles.iconEvent}`;
      case 'payment_success':
        return `${styles.iconWrap} ${styles.iconPayment}`;
      case 'registration_success':
        return `${styles.iconWrap} ${styles.iconRegistration}`;
      case 'event_reminder':
        return `${styles.iconWrap} ${styles.iconReminder}`;
      case 'event_cancel':
        return `${styles.iconWrap} ${styles.iconCancel}`;
      default:
        return `${styles.iconWrap} ${styles.iconEvent}`;
    }
  };

  // Filters
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filtered = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'events') return n.type.startsWith('event') || n.type.startsWith('registration') || n.type.startsWith('payment');
    return true; // 'all'
  });

  const tabs = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'unread', label: 'Unread Only', count: unreadCount },
    { id: 'events', label: 'School Events & Payments' }
  ];

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Notification Center" 
        subtitle="Manage ERP updates, homework reviews, and school activity registration updates" 
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Messages', path: '/messages' }, { label: 'Notifications' }]} 
      />

      <div className={styles.header}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMarkAllRead}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Check size={14} /> Mark All as Read
          </Button>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <div className="skeleton" style={{ height: '70px', borderRadius: '12px' }} />
          <div className="skeleton" style={{ height: '70px', borderRadius: '12px' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <Bell size={48} color="var(--text-light)" />
          <h3>No notifications</h3>
          <p>You have no notifications in this category right now.</p>
        </div>
      ) : (
        <div className={styles.notificationsList}>
          {filtered.map(notif => (
            <div 
              key={notif.id} 
              className={`${styles.notificationCard} ${!notif.read ? styles.unreadCard : ''}`}
            >
              {!notif.read && <div className={styles.unreadDot} />}
              
              <div className={getIconClass(notif.type)}>
                {getIcon(notif.type)}
              </div>

              <div className={styles.notifContent}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '24px' }}>
                  <h4 className={styles.notifTitle}>{notif.title}</h4>
                  <span className={styles.notifTime}>{notif.time}</span>
                </div>
                <p className={styles.notifDesc}>{notif.description}</p>
                
                {/* Actions inside card */}
                <div className={styles.notifActions} style={{ marginTop: '8px' }}>
                  {!notif.read && (
                    <button 
                      className={styles.actionBtn}
                      onClick={() => handleMarkRead(notif.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  {notif.eventId && (
                    <button 
                      className={styles.actionBtn}
                      onClick={() => handleOpenEvent(notif.eventId)}
                      style={{ color: 'var(--primary-color)' }}
                    >
                      Open Event <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>

              <button 
                className={styles.deleteBtn}
                onClick={() => handleDelete(notif.id)}
                title="Delete Notification"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
