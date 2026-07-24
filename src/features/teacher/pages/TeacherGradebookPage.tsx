import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { EventBus } from '@/mock-server/EventBus';
import { 
  Award, CheckCircle2, FileSpreadsheet, BarChart2, 
  Download, Upload, Calculator, Edit3, Save, TrendingUp
} from 'lucide-react';
import styles from './teacher.module.css';

interface StudentGrade {
  id: string;
  name: string;
  rollNumber: number;
  quiz1: number;
  quiz2: number;
  midterm: number;
  practicals: number;
  totalPercentage: number;
  grade: string;
  status: 'draft' | 'published';
}

const initialGradeData: StudentGrade[] = [
  { id: '10042', name: 'Sarah Doe', rollNumber: 1, quiz1: 19, quiz2: 20, midterm: 48, practicals: 10, totalPercentage: 97, grade: 'A+', status: 'published' },
  { id: '10045', name: 'Lucas Martin', rollNumber: 2, quiz1: 17, quiz2: 18, midterm: 42, practicals: 9, totalPercentage: 86, grade: 'A', status: 'published' },
  { id: '10048', name: 'Ethan Hunt', rollNumber: 3, quiz1: 14, quiz2: 15, midterm: 35, practicals: 8, totalPercentage: 72, grade: 'B', status: 'draft' },
  { id: '10052', name: 'Emma Watson', rollNumber: 4, quiz1: 18, quiz2: 19, midterm: 45, practicals: 9.5, totalPercentage: 91.5, grade: 'A+', status: 'published' },
  { id: '10055', name: 'Noah Miller', rollNumber: 5, quiz1: 12, quiz2: 14, midterm: 30, practicals: 7, totalPercentage: 63, grade: 'C', status: 'draft' }
];

export const TeacherGradebookPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('continuous');
  const [gradeData, setGradeData] = useState<StudentGrade[]>(initialGradeData);
  const [selectedClass, setSelectedClass] = useState('Grade 10 - Physics');
  const [isPublishing, setIsPublishing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tabs = [
    { id: 'continuous', label: 'Continuous Assessment' },
    { id: 'exam_marks', label: 'Exam Marks' },
    { id: 'rubrics', label: 'Rubrics Definition' },
    { id: 'calculation', label: 'Grade Calculation Scale' },
    { id: 'analytics', label: 'Performance Analytics' }
  ];

  const handlePublishMarks = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setGradeData(prev => prev.map(g => ({ ...g, status: 'published' as const })));
      setIsPublishing(false);
      setToastMessage('Gradebook Published! Student & Parent Dashboards updated.');

      // Workflow Event
      EventBus.publish('MARKS_PUBLISHED', {
        className: selectedClass,
        count: gradeData.length,
        timestamp: new Date().toISOString()
      });

      setTimeout(() => setToastMessage(null), 4000);
    }, 800);
  };

  const handleMarkChange = (id: string, field: 'quiz1' | 'quiz2' | 'midterm' | 'practicals', val: number) => {
    setGradeData(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: val };
        const total = updated.quiz1 + updated.quiz2 + updated.midterm + updated.practicals; // out of 100
        let grade = 'F';
        if (total >= 90) grade = 'A+';
        else if (total >= 80) grade = 'A';
        else if (total >= 70) grade = 'B';
        else if (total >= 60) grade = 'C';
        else if (total >= 50) grade = 'D';

        return {
          ...updated,
          totalPercentage: total,
          grade
        };
      }
      return item;
    }));
  };

  return (
    <div className={styles.container}>
      <PageHeader
        title="Gradebook & Assessment"
        subtitle="Manage continuous assessment scores, rubric weightings, exam marks, and grade calculations"
        actions={
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="outline" size="sm">
              <Download size={15} style={{ marginRight: '6px' }} />
              Export CSV
            </Button>
            <Button size="sm" onClick={handlePublishMarks} disabled={isPublishing}>
              <Award size={15} style={{ marginRight: '6px' }} />
              {isPublishing ? 'Publishing...' : 'Publish Gradebook'}
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

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(13, 124, 102, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Class Average</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>81.9%</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>A+ Performers</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>2 Students</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileSpreadsheet size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Approval</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>2 Records</h3>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', fontWeight: 600, fontSize: '0.85rem' }}
        >
          <option value="Grade 10 - Physics">Grade 10 - Physics</option>
          <option value="Grade 9 - Mathematics">Grade 9 - Mathematics</option>
          <option value="Grade 11 - Physics">Grade 11 - Physics</option>
        </select>
      </div>

      {/* Gradebook Matrix Table */}
      <Card style={{ padding: '0', borderRadius: '18px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Roll #</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Student Name</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Quiz 1 (20)</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Quiz 2 (20)</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Midterm (50)</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Practicals (10)</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Total %</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Grade</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--text-muted)' }}>#{row.rollNumber}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--text-main)' }}>{row.name}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <input
                      type="number"
                      max={20}
                      value={row.quiz1}
                      onChange={e => handleMarkChange(row.id, 'quiz1', parseFloat(e.target.value) || 0)}
                      style={{ width: '60px', padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600, textAlign: 'center' }}
                    />
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <input
                      type="number"
                      max={20}
                      value={row.quiz2}
                      onChange={e => handleMarkChange(row.id, 'quiz2', parseFloat(e.target.value) || 0)}
                      style={{ width: '60px', padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600, textAlign: 'center' }}
                    />
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <input
                      type="number"
                      max={50}
                      value={row.midterm}
                      onChange={e => handleMarkChange(row.id, 'midterm', parseFloat(e.target.value) || 0)}
                      style={{ width: '60px', padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600, textAlign: 'center' }}
                    />
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <input
                      type="number"
                      max={10}
                      value={row.practicals}
                      onChange={e => handleMarkChange(row.id, 'practicals', parseFloat(e.target.value) || 0)}
                      style={{ width: '60px', padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600, textAlign: 'center' }}
                    />
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: 'var(--primary-color)' }}>
                    {row.totalPercentage}%
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      background: row.grade.startsWith('A') ? '#ECFDF5' : row.grade === 'B' ? '#EFF6FF' : '#FFFBEB',
                      color: row.grade.startsWith('A') ? '#059669' : row.grade === 'B' ? '#2563EB' : '#D97706'
                    }}>
                      {row.grade}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <Badge variant={row.status === 'published' ? 'success' : 'warning'}>
                      {row.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
