import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, Check, ArrowRight, Star, ShieldCheck, 
  Users, HardDrive, Layers, UserCheck, Zap
} from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="mkt-section" id="pricing" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #fff 0%, #f8f9fc 100%)' }}>
      <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#f3e8ff', color: '#8b5cf6', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <CreditCard size={14} /> Pricing Plans
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Simple, <span style={{ background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Transparent</span> Pricing
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Choose the plan that fits your school. All plans include a 14-day free trial — no credit card required.
          </p>
        </div>

        {/* Monthly / Annual Billing Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: !annual ? '#0f172a' : '#64748b' }}>Monthly</span>
          
          <button
            onClick={() => setAnnual(!annual)}
            style={{
              width: 52,
              height: 28,
              borderRadius: 20,
              background: annual ? '#8b5cf6' : '#cbd5e1',
              border: 'none',
              padding: 3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: annual ? 'flex-end' : 'flex-start',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </button>

          <span style={{ fontSize: 14, fontWeight: 600, color: annual ? '#0f172a' : '#64748b' }}>Annual</span>
          {annual && (
            <span style={{ fontSize: 12, fontWeight: 700, background: '#d1fae5', color: '#10b981', padding: '3px 10px', borderRadius: 20 }}>
              Save 20%
            </span>
          )}
        </div>

        {/* 3 Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
          
          {/* Card 1: STARTER */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: '#eff6ff', color: '#2563eb' }}>
              Best for Small Schools
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>Starter</h3>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>Perfect for getting started</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>₹</span>
              <strong style={{ fontSize: 40, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{annual ? '3,999' : '4,999'}</strong>
              <span style={{ fontSize: 14, color: '#64748b' }}>/ month</span>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
              {annual ? 'Billed annually (₹47,988/year)' : 'Billed monthly'}
            </div>

            <p style={{ fontSize: 12, color: '#475569', margin: '0 0 20px', padding: '8px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #f1f5f9' }}>
              Ideal for small schools & new institutions • Up to 500 students
            </p>

            {/* Quick Specs 2x2 Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: 14, background: '#f0f9ff', borderRadius: 14, marginBottom: 24, border: '1px solid #e0f2fe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={16} color="#0284c7" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#0369a1' }}>50</strong>
                  <span style={{ fontSize: 10, color: '#0284c7' }}>Max Users</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <HardDrive size={16} color="#0284c7" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#0369a1' }}>10 GB</strong>
                  <span style={{ fontSize: 10, color: '#0284c7' }}>Storage</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={16} color="#0284c7" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#0369a1' }}>10</strong>
                  <span style={{ fontSize: 10, color: '#0284c7' }}>Modules</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <UserCheck size={16} color="#0284c7" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#0369a1' }}>6</strong>
                  <span style={{ fontSize: 10, color: '#0284c7' }}>Roles</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {[
                'Go paperless in 7 days',
                'Simple fee collection',
                'Parent mobile app',
                'Online Admissions Portal',
                'Student & Teacher Profiles',
                'Attendance tracking',
                'Homework & Assignments',
                'Exam Results & Report Cards',
                'Fee Collection & Receipts'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155' }}>
                  <Check size={16} color="#8b5cf6" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/pricing/starter"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: '2px solid #cbd5e1', background: '#fff', color: '#334155', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}
            >
              Choose Starter <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card 2: PROFESSIONAL (FEATURED) */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, border: '2px solid #8b5cf6', boxShadow: '0 12px 36px rgba(139, 92, 246, 0.15)', display: 'flex', flexDirection: 'column', position: 'relative', transform: 'translateY(-8px)' }}>
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#8b5cf6', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 16px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
              <Star size={12} fill="currentColor" /> Most Popular
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '8px 0 4px' }}>Professional</h3>
            <p style={{ fontSize: 13, color: '#8b5cf6', fontWeight: 600, margin: '0 0 20px' }}>Most popular choice</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>₹</span>
              <strong style={{ fontSize: 40, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{annual ? '7,999' : '9,999'}</strong>
              <span style={{ fontSize: 14, color: '#64748b' }}>/ month</span>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
              {annual ? 'Billed annually (₹95,988/year)' : 'Billed monthly'}
            </div>

            <p style={{ fontSize: 12, color: '#475569', margin: '0 0 20px', padding: '8px 12px', background: '#faf5ff', borderRadius: 8, border: '1px solid #f3e8ff' }}>
              Great for growing schools & institutions • 500 - 2,000 students
            </p>

            {/* Quick Specs 2x2 Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: 14, background: '#faf5ff', borderRadius: 14, marginBottom: 24, border: '1px solid #f3e8ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={16} color="#8b5cf6" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#6d28d9' }}>200</strong>
                  <span style={{ fontSize: 10, color: '#8b5cf6' }}>Max Users</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <HardDrive size={16} color="#8b5cf6" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#6d28d9' }}>50 GB</strong>
                  <span style={{ fontSize: 10, color: '#8b5cf6' }}>Storage</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={16} color="#8b5cf6" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#6d28d9' }}>16</strong>
                  <span style={{ fontSize: 10, color: '#8b5cf6' }}>Modules</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <UserCheck size={16} color="#8b5cf6" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#6d28d9' }}>9</strong>
                  <span style={{ fontSize: 10, color: '#8b5cf6' }}>Roles</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {[
                'Everything in Starter, plus',
                'Complete ERP operations',
                'Advanced analytics & reports',
                'Priority phone support',
                'Everything in Starter',
                'Library Management',
                'Transport & GPS Tracking',
                'HR & Payroll',
                'Finance & Accounting',
                'Inventory Management'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155', fontWeight: i === 0 ? 700 : 500 }}>
                  <Check size={16} color="#8b5cf6" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/pricing/professional"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: '#8b5cf6', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)', transition: 'all 0.2s' }}
            >
              Choose Professional <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card 3: ENTERPRISE */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: '#d1fae5', color: '#059669' }}>
              Most Powerful
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>Enterprise</h3>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>For large institutions & networks</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>₹</span>
              <strong style={{ fontSize: 40, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{annual ? '15,999' : '18,999'}</strong>
              <span style={{ fontSize: 14, color: '#64748b' }}>/ month</span>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
              {annual ? 'Billed annually (₹191,988/year)' : 'Billed monthly'}
            </div>

            <p style={{ fontSize: 12, color: '#475569', margin: '0 0 20px', padding: '8px 12px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #dcce67' }}>
              For large schools, groups & university networks • 2,000+ students
            </p>

            {/* Quick Specs 2x2 Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: 14, background: '#f0fdf4', borderRadius: 14, marginBottom: 24, border: '1px solid #dcfce7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={16} color="#10b981" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#047857' }}>Unlimited</strong>
                  <span style={{ fontSize: 10, color: '#10b981' }}>Max Users</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <HardDrive size={16} color="#10b981" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#047857' }}>Unlimited</strong>
                  <span style={{ fontSize: 10, color: '#10b981' }}>Storage</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={16} color="#10b981" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#047857' }}>18+</strong>
                  <span style={{ fontSize: 10, color: '#10b981' }}>Modules</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <UserCheck size={16} color="#10b981" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: 13, color: '#047857' }}>11+</strong>
                  <span style={{ fontSize: 10, color: '#10b981' }}>Roles</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {[
                'Everything in Professional, plus',
                'AI-powered automation',
                'Multi-branch control center',
                'Dedicated account manager',
                'Everything in Professional',
                'Hostel Management',
                'Security & Gate Management',
                'AI-Powered Assistant',
                'Predictive Analytics',
                'Multi-Branch Management'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155', fontWeight: i === 0 ? 700 : 500 }}>
                  <Check size={16} color="#10b981" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/pricing/enterprise"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: '2px solid #a7f3d0', background: '#fff', color: '#047857', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}
            >
              Choose Enterprise <ArrowRight size={16} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
