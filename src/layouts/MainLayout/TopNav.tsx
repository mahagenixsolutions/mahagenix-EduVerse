import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bell, Sparkles, LogOut, Calendar, Clock, 
  AlertCircle, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { LogoutFeedbackModal } from '@/components/feedback/LogoutFeedbackModal';
import { useRole } from '@/contexts/RoleContext';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';
import { useNavigate } from 'react-router-dom';
import { EventBus } from '@/mock-server/EventBus';
import styles from './layout.module.css';

export const TopNav: React.FC = () => {
  const { currentUser, logout } = useRole();
  const { unreadCount, markAllAsRead, notifications } = useNotifications();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Click outside to close notification dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate('/login');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'event_new':
        return <Calendar size={16} />;
      case 'payment_success':
        return <CheckCircle2 size={16} />;
      case 'registration_success':
        return <CheckCircle2 size={16} />;
      case 'event_reminder':
        return <Clock size={16} />;
      case 'event_cancel':
        return <AlertCircle size={16} />;
      case 'homework':
        return <FileText size={16} />;
      case 'attendance':
        return <CheckCircle2 size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'event_new': return 'rgba(139, 92, 246, 0.08)';
      case 'payment_success': return 'rgba(16, 185, 129, 0.08)';
      case 'registration_success': return 'rgba(16, 185, 129, 0.08)';
      case 'event_reminder': return 'rgba(245, 158, 11, 0.08)';
      case 'event_cancel': return 'rgba(239, 68, 68, 0.08)';
      default: return 'rgba(99, 102, 241, 0.08)';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'event_new': return '#8B5CF6';
      case 'payment_success': return '#10B981';
      case 'registration_success': return '#10B981';
      case 'event_reminder': return '#F59E0B';
      case 'event_cancel': return '#EF4444';
      default: return '#6366F1';
    }
  };

  return (
    <header className={styles.topNav}>
      <div className={`${styles.logoArea} ${styles.topNavLogo}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <img src="/logo-icon.png" alt="Logo Icon" style={{ height: '36px', objectFit: 'contain', borderRadius: '50%' }} />
        <img src="/logo-text.png" alt="EduVerse" style={{ height: '26px', objectFit: 'contain', marginLeft: '-6px' }} />
      </div>
      
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input 
          type="text" 
          placeholder="Search students, courses, notices..." 
          className={styles.searchInput} 
        />
      </div>
      
      <div className={styles.actions}>
        <button 
          className={styles.actionBtn}
          onClick={() => EventBus.publish('OPEN_AI_ASSISTANT')}
          title="Ask AI Tutor"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          <Sparkles size={20} color="var(--primary-color)" />
        </button>

        <div className={styles.notifDropdownContainer} ref={dropdownRef}>
          <button 
            className={styles.actionBtn} 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Notifications"
            style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
            )}
          </button>

          {dropdownOpen && (
            <div className={styles.notifDropdown}>
              <div className={styles.notifDropdownHeader}>
                <h4 className={styles.notifDropdownTitle}>Recent Notifications</h4>
                {unreadCount > 0 && (
                  <button className={styles.notifDropdownMarkRead} onClick={markAllAsRead}>
                    Mark all read
                  </button>
                )}
              </div>

              <div className={styles.notifDropdownList}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.82rem' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.slice(0, 5).map(notif => (
                    <div 
                      key={notif.id} 
                      className={`${styles.notifDropdownItem} ${!notif.read ? styles.notifDropdownItemUnread : ''}`}
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/messages/notifications');
                      }}
                    >
                      <div 
                        className={styles.notifDropdownItemIcon}
                        style={{ background: getIconBg(notif.type), color: getIconColor(notif.type) }}
                      >
                        {getIcon(notif.type)}
                      </div>
                      <div className={styles.notifDropdownItemBody}>
                        <span className={styles.notifDropdownItemTitle}>{notif.title}</span>
                        <p className={styles.notifDropdownItemDesc}>{notif.description}</p>
                        <span className={styles.notifDropdownItemTime}>{notif.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className={styles.notifDropdownFooter}>
                <button 
                  className={styles.notifDropdownFooterBtn}
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/messages/notifications');
                  }}
                >
                  View All Notifications <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {currentUser && (
          <div className={`${styles.userProfileBtn} ${styles.topNavProfile}`} title={`${currentUser.name} (${currentUser.role})`}>
            <Avatar src={currentUser.avatar} fallback={currentUser.name.substring(0, 2)} />
            <div className={styles.userMeta}>
              <span className={styles.userName}>{currentUser.name}</span>
              <span className={styles.userRoleText}>{currentUser.role.toUpperCase()}</span>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout} title="Switch Workspace">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      <LogoutFeedbackModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirmLogout={handleConfirmLogout} 
      />
    </header>
  );
};
