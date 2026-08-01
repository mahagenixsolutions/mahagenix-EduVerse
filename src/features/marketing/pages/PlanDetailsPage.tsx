import React from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { getPlanById } from '../data/plans';
import { getModulesByPlan } from '../data/modules';
import { ROLES } from '../data/roles';
import { MarketingNav } from '../components/MarketingNav';
import { MarketingFooter } from '../sections/MarketingFooter';
import { DynamicIcon } from '../components/DynamicIcon';
import {
  ArrowLeft, ArrowRight, Sparkles, Play, Building2, Check,
  Users, HardDrive, BarChart3, Headphones, CheckCircle2,
  ShieldCheck, CalendarCheck, Receipt, GraduationCap
} from 'lucide-react';
import '../marketing.css';

export const PlanDetailsPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const plan = getPlanById(planId || '');

  if (!plan) return <Navigate to="/" replace />;

  const planModules = getModulesByPlan(plan.id);
  const planRoles = ROLES.filter(r => plan.roles.includes(r.id));

  // Split features into two columns
  const midIndex = Math.ceil(plan.features.length / 2);
  const col1Features = plan.features.slice(0, midIndex);
  const col2Features = plan.features.slice(midIndex);

  const getCategoryBgColor = (cat: string) => {
    switch (cat) {
      case 'core': return { bg: '#f3e8ff', color: '#8b5cf6' };
      case 'academic': return { bg: '#eff6ff', color: '#3b82f6' };
      case 'administration': return { bg: '#d1fae5', color: '#10b981' };
      case 'services': return { bg: '#ffedd5', color: '#f97316' };
      case 'advanced': return { bg: '#fce7f3', color: '#ec4899' };
      default: return { bg: '#e6f4ed', color: '#10b981' };
    }
  };

  return (
    <div className="mkt-page" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <MarketingNav />

      <div className="mkt-plan-details-page" style={{ paddingTop: '120px', paddingBottom: '80px', background: '#f8fafc' }}>
        <div className="mkt-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Top Back Link */}
          <a
            href="#pricing"
            className="mkt-plan-back-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#10b981',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '28px'
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              setTimeout(() => {
                document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            <ArrowLeft size={16} /> Back to Pricing
          </a>

          {/* ─── Hero Section (2-Column Grid) ───────────────────── */}
          <div className="mkt-plan-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '48px' }}>
            {/* Left Content */}
            <div className="mkt-plan-hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="mkt-plan-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: '#d1fae5', color: '#059669', border: '1px solid #a7f3d0', fontSize: '13px', fontWeight: 600, marginBottom: '20px' }}>
                <Sparkles size={14} color="#10b981" />
                <span>{plan.badge || 'Most Popular Plan'}</span>
              </div>

              <h1 className="mkt-plan-hero-title" style={{ fontSize: '44px', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                {plan.name} <span className="mkt-text-emerald" style={{ color: '#10b981' }}>Plan</span>
              </h1>

              <p className="mkt-plan-hero-desc" style={{ fontSize: '16px', lineHeight: 1.6, color: '#64748b', margin: '0 0 32px', maxWidth: '520px' }}>
                {plan.description}
              </p>

              <div className="mkt-plan-hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to={`/register?plan=${plan.id}`} className="mkt-btn-emerald-lg" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 32px', background: '#10b981', color: '#ffffff', fontSize: '15px', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', border: 'none', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)' }}>
                  Start Free Trial <ArrowRight size={18} />
                </Link>
                <a
                  href="#contact"
                  className="mkt-btn-white-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 32px', background: '#ffffff', color: '#0f172a', fontSize: '15px', fontWeight: 600, borderRadius: '12px', textDecoration: 'none', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  <Play size={16} style={{ color: '#10b981', fill: '#10b981' }} /> Request Demo
                </a>
              </div>
            </div>

            {/* Right Dashboard Mockup Graphic */}
            <div className="mkt-plan-hero-graphic" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', width: '100%', maxWidth: '440px', marginLeft: 'auto' }}>
              <div className="mkt-plan-float-badge mkt-plan-float-badge--cap-top" style={{ position: 'absolute', top: '-10px', right: '30px', width: '40px', height: '40px', borderRadius: '50%', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 3 }}>
                <GraduationCap size={20} color="#fff" />
              </div>
              <div className="mkt-plan-float-badge mkt-plan-float-badge--cap-left" style={{ position: 'absolute', top: '40px', left: '-10px', width: '40px', height: '40px', borderRadius: '50%', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 3 }}>
                <GraduationCap size={20} color="#fff" />
              </div>
              <div className="mkt-plan-float-badge mkt-plan-float-badge--cal" style={{ position: 'absolute', top: '20px', right: '-15px', width: '40px', height: '40px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 3 }}>
                <CalendarCheck size={20} color="#fff" />
              </div>
              <div className="mkt-plan-float-circle" style={{ position: 'absolute', bottom: '10px', left: '10px', width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #f59e0b)', boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)' }}></div>

              <div className="mkt-plan-graphic-card" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)', padding: '20px', width: '360px', maxWidth: '100%', position: 'relative', zIndex: 2 }}>
                {/* 3 Top Stat Badges */}
                <div className="mkt-plan-graphic-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                  <div className="mkt-plan-stat-item" style={{ background: '#f8fafc', borderRadius: '10px', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '4px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                    <div className="mkt-plan-stat-icon mkt-plan-stat-icon--blue" style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px' }}>
                      <Users size={14} />
                    </div>
                    <div>
                      <span className="mkt-plan-stat-label" style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, display: 'block' }}>Students</span>
                      <strong className="mkt-plan-stat-val" style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'block' }}>1,284</strong>
                    </div>
                  </div>
                  <div className="mkt-plan-stat-item" style={{ background: '#f8fafc', borderRadius: '10px', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '4px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                    <div className="mkt-plan-stat-icon mkt-plan-stat-icon--green" style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px' }}>
                      <CalendarCheck size={14} />
                    </div>
                    <div>
                      <span className="mkt-plan-stat-label" style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, display: 'block' }}>Attendance</span>
                      <strong className="mkt-plan-stat-val" style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'block' }}>98.5%</strong>
                    </div>
                  </div>
                  <div className="mkt-plan-stat-item" style={{ background: '#f8fafc', borderRadius: '10px', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: '4px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                    <div className="mkt-plan-stat-icon mkt-plan-stat-icon--orange" style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#fef3c7', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px' }}>
                      <Receipt size={14} />
                    </div>
                    <div>
                      <span className="mkt-plan-stat-label" style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, display: 'block' }}>Fee Collection</span>
                      <strong className="mkt-plan-stat-val" style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'block' }}>₹18.5L</strong>
                    </div>
                  </div>
                </div>

                {/* Charts Area */}
                <div className="mkt-plan-graphic-charts" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '10px', alignItems: 'center' }}>
                  <div className="mkt-plan-chart-box" style={{ background: '#f8fafc', borderRadius: '12px', padding: '8px', border: '1px solid #f1f5f9', height: '70px', maxHeight: '70px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg style={{ width: "100%", height: "50px", display: "block" }} viewBox="0 0 200 80" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(124, 58, 237, 0.3)" />
                          <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
                        </linearGradient>
                      </defs>
                      <path d="M0 80 L0 50 Q 25 70, 50 35 T 100 45 T 150 15 T 200 60 L200 80 Z" fill="url(#purpleGrad)" />
                      <path d="M0 50 Q 25 70, 50 35 T 100 45 T 150 15 T 200 60" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
                      <circle cx="50" cy="35" r="3" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
                      <circle cx="100" cy="45" r="3" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
                      <circle cx="150" cy="15" r="3" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="mkt-plan-donut-box" style={{ background: '#f8fafc', borderRadius: '12px', padding: '8px', border: '1px solid #f1f5f9', height: '70px', maxHeight: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg style={{ width: "50px", height: "50px", display: "block" }} viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="22" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                      <circle cx="30" cy="30" r="22" fill="none" stroke="#7c3aed" strokeWidth="8" strokeDasharray="100 38" strokeDashoffset="25" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── "Who is this plan for?" Banner ─────────────────── */}
          <div className="mkt-plan-audience-banner" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', background: 'linear-gradient(135deg, #f0fdf4 0%, #e6f4ed 100%)', border: '1px solid #d1fae5', borderRadius: '16px', padding: '20px 28px', marginBottom: '48px' }}>
            <div className="mkt-plan-audience-icon" style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)', flexShrink: 0 }}>
              <Building2 size={24} color="#10b981" />
            </div>
            <div className="mkt-plan-audience-content">
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Who is this plan for?</h3>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
                {plan.targetAudience} — ideal for institutions with{' '}
                <span className="mkt-text-emerald-bold" style={{ color: '#10b981', fontWeight: 700 }}>{plan.schoolSize}</span> students.
              </p>
            </div>
          </div>

          {/* ─── Included Modules (16) ─────────────────────────── */}
          <div className="mkt-plan-section" style={{ marginBottom: '56px' }}>
            <div className="mkt-plan-section-header" style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.01em' }}>Included Modules ({planModules.length})</h2>
              <div className="mkt-plan-section-line" style={{ width: '32px', height: '3px', background: '#10b981', borderRadius: '2px' }}></div>
            </div>

            <div className="mkt-plan-modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {planModules.map((mod) => {
                const colors = getCategoryBgColor(mod.category);
                return (
                  <div
                    key={mod.id}
                    className="mkt-plan-module-card"
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      padding: '24px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                    }}
                  >
                    <div
                      className={`mkt-plan-mod-icon mkt-plan-mod-icon--${mod.category}`}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: colors.bg,
                        color: colors.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        flexShrink: 0
                      }}
                    >
                      <DynamicIcon name={mod.icon} size={20} />
                    </div>
                    <h3 className="mkt-plan-mod-title" style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{mod.name}</h3>
                    <p className="mkt-plan-mod-desc" style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{mod.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Available Roles (9) ───────────────────────────── */}
          <div className="mkt-plan-section" style={{ marginBottom: '56px' }}>
            <div className="mkt-plan-section-header" style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.01em' }}>Available Roles ({planRoles.length})</h2>
              <div className="mkt-plan-section-line" style={{ width: '32px', height: '3px', background: '#10b981', borderRadius: '2px' }}></div>
            </div>

            <div className="mkt-plan-roles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {planRoles.map((role) => (
                <div
                  key={role.id}
                  className="mkt-plan-role-chip"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div className="mkt-plan-role-icon" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e6f4ed', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <DynamicIcon name={role.icon} size={16} />
                  </div>
                  <div>
                    <strong className="mkt-plan-role-name" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{role.name}</strong>
                    <span className="mkt-plan-role-type" style={{ display: 'block', fontSize: '11px', color: '#94a3b8' }}>{role.platform === 'learning' ? 'Learning' : 'ERP'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Complete Feature List & Pricing Box ───────────── */}
          <div className="mkt-plan-section" style={{ marginBottom: '56px' }}>
            <div className="mkt-plan-section-header" style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.01em' }}>Complete Feature List</h2>
              <div className="mkt-plan-section-line" style={{ width: '32px', height: '3px', background: '#10b981', borderRadius: '2px' }}></div>
            </div>

            <div className="mkt-plan-features-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }}>
              {/* Left Column: Features Sub-grid */}
              <div className="mkt-plan-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px' }}>
                <div>
                  {col1Features.map((f, i) => (
                    <div key={i} className="mkt-plan-feature-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: 14 }}>
                      <div className="mkt-plan-feature-check" style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div>
                  {col2Features.map((f, i) => (
                    <div key={i} className="mkt-plan-feature-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 500, color: '#334155', marginBottom: 14 }}>
                      <div className="mkt-plan-feature-check" style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Sticky Plan Pricing Summary Box */}
              <div className="mkt-plan-summary-card" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e6f4ed 100%)', border: '1px solid #a7f3d0', borderRadius: '20px', padding: '28px', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.08)' }}>
                <div className="mkt-plan-summary-name" style={{ fontSize: '16px', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>{plan.name} Plan</div>
                <div className="mkt-plan-summary-price" style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                  ₹{plan.price.annual.toLocaleString()}
                  <span className="mkt-plan-summary-period" style={{ fontSize: '14px', fontWeight: 400, color: '#64748b', marginLeft: '4px' }}>/mo</span>
                </div>
                <div className="mkt-plan-summary-sub" style={{ fontSize: '12px', color: '#64748b', marginBottom: '24px', marginTop: '6px' }}>
                  Billed annually • 14-day free trial
                </div>
                <div className="mkt-plan-summary-list" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="mkt-plan-summary-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                    <Users size={16} color="#10b981" />
                    <span>{plan.maxUsers ? `${plan.maxUsers} Users` : 'Unlimited Users'}</span>
                  </div>
                  <div className="mkt-plan-summary-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                    <HardDrive size={16} color="#10b981" />
                    <span>{plan.storage} Storage</span>
                  </div>
                  <div className="mkt-plan-summary-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                    <BarChart3 size={16} color="#10b981" />
                    <span>{plan.analytics.charAt(0).toUpperCase() + plan.analytics.slice(1)} Analytics</span>
                  </div>
                  <div className="mkt-plan-summary-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                    <Headphones size={16} color="#10b981" />
                    <span>{plan.support}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Bottom Actions Bar ────────────────────────────── */}
          <div className="mkt-plan-bottom-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            <Link to={`/register?plan=${plan.id}`} className="mkt-btn-emerald-lg mkt-btn-full" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 32px', background: '#10b981', color: '#ffffff', fontSize: '15px', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', border: 'none', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)', width: '100%', textAlign: 'center' }}>
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <a
              href="#contact"
              className="mkt-btn-white-lg mkt-btn-full"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 32px', background: '#ffffff', color: '#0f172a', fontSize: '15px', fontWeight: 600, borderRadius: '12px', textDecoration: 'none', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', width: '100%', textAlign: 'center' }}
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                setTimeout(() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              <Play size={16} style={{ color: '#10b981', fill: '#10b981' }} /> Request Demo
            </a>
          </div>

          {/* ─── Bottom Guarantee / Support Bar ────────────────── */}
          <div className="mkt-plan-trust-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: '16px', padding: '20px 32px' }}>
            <div className="mkt-plan-trust-item" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' }}>
              <div className="mkt-plan-trust-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.12)', flexShrink: 0 }}>
                <CheckCircle2 size={20} color="#10b981" />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>14-Day Free Trial</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>No credit card required. Cancel anytime.</span>
              </div>
            </div>
            <div className="mkt-plan-trust-item" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' }}>
              <div className="mkt-plan-trust-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.12)', flexShrink: 0 }}>
                <ShieldCheck size={20} color="#10b981" />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>Secure &amp; Reliable</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>Your data is safe with enterprise-grade security.</span>
              </div>
            </div>
            <div className="mkt-plan-trust-item" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' }}>
              <div className="mkt-plan-trust-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.12)', flexShrink: 0 }}>
                <Headphones size={20} color="#10b981" />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', fontWeight: 700 }}>24/7 Priority Support</strong>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>We're here to help you succeed.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <MarketingFooter />
    </div>
  );
};
