import React from 'react';
import { 
  ShieldCheck, FileText, BookOpen, MessageSquare, 
  CalendarCheck, Receipt, BarChart3, Users, Sparkles,
  TrendingUp, CheckCircle2
} from 'lucide-react';

const BENEFITS_DATA = [
  {
    icon: FileText,
    color: '#7c3aed',
    bg: '#f3e8ff',
    title: 'Paperless Administration',
    desc: 'Eliminate manual paperwork with digital workflows, records, approvals, and real-time reports.'
  },
  {
    icon: BookOpen,
    color: '#3b82f6',
    bg: '#eff6ff',
    title: 'Digital Learning LMS',
    desc: 'Deliver interactive lessons, assignments, and assessments through a modern LMS students love.'
  },
  {
    icon: MessageSquare,
    color: '#22c55e',
    bg: '#d1fae5',
    title: 'Centralized Communication',
    desc: 'Keep everyone connected with in-app messaging, instant notices, and parent-teacher communication.'
  },
  {
    icon: CalendarCheck,
    color: '#f97316',
    bg: '#ffedd5',
    title: 'Attendance Automation',
    desc: 'Automate attendance with biometric, QR, and RFID support. Instantly notify parents about absences.'
  },
  {
    icon: Receipt,
    color: '#ec4899',
    bg: '#fce7f3',
    title: 'Smart Fee Management',
    desc: 'Simplify fee collection with online payments, automated SMS reminders, and receipt generation.'
  },
  {
    icon: BarChart3,
    color: '#7c3aed',
    bg: '#f3e8ff',
    title: 'Real-Time Analytics',
    desc: 'Make data-driven decisions with interactive dashboards, custom exports, and trend analysis.'
  },
  {
    icon: Users,
    color: '#3b82f6',
    bg: '#eff6ff',
    title: 'Parent Engagement App',
    desc: 'Empower parents with a dedicated mobile app to track academic progress, fees, and attendance.'
  },
  {
    icon: ShieldCheck,
    color: '#22c55e',
    bg: '#d1fae5',
    title: 'Role-Based Security',
    desc: 'Ensure maximum data protection with granular permissions. Every user sees only what they need.'
  },
  {
    icon: Sparkles,
    color: '#f97316',
    bg: '#ffedd5',
    title: 'AI-Powered Insights',
    desc: 'Leverage artificial intelligence for performance predictions, timetable generation, and reporting.'
  }
];

export const WhyEduVerseSection: React.FC = () => (
  <section className="mkt-section" id="why-eduverse" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)' }}>
    <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      
      {/* Top Floating Highlight Stat Cards */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 56, flexWrap: 'wrap' }}>
        
        {/* Attendance Stat Card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px 24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 16, minWidth: 240 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CalendarCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Daily Attendance</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <strong style={{ fontSize: 22, color: '#0f172a', fontWeight: 800 }}>98%</strong>
              <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>+2.3% today</span>
            </div>
          </div>
        </div>

        {/* Message Alert Card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px 24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 16, minWidth: 240 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MessageSquare size={20} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Recent Activity</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>12 New Messages</div>
            <span style={{ fontSize: 11, color: '#3b82f6', fontWeight: 600 }}>From Faculty & Staff</span>
          </div>
        </div>

        {/* Fee Collection Card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px 24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 16, minWidth: 240 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef3c7', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Receipt size={20} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Fee Collections</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <strong style={{ fontSize: 22, color: '#0f172a', fontWeight: 800 }}>₹18.5L</strong>
              <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>94% collected</span>
            </div>
          </div>
        </div>

      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#d1fae5', color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          <ShieldCheck size={14} /> Why EduVerse
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Everything Your School Needs,<br/>In <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>One Platform</span>
        </h2>
        <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          Replace 10+ disconnected tools with a single, unified ecosystem that brings everyone together.
        </p>
      </div>

      {/* 3x3 Benefits Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {BENEFITS_DATA.map((item, i) => {
          const Icon = item.icon;
          return (
            <div 
              key={i}
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 28,
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={24} strokeWidth={2} />
              </div>
              
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </section>
);
