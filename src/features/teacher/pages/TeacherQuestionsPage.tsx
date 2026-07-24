import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  HelpCircle, MessageCircle, CheckCircle2, Clock, 
  Send, User, BookOpen, AlertCircle, MessageSquare
} from 'lucide-react';
import styles from './teacher.module.css';

interface QuestionItem {
  id: number;
  studentName: string;
  className: string;
  subject: string;
  topic: string;
  questionText: string;
  timestamp: string;
  status: 'pending' | 'answered';
  answerText?: string;
  repliedAt?: string;
}

const mockQuestions: QuestionItem[] = [
  {
    id: 1,
    studentName: 'Sarah Doe',
    className: 'Grade 10 - A',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    questionText: 'Sir, why does Faraday’s formula include a negative sign in EMF = -N(dΦ/dt)? How does Lenz’s Law explain the energy conservation here?',
    timestamp: 'Today at 02:15 PM',
    status: 'pending'
  },
  {
    id: 2,
    studentName: 'Lucas Martin',
    className: 'Grade 9 - C',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    questionText: 'When completing the square, if the coefficient of x² is a negative number like -2, should I divide the entire equation by -2 first?',
    timestamp: 'Today at 11:05 AM',
    status: 'answered',
    answerText: 'Yes, Lucas! Always factor out or divide by the leading coefficient `a` first so that x² has a coefficient of +1 before taking half of `b`.',
    repliedAt: 'Today at 11:20 AM'
  },
  {
    id: 3,
    studentName: 'Ethan Hunt',
    className: 'Grade 10 - A',
    subject: 'Physics',
    topic: 'Photoelectric Effect',
    questionText: 'Does increasing the light intensity increase the kinetic energy of emitted electrons, or does it only increase the photoelectron count per second?',
    timestamp: 'Yesterday at 04:30 PM',
    status: 'pending'
  }
];

export const TeacherQuestionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [questions, setQuestions] = useState<QuestionItem[]>(mockQuestions);
  const [replyTextMap, setReplyTextMap] = useState<Record<number, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tabs = [
    { id: 'all', label: 'All Student Doubts', count: questions.length },
    { id: 'pending', label: 'Pending Questions', count: questions.filter(q => q.status === 'pending').length },
    { id: 'answered', label: 'Answered Questions', count: questions.filter(q => q.status === 'answered').length },
    { id: 'threads', label: 'Discussion Threads' }
  ];

  const handleReplySubmit = (questionId: number) => {
    const text = replyTextMap[questionId];
    if (!text) return;

    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          status: 'answered',
          answerText: text,
          repliedAt: 'Just now'
        };
      }
      return q;
    }));

    setReplyTextMap(prev => ({ ...prev, [questionId]: '' }));
    setToastMessage('Answer sent to student! Student notified in Learning Hub.');

    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredQuestions = questions.filter(q => {
    if (activeTab === 'pending') return q.status === 'pending';
    if (activeTab === 'answered') return q.status === 'answered';
    return true;
  });

  return (
    <div className={styles.container}>
      <PageHeader
        title="Student Doubts & Questions Hub"
        subtitle="Address student academic questions, clarify doubts, and moderate class discussion threads"
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

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HelpCircle size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Doubts</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
              {questions.filter(q => q.status === 'pending').length} Unanswered
            </h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Resolved Today</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>14 Answered</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Response Time</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>18 Mins</h3>
          </div>
        </Card>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
        {filteredQuestions.map(q => (
          <Card key={q.id} style={{ padding: '20px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                  {q.studentName.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {q.studentName} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>({q.className})</span>
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 600 }}>
                    {q.subject} • {q.topic}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge variant={q.status === 'pending' ? 'warning' : 'success'}>
                  {q.status === 'pending' ? 'Pending Answer' : 'Resolved ✓'}
                </Badge>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.timestamp}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.5, background: 'var(--bg-color)', padding: '14px', borderRadius: '12px', margin: '0 0 16px 0', border: '1px solid var(--border-color)' }}>
              ❓ "{q.questionText}"
            </p>

            {/* Answer Display if Answered */}
            {q.status === 'answered' && q.answerText && (
              <div style={{ background: 'rgba(13, 124, 102, 0.05)', borderLeft: '4px solid var(--primary-color)', padding: '14px', borderRadius: '0 12px 12px 0', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                    Your Answer (Teacher Response):
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{q.repliedAt}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                  {q.answerText}
                </p>
              </div>
            )}

            {/* Reply Input Box if Pending */}
            {q.status === 'pending' && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Type your explanation or hint for the student..."
                  value={replyTextMap[q.id] || ''}
                  onChange={e => setReplyTextMap({ ...replyTextMap, [q.id]: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-color)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleReplySubmit(q.id);
                  }}
                />
                <Button size="sm" onClick={() => handleReplySubmit(q.id)}>
                  <Send size={15} style={{ marginRight: '6px' }} />
                  Reply
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
