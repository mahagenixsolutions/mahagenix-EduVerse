import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Award, Upload, Eye, X, Check, AlertCircle } from 'lucide-react';
import styles from './teacher.module.css';

interface Exam {
  id: number;
  name: string;
  class: string;
  subject: string;
  date: string;
  totalMarks: number;
  status: 'published' | 'draft';
  avgScore: number | null;
}

const initialExams: Exam[] = [
  { id: 1, name: 'Unit Test 3', class: 'Grade 10-A', subject: 'Mathematics', date: 'Oct 5, 2026', totalMarks: 50, status: 'published', avgScore: 38.5 },
  { id: 2, name: 'Unit Test 3', class: 'Grade 10-B', subject: 'Physics', date: 'Oct 6, 2026', totalMarks: 50, status: 'draft', avgScore: null },
  { id: 3, name: 'Mid-Term Exam', class: 'Grade 11-A', subject: 'Advanced Algebra', date: 'Sep 20, 2026', totalMarks: 100, status: 'published', avgScore: 76.2 },
  { id: 4, name: 'Unit Test 2', class: 'Grade 9-C', subject: 'Mathematics', date: 'Sep 15, 2026', totalMarks: 40, status: 'published', avgScore: 28.4 },
];

const mockStudentMarks = [
  { student: 'Sarah Doe', marks: 45, total: 50 },
  { student: 'John Lee', marks: 38, total: 50 },
  { student: 'Alex Vance', marks: 48, total: 50 },
  { student: 'Priya Sharma', marks: 47, total: 50 },
];

export const TeacherMarksPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [activeTab, setActiveTab] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [showPreview, setShowPreview] = useState<number | null>(null);

  // Form State
  const [examName, setExamName] = useState('Unit Test 3');
  const [examSubject, setExamSubject] = useState('Mathematics');
  const [examClass, setExamClass] = useState('Grade 10-A');
  const [totalMarks, setTotalMarks] = useState(50);
  const [avgScoreInput, setAvgScoreInput] = useState('41.2');

  // Feedback notifications
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExam = {
      id: Date.now(),
      name: examName,
      class: examClass,
      subject: examSubject,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalMarks: totalMarks,
      status: 'draft' as const,
      avgScore: parseFloat(avgScoreInput) || null
    };

    setExams(prev => [newExam, ...prev]);
    setShowUpload(false);
    showFeedback('success', `Marks draft uploaded for ${newExam.name} (${newExam.class})!`);
  };

  const handlePublishExam = (id: number) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, status: 'published' } : e));
    const target = exams.find(e => e.id === id);
    showFeedback('success', `Exam results published for ${target?.name || 'the class'}!`);
  };

  const published = exams.filter(e => e.status === 'published');
  const drafts = exams.filter(e => e.status === 'draft');

  const tabs = [
    { id: 'all', label: 'All Exams', count: exams.length },
    { id: 'published', label: 'Published', count: published.length },
    { id: 'draft', label: 'Drafts', count: drafts.length },
  ];

  let filtered = exams;
  if (activeTab === 'published') filtered = published;
  else if (activeTab === 'draft') filtered = drafts;

  const activePreviewExam = exams.find(e => e.id === showPreview);

  return (
    <div>
      <PageHeader
        title="Exams & Marks"
        subtitle="Upload marks, publish results, and preview reports"
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Exams & Marks' }]}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <Button variant="primary" onClick={() => setShowUpload(true)}>
          <Upload size={16} /> Upload Marks
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
        {filtered.map(exam => (
          <Card key={exam.id} style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', flexShrink: 0 }}>
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.938rem', fontWeight: 600 }}>{exam.name}</h4>
                  <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginTop: '2px' }}>{exam.subject} • {exam.class} • {exam.date} • Total: {exam.totalMarks}</p>
                  {exam.avgScore !== null && (
                    <p style={{ fontSize: '0.813rem', color: 'var(--success)', fontWeight: 500, marginTop: '4px' }}>
                      Class Average: {exam.avgScore}/{exam.totalMarks} ({Math.round((exam.avgScore / exam.totalMarks) * 100)}%)
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Badge variant={exam.status === 'published' ? 'success' : 'default'}>{exam.status}</Badge>
                <Button size="sm" variant="outline" onClick={() => setShowPreview(exam.id)}>
                  <Eye size={14} /> Preview
                </Button>
                {exam.status === 'draft' && (
                  <Button size="sm" variant="primary" onClick={() => handlePublishExam(exam.id)}>Publish</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Marks Modal */}
      {showUpload && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Upload Exam Marks</h3>
              <button onClick={() => setShowUpload(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleUploadSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Exam Name</label>
                <select value={examName} onChange={e => setExamName(e.target.value)}>
                  <option value="Unit Test 3">Unit Test 3</option>
                  <option value="Unit Test 4">Unit Test 4</option>
                  <option value="Term Examination">Term Examination</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <select value={examSubject} onChange={e => setExamSubject(e.target.value)}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Target Class</label>
                <select value={examClass} onChange={e => setExamClass(e.target.value)}>
                  <option value="Grade 10-A">Grade 10-A</option>
                  <option value="Grade 10-B">Grade 10-B</option>
                  <option value="Grade 11-A">Grade 11-A</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Total Marks</label>
                <input 
                  type="number" 
                  value={totalMarks} 
                  onChange={e => setTotalMarks(parseInt(e.target.value) || 50)} 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Average Marks Obtained</label>
                <input 
                  type="text" 
                  value={avgScoreInput} 
                  onChange={e => setAvgScoreInput(e.target.value)} 
                  placeholder="e.g. 38.5" 
                  required 
                />
              </div>
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setShowUpload(false)} type="button">Cancel</Button>
                <Button variant="primary" type="submit">Upload Draft</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview !== null && activePreviewExam && (
        <div className={styles.overlay}>
          <div className={styles.modal} style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Marks Sheet Preview</h3>
              <button onClick={() => setShowPreview(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
              <h4 style={{ margin: 0 }}>{activePreviewExam.name} • {activePreviewExam.subject}</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.813rem', color: 'var(--text-light)' }}>
                Target Class: {activePreviewExam.class} • Date: {activePreviewExam.date}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1.5px solid var(--border-color)', fontWeight: 600, fontSize: '0.85rem' }}>
                <span>Student</span>
                <span>Score Obtained</span>
              </div>
              {mockStudentMarks.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <span>{s.student}</span>
                  <strong>{Math.round((s.marks / 50) * activePreviewExam.totalMarks)} / {activePreviewExam.totalMarks}</strong>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button variant="primary" onClick={() => setShowPreview(null)}>Close Preview</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
