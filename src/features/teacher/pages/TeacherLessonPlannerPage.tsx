import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { EventBus } from '@/mock-server/EventBus';
import { 
  Calendar, BookOpen, CheckCircle2, Clock, Plus, 
  FileText, Sparkles, AlertCircle, Share2, Layers, Check, Edit3
} from 'lucide-react';
import styles from './teacher.module.css';

interface LessonPlan {
  id: number;
  subject: string;
  className: string;
  topic: string;
  week: string;
  date: string;
  duration: string;
  objectives: string[];
  materials: string[];
  status: 'draft' | 'published' | 'under_review';
  warmUp: string;
  coreInstruction: string;
  guidedPractice: string;
  wrapUp: string;
}

const mockLessons: LessonPlan[] = [
  {
    id: 1,
    subject: 'Physics',
    className: 'Grade 10 - A',
    topic: 'Electromagnetic Induction & Faraday Law',
    week: 'Week 12 (Apr 7 - Apr 11)',
    date: '2026-04-08',
    duration: '45 Mins',
    objectives: [
      'Understand magnetic flux and induced electromotive force.',
      'Apply Faraday’s Law to calculate induced voltage in a circuit.',
      'Demonstrate Lenz’s law using bar magnets and induction coils.'
    ],
    materials: ['Bar Magnet Set', 'Galvanometer', 'Copper Coil Demo Unit', 'PhET Simulation Tablet'],
    status: 'published',
    warmUp: '10 Mins: Quick demonstration of magnet moving through copper loop and galvanometer needle deflection.',
    coreInstruction: '20 Mins: Interactive whiteboard presentation explaining flux change math formula EMF = -N(dΦ/dt).',
    guidedPractice: '10 Mins: Pair-share worksheet solving 3 sample calculation problems.',
    wrapUp: '5 Mins: Exit ticket query: "Why does reversing magnet polarity flip the induced current direction?"'
  },
  {
    id: 2,
    subject: 'Mathematics',
    className: 'Grade 9 - B',
    topic: 'Quadratic Equations - Completing the Square',
    week: 'Week 12 (Apr 7 - Apr 11)',
    date: '2026-04-09',
    duration: '50 Mins',
    objectives: [
      'Transform standard quadratic equation ax² + bx + c = 0 into vertex form.',
      'Solve quadratic equations by completing the square method.'
    ],
    materials: ['Algebra Tiles Set', 'Graphing Calculator App', 'Guided Worksheet #14'],
    status: 'published',
    warmUp: '8 Mins: Mental math review of perfect square trinomials.',
    coreInstruction: '22 Mins: Step-by-step whiteboard walkthrough of completing the square algorithm.',
    guidedPractice: '15 Mins: Small group exercise using algebra tiles to visualize geometric square completion.',
    wrapUp: '5 Mins: Summary review of key common mistakes to avoid.'
  },
  {
    id: 3,
    subject: 'Physics',
    className: 'Grade 11 - A',
    topic: 'Quantum Wave-Particle Duality & Photoelectric Effect',
    week: 'Week 13 (Apr 14 - Apr 18)',
    date: '2026-04-14',
    duration: '60 Mins',
    objectives: [
      'Explain Einstein’s photoelectric equation E = hf - Φ.',
      'Identify work function and threshold frequency from stopping potential graphs.'
    ],
    materials: ['Photoelectric Cell Demo Apparatus', 'UV Light Source', 'Lab Worksheet'],
    status: 'draft',
    warmUp: '10 Mins: Historical conflict between wave theory vs photon particle model.',
    coreInstruction: '25 Mins: Derivation of photon energy formula and work function concept.',
    guidedPractice: '18 Mins: Interactive lab simulation analyzing frequency vs kinetic energy curves.',
    wrapUp: '7 Mins: Student Q&A discussion.'
  }
];

export const TeacherLessonPlannerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [lessons, setLessons] = useState<LessonPlan[]>(mockLessons);
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan>(mockLessons[0]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tabs = [
    { id: 'weekly', label: 'Weekly Plans', count: lessons.length },
    { id: 'daily', label: 'Daily Lesson Plan' },
    { id: 'objectives', label: 'Learning Objectives' },
    { id: 'notes', label: 'Teaching Notes' },
    { id: 'history', label: 'Lesson History' }
  ];

  const handlePublishLesson = (lessonId: number) => {
    setIsPublishing(true);
    setTimeout(() => {
      setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, status: 'published' as const } : l));
      setSelectedLesson(prev => ({ ...prev, status: 'published' }));
      setIsPublishing(false);
      setToastMessage('Lesson Plan Published! Curriculum & Student Dashboards updated.');

      // Trigger Workflow Event
      EventBus.publish('LESSON_PUBLISHED', {
        lessonId,
        subject: selectedLesson.subject,
        topic: selectedLesson.topic,
        timestamp: new Date().toISOString()
      });

      setTimeout(() => setToastMessage(null), 4000);
    }, 800);
  };

  return (
    <div className={styles.container}>
      <PageHeader
        title="Lesson Planner"
        subtitle="Design weekly plans, map learning objectives, and publish interactive teaching notes"
        actions={
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline" size="sm" onClick={() => handlePublishLesson(selectedLesson.id)} disabled={isPublishing}>
              <Share2 size={16} style={{ marginRight: '6px' }} />
              {isPublishing ? 'Publishing...' : 'Publish to Curriculum'}
            </Button>
            <Button size="sm">
              <Plus size={16} style={{ marginRight: '6px' }} />
              New Lesson Plan
            </Button>
          </div>
        }
      />

      {toastMessage && (
        <div style={{
          padding: '12px 20px',
          background: 'var(--success-bg, #ECFDF5)',
          color: 'var(--success, #059669)',
          borderRadius: '12px',
          border: '1px solid #A7F3D0',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600
        }}>
          <CheckCircle2 size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '24px', marginTop: '24px' }}>
        {/* Left Lesson Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            Scheduled Lessons
          </h3>
          {lessons.map(lesson => (
            <Card
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              style={{
                padding: '16px',
                cursor: 'pointer',
                border: selectedLesson.id === lesson.id ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                background: selectedLesson.id === lesson.id ? 'rgba(13, 124, 102, 0.04)' : 'var(--surface-color)',
                borderRadius: '16px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                  {lesson.subject} • {lesson.className}
                </span>
                <Badge variant={lesson.status === 'published' ? 'success' : 'warning'}>
                  {lesson.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                {lesson.topic}
              </h4>

              <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> {lesson.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {lesson.duration}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Right Active Lesson Detail Plan */}
        <div>
          <Card style={{ padding: '24px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                  {selectedLesson.week} • {selectedLesson.className}
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                  {selectedLesson.topic}
                </h2>
              </div>
              <Button size="sm" variant="outline">
                <Edit3 size={15} style={{ marginRight: '6px' }} />
                Edit Plan
              </Button>
            </div>

            {/* Learning Objectives */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: 'var(--primary-color)' }} />
                Learning Objectives (Bloom's Taxonomy)
              </h4>
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedLesson.objectives.map((obj, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Teaching Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', margin: '0 0 6px 0' }}>
                  🔥 Warm-Up & Hook
                </h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                  {selectedLesson.warmUp}
                </p>
              </div>

              <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', margin: '0 0 6px 0' }}>
                  📘 Core Instruction
                </h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                  {selectedLesson.coreInstruction}
                </p>
              </div>

              <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', margin: '0 0 6px 0' }}>
                  👥 Guided Practice & Pair Activity
                </h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                  {selectedLesson.guidedPractice}
                </p>
              </div>

              <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6', margin: '0 0 6px 0' }}>
                  🎯 Exit Ticket & Assessment
                </h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                  {selectedLesson.wrapUp}
                </p>
              </div>
            </div>

            {/* Required Materials & Devices */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px' }}>
                Required Materials & Lab Equipment
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedLesson.materials.map((mat, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: 'rgba(13, 124, 102, 0.08)',
                    color: 'var(--primary-color)'
                  }}>
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
