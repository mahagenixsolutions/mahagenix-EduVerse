import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useRole } from '@/contexts/RoleContext';
import { PageHeader } from '@/components/navigation/PageHeader';
import { 
  User, Shield, Bell, Smartphone, Palette, Save, 
  Trash2, Plus, Eye, EyeOff, Check, AlertCircle 
} from 'lucide-react';
import styles from './profile.module.css';

interface Session {
  id: string;
  device: string;
  location: string;
  ip: string;
  active: boolean;
  time: string;
}

export const SettingsPage: React.FC = () => {
  const { currentUser, login } = useRole();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'sessions' | 'theme'>('profile');

  // Success/Error Feedback states
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Profile Form States
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [bio, setBio] = useState('Passionate learner, developer-in-training, and avid team player.');

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Notification Preferences States
  const [notifs, setNotifs] = useState({
    homeworkEmail: true,
    homeworkPush: true,
    attendanceEmail: false,
    attendancePush: true,
    resultsEmail: true,
    resultsPush: true,
    eventEmail: true,
    eventPush: true,
  });

  // Session States
  const [sessions, setSessions] = useState<Session[]>([
    { id: '1', device: 'Windows PC • Chrome Browser', location: 'New Delhi, India', ip: '192.168.1.45', active: true, time: 'Active now' },
    { id: '2', device: 'Apple iPhone 14 Pro', location: 'New Delhi, India', ip: '192.168.1.109', active: false, time: '2 hours ago' },
    { id: '3', device: 'Safari • macOS Laptop', location: 'Mumbai, India', ip: '103.45.210.12', active: false, time: '3 days ago' },
  ]);

  // Theme states
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem('eduverse_theme') as any) || 'light';
  });

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showFeedback('error', 'Name and Email are required.');
      return;
    }
    // Update Role Context profile mocks mock-persist
    if (currentUser) {
      currentUser.name = name;
      currentUser.email = email;
      currentUser.phone = phone;
      // Triggers context refresh via mock login mechanism
      login(currentUser.role);
    }
    showFeedback('success', 'Profile settings updated successfully!');
  };

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showFeedback('error', 'All password fields are required.');
      return;
    }
    if (newPassword.length < 6) {
      showFeedback('error', 'New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showFeedback('error', 'Confirm password does not match new password.');
      return;
    }
    showFeedback('success', 'Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleNotifSave = () => {
    showFeedback('success', 'Notification preferences saved!');
  };

  const handleRevokeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showFeedback('success', 'Session terminated successfully.');
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('eduverse_theme', newTheme);
    
    // Apply class to body/html
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark-mode');
    } else if (newTheme === 'light') {
      root.classList.remove('dark-mode');
    } else {
      // System
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) root.classList.add('dark-mode');
      else root.classList.remove('dark-mode');
    }
    showFeedback('success', `Theme switched to ${newTheme} mode!`);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      <PageHeader 
        title="Settings" 
        subtitle="Manage your personal preferences, accounts, security, and interface theme"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }]}
      />

      {feedback && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderRadius: '16px',
          marginBottom: '20px',
          border: '1px solid',
          background: feedback.type === 'success' ? '#E8F5E9' : '#FFEBEE',
          borderColor: feedback.type === 'success' ? '#A5D6A7' : '#EF9A9A',
          color: feedback.type === 'success' ? '#2E7D32' : '#C62828',
          fontSize: '0.9rem',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          {feedback.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          <span>{feedback.message}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', marginTop: '24px' }}>
        {/* Navigation Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              border: 'none', borderRadius: '16px', background: activeTab === 'profile' ? 'var(--nav-active)' : 'transparent',
              color: activeTab === 'profile' ? 'var(--primary-hover)' : 'var(--text-muted)',
              fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <User size={18} /> Account Details
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              border: 'none', borderRadius: '16px', background: activeTab === 'security' ? 'var(--nav-active)' : 'transparent',
              color: activeTab === 'security' ? 'var(--primary-hover)' : 'var(--text-muted)',
              fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <Shield size={18} /> Password & Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              border: 'none', borderRadius: '16px', background: activeTab === 'notifications' ? 'var(--nav-active)' : 'transparent',
              color: activeTab === 'notifications' ? 'var(--primary-hover)' : 'var(--text-muted)',
              fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('sessions')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              border: 'none', borderRadius: '16px', background: activeTab === 'sessions' ? 'var(--nav-active)' : 'transparent',
              color: activeTab === 'sessions' ? 'var(--primary-hover)' : 'var(--text-muted)',
              fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <Smartphone size={18} /> Active Sessions
          </button>
          <button 
            onClick={() => setActiveTab('theme')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              border: 'none', borderRadius: '16px', background: activeTab === 'theme' ? 'var(--nav-active)' : 'transparent',
              color: activeTab === 'theme' ? 'var(--primary-hover)' : 'var(--text-muted)',
              fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.15s ease'
            }}
          >
            <Palette size={18} /> System Theme
          </button>
        </aside>

        {/* Content Pane */}
        <div>
          {/* TAB 1: PROFILE ACCOUNT DETAILS */}
          {activeTab === 'profile' && (
            <Card style={{ padding: '32px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 700 }}>Account Details</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>Update your name, contacts, and personal description.</p>
              
              <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      style={{
                        padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)',
                        background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit'
                      }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      style={{
                        padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)',
                        background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit'
                      }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Phone Number</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    style={{
                      padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Bio / Description</label>
                    <span style={{ fontSize: '0.75rem', color: bio.length > 150 ? '#EF4444' : 'var(--text-light)' }}>{bio.length}/200 characters</span>
                  </div>
                  <textarea 
                    value={bio} 
                    onChange={e => setBio(e.target.value.substring(0, 200))} 
                    rows={4}
                    style={{
                      padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <Button variant="primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Save size={16} /> Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* TAB 2: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <Card style={{ padding: '32px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 700 }}>Password & Security</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>Change your account password securely.</p>

              <form onSubmit={handleSecuritySave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Current Password</label>
                  <input 
                    type={showPass ? 'text' : 'password'} 
                    value={currentPassword} 
                    onChange={e => setCurrentPassword(e.target.value)} 
                    style={{
                      padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>New Password (minimum 6 characters)</label>
                  <input 
                    type={showPass ? 'text' : 'password'} 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    style={{
                      padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Confirm New Password</label>
                  <input 
                    type={showPass ? 'text' : 'password'} 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    style={{
                      padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)',
                      background: 'var(--surface-color)', color: 'var(--text-main)', fontSize: '0.9rem', fontFamily: 'inherit'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Show password fields</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <Button variant="primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Save size={16} /> Update Password
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* TAB 3: NOTIFICATION PREFERENCES */}
          {activeTab === 'notifications' && (
            <Card style={{ padding: '32px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 700 }}>Notification Preferences</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>Customize how and when you want to receive alerts.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Section Homework */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Homework Alerts</h4>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs.homeworkEmail} onChange={e => setNotifs(prev => ({ ...prev, homeworkEmail: e.target.checked }))} />
                      Email Digests
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs.homeworkPush} onChange={e => setNotifs(prev => ({ ...prev, homeworkPush: e.target.checked }))} />
                      Push Notifications
                    </label>
                  </div>
                </div>

                {/* Section Attendance */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Daily Attendance Publish</h4>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs.attendanceEmail} onChange={e => setNotifs(prev => ({ ...prev, attendanceEmail: e.target.checked }))} />
                      Email Digests
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs.attendancePush} onChange={e => setNotifs(prev => ({ ...prev, attendancePush: e.target.checked }))} />
                      Push Notifications
                    </label>
                  </div>
                </div>

                {/* Section Results */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Exam Marks Publication</h4>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs.resultsEmail} onChange={e => setNotifs(prev => ({ ...prev, resultsEmail: e.target.checked }))} />
                      Email Digests
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs.resultsPush} onChange={e => setNotifs(prev => ({ ...prev, resultsPush: e.target.checked }))} />
                      Push Notifications
                    </label>
                  </div>
                </div>

                {/* Section Events */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '8px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>School Event Reminders</h4>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs.eventEmail} onChange={e => setNotifs(prev => ({ ...prev, eventEmail: e.target.checked }))} />
                      Email Digests
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs.eventPush} onChange={e => setNotifs(prev => ({ ...prev, eventPush: e.target.checked }))} />
                      Push Notifications
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <Button variant="primary" onClick={handleNotifSave}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* TAB 4: SESSIONS */}
          {activeTab === 'sessions' && (
            <Card style={{ padding: '32px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 700 }}>Active Sessions</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>These devices are currently logged in to your account.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {sessions.map(s => (
                  <div 
                    key={s.id} 
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)',
                      background: 'var(--bg-color)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: 'rgba(95, 175, 136, 0.1)', color: 'var(--primary-color)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {s.device}
                          {s.active && <Badge variant="success">Current Session</Badge>}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{s.location} • IP: {s.ip} • {s.time}</span>
                      </div>
                    </div>

                    {!s.active && (
                      <button 
                        onClick={() => handleRevokeSession(s.id)}
                        title="Revoke session access"
                        style={{
                          background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer',
                          padding: '8px', borderRadius: '8px', transition: 'background 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 5: SYSTEM THEME */}
          {activeTab === 'theme' && (
            <Card style={{ padding: '32px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 700 }}>System Theme</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>Customize the color palette and appearance of the dashboard.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {/* Light */}
                <div 
                  onClick={() => handleThemeChange('light')}
                  style={{
                    border: '2px solid', borderColor: theme === 'light' ? 'var(--primary-color)' : 'var(--border-color)',
                    borderRadius: '16px', padding: '24px 16px', textAlign: 'center', cursor: 'pointer',
                    background: '#FFFFFF', transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F8FAF8', border: '1px solid #E8ECEA', margin: '0 auto 12px auto' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#1F2937' }}>Light Mode</p>
                </div>

                {/* Dark */}
                <div 
                  onClick={() => handleThemeChange('dark')}
                  style={{
                    border: '2px solid', borderColor: theme === 'dark' ? 'var(--primary-color)' : 'var(--border-color)',
                    borderRadius: '16px', padding: '24px 16px', textAlign: 'center', cursor: 'pointer',
                    background: '#121312', transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1C1D1C', border: '1px solid #2B2C2B', margin: '0 auto 12px auto' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#F3F4F6' }}>Dark Mode</p>
                </div>

                {/* System */}
                <div 
                  onClick={() => handleThemeChange('system')}
                  style={{
                    border: '2px solid', borderColor: theme === 'system' ? 'var(--primary-color)' : 'var(--border-color)',
                    borderRadius: '16px', padding: '24px 16px', textAlign: 'center', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #FFFFFF 50%, #121312 50%)', transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFF 50%, #222 50%)', border: '1px solid var(--border-color)', margin: '0 auto 12px auto' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>System Default</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
