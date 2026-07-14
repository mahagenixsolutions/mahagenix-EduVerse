import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { courses } from '@/mock/learning';
import { BookOpen, Clock, Star } from 'lucide-react';
import styles from './learn.module.css';

const tabs = [
  { id: 'all', label: 'All Courses' },
  { id: 'core', label: 'Core' },
  { id: 'elective', label: 'Elective' },
];

export const LearnHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? courses : courses.filter(c => c.category.toLowerCase() === activeTab);

  return (
    <div>
      <PageHeader
        title="Learning Hub"
        subtitle="Track your courses, homework, and academic progress"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Learn' }]}
      />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={styles.courseGrid}>
        {filtered.map(course => (
          <Card key={course.id} hoverable className={styles.courseCard}>
            <div className={styles.courseThumb}>
              <img src={course.thumbnail} alt={course.title} />
              <span className={styles.courseGrade}>{course.grade}</span>
            </div>
            <div className={styles.courseBody}>
              <p className={styles.courseTitle}>{course.title}</p>
              <p className={styles.courseTeacher}><BookOpen size={14} /> {course.teacher}</p>
              <p className={styles.courseMeta}><Clock size={14} /> {course.completedLessons}/{course.totalLessons} lessons</p>
              <ProgressBar value={course.progress} showLabel />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
