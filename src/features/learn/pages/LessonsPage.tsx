import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  BookOpen, Video, FileText, Download, Bookmark, 
  CheckCircle2, Clock, Play, FileCheck, Star, Sparkles, ChevronRight
} from 'lucide-react';
import styles from './learn.module.css';

interface Lesson {
  id: number;
  courseTitle: string;
  unit: string;
  title: string;
  duration: string;
  teacher: string;
  videoUrl: string;
  pdfNotes: string;
  slidesCount: number;
  completed: boolean;
  bookmarked: boolean;
  summary: string;
}

const mockLessons: Lesson[] = [
  {
    id: 1,
    courseTitle: 'Grade 10 Physics',
    unit: 'Unit 2: Electromagnetic Induction',
    title: 'Faraday Law of Induction & Magnetic Flux',
    duration: '24 Mins',
    teacher: 'Dr. Robert Vance',
    videoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    pdfNotes: 'Faraday_Law_Complete_Notes.pdf',
    slidesCount: 18,
    completed: true,
    bookmarked: true,
    summary: 'Detailed explanation of flux density change (ΔΦ/Δt), induced EMF formula, and real-world transformer application.'
  },
  {
    id: 2,
    courseTitle: 'Grade 10 Physics',
    unit: 'Unit 2: Electromagnetic Induction',
    title: 'Lenz Law & Conservation of Energy',
    duration: '32 Mins',
    teacher: 'Dr. Robert Vance',
    videoUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    pdfNotes: 'Lenz_Law_Derivations.pdf',
    slidesCount: 24,
    completed: false,
    bookmarked: false,
    summary: 'Explains why induced current opposes the flux change causing it, illustrating Lenz’s law with bar magnet experiments.'
  },
  {
    id: 3,
    courseTitle: 'Grade 9 Mathematics',
    unit: 'Unit 4: Quadratic Equations',
    title: 'Completing the Square Method - Step by Step',
    duration: '28 Mins',
    teacher: 'Mrs. Clara Bennett',
    videoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    pdfNotes: 'Completing_Square_Handout.pdf',
    slidesCount: 15,
    completed: true,
    bookmarked: false,
    summary: 'Learn how to transform ax² + bx + c = 0 into vertex form and solve for roots geometric square visualization.'
  }
];

export const LessonsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [activeLesson, setActiveLesson] = useState<Lesson>(mockLessons[0]);
  const [toast, setToast] = useState<string | null>(null);

  const tabs = [
    { id: 'all', label: 'All Daily Lessons', count: lessons.length },
    { id: 'bookmarked', label: 'Bookmarks', count: lessons.filter(l => l.bookmarked).length },
    { id: 'completed', label: 'Completed', count: lessons.filter(l => l.completed).length }
  ];

  const handleToggleComplete = (id: number) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, completed: !l.completed } : l));
    if (activeLesson.id === id) {
      setActiveLesson(prev => ({ ...prev, completed: !prev.completed }));
    }
    setToast(activeLesson.completed ? 'Lesson marked incomplete' : 'Lesson completed! Learning progress updated.');
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleBookmark = (id: number) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, bookmarked: !l.bookmarked } : l));
    if (activeLesson.id === id) {
      setActiveLesson(prev => ({ ...prev, bookmarked: !prev.bookmarked }));
    }
  };

  const filtered = lessons.filter(l => {
    if (activeTab === 'bookmarked') return l.bookmarked;
    if (activeTab === 'completed') return l.completed;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Daily Lessons & Video Library"
        subtitle="Watch video lectures, view lecture slides, download teacher PDF notes, and track lesson progress"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Lessons' }]}
      />

      {toast && (
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
          <span>{toast}</span>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', marginTop: '24px' }}>
        {/* Main Video & Lesson Content Player Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Card style={{ padding: '0', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '380px', background: '#0f172a' }}>
              <img 
                src={activeLesson.videoUrl} 
                alt={activeLesson.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px'
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                  {activeLesson.unit}
                </span>
                <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 8px 0', lineHeight: 1.2 }}>
                  {activeLesson.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                  <span>Instructor: {activeLesson.teacher}</span>
                  <span>Duration: {activeLesson.duration}</span>
                </div>
              </div>

              {/* Play Button Overlay */}
              <button style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-color)',
                color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', transition: 'transform 0.2s'
              }}>
                <Play size={28} style={{ marginLeft: '4px' }} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-color)' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {activeLesson.summary}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Button 
                  variant={activeLesson.bookmarked ? 'primary' : 'outline'} 
                  size="sm"
                  onClick={() => handleToggleBookmark(activeLesson.id)}
                >
                  <Bookmark size={16} style={{ marginRight: '6px' }} />
                  {activeLesson.bookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>

                <Button 
                  variant={activeLesson.completed ? 'secondary' : 'primary'} 
                  size="sm"
                  onClick={() => handleToggleComplete(activeLesson.id)}
                >
                  <CheckCircle2 size={16} style={{ marginRight: '6px' }} />
                  {activeLesson.completed ? 'Completed ✓' : 'Mark Complete'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Teacher Materials & Handouts */}
          <Card style={{ padding: '20px', borderRadius: '18px' }}>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Lesson Attachments & Slides
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
                <FileText size={24} style={{ color: '#2563eb' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{activeLesson.pdfNotes}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PDF Document • 3.4 MB</span>
                </div>
                <Button size="sm" variant="outline">
                  <Download size={14} />
                </Button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
                <Video size={24} style={{ color: '#8b5cf6' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Presentation Deck</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{activeLesson.slidesCount} Slides</span>
                </div>
                <Button size="sm" variant="outline">
                  <FileCheck size={14} />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Playlist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
            Course Lessons
          </p>
          {filtered.map(lesson => (
            <Card
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              style={{
                padding: '14px', borderRadius: '14px', cursor: 'pointer',
                border: activeLesson.id === lesson.id ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                background: activeLesson.id === lesson.id ? 'rgba(13,124,102,0.04)' : 'var(--surface-color)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                  {lesson.courseTitle}
                </span>
                {lesson.completed && <Badge variant="success">Done</Badge>}
              </div>

              <p style={{ fontSize: '13.5px', fontWeight: 600, margin: '0 0 6px 0', color: '#1E293B', lineHeight: 1.3 }}>
                {lesson.title}
              </p>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
                <span><Clock size={12} /> {lesson.duration}</span>
                <span>{lesson.slidesCount} Slides</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
