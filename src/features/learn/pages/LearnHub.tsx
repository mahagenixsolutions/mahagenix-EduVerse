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
  const [courseList, setCourseList] = useState(courses);
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  // Lesson list mappings per course ID
  const courseLessons: Record<number, { id: number; title: string; completed: boolean }[]> = {
    1: [
      { id: 101, title: 'Introduction to Derivatives', completed: true },
      { id: 102, title: 'Limits and Continuity', completed: true },
      { id: 103, title: 'Integration by Parts', completed: true },
      { id: 104, title: 'Applications of Integrals', completed: false },
      { id: 105, title: 'Differential Equations Basics', completed: false },
    ],
    2: [
      { id: 201, title: 'Kinematics in 1D & 2D', completed: true },
      { id: 202, title: 'Newton\'s Laws of Motion', completed: true },
      { id: 203, title: 'Work, Energy & Power', completed: true },
      { id: 204, title: 'Rotational Dynamics', completed: false },
    ],
    3: [
      { id: 301, title: 'Atomic Structure', completed: true },
      { id: 302, title: 'Chemical Bonding', completed: true },
      { id: 303, title: 'Thermodynamics & Kinetics', completed: false },
    ],
    4: [
      { id: 401, title: 'Data Structures: Arrays & Lists', completed: true },
      { id: 402, title: 'Introduction to Algorithms', completed: true },
      { id: 403, title: 'Object-Oriented Programming', completed: true },
      { id: 404, title: 'Database Management Systems', completed: false },
    ],
    5: [
      { id: 501, title: 'Reading Comprehension', completed: true },
      { id: 502, title: 'Grammar & Syntax Rules', completed: true },
      { id: 503, title: 'Creative Essay Writing', completed: true },
      { id: 504, title: 'Public Debate Practice', completed: false },
    ]
  };

  const [lessons, setLessons] = useState<Record<number, typeof courseLessons[0]>>(courseLessons);

  const handleLessonToggle = (courseId: number, lessonId: number) => {
    const updatedLessons = (lessons[courseId] || []).map(l => 
      l.id === lessonId ? { ...l, completed: !l.completed } : l
    );
    
    // Update local lesson state
    setLessons(prev => ({
      ...prev,
      [courseId]: updatedLessons
    }));

    // Recompute progress percentage
    const completedCount = updatedLessons.filter(l => l.completed).length;
    const totalCount = updatedLessons.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    // Update course completion progress in list
    setCourseList(prev => prev.map(c => 
      c.id === courseId 
        ? { ...c, completedLessons: completedCount, totalLessons: totalCount, progress: progressPercent } 
        : c
    ));

    // Keep active selected course details updated
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse(prev => prev ? { ...prev, completedLessons: completedCount, progress: progressPercent } : null);
    }
  };

  const filtered = activeTab === 'all' ? courseList : courseList.filter(c => c.category.toLowerCase() === activeTab);

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
          <Card key={course.id} hoverable className={styles.courseCard} onClick={() => setSelectedCourse(course)}>
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

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Card style={{ width: '100%', maxWidth: '540px', padding: '28px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => setSelectedCourse(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}
            >
              <Star size={18} fill="none" style={{ display: 'none' }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>&times;</span>
            </button>

            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase' }}>{selectedCourse.category}</span>
              <h3 style={{ margin: '4px 0 2px 0', fontSize: '1.25rem', fontWeight: 700 }}>{selectedCourse.title}</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Instructor: {selectedCourse.teacher}</p>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Overall Progression</span>
                <strong>{selectedCourse.progress}% Completed</strong>
              </div>
              <ProgressBar value={selectedCourse.progress} />
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>Curriculum Syllabus Chapters</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                {(lessons[selectedCourse.id] || []).map(lesson => (
                  <label 
                    key={lesson.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                      borderRadius: '8px', border: '1px solid var(--border-color)',
                      fontSize: '0.82rem', cursor: 'pointer', background: lesson.completed ? 'var(--primary-light)' : 'transparent',
                      transition: 'background 0.15s'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={lesson.completed} 
                      onChange={() => handleLessonToggle(selectedCourse.id, lesson.id)} 
                    />
                    <span style={{ color: lesson.completed ? 'var(--primary-hover)' : 'var(--text-main)', textDecoration: lesson.completed ? 'line-through' : 'none' }}>
                      {lesson.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-light)' }}>
              <span>Office hours: Tue 3:00 PM</span>
              <span>Room: Hall A</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
