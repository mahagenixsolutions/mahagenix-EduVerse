import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GraduationCap, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { PLANS } from '@/features/marketing/data/plans';
import type { PlanTierId } from '@/features/marketing/types';
import '@/features/marketing/marketing.css';
import { ProvisioningScreen } from '../components/ProvisioningScreen';

const STEPS = ['Choose Plan', 'School Details', 'Administrator', 'Confirmation'];

const SCHOOL_TYPES = ['Primary School', 'Secondary School', 'K-12 School', 'College', 'University', 'Coaching Institute', 'Training Center'];
const SCHOOL_BOARDS = ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge', 'NIOS', 'Other'];
const SCHOOL_SIZES = ['Up to 200', '200–500', '500–1,000', '1,000–2,000', '2,000–5,000', '5,000+'];

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPlan = (searchParams.get('plan') as PlanTierId) || 'professional';

  const [step, setStep] = useState(initialPlan ? 1 : 0);
  const [selectedPlan, setSelectedPlan] = useState<PlanTierId>(initialPlan);
  const [school, setSchool] = useState({ name: '', type: '', board: '', size: '', location: '', website: '' });
  const [admin, setAdmin] = useState({ name: '', email: '', phone: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep(s => Math.min(s + 1, 3));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = () => {
    localStorage.setItem('eduverse_plan', selectedPlan);
    setSubmitted(true);
  };

  if (submitted) {
    return <ProvisioningScreen planId={selectedPlan} />;
  }

  return (
    <div
      className="mkt-register"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        background: '#f8fafc',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      <div
        className="mkt-register__card"
        style={{
          width: '100%',
          maxWidth: '640px',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
          padding: '40px 48px',
          boxSizing: 'border-box'
        }}
      >
        {/* Logo Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={20} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>EduVerse</span>
        </div>

        {/* Stepper Progress */}
        <div className="mkt-register__progress" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 36, width: '100%' }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div
                className={`mkt-register__step ${i === step ? 'mkt-register__step--active' : ''} ${i < step ? 'mkt-register__step--done' : ''}`}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  border: i <= step ? '2px solid #10b981' : '2px solid #cbd5e1',
                  background: i < step ? '#10b981' : i === step ? '#d1fae5' : '#ffffff',
                  color: i < step ? '#ffffff' : i === step ? '#059669' : '#64748b',
                  flexShrink: 0,
                  boxShadow: i === step ? '0 0 0 4px rgba(16, 185, 129, 0.15)' : 'none'
                }}
              >
                {i < step ? <Check size={16} strokeWidth={3} /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mkt-register__step-line ${i < step ? 'mkt-register__step-line--done' : ''}`}
                  style={{
                    flex: 1,
                    height: 3,
                    background: i < step ? '#10b981' : '#e2e8f0',
                    margin: '0 8px',
                    borderRadius: 2
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 0: Choose Plan */}
        {step === 0 && (
          <>
            <h2 className="mkt-register__title" style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', textAlign: 'center', margin: '0 0 6px' }}>Choose Your Plan</h2>
            <p className="mkt-register__subtitle" style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 28px' }}>Select the plan that fits your institution</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PLANS.map(plan => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    padding: '18px 20px',
                    border: `2px solid ${selectedPlan === plan.id ? '#10b981' : '#e2e8f0'}`,
                    borderRadius: '16px',
                    background: selectedPlan === plan.id ? '#f0fdf4' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedPlan === plan.id ? '0 4px 12px rgba(16, 185, 129, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                        {plan.name}
                        {selectedPlan === plan.id && <span style={{ fontSize: 11, background: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>Selected</span>}
                      </div>
                      <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{plan.tagline} • {plan.schoolSize}</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>
                      ₹{plan.price.annual.toLocaleString()}<span style={{ fontSize: 13, fontWeight: 400, color: '#64748b' }}>/mo</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 1: School Details */}
        {step === 1 && (
          <>
            <h2 className="mkt-register__title" style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', textAlign: 'center', margin: '0 0 6px' }}>School Details</h2>
            <p className="mkt-register__subtitle" style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 28px' }}>Tell us about your institution</p>
            <div className="mkt-contact-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>School Name *</label>
                <input
                  className="mkt-contact-form__input"
                  placeholder="e.g., St. Xavier's International School"
                  value={school.name}
                  onChange={e => setSchool({ ...school, name: e.target.value })}
                  required
                  style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              
              <div className="mkt-contact-form__row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Type *</label>
                  <select
                    className="mkt-contact-form__select"
                    value={school.type}
                    onChange={e => setSchool({ ...school, type: e.target.value })}
                    style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="">Select type</option>
                    {SCHOOL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                
                <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Board</label>
                  <select
                    className="mkt-contact-form__select"
                    value={school.board}
                    onChange={e => setSchool({ ...school, board: e.target.value })}
                    style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="">Select board</option>
                    {SCHOOL_BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="mkt-contact-form__row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>School Size *</label>
                  <select
                    className="mkt-contact-form__select"
                    value={school.size}
                    onChange={e => setSchool({ ...school, size: e.target.value })}
                    style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="">Select size</option>
                    {SCHOOL_SIZES.map(s => <option key={s} value={s}>{s} students</option>)}
                  </select>
                </div>
                
                <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Location *</label>
                  <input
                    className="mkt-contact-form__input"
                    placeholder="City, State"
                    value={school.location}
                    onChange={e => setSchool({ ...school, location: e.target.value })}
                    style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Website (optional)</label>
                <input
                  className="mkt-contact-form__input"
                  placeholder="https://www.yourschool.edu"
                  value={school.website}
                  onChange={e => setSchool({ ...school, website: e.target.value })}
                  style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </>
        )}

        {/* Step 2: Administrator */}
        {step === 2 && (
          <>
            <h2 className="mkt-register__title" style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', textAlign: 'center', margin: '0 0 6px' }}>Administrator Account</h2>
            <p className="mkt-register__subtitle" style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 28px' }}>Create the primary admin account for your school</p>
            <div className="mkt-contact-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Full Name *</label>
                <input
                  className="mkt-contact-form__input"
                  placeholder="John Smith"
                  value={admin.name}
                  onChange={e => setAdmin({ ...admin, name: e.target.value })}
                  style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Work Email *</label>
                <input
                  className="mkt-contact-form__input"
                  type="email"
                  placeholder="admin@yourschool.edu"
                  value={admin.email}
                  onChange={e => setAdmin({ ...admin, email: e.target.value })}
                  style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Phone Number *</label>
                <input
                  className="mkt-contact-form__input"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={admin.phone}
                  onChange={e => setAdmin({ ...admin, phone: e.target.value })}
                  style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div className="mkt-contact-form__group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="mkt-contact-form__label" style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Password *</label>
                <input
                  className="mkt-contact-form__input"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={admin.password}
                  onChange={e => setAdmin({ ...admin, password: e.target.value })}
                  style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 12, border: '1.5px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <>
            <h2 className="mkt-register__title" style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', textAlign: 'center', margin: '0 0 6px' }}>Confirm & Start Trial</h2>
            <p className="mkt-register__subtitle" style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 28px' }}>Review your details before we create your account</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 18, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Plan Tier</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{PLANS.find(p => p.id === selectedPlan)?.name} Plan — ₹{PLANS.find(p => p.id === selectedPlan)?.price.annual.toLocaleString()}/mo</div>
              </div>
              
              <div style={{ padding: 18, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>School Information</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{school.name || 'Not specified'}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{school.type || 'Standard'} • {school.location || 'India'}</div>
              </div>

              <div style={{ padding: 18, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Administrator Profile</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{admin.name || 'Not specified'}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{admin.email} • {admin.phone}</div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#475569', cursor: 'pointer', marginTop: 8 }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#10b981', borderRadius: 4 }} />
                <span>I agree to the <a href="#" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a></span>
              </label>
            </div>
          </>
        )}

        {/* Form Actions Footer */}
        <div className="mkt-register__actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 36, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
          {step === 0 ? (
            <Link to="/" className="mkt-btn--ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: '#64748b', fontSize: 14, fontWeight: 600, borderRadius: 12, border: '1px solid #e2e8f0', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Back to Home
            </Link>
          ) : (
            <button className="mkt-btn--ghost" onClick={prev} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: '#64748b', fontSize: 14, fontWeight: 600, borderRadius: 12, border: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
          
          {step < 3 ? (
            <button className="mkt-btn--primary" onClick={next} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 28px', background: '#10b981', color: '#ffffff', fontSize: 14, fontWeight: 700, borderRadius: 12, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}>
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button className="mkt-btn--primary" onClick={handleSubmit} disabled={!agreed} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 28px', background: agreed ? '#10b981' : '#cbd5e1', color: '#ffffff', fontSize: 14, fontWeight: 700, borderRadius: 12, border: 'none', cursor: agreed ? 'pointer' : 'not-allowed', boxShadow: agreed ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none' }}>
              Create Organization <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
