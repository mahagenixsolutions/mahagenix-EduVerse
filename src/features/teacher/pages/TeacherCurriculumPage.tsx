import React, { useState } from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { 
  BookOpen, CheckCircle2, Layers, Clock, 
  Calendar, FileText, ChevronRight, Plus
} from 'lucide-react';
import styles from './teacher.module.css';

interface CurriculumUnit {
  id: number;
  unitNumber: number;
  title: string;
  subject: string;
  className: string;
  durationHours: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  progressPercentage: number;
  topics: string[];
}

const mockUnits: CurriculumUnit[] = [
  {
    id: 1,
    unitNumber: 1,
    title: 'Kinematics & Motion in 2D',
    subject: 'Physics',
    className: 'Grade 10',
    durationHours: 12,
    status: 'completed',
    progressPercentage: 100,
    topics: ['Vector Mathematics', 'Projectile Motion Equations', 'Uniform Circular Motion', 'Relative Velocity']
  },
  {
    id: 2,
    unitNumber: 2,
    title: 'Electromagnetic Induction & Flux',
    subject: 'Physics',
    className: 'Grade 10',
    durationHours: 16,
    status: 'in_progress',
    progressPercentage: 68,
    topics: ['Magnetic Flux Density', 'Faraday Law of Induction', 'Lenz Law Direction', 'Transformers & AC Generators']
  },
  {
    id: 3,
    unitNumber: 3,
    title: 'Quantum Wave-Particle Duality',
    subject: 'Physics',
    className: 'Grade 10',
    durationHours: 14,
    status: 'upcoming',
    progressPercentage: 0,
    topics: ['Photoelectric Effect', 'Planck Constant Derivations', 'de Broglie Wavelength', 'Electron Microscope Basics']
  }
];

export const TeacherCurriculumPage: React.FC = () => {
  const [units, setUnits] = useState<CurriculumUnit[]>(mockUnits);

  return (
    <div className={styles.container}>
      <PageHeader
        title="Curriculum & Syllabus Management"
        subtitle="Map chapter timelines, track learning outcomes, and manage course curriculum units"
        actions={
          <Button size="sm">
            <Plus size={16} style={{ marginRight: '6px' }} />
            Add Curriculum Unit
          </Button>
        }
      />

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(13, 124, 102, 0.1)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Syllabus Completion</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>68% Completed</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completed Units</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>6 of 9 Units</h3>
          </div>
        </Card>

        <Card style={{ padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Teaching Hours</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>120 Hours</h3>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {units.map(unit => (
          <Card key={unit.id} style={{ padding: '20px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                  Unit #{unit.unitNumber} • {unit.subject} ({unit.className})
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {unit.title}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge variant={unit.status === 'completed' ? 'success' : unit.status === 'in_progress' ? 'info' : 'secondary'}>
                  {unit.status.replace('_', ' ').toUpperCase()}
                </Badge>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {unit.durationHours} Hours
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>Unit Progress</span>
                <span>{unit.progressPercentage}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${unit.progressPercentage}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Topics List */}
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                SUB-TOPICS & SYLLABUS OUTLINE
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {unit.topics.map((t, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.8rem',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
