import React from 'react';
import { Users, CheckSquare, BookOpen, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import styles from '../../pages/teacher.module.css';

interface TeacherStatsGridProps {
  totalStudents?: number;
  homeworkPendingCount?: number;
  attendanceRate?: string;
  announcementsCount?: number;
}

export const TeacherStatsGrid: React.FC<TeacherStatsGridProps> = ({
  totalStudents = 142,
  homeworkPendingCount = 18,
  attendanceRate = "96.4%",
  announcementsCount = 5,
}) => {
  return (
    <div className={styles.statsGrid}>
      <Card className={styles.statCard}>
        <div className={styles.statIconBox} style={{ background: 'rgba(95, 175, 136, 0.15)', color: 'var(--primary-color)' }}>
          <Users size={22} />
        </div>
        <div>
          <span className={styles.statLabel}>Active Students</span>
          <h3 className={styles.statValue}>{totalStudents}</h3>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statIconBox} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
          <BookOpen size={22} />
        </div>
        <div>
          <span className={styles.statLabel}>Submissions to Grade</span>
          <h3 className={styles.statValue}>{homeworkPendingCount}</h3>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statIconBox} style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' }}>
          <CheckSquare size={22} />
        </div>
        <div>
          <span className={styles.statLabel}>Avg Attendance</span>
          <h3 className={styles.statValue}>{attendanceRate}</h3>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statIconBox} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
          <MessageSquare size={22} />
        </div>
        <div>
          <span className={styles.statLabel}>Active Notices</span>
          <h3 className={styles.statValue}>{announcementsCount}</h3>
        </div>
      </Card>
    </div>
  );
};
