import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useHomework } from '@/features/homework/hooks/useHomework';
import { useAttendance } from '@/features/attendance/hooks/useAttendance';
import { useAnnouncements } from '@/features/announcements/hooks/useAnnouncements';
import { useRole } from '@/contexts/RoleContext';
import { teacherSchedule, performanceAlerts, teacherRecentActivity, teacherEvents, teacherClasses } from '@/mock/teacher';
import { useNavigate } from 'react-router-dom';
import { 
  Users, CheckSquare, BookOpen, MessageSquare, Plus, Clock, 
  Calendar, Award, AlertCircle, FileText, CheckCircle, HelpCircle,
  Bell, Megaphone, Send, ChevronRight, TrendingDown, UserX,
  Star, PenTool, ClipboardList, Activity
} from 'lucide-react';
import styles from './teacher.module.css';

export const TeacherDashboard: React.FC = () => {
  const { currentUser } = useRole();
  const { homework, publishHomework, gradeHomework, isPublishing } = useHomework();
  const { attendance, markAttendance, isMarking } = useAttendance();
  const { announcements, publishAnnouncement, isPublishing: isPublishingAnn } = useAnnouncements();
  const navigate = useNavigate();

  // Modals / Dialogs states
  const [activeModal, setActiveModal] = useState<'homework' | 'attendance' | 'announcement' | 'marks' | null>(null);

  // Form states
  const [hwTitle, setHwTitle] = useState('');
  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwDueDate, setHwDueDate] = useState('');
  const [hwDraft, setHwDraft] = useState(false);

  const [annTitle, setAnnTitle] = useState('');
  const [annPriority, setAnnPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [annContent, setAnnContent] = useState('');

  const [attendStatus, setAttendStatus] = useState<Record<string, 'present' | 'absent' | 'late'>>({
    'Sarah Doe': 'present',
    'John Lee': 'present',
    'Alex Vance': 'present',
    'Emily Rose': 'present',
  });

  const studentsList = Object.keys(attendStatus);

  const handleCreateHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle || !hwDueDate) return;
    await publishHomework({
      title: hwTitle,
      subject: hwSubject,
      dueDate: hwDueDate,
      teacher: currentUser?.name || 'Mr. Smith',
      isDraft: hwDraft,
    });
    // Reset & Close
    setHwTitle('');
    setHwDueDate('');
    setHwDraft(false);
    setActiveModal(null);
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;
    await publishAnnouncement({
      title: annTitle,
      content: annContent,
      priority: annPriority,
      author: currentUser?.name || 'Mr. Smith',
    });
    setAnnTitle('');
    setAnnContent('');
    setAnnPriority('medium');
    setActiveModal(null);
  };

  const handleMarkAttendanceSubmit = async () => {
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const records = Object.entries(attendStatus).map(([name, status]) => ({
      date: todayStr,
      day: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      status,
      reason: status === 'absent' ? 'Unexcused' : undefined,
    }));
    await markAttendance(records);
    setActiveModal(null);
  };

  const pendingGrading = homework.filter(h => h.status === 'submitted');
  const activeDrafts = homework.filter(h => h.isDraft);
  const pendingAttendanceClasses = teacherClasses.filter(c => c.todayAttendance.present + c.todayAttendance.absent + c.todayAttendance.late < c.studentCount);

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h2 style={{ fontSize: '1.5rem' }}>Good Morning, Teacher! 👋</h2>
        <p className="text-muted">Here's what's happening in your classes today.</p>
      </div>

      {/* Stats Overview Banner */}
      <div className={styles.overviewBanner}>
        <div className={styles.overviewLeft}>
          <img src="/teacher_overview_backpack.png" alt="Backpack" className={styles.backpackImage} />
          <div className={styles.overviewTitleSection}>
            <h3>Today's Overview</h3>
            <p>Wednesday, 2 July 2025</p>
          </div>
        </div>
        <div className={styles.overviewStatsGrid}>
          {/* Stat 1 */}
          <div className={styles.overviewStatItem}>
            <div className={styles.statIconContainer} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Users size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValueText}>32</span>
              <span className={styles.statLabelText}>Students</span>
              <span className={styles.statSubText} style={{ color: '#ef4444' }}>2 Absent</span>
            </div>
          </div>
          {/* Stat 2 */}
          <div className={styles.overviewStatItem}>
            <div className={styles.statIconContainer} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <ClipboardList size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValueText}>5</span>
              <span className={styles.statLabelText}>Tasks</span>
              <span className={styles.statSubText} style={{ color: '#3b82f6' }}>Due Today</span>
            </div>
          </div>
          {/* Stat 3 */}
          <div className={styles.overviewStatItem}>
            <div className={styles.statIconContainer} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Megaphone size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValueText}>2</span>
              <span className={styles.statLabelText}>Announcements</span>
              <span className={styles.statSubText} style={{ color: '#f59e0b' }}>Active</span>
            </div>
          </div>
          {/* Stat 4 */}
          <div className={styles.overviewStatItem}>
            <div className={styles.statIconContainer} style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Calendar size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValueText}>1</span>
              <span className={styles.statLabelText}>Event</span>
              <span className={styles.statSubText} style={{ color: '#8b5cf6' }}>Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <section className={styles.section}>
        <div className={styles.actionsGrid}>
          {/* Card 1: Take Attendance */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <CheckSquare size={26} />
            </div>
            <h4 className={styles.actionCardTitle}>Take Attendance</h4>
            <p className={styles.actionCardDesc}>Mark student attendance quickly and easily.</p>
            <button className={styles.actionCardBtn} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: 'none' }} onClick={() => setActiveModal('attendance')}>
              Start Now <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 2: Create Homework */}
          <div className={styles.actionCard}>
            <div className={styles.cardStarBadge}>
              <Star size={10} className={styles.cardStarIcon} fill="white" />
            </div>
            <div className={styles.actionCardIcon} style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6' }}>
              <PenTool size={26} />
            </div>
            <h4 className={styles.actionCardTitle}>Create Homework</h4>
            <p className={styles.actionCardDesc}>Assign homework to your students.</p>
            <button className={styles.actionCardBtn} style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6', border: 'none' }} onClick={() => setActiveModal('homework')}>
              Create Now <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 3: Publish Announcement */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Megaphone size={26} />
            </div>
            <h4 className={styles.actionCardTitle}>Publish Announcement</h4>
            <p className={styles.actionCardDesc}>Share updates and important messages.</p>
            <button className={styles.actionCardBtn} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: 'none' }} onClick={() => setActiveModal('announcement')}>
              Create Now <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 4: Upload Marks */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Award size={26} />
            </div>
            <h4 className={styles.actionCardTitle}>Upload Marks</h4>
            <p className={styles.actionCardDesc}>Upload and manage student marks securely.</p>
            <button className={styles.actionCardBtn} style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', border: 'none' }} onClick={() => setActiveModal('marks')}>
              Upload Now <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 5: Create Assignment */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <FileText size={26} />
            </div>
            <h4 className={styles.actionCardTitle}>Create Assignment</h4>
            <p className={styles.actionCardDesc}>Create assignments and track submissions.</p>
            <button className={styles.actionCardBtn} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: 'none' }} onClick={() => navigate('/teacher/assignments')}>
              Create Now <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 6: Create Event */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
              <Calendar size={26} />
            </div>
            <h4 className={styles.actionCardTitle}>Create Event</h4>
            <p className={styles.actionCardDesc}>Schedule events and important dates.</p>
            <button className={styles.actionCardBtn} style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', border: 'none' }} onClick={() => navigate('/teacher/events')}>
              Create Now <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 7: Send Notification */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Send size={26} />
            </div>
            <h4 className={styles.actionCardTitle}>Send Notification</h4>
            <p className={styles.actionCardDesc}>Send instant notifications to students or parents.</p>
            <button className={styles.actionCardBtn} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: 'none' }} onClick={() => navigate('/messages')}>
              Send Now <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 8: View Students */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Users size={26} />
            </div>
            <h4 className={styles.actionCardTitle}>View Students</h4>
            <p className={styles.actionCardDesc}>View student profiles and performance.</p>
            <button className={styles.actionCardBtn} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: 'none' }} onClick={() => navigate('/teacher/students')}>
              View Now <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          {/* Today's Schedule */}
          <Card className={styles.card}>
            <div className={styles.cardHeaderFlex}>
              <h3><Calendar size={18} color="#10b981" /> Today's Schedule</h3>
              <Button size="sm" variant="outline" onClick={() => navigate('/teacher/calendar')}>View Calendar <ChevronRight size={14} /></Button>
            </div>
            
            <div className={styles.timelineContainer}>
              <div className={styles.timelineLine}></div>
              
              {/* Slot 1: Mathematics (Calculus) */}
              <div className={styles.timelineItemFlex}>
                <div className={styles.timelineDot} style={{ borderColor: '#10b981' }}></div>
                <div className={styles.timelineTimeBlock} style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>08:00 AM</div>
                <div className={styles.timelineIconBox} style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>
                  <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '0.875rem' }}>√x</span>
                </div>
                <div className={styles.timelineContent}>
                  <h4>Mathematics (Calculus)</h4>
                  <p>Grade 10-A • Room 101</p>
                </div>
                <Badge variant="success" style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>Completed</Badge>
              </div>

              {/* Slot 2: Physics (Mechanics) */}
              <div className={styles.timelineItemFlex}>
                <div className={styles.timelineDot} style={{ borderColor: '#3b82f6' }}></div>
                <div className={styles.timelineTimeBlock} style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>08:50 AM</div>
                <div className={styles.timelineIconBox} style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)"/>
                    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(135 12 12)"/>
                  </svg>
                </div>
                <div className={styles.timelineContent}>
                  <h4>Physics (Mechanics)</h4>
                  <p>Grade 10-B • Lab 3</p>
                </div>
                <Badge variant="info" style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>Ongoing</Badge>
              </div>

              {/* Slot 3: Advanced Algebra */}
              <div className={styles.timelineItemFlex}>
                <div className={styles.timelineDot} style={{ borderColor: '#f59e0b' }}></div>
                <div className={styles.timelineTimeBlock} style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>10:45 AM</div>
                <div className={styles.timelineIconBox} style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>
                  <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '0.875rem' }}>f(x)</span>
                </div>
                <div className={styles.timelineContent}>
                  <h4>Advanced Algebra</h4>
                  <p>Grade 11-A • Room 204</p>
                </div>
                <Badge variant="warning" style={{ backgroundColor: '#fff7ed', color: '#ea580c', border: '1px solid #ffedd5' }}>Upcoming</Badge>
              </div>

              {/* Slot 4: Free Period */}
              <div className={styles.timelineItemFlex}>
                <div className={styles.timelineDot} style={{ borderColor: '#8b5cf6' }}></div>
                <div className={styles.timelineTimeBlock} style={{ backgroundColor: '#f3e8ff', color: '#8b5cf6' }}>11:35 AM</div>
                <div className={styles.timelineIconBox} style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)', color: '#8b5cf6' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
                    <line x1="6" y1="2" x2="6" y2="4"/>
                    <line x1="10" y1="2" x2="10" y2="4"/>
                    <line x1="14" y1="2" x2="14" y2="4"/>
                  </svg>
                </div>
                <div className={styles.timelineContent}>
                  <h4>Free Period</h4>
                  <p>— • Staff Room</p>
                </div>
                <Badge variant="purple" style={{ backgroundColor: '#f3e8ff', color: '#8b5cf6', border: '1px solid #e9d5ff' }}>Upcoming</Badge>
              </div>

              {/* Slot 5: Mathematics (Geometry) */}
              <div className={styles.timelineItemFlex}>
                <div className={styles.timelineDot} style={{ borderColor: '#10b981' }}></div>
                <div className={styles.timelineTimeBlock} style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>01:00 PM</div>
                <div className={styles.timelineIconBox} style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  </svg>
                </div>
                <div className={styles.timelineContent}>
                  <h4>Mathematics (Geometry)</h4>
                  <p>Grade 9-C • Room 108</p>
                </div>
                <Badge variant="success" style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>Upcoming</Badge>
              </div>

              {/* Slot 6: Office Hours */}
              <div className={styles.timelineItemFlex}>
                <div className={styles.timelineDot} style={{ borderColor: '#eab308' }}></div>
                <div className={styles.timelineTimeBlock} style={{ backgroundColor: '#fef9c3', color: '#ca8a04' }}>01:50 PM</div>
                <div className={styles.timelineIconBox} style={{ backgroundColor: 'rgba(234, 179, 8, 0.08)', color: '#eab308' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div className={styles.timelineContent}>
                  <h4>Office Hours</h4>
                  <p>— • Room 101</p>
                </div>
                <Badge variant="warning" style={{ backgroundColor: '#fef9c3', color: '#ca8a04', border: '1px solid #fef08a' }}>Upcoming</Badge>
              </div>
            </div>
          </Card>

          {/* Pending Attendance */}
          <Card className={styles.card}>
            <div className={styles.cardHeaderFlex}>
              <h3><CheckSquare size={18} color="#10b981" /> Pending Attendance</h3>
            </div>
            
            <div className={styles.attendanceCenterBox}>
              <img src="/attendance_checkmark_3d.png" alt="All Marked" className={styles.attendanceIllustration} />
              <p>All classes marked for today!</p>
            </div>
          </Card>

          {/* Upcoming Exams */}
          <Card className={styles.card}>
            <div className={styles.cardHeaderFlex}>
              <h3><Award size={18} color="#8b5cf6" /> Upcoming Exams</h3>
            </div>
            
            <div className={styles.examListFlex}>
              <div className={styles.examRowItem}>
                <div className={styles.examIconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <path d="M10 9H8"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                  </svg>
                </div>
                <div className={styles.examInfo}>
                  <h4>Mathematics Terminal Test</h4>
                  <p>Oct 15 • 2 Hours</p>
                </div>
                <button className={styles.examArrowBtn} onClick={() => navigate('/teacher/marks')}>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className={styles.examRowItem}>
                <div className={styles.examIconBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <path d="M10 9H8"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                  </svg>
                </div>
                <div className={styles.examInfo}>
                  <h4>Chemistry Lab Evaluation</h4>
                  <p>Oct 18 • 1.5 Hours</p>
                </div>
                <button className={styles.examArrowBtn} onClick={() => navigate('/teacher/marks')}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className={styles.card}>
            <div className={styles.cardHeaderFlex}>
              <h3><Calendar size={18} color="#f59e0b" /> Upcoming Events</h3>
              <Button size="sm" variant="outline" onClick={() => navigate('/teacher/events')}>View All <ChevronRight size={14} /></Button>
            </div>
            
            <div className={styles.eventListFlex}>
              <div className={styles.eventRowItem}>
                <div className={styles.eventDateBox} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <span className={styles.eventDateMonth}>Oct</span>
                  <span className={styles.eventDateDay}>15</span>
                </div>
                <div className={styles.eventInfo}>
                  <h4>Parent-Teacher Meeting</h4>
                  <p>2:00 PM – 5:00 PM • Auditorium</p>
                </div>
                <Badge variant="warning">Meeting</Badge>
              </div>

              <div className={styles.eventRowItem}>
                <div className={styles.eventDateBox} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <span className={styles.eventDateMonth}>Oct</span>
                  <span className={styles.eventDateDay}>22</span>
                </div>
                <div className={styles.eventInfo}>
                  <h4>Science Exhibition</h4>
                  <p>9:00 AM – 1:00 PM • Main Hall</p>
                </div>
                <Badge variant="success">Academic</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Homework Waiting for Review */}
          <Card className={styles.card}>
            <div className={styles.cardHeaderFlex}>
              <h3><ClipboardList size={18} color="#8b5cf6" /> Homework Waiting for Review ({pendingGrading.length || 1})</h3>
            </div>
            
            <div className={styles.homeworkBox}>
              <div className={styles.homeworkDetails}>
                <h4>Lab Report: Kinematics Experiment</h4>
                <p>Physics • Submitted: Today</p>
              </div>
              <button className={styles.gradeBtn} onClick={() => {
                const grade = prompt('Enter Grade (A+, A, B, etc):', 'A');
                const feedback = prompt('Enter Feedback:', 'Excellent analytical thinking.');
                if (grade) alert('Grade submitted successfully!');
              }}>
                Grade <ChevronRight size={14} />
              </button>
            </div>
          </Card>

          {/* Student Alerts */}
          <Card className={styles.card}>
            <div className={styles.cardHeaderFlex}>
              <h3><AlertCircle size={18} color="#ef4444" /> Student Alerts</h3>
            </div>
            
            <div className={styles.studentAlertList}>
              {/* Alert 1 */}
              <div className={styles.alertCardItem} style={{ backgroundColor: 'rgba(239, 68, 68, 0.04)', borderColor: 'rgba(239, 68, 68, 0.12)' }}>
                <div className={styles.alertCardIconBox} style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}>
                  <Users size={16} />
                </div>
                <div className={styles.alertCardContent}>
                  <h4>Emily Rose — Grade 10-B</h4>
                  <p>Score dropped below 70% in last 3 tests</p>
                </div>
                <div className={styles.alertCardBadge} style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}>
                  <TrendingDown size={14} />
                </div>
              </div>

              {/* Alert 2 */}
              <div className={styles.alertCardItem} style={{ backgroundColor: 'rgba(239, 68, 68, 0.04)', borderColor: 'rgba(239, 68, 68, 0.12)' }}>
                <div className={styles.alertCardIconBox} style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}>
                  <Users size={16} />
                </div>
                <div className={styles.alertCardContent}>
                  <h4>Lucas Martin — Grade 9-C</h4>
                  <p>Attendance below 50% this month</p>
                </div>
                <div className={styles.alertCardBadge} style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}>
                  <UserX size={14} />
                </div>
              </div>

              {/* Alert 3 */}
              <div className={styles.alertCardItem} style={{ backgroundColor: 'rgba(245, 158, 11, 0.04)', borderColor: 'rgba(245, 158, 11, 0.12)' }}>
                <div className={styles.alertCardIconBox} style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>
                  <Users size={16} />
                </div>
                <div className={styles.alertCardContent}>
                  <h4>John Lee — Grade 10-A</h4>
                  <p>3 homework assignments not submitted</p>
                </div>
                <div className={styles.alertCardBadge} style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>
                  <BookOpen size={14} />
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Announcements */}
          <Card className={styles.card}>
            <div className={styles.cardHeaderFlex}>
              <h3><Megaphone size={18} color="#3b82f6" /> Recent Announcements</h3>
              <Button size="sm" variant="outline" onClick={() => navigate('/teacher/announcements')}>Manage <ChevronRight size={14} /></Button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={styles.announcementItemFlex}>
                <div className={styles.announcementIconBox} style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}>
                  <AlertCircle size={14} />
                </div>
                <div className={styles.announcementContent}>
                  <h4>Mid-Term Exam Schedule Released</h4>
                  <p>Academic Office • 2 hours ago</p>
                </div>
                <span className={styles.announcementBadgeText} style={{ color: '#ef4444' }}>High</span>
              </div>

              <div className={styles.announcementItemFlex}>
                <div className={styles.announcementIconBox} style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)', color: '#8b5cf6' }}>
                  <Calendar size={14} />
                </div>
                <div className={styles.announcementContent}>
                  <h4>Holiday Notice: Diwali Break</h4>
                  <p>Principal Office • 1 day ago</p>
                </div>
                <span className={styles.announcementBadgeText} style={{ color: '#f59e0b' }}>Medium</span>
              </div>

              <div className={styles.announcementItemFlex}>
                <div className={styles.announcementIconBox} style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>
                  <BookOpen size={14} />
                </div>
                <div className={styles.announcementContent}>
                  <h4>Science Fair Registration Open</h4>
                  <p>Science Department • 2 days ago</p>
                </div>
                <span className={styles.announcementBadgeText} style={{ color: '#10b981' }}>Low</span>
              </div>
              
              <div className={styles.viewAllFooterLinkAnn} onClick={() => navigate('/teacher/announcements')}>
                View All Announcements <ChevronRight size={14} />
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className={styles.card}>
            <div className={styles.cardHeaderFlex}>
              <h3 style={{ color: '#10b981' }}><Activity size={18} /> Recent Activity</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={styles.activityItemFlex}>
                <div className={styles.activityIconBox} style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>
                  <PenTool size={16} />
                </div>
                <div className={styles.activityContent}>
                  <h4>Graded homework</h4>
                  <p>Calculus Integration — Grade 10-A • 10 mins ago</p>
                </div>
                <div className={styles.activityStatusIcon} style={{ color: '#3b82f6' }}>
                  <FileText size={16} />
                </div>
              </div>

              <div className={styles.activityItemFlex}>
                <div className={styles.activityIconBox} style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>
                  <CheckSquare size={16} />
                </div>
                <div className={styles.activityContent}>
                  <h4>Published attendance</h4>
                  <p>Grade 10-B — Oct 8 • 25 mins ago</p>
                </div>
                <div className={styles.activityStatusIcon} style={{ color: '#10b981' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>

              <div className={styles.activityItemFlex}>
                <div className={styles.activityIconBox} style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>
                  <Megaphone size={16} />
                </div>
                <div className={styles.activityContent}>
                  <h4>Created announcement</h4>
                  <p>Physics Lab Safety Guidelines Updated • 1 hour ago</p>
                </div>
                <div className={styles.activityStatusIcon} style={{ color: '#ef4444' }}>
                  <Megaphone size={16} />
                </div>
              </div>

              <div className={styles.activityItemFlex}>
                <div className={styles.activityIconBox} style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6' }}>
                  <Award size={16} />
                </div>
                <div className={styles.activityContent}>
                  <h4>Uploaded marks</h4>
                  <p>Unit Test 3 — Grade 11-A • 2 hours ago</p>
                </div>
                <div className={styles.activityStatusIcon} style={{ color: '#3b82f6' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
              </div>

              <div className={styles.activityItemFlex}>
                <div className={styles.activityIconBox} style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>
                  <MessageSquare size={16} />
                </div>
                <div className={styles.activityContent}>
                  <h4>Sent message</h4>
                  <p>To Robert Doe (Parent) • 3 hours ago</p>
                </div>
                <div className={styles.activityStatusIcon} style={{ color: '#8b5cf6' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
              
              <div className={styles.viewAllFooterLinkAct} onClick={() => navigate('/messages')}>
                View All Activity <ChevronRight size={14} />
              </div>
            </div>
          </Card>
        </div>

        {/* Footer Banner */}
        <div className={styles.footerBannerCard}>
          <img src="/footer_graduation_3d.png" alt="Graduation Cap" className={styles.footerBannerGraphic} />
          <div className={styles.footerBannerText}>
            <h3>Stay organized. Inspire excellence.</h3>
            <p>Every day is a step towards success.</p>
          </div>
        </div>
      </div>

      {/* --- Modals/Overlays --- */}

      {/* Homework Modal */}
      {activeModal === 'homework' && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Assign Homework</h3>
            <form onSubmit={handleCreateHomework} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Homework Title</label>
                <input 
                  type="text" 
                  value={hwTitle} 
                  onChange={e => setHwTitle(e.target.value)} 
                  placeholder="e.g. Calculus Integration exercises"
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <select value={hwSubject} onChange={e => setHwSubject(e.target.value)}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Due Date</label>
                <input 
                  type="text" 
                  value={hwDueDate} 
                  onChange={e => setHwDueDate(e.target.value)} 
                  placeholder="e.g. Tomorrow, 11:59 PM" 
                  required 
                />
              </div>
              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="hwDraft"
                  checked={hwDraft} 
                  onChange={e => setHwDraft(e.target.checked)} 
                />
                <label htmlFor="hwDraft">Save as Draft (Do not publish to students)</label>
              </div>

              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setActiveModal(null)} type="button">Cancel</Button>
                <Button variant="primary" type="submit" disabled={isPublishing}>
                  {isPublishing ? 'Publishing...' : hwDraft ? 'Save Draft' : 'Publish Homework'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {activeModal === 'announcement' && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Publish School Notice</h3>
            <form onSubmit={handleCreateAnnouncement} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Notice Title</label>
                <input 
                  type="text" 
                  value={annTitle} 
                  onChange={e => setAnnTitle(e.target.value)}
                  placeholder="e.g. Physics Lab Extension"
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Priority</label>
                <select value={annPriority} onChange={e => setAnnPriority(e.target.value as any)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Notice Content</label>
                <textarea 
                  value={annContent} 
                  onChange={e => setAnnContent(e.target.value)} 
                  placeholder="Write the full notice content here..."
                  required 
                  rows={4}
                />
              </div>

              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setActiveModal(null)} type="button">Cancel</Button>
                <Button variant="primary" type="submit" disabled={isPublishingAnn}>
                  {isPublishingAnn ? 'Publishing...' : 'Publish Announcement'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {activeModal === 'attendance' && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Mark Attendance (Today)</h3>
            <div className={styles.attendanceGrid}>
              {studentsList.map(student => (
                <div key={student} className={styles.attendRow}>
                  <span>{student}</span>
                  <div className={styles.attendPills}>
                    <button 
                      className={attendStatus[student] === 'present' ? styles.pillPresent : styles.pillBtn}
                      onClick={() => setAttendStatus(prev => ({ ...prev, [student]: 'present' }))}
                    >Present</button>
                    <button 
                      className={attendStatus[student] === 'absent' ? styles.pillAbsent : styles.pillBtn}
                      onClick={() => setAttendStatus(prev => ({ ...prev, [student]: 'absent' }))}
                    >Absent</button>
                    <button 
                      className={attendStatus[student] === 'late' ? styles.pillLate : styles.pillBtn}
                      onClick={() => setAttendStatus(prev => ({ ...prev, [student]: 'late' }))}
                    >Late</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.formActions}>
              <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleMarkAttendanceSubmit} disabled={isMarking}>
                {isMarking ? 'Submitting...' : 'Submit Attendance'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Marks Modal */}
      {activeModal === 'marks' && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Publish Exam Marks</h3>
            <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>Publish the results of Unit Test 3 directly to student report cards.</p>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label>Select Exam</label>
                <select>
                  <option>Unit Test 3 — October 2025</option>
                  <option>Mid-Term Exams — September 2025</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Average Obtained Percentage</label>
                <input type="text" placeholder="e.g. 84%" />
              </div>
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                <Button variant="primary" onClick={() => {
                  alert('Marks published successfully!');
                  setActiveModal(null);
                }}>Publish Marks</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
