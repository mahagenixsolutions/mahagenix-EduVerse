import React from 'react';
import { 
  Rocket, Building2, Database, GraduationCap, 
  Headphones, CheckCircle2, LayoutDashboard, Check
} from 'lucide-react';

const STEPS = [
  {
    step: 1,
    icon: Building2,
    color: '#10b981',
    bg: '#d1fae5',
    title: 'Organization Setup',
    duration: 'Day 1',
    desc: 'Register your School, configure departments, classes, sections, and academic year settings.'
  },
  {
    step: 2,
    icon: Database,
    color: '#3b82f6',
    bg: '#eff6ff',
    title: 'Data Import',
    duration: 'Day 2-3',
    desc: 'Import existing student, teacher, and staff data from Excel, CSV, or your previous system.'
  },
  {
    step: 3,
    icon: GraduationCap,
    color: '#8b5cf6',
    bg: '#f3e8ff',
    title: 'Staff Training',
    duration: 'Day 4-5',
    desc: 'Interactive training sessions for administrators, teachers, and support staff — online or on-site.'
  },
  {
    step: 4,
    icon: Rocket,
    color: '#f59e0b',
    bg: '#fef3c7',
    title: 'Go Live',
    duration: 'Day 7',
    desc: 'Launch EduVerse across your institution with full support. We ensure a smooth transition.'
  },
  {
    step: 5,
    icon: Headphones,
    color: '#14b8a6',
    bg: '#ccfbf1',
    title: 'Ongoing Support',
    duration: 'Always',
    desc: 'Dedicated customer success team for continuous assistance, updates, and optimization.'
  }
];

export const ImplementationTimeline: React.FC = () => (
  <section className="mkt-section" id="implementation" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #fff 0%, #f8f9fc 100%)' }}>
    <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#f3e8ff', color: '#8b5cf6', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          <Rocket size={14} /> Implementation
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Go Live in Just <span style={{ color: '#8b5cf6' }}>7 Days</span>
        </h2>
        <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          Our streamlined implementation process ensures your school is up and running with minimal disruption.
        </p>
      </div>

      {/* 2-Column Grid: Graphic on Left, Steps Timeline on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, alignItems: 'center' }}>
        
        {/* Left: Graphic Dashboard Card */}
        <div style={{ position: 'relative', background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)', borderRadius: 24, padding: 32, border: '1px solid #e0e7ff', boxShadow: '0 12px 36px rgba(99, 102, 241, 0.08)' }}>
          
          {/* Mockup Illustration Box */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #cbd5e1', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', minHeight: 280, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>EduVerse Onboarding Portal</span>
            </div>

            <div style={{ display: 'flex', gap: 16, flex: 1 }}>
              <div style={{ width: 50, background: '#6366f1', borderRadius: 10, opacity: 0.9 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ height: 20, background: '#f1f5f9', borderRadius: 6, width: '60%' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div style={{ height: 40, background: '#faf5ff', borderRadius: 8, border: '1px solid #f3e8ff' }} />
                  <div style={{ height: 40, background: '#eff6ff', borderRadius: 8, border: '1px solid #dbeafe' }} />
                  <div style={{ height: 40, background: '#f0fdf4', borderRadius: 8, border: '1px solid #dcfce7' }} />
                </div>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              </div>
            </div>
          </div>

          {/* Floating Go Live Sticker Badge at Bottom Left */}
          <div style={{ position: 'absolute', bottom: -16, left: 40, background: '#fff', borderRadius: 16, padding: '12px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 12, zIndex: 3 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={20} strokeWidth={3} />
            </div>
            <div>
              <strong style={{ fontSize: 13, color: '#0f172a', display: 'block', lineHeight: 1.2 }}>Go Live</strong>
              <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.2 }}>Your school is now live!</span>
            </div>
          </div>

        </div>

        {/* Right: Vertical Step Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.step}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '16px 20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  position: 'relative'
                }}
              >
                {/* Step Circle Badge */}
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: step.bg, color: step.color, fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {step.step}
                </div>

                {/* Icon Box */}
                <div style={{ width: 42, height: 42, borderRadius: 12, background: step.bg, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} strokeWidth={2} />
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: 0 }}>{step.title}</h3>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: step.bg, color: step.color }}>
                      {step.duration}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  </section>
);
