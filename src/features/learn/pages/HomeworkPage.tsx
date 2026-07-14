import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useHomework } from '@/features/homework/hooks/useHomework';
import { useRole } from '@/contexts/RoleContext';
import { Book, Paperclip, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import styles from './learn.module.css';

const STATUS_VARIANT = { 
  pending: 'warning', 
  submitted: 'info', 
  overdue: 'danger', 
  reviewed: 'success' 
} as const;

export const HomeworkPage: React.FC = () => {
  const { currentUser } = useRole();
  const { homework, submitHomework, gradeHomework, isSubmitting } = useHomework();
  const [activeTab, setActiveTab] = useState('all');

  // Submit Modal state (Student)
  const [selectedHwId, setSelectedHwId] = useState<number | null>(null);
  const [submissionText, setSubmissionText] = useState('');

  // Grading Modal state (Teacher)
  const [gradeHwId, setGradeHwId] = useState<number | null>(null);
  const [gradeValue, setGradeValue] = useState('A');
  const [feedbackValue, setFeedbackValue] = useState('');

  const isTeacher = currentUser?.role === 'teacher';
  const isParent = currentUser?.role === 'parent';

  // Compute tabs & filtered list dynamically based on role
  const getTabsAndFiltered = () => {
    if (isTeacher) {
      const active = homework.filter(h => !h.isDraft);
      const drafts = homework.filter(h => h.isDraft);
      const pendingGrading = homework.filter(h => h.status === 'submitted');

      const tabs = [
        { id: 'all', label: 'All Active', count: active.length },
        { id: 'submitted', label: 'Submitted (To Grade)', count: pendingGrading.length },
        { id: 'drafts', label: 'Drafts', count: drafts.length },
      ];

      let filtered = active;
      if (activeTab === 'drafts') filtered = drafts;
      else if (activeTab === 'submitted') filtered = pendingGrading;

      return { tabs, filtered };
    } else if (isParent) {
      const pending = homework.filter(h => h.status === 'pending');
      const reviewed = homework.filter(h => h.status === 'reviewed');

      const tabs = [
        { id: 'all', label: "Sarah's Homework", count: homework.length },
        { id: 'pending', label: 'Incomplete', count: pending.length },
        { id: 'reviewed', label: 'Graded & Reviewed', count: reviewed.length },
      ];

      let filtered = homework;
      if (activeTab === 'pending') filtered = pending;
      else if (activeTab === 'reviewed') filtered = reviewed;

      return { tabs, filtered };
    } else {
      // Student
      const pending = homework.filter(h => h.status === 'pending');
      const submitted = homework.filter(h => h.status === 'submitted');
      const overdue = homework.filter(h => h.status === 'overdue');

      const tabs = [
        { id: 'all', label: 'All Homework', count: homework.length },
        { id: 'pending', label: 'Pending', count: pending.length },
        { id: 'submitted', label: 'Submitted', count: submitted.length },
        { id: 'overdue', label: 'Overdue', count: overdue.length },
      ];

      let filtered = homework;
      if (activeTab !== 'all') {
        filtered = homework.filter(h => h.status === activeTab);
      }

      return { tabs, filtered };
    }
  };

  const { tabs, filtered } = getTabsAndFiltered();

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedHwId === null || !submissionText) return;
    await submitHomework(selectedHwId, submissionText);
    setSubmissionText('');
    setSelectedHwId(null);
  };

  const handleTeacherGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (gradeHwId === null) return;
    await gradeHomework(gradeHwId, gradeValue, feedbackValue);
    setGradeValue('A');
    setFeedbackValue('');
    setGradeHwId(null);
  };

  return (
    <div>
      <PageHeader 
        title={isTeacher ? 'Homework Controls' : isParent ? "Sarah's Homework Tracker" : 'Homework'} 
        subtitle={isTeacher ? 'Manage, publish, and grade homework' : 'Submit assignments and check grades'} 
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }, { label: 'Homework' }]} 
      />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.pageList}>
        {filtered.map(hw => (
          <div key={hw.id} className={styles.pageItem}>
            <div className={styles.itemIcon} style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)' }}>
              <Book size={22} />
            </div>
            <div className={styles.itemContent}>
              <p className={styles.itemTitle}>{hw.title}</p>
              <p>{hw.subject} • {hw.teacher} • Due: {hw.dueDate}</p>
              {hw.grade && (
                <div style={{ marginTop: '6px', fontSize: '0.813rem', color: 'var(--success)', fontWeight: 500 }}>
                  Grade: {hw.grade} — <span style={{ color: 'var(--text-muted)' }}>"{hw.feedback}"</span>
                </div>
              )}
            </div>
            <div className={styles.itemActions}>
              <Badge variant={STATUS_VARIANT[hw.status as keyof typeof STATUS_VARIANT] || 'default'}>
                {hw.status}
              </Badge>

              {/* Student Submit Trigger */}
              {!isTeacher && !isParent && hw.status === 'pending' && (
                <Button size="sm" onClick={() => setSelectedHwId(hw.id)}>Submit</Button>
              )}

              {/* Teacher Review Trigger */}
              {isTeacher && hw.status === 'submitted' && (
                <Button size="sm" onClick={() => {
                  setGradeHwId(hw.id);
                  setSubmissionText(hw.submissionContent || '');
                }}>Grade</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Student Submission Modal */}
      {selectedHwId !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Submit Homework</h3>
            <form onSubmit={handleStudentSubmit}>
              <div className={styles.formGroup}>
                <label>Submission Text / Answer Details</label>
                <textarea 
                  value={submissionText} 
                  onChange={e => setSubmissionText(e.target.value)} 
                  placeholder="Explain your answers or type your submission here..."
                  required 
                  rows={6}
                  style={{
                    width: '100%',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 12px',
                    color: 'var(--text-main)',
                    marginTop: '4px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setSelectedHwId(null)} type="button">Cancel</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Upload & Submit'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Grading Modal */}
      {gradeHwId !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Grade Submission</h3>
            <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
              <strong>Student Answer:</strong>
              <p style={{ marginTop: '4px', fontSize: '0.9rem', color: 'var(--text-main)' }}>{submissionText}</p>
            </div>
            <form onSubmit={handleTeacherGrade}>
              <div className={styles.formGroup}>
                <label>Grade (A+, A, B, C, F)</label>
                <select 
                  value={gradeValue} 
                  onChange={e => setGradeValue(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 12px',
                    color: 'var(--text-main)',
                    marginTop: '4px',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className={styles.formGroup} style={{ marginTop: '12px' }}>
                <label>Feedback</label>
                <input 
                  type="text" 
                  value={feedbackValue} 
                  onChange={e => setFeedbackValue(e.target.value)} 
                  placeholder="e.g. Excellent work, detailed calculations!"
                  required
                  style={{
                    width: '100%',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 12px',
                    color: 'var(--text-main)',
                    marginTop: '4px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div className={styles.formActions} style={{ marginTop: '16px' }}>
                <Button variant="outline" onClick={() => setGradeHwId(null)} type="button">Cancel</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Grade'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
