import React from 'react';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { teacherSchedule } from '@/mock/teacher';
import styles from '../../pages/teacher.module.css';

export const TeacherScheduleWidget: React.FC = () => {
  return (
    <Card className={styles.dashboardSection}>
      <div className={styles.sectionHeaderRow}>
        <h3>Today's Class Schedule</h3>
        <span className={styles.viewAllLink}>Full Timetable <ChevronRight size={14} /></span>
      </div>

      <div className={styles.scheduleList}>
        {teacherSchedule.map((item, idx) => (
          <div key={idx} className={styles.scheduleItem}>
            <div className={styles.timeCol}>
              <Clock size={14} />
              <span>{item.time}</span>
            </div>
            <div className={styles.scheduleDetails}>
              <h5 className={styles.subjectTitle}>{item.subject}</h5>
              <span className={styles.classInfo}>{item.class} • Room {item.room}</span>
            </div>
            <span className={styles.statusChip}>{item.status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
