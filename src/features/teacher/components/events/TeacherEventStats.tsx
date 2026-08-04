import React from 'react';
import { Calendar, Users, DollarSign, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import styles from '../../pages/teacher.module.css';

interface TeacherEventStatsProps {
  totalEvents: number;
  totalRegistrations: number;
  totalRevenue: number;
  upcomingCount: number;
}

export const TeacherEventStats: React.FC<TeacherEventStatsProps> = ({
  totalEvents,
  totalRegistrations,
  totalRevenue,
  upcomingCount,
}) => {
  return (
    <div className={styles.statsGrid}>
      <Card className={styles.statCard}>
        <div className={styles.statIconBox} style={{ background: 'rgba(95, 175, 136, 0.15)', color: 'var(--primary-color)' }}>
          <Calendar size={22} />
        </div>
        <div>
          <span className={styles.statLabel}>Total Events</span>
          <h3 className={styles.statValue}>{totalEvents}</h3>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statIconBox} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
          <Users size={22} />
        </div>
        <div>
          <span className={styles.statLabel}>Total Registrations</span>
          <h3 className={styles.statValue}>{totalRegistrations}</h3>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statIconBox} style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' }}>
          <DollarSign size={22} />
        </div>
        <div>
          <span className={styles.statLabel}>Revenue Collected</span>
          <h3 className={styles.statValue}>₹{totalRevenue}</h3>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div className={styles.statIconBox} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
          <Award size={22} />
        </div>
        <div>
          <span className={styles.statLabel}>Upcoming Active</span>
          <h3 className={styles.statValue}>{upcomingCount}</h3>
        </div>
      </Card>
    </div>
  );
};
