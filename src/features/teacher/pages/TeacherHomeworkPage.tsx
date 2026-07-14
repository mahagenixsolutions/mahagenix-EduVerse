import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { PageHeader } from '@/components/navigation/PageHeader';
import { useHomework } from '@/features/homework/hooks/useHomework';
import { useRole } from '@/contexts/RoleContext';
import { Book, Plus, CheckCircle, Eye, Trash2, Edit3, X } from 'lucide-react';
import styles from './teacher.module.css';

export const TeacherHomeworkPage: React.FC = () => {
  const { currentUser } = useRole();
  const { homework, publishHomework, gradeHomework, isPublishing } = useHomework();
  const [activeTab, setActiveTab] = useState('published');
  const [showCreate, setShowCreate] = useState(false);
  const [gradeHwId, setGradeHwId] = useState<number | null>(null);
  const [gradeValue, setGradeValue] = useState('A');
  const [feedbackValue, setFeedbackValue] = useState('');

  // Form state
  const [hwTitle, setHwTitle] = useState('');
  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwDueDate, setHwDueDate] = useState('');
  const [hwDraft, setHwDraft] = useState(false);

  const published = homework.filter(h => !h.isDraft);
  const drafts = homework.filter(h => h.isDraft);
  const submitted = homework.filter(h => h.status === 'submitted');
  const reviewed = homework.filter(h => h.status === 'reviewed');

  const tabs = [
    { id: 'published', label: 'Published', count: published.length },
    { id: 'submitted', label: 'Submissions', count: submitted.length },
    { id: 'drafts', label: 'Drafts', count: drafts.length },
    { id: 'reviewed', label: 'Graded', count: reviewed.length },
  ];

  let filtered = published;
  if (activeTab === 'drafts') filtered = drafts;
  else if (activeTab === 'submitted') filtered = submitted;
  else if (activeTab === 'reviewed') filtered = reviewed;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle || !hwDueDate) return;
    await publishHomework({
      title: hwTitle, subject: hwSubject, dueDate: hwDueDate,
      teacher: currentUser?.name || 'Mr. Smith', isDraft: hwDraft,
    });
    setHwTitle(''); setHwDueDate(''); setHwDraft(false); setShowCreate(false);
  };

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (gradeHwId === null) return;
    await gradeHomework(gradeHwId, gradeValue, feedbackValue);
    setGradeValue('A'); setFeedbackValue(''); setGradeHwId(null);
  };

  return (
    <div>
      <PageHeader
        title="Homework"
        subtitle="Create, manage, and grade homework assignments"
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Homework' }]}
      />

      {/* Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <Button variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} /> Create Homework
        </Button>
      </div>

      {/* Homework List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        {filtered.length === 0 && (
          <Card style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)' }}>
            <CheckCircle size={32} />
            <p style={{ marginTop: 'var(--space-2)' }}>No homework in this category.</p>
          </Card>
        )}
        {filtered.map(hw => (
          <Card key={hw.id} style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', flexShrink: 0 }}>
                  <Book size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.938rem', fontWeight: 600 }}>{hw.title}</h4>
                  <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginTop: '2px' }}>{hw.subject} • Due: {hw.dueDate}</p>
                  {hw.grade && (
                    <div style={{ marginTop: '6px', fontSize: '0.813rem', color: 'var(--success)', fontWeight: 500 }}>
                      Grade: {hw.grade} — <span style={{ color: 'var(--text-muted)' }}>"{hw.feedback}"</span>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Badge variant={hw.isDraft ? 'default' : hw.status === 'submitted' ? 'info' : hw.status === 'reviewed' ? 'success' : 'warning'}>
                  {hw.isDraft ? 'Draft' : hw.status}
                </Badge>
                {hw.status === 'submitted' && (
                  <Button size="sm" onClick={() => { setGradeHwId(hw.id); setFeedbackValue(''); }}>Grade</Button>
                )}
                {hw.isDraft && (
                  <Button size="sm" variant="primary" onClick={() => {
                    if (confirm(`Publish draft: "${hw.title}"?`)) {
                      publishHomework({ title: hw.title, subject: hw.subject, dueDate: hw.dueDate, teacher: hw.teacher, isDraft: false });
                    }
                  }}>Publish</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Homework Modal */}
      {showCreate && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Create Homework</h3>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Homework Title</label>
                <input type="text" value={hwTitle} onChange={e => setHwTitle(e.target.value)} placeholder="e.g. Calculus Integration exercises" required />
              </div>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <select value={hwSubject} onChange={e => setHwSubject(e.target.value)}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Due Date</label>
                <input type="text" value={hwDueDate} onChange={e => setHwDueDate(e.target.value)} placeholder="e.g. Tomorrow, 11:59 PM" required />
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="hwDraftTeacher" checked={hwDraft} onChange={e => setHwDraft(e.target.checked)} />
                <label htmlFor="hwDraftTeacher">Save as Draft (Do not publish to students)</label>
              </div>
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setShowCreate(false)} type="button">Cancel</Button>
                <Button variant="primary" type="submit" disabled={isPublishing}>
                  {isPublishing ? 'Publishing...' : hwDraft ? 'Save Draft' : 'Publish Homework'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {gradeHwId !== null && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Grade Submission</h3>
              <button onClick={() => setGradeHwId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleGrade} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Grade (A+, A, B, C, F)</label>
                <select value={gradeValue} onChange={e => setGradeValue(e.target.value)}>
                  <option value="A+">A+</option><option value="A">A</option><option value="B+">B+</option>
                  <option value="B">B</option><option value="C">C</option><option value="F">F</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Feedback</label>
                <input type="text" value={feedbackValue} onChange={e => setFeedbackValue(e.target.value)} placeholder="e.g. Excellent work, detailed calculations!" required />
              </div>
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setGradeHwId(null)} type="button">Cancel</Button>
                <Button variant="primary" type="submit">Submit Grade</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
