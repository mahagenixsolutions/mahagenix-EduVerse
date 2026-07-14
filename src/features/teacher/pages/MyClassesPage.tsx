import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/navigation/PageHeader';
import { teacherClasses } from '@/mock/teacher';
import { Users, CheckSquare, BookOpen, FileText, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './teacher.module.css';

export const MyClassesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="My Classes"
        subtitle="View and manage your assigned classes"
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'My Classes' }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        {teacherClasses.map(cls => {
          const attendanceRate = cls.studentCount > 0 ? Math.round((cls.todayAttendance.present / cls.studentCount) * 100) : 0;
          return (
            <Card key={cls.id} hoverable className={styles.card} style={{ padding: 'var(--space-4)' }}>
              {/* Class Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{cls.name} – {cls.section}</h3>
                  <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginTop: '2px' }}>{cls.subject} • {cls.room}</p>
                </div>
                <Badge variant="info">{cls.nextClass}</Badge>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-3)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>{cls.studentCount}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Students</div>
                </div>
                <div style={{ padding: 'var(--space-3)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: attendanceRate >= 90 ? 'var(--success)' : attendanceRate >= 75 ? 'var(--warning)' : 'var(--danger)' }}>{attendanceRate}%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attendance</div>
                </div>
                <div style={{ padding: 'var(--space-3)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--warning)' }}>{cls.homeworkStatus.pending}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>HW Pending</div>
                </div>
                <div style={{ padding: 'var(--space-3)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>{cls.averagePerformance}%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Score</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <Button size="sm" variant="outline" onClick={() => navigate('/teacher/attendance')}>
                  <CheckSquare size={14} /> Attendance
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate('/teacher/homework')}>
                  <BookOpen size={14} /> Homework
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate('/teacher/marks')}>
                  <Award size={14} /> Marks
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
