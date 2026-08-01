import React, { useState } from 'react';
import { Quote, Star } from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'All Stories' },
  { id: 'schools', label: 'Schools' },
  { id: 'principals', label: 'Principals' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'parents', label: 'Parents' },
  { id: 'students', label: 'Students' }
];

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Dr. Ramesh Krishnan',
    title: 'Principal',
    institution: "St. Xavier's International School",
    roleCategory: 'principals',
    avatar: 'DR',
    avatarBg: '#8b5cf6',
    rating: 5,
    quote: 'EduVerse transformed how we manage our 2,200+ students. From attendance to analytics, everything is now at our fingertips. The AI insights help us identify at-risk students early and improve outcomes by 22%.'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    title: 'Senior Mathematics Teacher',
    institution: 'Delhi Public School',
    roleCategory: 'teachers',
    avatar: 'PS',
    avatarBg: '#10b981',
    rating: 5,
    quote: 'The homework and assignment modules save me hours every week. I can create, distribute, and grade assignments digitally. The gradebook is intuitive and parents appreciate the transparency.'
  },
  {
    id: 3,
    name: 'Aarav Mehta',
    title: 'Parent',
    institution: 'Greenwood Academy',
    roleCategory: 'parents',
    avatar: 'AM',
    avatarBg: '#3b82f6',
    rating: 5,
    quote: "As a working parent, I love the EduVerse mobile app. I can check my daughter's attendance, homework, and grades in real time. The parent-teacher chat feature means I never miss important updates."
  },
  {
    id: 4,
    name: 'Vikram Singh',
    title: 'Director of Operations',
    institution: 'Sunrise Group of Schools',
    roleCategory: 'schools',
    avatar: 'VS',
    avatarBg: '#f59e0b',
    rating: 5,
    quote: 'Managing 8 schools was a logistical nightmare before EduVerse. The multi-branch dashboard gives me consolidated analytics, and the finance reports are 100% accurate.'
  },
  {
    id: 5,
    name: 'Fatima Begum',
    title: 'English Department Head',
    institution: 'Crescent International',
    roleCategory: 'teachers',
    avatar: 'FB',
    avatarBg: '#8b5cf6',
    rating: 5,
    quote: 'The curriculum planner and lesson builder are game changers. I can plan an entire term in advance, share resources with my team, and track student progress with beautiful visual reports.'
  },
  {
    id: 6,
    name: 'Meera Joshi',
    title: 'Parent',
    institution: 'The Heritage School',
    roleCategory: 'parents',
    avatar: 'MJ',
    avatarBg: '#14b8a6',
    rating: 5,
    quote: 'The fee payments used to mean standing in long queues. Now I pay online in 30 seconds, get instant receipts, and can even set up auto-pay. The transport tracking gives me peace of mind every morning.'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all'
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.filter(t => t.roleCategory === activeFilter || activeFilter === 'schools');

  return (
    <section className="mkt-section" id="testimonials" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)' }}>
      <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#f3e8ff', color: '#8b5cf6', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <Quote size={14} /> Testimonials
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            <span style={{ background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Loved</span> by Schools, Teachers & Parents
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Hear from the people who use EduVerse every day to transform their institutions.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {FILTERS.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 30,
                  border: isActive ? 'none' : '1px solid #cbd5e1',
                  background: isActive ? '#8b5cf6' : '#fff',
                  color: isActive ? '#fff' : '#475569',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(139, 92, 246, 0.35)' : 'none',
                  fontFamily: 'inherit'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3x2 Grid of Testimonial Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 28,
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                justifyContent: 'space-between',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              {/* Quote & Stars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                
                <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: item.avatarBg, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.avatar}
                </div>
                <div>
                  <strong style={{ fontSize: 13, color: '#0f172a', display: 'block', lineHeight: 1.2 }}>{item.name}</strong>
                  <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.2 }}>{item.title} • {item.institution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
