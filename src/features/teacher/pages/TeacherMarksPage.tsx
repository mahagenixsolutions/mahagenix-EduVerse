import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { PageHeader } from '@/components/navigation/PageHeader';
import { teacherClasses } from '@/mock/teacher';
import { Award, Upload, Eye, X } from 'lucide-react';
import styles from './teacher.module.css';

const mockExams = [
  { id: 1, name: 'Unit Test 3', class: 'Grade 10-A', subject: 'Mathematics', date: 'Oct 5, 2025', totalMarks: 50, status: 'published' as const, avgScore: 38.5 },
  { id: 2, name: 'Unit Test 3', class: 'Grade 10-B', subject: 'Physics', date: 'Oct 6, 2025', totalMarks: 50, status: 'draft' as const, avgScore: null },
  { id: 3, name: 'Mid-Term Exam', class: 'Grade 11-A', subject: 'Advanced Algebra', date: 'Sep 20, 2025', totalMarks: 100, status: 'published' as const, avgScore: 76.2 },
  { id: 4, name: 'Unit Test 2', class: 'Grade 9-C', subject: 'Mathematics', date: 'Sep 15, 2025', totalMarks: 40, status: 'published' as const, avgScore: 28.4 },
];

const mockStudentMarks = [
  { student: 'Sarah Doe', marks: 45, total: 50 },
  { student: 'John Lee', marks: 38, total: 50 },
  { student: 'Alex Vance', marks: 48, total: 50 },
  { student: 'Priya Sharma', marks: 47, total: 50 },
];

export const TeacherMarksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [showPreview, setShowPreview] = useState<number | null>(null);

  const published = mockExams.filter(e => e.status === 'published');
  const drafts = mockExams.filter(e => e.status === 'draft');

  const tabs = [
    { id: 'all', label: 'All Exams', count: mockExams.length },
    { id: 'published', label: 'Published', count: published.length },
    { id: 'draft', label: 'Drafts', count: drafts.length },
  ];

  let filtered = mockExams;
  if (activeTab === 'published') filtered = published;
  else if (activeTab === 'draft') filtered = drafts;

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
                {exam.status === 'draft' && <Button size="sm" variant="primary">Publish</Button>}
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
            <form onSubmit={e => { e.preventDefault(); setShowUpload(false); alert('Marks uploaded!'); }} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Select Exam</label>
                <select>
                  <option>Unit Test 3 — October 2025</option>
                  <option>Mid-Term Exams — September 2025</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Class</label>
                <select>
                  {teacherClasses.map(cls => <option key={cls.id}>{cls.name}-{cls.section} ({cls.subject})</option>)}
                </select>
              </div>
              <p style={{ fontSize: '0.813rem', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>Enter marks for each student:</p>
              {mockStudentMarks.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.938rem' }}>{s.student}</span>
                  <input type="number" defaultValue={s.marks} style={{ width: '80px', padding: '6px 10px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', textAlign: 'center', fontFamily: 'inherit' }} />
                </div>
              ))}
              <div className={styles.formActions} style={{ marginTop: 'var(--space-4)' }}>
                <Button variant="outline" onClick={() => setShowUpload(false)} type="button">Cancel</Button>
                <Button variant="primary" type="submit">Save & Publish Marks</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Report Modal */}
      {showPreview !== null && (
        <div className={styles.overlay}>
          <div className={styles.modal} style={{ maxWidth: '550px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h3 style={{ margin: 0 }}>Result Preview</h3>
              <button onClick={() => setShowPreview(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: 'var(--space-2)', textAlign: 'left', fontSize: '0.813rem', color: 'var(--text-muted)' }}>Student</th>
                  <th style={{ padding: 'var(--space-2)', textAlign: 'center', fontSize: '0.813rem', color: 'var(--text-muted)' }}>Marks</th>
                  <th style={{ padding: 'var(--space-2)', textAlign: 'center', fontSize: '0.813rem', color: 'var(--text-muted)' }}>Total</th>
                  <th style={{ padding: 'var(--space-2)', textAlign: 'center', fontSize: '0.813rem', color: 'var(--text-muted)' }}>%</th>
                </tr>
              </thead>
              <tbody>
                {mockStudentMarks.map((s, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: 'var(--space-2)', fontWeight: 500 }}>{s.student}</td>
                    <td style={{ padding: 'var(--space-2)', textAlign: 'center', fontWeight: 600 }}>{s.marks}</td>
                    <td style={{ padding: 'var(--space-2)', textAlign: 'center' }}>{s.total}</td>
                    <td style={{ padding: 'var(--space-2)', textAlign: 'center' }}>
                      <Badge variant={Math.round((s.marks / s.total) * 100) >= 80 ? 'success' : 'warning'}>{Math.round((s.marks / s.total) * 100)}%</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.formActions} style={{ marginTop: 'var(--space-4)' }}>
              <Button variant="outline" onClick={() => setShowPreview(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
