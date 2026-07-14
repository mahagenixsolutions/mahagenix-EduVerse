import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageHeader } from '@/components/navigation/PageHeader';
import { teacherCourses } from '@/mock/teacher';
import { BookOpen, Users, ChevronRight } from 'lucide-react';

export const TeacherCoursesPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="Manage your course curriculum and progress"
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Courses' }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
        {teacherCourses.map(course => (
          <Card key={course.id} hoverable style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', flexShrink: 0 }}>
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{course.name}</h3>
                  <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginTop: '2px' }}>{course.class}</p>
                </div>
              </div>
              <Badge variant="info">{course.students} students</Badge>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.813rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Curriculum Progress</span>
                <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{course.progress}%</span>
              </div>
              <div style={{ width: '100%', height: 8, background: 'var(--bg-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{
                  width: `${course.progress}%`, height: '100%', borderRadius: 'var(--radius-full)',
                  background: 'var(--primary-color)', transition: 'width 0.5s ease',
                }} />
              </div>
            </div>

            {/* Lesson Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--success)' }}>{course.completedLessons}</div>
                <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)' }}>Completed</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--warning)' }}>{course.totalLessons - course.completedLessons}</div>
                <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)' }}>Remaining</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary-color)' }}>{course.totalLessons}</div>
                <div style={{ fontSize: '0.688rem', color: 'var(--text-muted)' }}>Total</div>
              </div>
            </div>

            <Button variant="outline" style={{ width: '100%' }}>
              View Course <ChevronRight size={16} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
