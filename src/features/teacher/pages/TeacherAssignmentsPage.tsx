import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { PageHeader } from '@/components/navigation/PageHeader';
import { FileText, Plus, CheckCircle, X, Check, AlertCircle } from 'lucide-react';
import styles from './teacher.module.css';

const initialAssignments = [
  { id: 1, title: 'Quadratic Equations Problem Set', subject: 'Mathematics', class: 'Grade 10-A', dueDate: 'Oct 12, 2026', totalMarks: 50, submissions: 28, graded: 20, status: 'active' as const },
  { id: 2, title: 'Newton\'s Laws Lab Report', subject: 'Physics', class: 'Grade 10-B', dueDate: 'Oct 14, 2026', totalMarks: 40, submissions: 15, graded: 0, status: 'active' as const },
  { id: 3, title: 'Matrix Operations Worksheet', subject: 'Advanced Algebra', class: 'Grade 11-A', dueDate: 'Oct 10, 2026', totalMarks: 30, submissions: 26, graded: 26, status: 'closed' as const },
  { id: 4, title: 'Trigonometry Applications', subject: 'Mathematics', class: 'Grade 9-C', dueDate: 'Oct 16, 2026', totalMarks: 25, submissions: 0, graded: 0, status: 'draft' as const },
];

export const TeacherAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeTab, setActiveTab] = useState('active');
  const [showCreate, setShowCreate] = useState(false);
  const [showGrade, setShowGrade] = useState<number | null>(null);

  // Form State for creating
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newClass, setNewClass] = useState('Grade 10-A');
  const [newDueDate, setNewDueDate] = useState('Oct 20, 2026');
  const [newTotalMarks, setNewTotalMarks] = useState(50);
  const [newInstructions, setNewInstructions] = useState('');

  // Form State for grading
  const [gradeScore, setGradeScore] = useState('');
  const [gradeFeedback, setGradeFeedback] = useState('');

  // Feedback notifications
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      showFeedback('error', 'Please fill in the assignment title.');
      return;
    }

    const created = {
      id: Date.now(),
      title: newTitle,
      subject: newSubject,
      class: newClass,
      dueDate: newDueDate,
      totalMarks: newTotalMarks,
      submissions: 0,
      graded: 0,
      status: 'active' as const
    };

    setAssignments(prev => [created, ...prev]);
    setNewTitle('');
    setNewInstructions('');
    setShowCreate(false);
    showFeedback('success', `Assignment "${created.title}" published to ${created.class}!`);
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showGrade === null) return;

    setAssignments(prev => prev.map(a => {
      if (a.id === showGrade) {
        const nextGraded = a.graded + 1;
        return {
          ...a,
          graded: nextGraded
        };
      }
      return a;
    }));

    setShowGrade(null);
    setGradeScore('');
    setGradeFeedback('');
    showFeedback('success', 'Student submission graded successfully.');
  };

  const active = assignments.filter(a => a.status === 'active');
  const drafts = assignments.filter(a => a.status === 'draft');
  const closed = assignments.filter(a => a.status === 'closed');

  const tabs = [
    { id: 'active', label: 'Active', count: active.length },
    { id: 'drafts', label: 'Drafts', count: drafts.length },
    { id: 'closed', label: 'Closed', count: closed.length },
  ];

  let filtered: any[] = active;
  if (activeTab === 'drafts') filtered = drafts;
  else if (activeTab === 'closed') filtered = closed;

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle="Create, review, and grade student assignments"
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Assignments' }]}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <Button variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} /> Create Assignment
        </Button>
      </div>

      {feedback && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', borderRadius: '12px',
          marginTop: '20px', border: '1px solid',
          background: feedback.type === 'success' ? '#E8F5E9' : '#FFEBEE',
          borderColor: feedback.type === 'success' ? '#A5D6A7' : '#EF9A9A',
          color: feedback.type === 'success' ? '#2E7D32' : '#C62828',
          fontSize: '0.85rem', fontWeight: 600
        }}>
          {feedback.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        {filtered.length === 0 && (
          <Card style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)' }}>
            <CheckCircle size={32} />
            <p style={{ marginTop: 'var(--space-2)' }}>No assignments in this category.</p>
          </Card>
        )}
        {filtered.map(a => (
          <Card key={a.id} style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary-color)', flexShrink: 0 }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.938rem', fontWeight: 600 }}>{a.title}</h4>
                  <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginTop: '2px' }}>{a.subject} • {a.class} • Due: {a.dueDate} • {a.totalMarks} marks</p>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: '8px', fontSize: '0.813rem' }}>
                    <span style={{ color: 'var(--primary-color)' }}>{a.submissions} submitted</span>
                    <span style={{ color: 'var(--success)' }}>{a.graded} graded</span>
                    <span style={{ color: 'var(--warning)' }}>{a.submissions - a.graded} pending review</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Badge variant={a.status === 'active' ? 'info' : a.status === 'draft' ? 'default' : 'success'}>{a.status}</Badge>
                {a.status === 'active' && a.submissions > a.graded && (
                  <Button size="sm" onClick={() => setShowGrade(a.id)}>Review</Button>
                )}
                {a.status === 'draft' && (
                  <Button size="sm" variant="primary" onClick={() => {
                    setAssignments(prev => prev.map(item => item.id === a.id ? { ...item, status: 'active' } : item));
                    showFeedback('success', `Assignment "${a.title}" published!`);
                  }}>Publish</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Assignment Modal */}
      {showCreate && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Create Assignment</h3>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Assignment Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  placeholder="e.g. Quadratic Equations Problem Set" 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <select value={newSubject} onChange={e => setNewSubject(e.target.value)}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Class</label>
                <select value={newClass} onChange={e => setNewClass(e.target.value)}>
                  <option value="Grade 10-A">Grade 10-A</option>
                  <option value="Grade 10-B">Grade 10-B</option>
                  <option value="Grade 11-A">Grade 11-A</option>
                  <option value="Grade 9-C">Grade 9-C</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Due Date</label>
                <input 
                  type="text" 
                  value={newDueDate} 
                  onChange={e => setNewDueDate(e.target.value)} 
                  placeholder="e.g. Oct 20, 2026" 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Total Marks</label>
                <input 
                  type="number" 
                  value={newTotalMarks} 
                  onChange={e => setNewTotalMarks(parseInt(e.target.value) || 50)} 
                  placeholder="e.g. 50" 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Instructions / Rubric</label>
                <textarea 
                  value={newInstructions} 
                  onChange={e => setNewInstructions(e.target.value)} 
                  placeholder="Describe the assignment requirements..." 
                  rows={4} 
                />
              </div>
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setShowCreate(false)} type="button">Cancel</Button>
                <Button variant="primary" type="submit">Create Assignment</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade / Review Modal */}
      {showGrade !== null && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Review Submission</h3>
              <button onClick={() => setShowGrade(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
              <strong>Student: Sarah Doe</strong>
              <p style={{ marginTop: '4px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Submitted on Oct 10, 2026 at 4:30 PM</p>
            </div>
            <form onSubmit={handleGradeSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Score</label>
                <input 
                  type="number" 
                  value={gradeScore} 
                  onChange={e => setGradeScore(e.target.value)} 
                  placeholder="e.g. 42" 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Feedback</label>
                <textarea 
                  value={gradeFeedback} 
                  onChange={e => setGradeFeedback(e.target.value)} 
                  placeholder="Provide detailed feedback..." 
                  rows={3} 
                  required 
                />
              </div>
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setShowGrade(null)} type="button">Cancel</Button>
                <Button variant="primary" type="submit">Submit Grade</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
