import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { useHomework } from '@/features/homework/hooks/useHomework';
import { useAttendance } from '@/features/attendance/hooks/useAttendance';
import { useRole } from '@/contexts/RoleContext';
import { 
  Calendar, CheckSquare, Clock, CreditCard, Award, 
  MapPin, AlertTriangle, ChevronRight, UserCheck 
} from 'lucide-react';
import styles from './parent.module.css';

export const ParentDashboard: React.FC = () => {
  const { currentUser } = useRole();
  const { homework } = useHomework();
  const { attendance } = useAttendance();

  // Child statistics (mocked)
  const child = {
    name: 'Sarah Doe',
    grade: 'Class 10-A',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    attendanceRate: 92,
    busNumber: 'Route 12B',
    busStatus: 'En Route (5 mins away)',
    pendingFees: '$350.00',
    feeDueDate: 'Oct 20, 2025'
  };

  const pendingHomework = homework.filter(h => h.status === 'pending');
  const recentAttendance = attendance.slice(0, 3);

  return (
    <div className={styles.dashboard}>
      {/* Parent Welcome Profile */}
      <div className={styles.welcomeBanner}>
        <div className={styles.parentProfile}>
          <h2>Welcome, {currentUser?.name}</h2>
          <p className="text-muted">{currentUser?.details}</p>
        </div>
        <div className={styles.childCard}>
          <div className={styles.childInfo}>
            <Avatar src={child.avatar} alt={child.name} size="md" />
            <div>
              <h4>Monitoring: {child.name}</h4>
              <p>{child.grade}</p>
            </div>
          </div>
          <Badge variant="success">Active Student</Badge>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Child Academic Metrics */}
        <div className={styles.leftCol}>
          {/* Quick Metrics */}
          <div className={styles.metricsGrid}>
            <Card className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <span className="text-muted">Attendance Rate</span>
                <UserCheck size={20} color="var(--success)" />
              </div>
              <h2>{child.attendanceRate}%</h2>
              <p className={styles.metricSub}>Target threshold: 90%</p>
            </Card>

            <Card className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <span className="text-muted">Pending Fees</span>
                <CreditCard size={20} color="var(--danger)" />
              </div>
              <h2>{child.pendingFees}</h2>
              <p className={styles.metricSub}>Due {child.feeDueDate}</p>
            </Card>
          </div>

          {/* Child's Schedule */}
          <Card className={styles.sectionCard}>
            <div className={styles.cardTitleRow}>
              <h3>Today's Schedule</h3>
              <span className="text-muted">Sarah's Classes</span>
            </div>
            <div className={styles.scheduleTimeline}>
              <div className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>08:00 AM</span>
                <div className={styles.scheduleBody}>
                  <h4>Mathematics</h4>
                  <p>Mr. Smith • Completed</p>
                </div>
              </div>
              <div className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>08:50 AM</span>
                <div className={styles.scheduleBody}>
                  <h4>Physics</h4>
                  <p>Mrs. Davis • Ongoing</p>
                </div>
              </div>
              <div className={styles.scheduleItem}>
                <span className={styles.scheduleTime}>10:45 AM</span>
                <div className={styles.scheduleBody}>
                  <h4>Computer Science</h4>
                  <p>Mr. Johnson • Upcoming</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Transport Tracking Widget */}
          <Card className={`${styles.sectionCard} hover-lift`}>
            <div className={styles.cardTitleRow}>
              <h3>School Bus Tracking</h3>
              <Badge variant="info">Live Tracking</Badge>
            </div>
            <div className={styles.busWidget}>
              <div className={styles.busInfo}>
                <MapPin size={24} color="var(--primary-color)" />
                <div>
                  <h4>{child.busNumber}</h4>
                  <p className="text-muted">{child.busStatus}</p>
                </div>
              </div>
              <a href="/services" className={styles.viewMap}>View Map <ChevronRight size={16} /></a>
            </div>
          </Card>
        </div>

        {/* Right Column: Homework & Recent Attendance Logs */}
        <div className={styles.rightCol}>
          {/* Homework Tracker */}
          <Card className={styles.sectionCard}>
            <h3>Child's Homework Tracker ({pendingHomework.length})</h3>
            {pendingHomework.length === 0 ? (
              <div className={styles.empty}>
                <p>No pending homework for Sarah.</p>
              </div>
            ) : (
              <div className={styles.list}>
                {pendingHomework.map(hw => (
                  <div key={hw.id} className={styles.listItem}>
                    <div>
                      <h4>{hw.title}</h4>
                      <p>{hw.subject} • Due: {hw.dueDate}</p>
                    </div>
                    <Badge variant="warning">Pending</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Attendance Logs */}
          <Card className={styles.sectionCard}>
            <h3>Recent Attendance Logs</h3>
            <div className={styles.list}>
              {recentAttendance.map((log, idx) => (
                <div key={idx} className={styles.listItem}>
                  <div>
                    <h4>{log.day}, {log.date}</h4>
                    {log.reason && <p className="text-muted">Note: {log.reason}</p>}
                  </div>
                  <Badge variant={log.status === 'present' ? 'success' : log.status === 'late' ? 'warning' : 'danger'}>
                    {log.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
