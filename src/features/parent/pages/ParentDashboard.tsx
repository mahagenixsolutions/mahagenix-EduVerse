import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useHomework } from '@/features/homework/hooks/useHomework';
import { useAttendance } from '@/features/attendance/hooks/useAttendance';
import { useRole } from '@/contexts/RoleContext';
import { 
  Calendar, Clock, CreditCard, Award, ChevronRight, 
  UserCheck, MessageSquare, X, Volume2, Compass, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './parent.module.css';

export const ParentDashboard: React.FC = () => {
  const { currentUser } = useRole();
  const { homework } = useHomework();
  const { attendance } = useAttendance();
  const navigate = useNavigate();

  // Homework details modal state
  const [selectedHw, setSelectedHw] = useState<any>(null);

  // Child statistics (mocked matching image)
  const child = {
    name: 'Sarah Doe',
    grade: 'Class 10-A',
    rollNo: 23,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    attendanceRate: 92,
    busRoute: 'Route 12B',
    busStatus: 'En Route (5 mins away)',
    pendingFees: '₹12,500',
    feeDueDate: 'Oct 20, 2026'
  };

  // Replicating Homework Tracker list items from image
  const trackerHomework = [
    { id: 1, title: 'Calculus Exercises 1-20', subject: 'Mathematics', dueDate: 'Today, 11:59 PM', status: 'pending', leftColor: '#EF4444' },
    { id: 2, title: 'Lab Report: Kinematics Experiment', subject: 'Physics', dueDate: 'Tomorrow', status: 'submitted', leftColor: '#3B82F6' },
    { id: 3, title: 'Read Chapters 4 & 5, Write Summary', subject: 'English', dueDate: 'Wednesday', status: 'pending', leftColor: '#F59E0B' },
    { id: 4, title: 'Balance Redox Reactions Worksheet', subject: 'Chemistry', dueDate: 'Thursday', status: 'pending', leftColor: '#10B981' },
    { id: 5, title: 'Implement Stack Data Structure', subject: 'Computer Science', dueDate: 'Friday', status: 'overdue', leftColor: '#EC4899' }
  ];

  // Replicating Today's Schedule items from image
  const timelineSchedule = [
    { time: '08:00 AM', title: 'Mathematics', teacher: 'Mr. Smith', status: 'completed', dotColor: '#22C55E' },
    { time: '08:50 AM', title: 'Physics', teacher: 'Mrs. Davis', status: 'completed', dotColor: '#22C55E' },
    { time: '10:45 AM', title: 'Computer Science', teacher: 'Mr. Johnson', status: 'in-progress', dotColor: '#F59E0B' },
    { time: '01:30 PM', title: 'English', teacher: 'Ms. Williams', status: 'upcoming', dotColor: '#94A3B8' }
  ];

  return (
    <div className={styles.dashboard}>
      
      {/* 1. Hero Greeting Banner (Welcome Card) */}
      <div className={styles.welcomeBanner}>
        <div className={styles.parentProfile}>
          <h2>Good morning, Robert! 👋</h2>
          <p>Here's what's happening with Sarah today.</p>
          <button 
            className={styles.contactBtn}
            onClick={() => navigate('/messages')}
          >
            <MessageSquare size={16} color="var(--primary-color)" /> Contact Mr. Smith (Grade Teacher)
          </button>
        </div>
        
        {/* Student Profile Card (Right Column nested inside Hero) */}
        <div className={styles.childCard}>
          <div className={styles.childHeader}>
            <img src={child.avatar} className={styles.childAvatar} alt={child.name} />
            <div className={styles.childDetails}>
              <h4>{child.name}</h4>
              <p>{child.grade} • Roll No. {child.rollNo}</p>
              <span className={styles.badgeSuccess}>Active Student</span>
            </div>
          </div>
          <button 
            className={styles.viewProfileLink}
            onClick={() => navigate('/profile')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            View Profile <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. Statistics Cards Grid (4 Columns) */}
      <div className={styles.statsGrid}>
        
        {/* Stat 1: Attendance */}
        <div className={styles.statCard} onClick={() => navigate('/learn/attendance')}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statTitle}>Attendance Rate</p>
              <h2 className={styles.statValue}>{child.attendanceRate}%</h2>
            </div>
            <div className={`${styles.iconCircle} ${styles.greenBg}`}>
              <UserCheck size={20} className={styles.greenAccent} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
            <span style={{ fontSize: '12px', color: '#22C55E', fontWeight: 600 }}>Above target by 2%</span>
            
            {/* Miniature sparkline SVG */}
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
              <path d="M1 23 C 12 18, 24 19, 36 8 C 48 3, 52 1, 59 1" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
              <path d="M1 23 C 12 18, 24 19, 36 8 C 48 3, 52 1, 59 1 L 59 24 L 1 24 Z" fill="url(#greenGrad)" opacity="0.1"/>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E"/>
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={styles.statLink} style={{ color: '#22C55E' }}>Target: 90%</span>
        </div>

        {/* Stat 2: Fees */}
        <div className={styles.statCard} onClick={() => navigate('/services/fees')}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statTitle}>Outstanding Fees</p>
              <h2 className={styles.statValue}>{child.pendingFees}</h2>
            </div>
            <div className={`${styles.iconCircle} ${styles.orangeBg}`}>
              <CreditCard size={20} className={styles.orangeAccent} />
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500, marginTop: '8px' }}>Due Oct 20, 2026</span>
          <span className={styles.statLink} style={{ color: '#F59E0B' }}>View Details <ChevronRight size={12} /></span>
        </div>

        {/* Stat 3: Progress */}
        <div className={styles.statCard} onClick={() => navigate('/learn/results')}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statTitle}>Academic Progress</p>
              <h2 className={styles.statValue}>A-</h2>
            </div>
            <div className={`${styles.iconCircle} ${styles.purpleBg}`}>
              <Award size={20} className={styles.purpleAccent} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
            <span style={{ fontSize: '12px', color: '#8B5CF6', fontWeight: 600 }}>Good performance</span>
            
            {/* Miniature Sparkline */}
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
              <path d="M1 23 C 10 20, 20 22, 30 15 C 40 8, 50 2, 59 1" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M1 23 C 10 20, 20 22, 30 15 C 40 8, 50 2, 59 1 L 59 24 L 1 24 Z" fill="url(#purpleGrad)" opacity="0.1"/>
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6"/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={styles.statLink} style={{ color: '#8B5CF6' }}>View Report <ChevronRight size={12} /></span>
        </div>

        {/* Stat 4: Today's Schedule count */}
        <div className={styles.statCard} onClick={() => navigate('/school/calendar')}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statTitle}>Today's Schedule</p>
              <h2 className={styles.statValue}>3</h2>
            </div>
            <div className={`${styles.iconCircle} ${styles.blueBg}`}>
              <Clock size={20} className={styles.blueAccent} />
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500, marginTop: '8px' }}>Classes</span>
          <span className={styles.statLink} style={{ color: '#2563EB' }}>View Timetable <ChevronRight size={12} /></span>
        </div>

      </div>

      {/* 3. Main Content Grid (Two Column Layout) */}
      <div className={styles.contentGrid}>
        
        {/* Left Column: Today's Schedule timeline */}
        <div className={styles.premiumCard}>
          <div className={styles.cardHeaderRow}>
            <h3>Today's Schedule</h3>
            <button className={styles.timetableBtn} onClick={() => navigate('/school/calendar')}>
              <Calendar size={15} /> View Timetable
            </button>
          </div>

          <div className={styles.timeline}>
            {timelineSchedule.map((classSlot, idx) => {
              const isCompleted = classSlot.status === 'completed';
              const isInProgress = classSlot.status === 'in-progress';
              return (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineTime} style={{ color: isInProgress ? '#F59E0B' : '#64748B' }}>
                    {classSlot.time}
                  </div>
                  
                  <div 
                    className={styles.timelineDot} 
                    style={{ 
                      backgroundColor: isCompleted ? '#22C55E' : isInProgress ? '#F59E0B' : '#FFFFFF',
                      borderColor: isCompleted ? '#22C55E' : isInProgress ? '#F59E0B' : '#EEF2F7'
                    }} 
                  />

                  <div className={styles.timelineBody}>
                    <div className={styles.timelineContent}>
                      <h4>{classSlot.title}</h4>
                      <p>
                        {classSlot.teacher} • <span style={{ 
                          color: isCompleted ? '#22C55E' : isInProgress ? '#F59E0B' : '#94A3B8',
                          fontWeight: 600
                        }}>{isInProgress ? 'In Progress' : classSlot.status.toUpperCase()}</span>
                      </p>
                    </div>

                    <div 
                      className={styles.timelineIconBox}
                      style={{
                        backgroundColor: isCompleted ? 'rgba(34, 197, 94, 0.08)' : isInProgress ? 'rgba(245, 158, 11, 0.08)' : 'rgba(148, 163, 184, 0.06)',
                        color: isCompleted ? '#22C55E' : isInProgress ? '#F59E0B' : '#94A3B8'
                      }}
                    >
                      {isCompleted ? <Check size={14} /> : <Clock size={14} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.timelineFooter}>
            <span>Total Classes Today: 5</span>
            <div className={styles.timelineStats}>
              <span style={{ color: '#22C55E' }}>2 Completed</span>
              <span style={{ color: '#F59E0B' }}>1 In Progress</span>
              <span style={{ color: '#94A3B8' }}>2 Upcoming</span>
            </div>
          </div>
        </div>

        {/* Right Column: Homework list */}
        <div className={styles.premiumCard}>
          <div className={styles.cardHeaderRow}>
            <h3>Child's Homework Tracker (5)</h3>
            <button className={styles.headerAction} onClick={() => navigate('/learn/homework')}>
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className={styles.homeworkList}>
            {trackerHomework.map(hw => (
              <div 
                key={hw.id} 
                className={styles.homeworkItem}
                style={{ borderLeftColor: hw.leftColor }}
                onClick={() => setSelectedHw({
                  ...hw,
                  teacher: hw.subject === 'Mathematics' ? 'Mr. Smith' : hw.subject === 'Physics' ? 'Mrs. Davis' : 'Mr. Johnson'
                })}
              >
                <div className={styles.homeworkDetails}>
                  <h4>{hw.title}</h4>
                  <p>{hw.subject} • Due: {hw.dueDate}</p>
                </div>
                <Badge variant={hw.status === 'submitted' ? 'success' : hw.status === 'overdue' ? 'danger' : 'warning'}>
                  {hw.status}
                </Badge>
              </div>
            ))}
          </div>

          <button 
            className={styles.homeworkCenterBtn}
            onClick={() => navigate('/school/calendar')}
          >
            <Calendar size={16} /> View Homework Calendar <ChevronRight size={14} />
          </button>
        </div>

      </div>

      {/* 4. Lower Section Grid */}
      <div className={styles.contentGrid}>
        
        {/* Live Bus Tracking Map Card */}
        <div className={styles.premiumCard}>
          <div className={styles.cardHeaderRow}>
            <h3>School Bus Tracking</h3>
            <Badge variant="success">Live Tracking</Badge>
          </div>

          <div className={styles.busTrackerBody}>
            <div className={styles.busDetails}>
              <div className={styles.busRouteInfo}>
                <div className={`${styles.iconCircle} ${styles.greenBg}`} style={{ width: 44, height: 44 }}>
                  <Compass size={22} className={styles.greenAccent} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>{child.busRoute}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>{child.busStatus}</p>
                </div>
              </div>
              <strong style={{ fontSize: '15px', color: '#22C55E' }}>ETA: 8:10 AM</strong>
            </div>

            {/* Premium map graphic mock SVG */}
            <div className={styles.busMapIllustration}>
              <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
                <rect width="400" height="100" fill="#F8FAFC" />
                {/* Simulated streets lines */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="#EEF2F7" strokeWidth="4" />
                <line x1="0" y1="70" x2="400" y2="70" stroke="#EEF2F7" strokeWidth="4" />
                <line x1="80" y1="0" x2="80" y2="100" stroke="#EEF2F7" strokeWidth="4" />
                <line x1="260" y1="0" x2="260" y2="100" stroke="#EEF2F7" strokeWidth="4" />
                
                {/* Active Bus route green path */}
                <path d="M 50 30 L 260 30 L 260 70 L 320 70" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
                
                {/* Markers */}
                <circle cx="50" cy="30" r="6" fill="#2563EB" />
                <circle cx="260" cy="30" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
                <circle cx="260" cy="70" r="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
                
                {/* Bus marker */}
                <g transform="translate(320, 70)">
                  <circle cx="0" cy="0" r="10" fill="#22C55E" />
                  <path d="M -4 -4 L 4 -4 L 4 4 L -4 4 Z" fill="#FFFFFF" />
                </g>
              </svg>
            </div>

            <button 
              className={styles.busTrackingLink} 
              onClick={() => navigate('/school/transport')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              View Route Details <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Recent Attendance Logs */}
        <div className={styles.premiumCard}>
          <div className={styles.cardHeaderRow}>
            <h3>Recent Attendance Logs</h3>
            <button className={styles.headerAction} onClick={() => navigate('/learn/attendance')}>
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className={styles.attendanceList}>
            
            {/* Log 1: Absent */}
            <div className={styles.attendanceItem}>
              <div className={styles.attendanceDateRow}>
                <div className={`${styles.calendarCircle}`} style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#EF4444' }}>
                  <Calendar size={16} />
                </div>
                <div className={styles.attendanceDateText}>
                  <strong>Tuesday, Jul 14, 2026</strong>
                  <span>Note: Unexcused</span>
                </div>
              </div>
              <Badge variant="danger">Absent</Badge>
            </div>

            {/* Log 2: Present */}
            <div className={styles.attendanceItem}>
              <div className={styles.attendanceDateRow}>
                <div className={`${styles.calendarCircle}`} style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#22C55E' }}>
                  <Calendar size={16} />
                </div>
                <div className={styles.attendanceDateText}>
                  <strong>Monday, Jul 13, 2026</strong>
                  <span style={{ color: '#94A3B8' }}>Normal check-in</span>
                </div>
              </div>
              <Badge variant="success">Present</Badge>
            </div>

            {/* Log 3: Present */}
            <div className={styles.attendanceItem}>
              <div className={styles.attendanceDateRow}>
                <div className={`${styles.calendarCircle}`} style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#22C55E' }}>
                  <Calendar size={16} />
                </div>
                <div className={styles.attendanceDateText}>
                  <strong>Friday, Jul 11, 2026</strong>
                  <span style={{ color: '#94A3B8' }}>Normal check-in</span>
                </div>
              </div>
              <Badge variant="success">Present</Badge>
            </div>

          </div>
        </div>

      </div>

      {/* 5. Stay Updated Communication Banner */}
      <div className={styles.bottomBanner}>
        <div className={styles.bannerLeft}>
          <div className={styles.bannerSpeaker}>
            <Volume2 size={20} />
          </div>
          <div className={styles.bannerInfo}>
            <h4>Stay Updated</h4>
            <p>Check the Communication section for latest announcements and messages from school.</p>
          </div>
        </div>
        <button 
          className={styles.bannerCTA}
          onClick={() => navigate('/messages')}
        >
          Go to Communication <ChevronRight size={16} />
        </button>
      </div>

      {/* Homework Detail Dialog Modal */}
      {selectedHw && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '480px', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setSelectedHw(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <X size={20} />
            </button>

            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase' }}>{selectedHw.subject}</span>
              <h3 style={{ margin: '4px 0 2px 0', fontSize: '1.15rem', fontWeight: 700 }}>{selectedHw.title}</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Teacher: {selectedHw.teacher}</p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '12px 0', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-light)' }}>Submission Status:</span>
                <Badge variant={selectedHw.status === 'submitted' ? 'success' : selectedHw.status === 'overdue' ? 'danger' : 'warning'}>
                  {selectedHw.status}
                </Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-light)' }}>Deadline Date:</span>
                <strong>{selectedHw.dueDate}</strong>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Description Instructions</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {selectedHw.description || 'Solve standard textbook problems, upload solutions in PDF format.'}
              </p>
            </div>

            <Button variant="primary" onClick={() => setSelectedHw(null)} style={{ marginTop: '8px' }}>
              Close Review
            </Button>
          </Card>
        </div>
      )}

    </div>
  );
};
