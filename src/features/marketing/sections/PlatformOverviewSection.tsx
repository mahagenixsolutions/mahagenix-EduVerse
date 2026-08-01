import React from 'react';
import { 
  Heart, User, GraduationCap, Users, ShieldCheck, 
  Settings, Briefcase, Phone, Bus, Infinity 
} from 'lucide-react';
import laptopMockupImg from 'C:/Users/vasal/.gemini/antigravity-ide/brain/3960ea9f-1b16-445e-af54-44ccfb108293/media__1785408486097.jpg';
import phoneMockupImg from 'C:/Users/vasal/.gemini/antigravity-ide/brain/3960ea9f-1b16-445e-af54-44ccfb108293/media__1785408509788.png';

export const PlatformOverviewSection: React.FC = () => (
  <section className="mkt-section" id="platform" style={{ padding: '80px 0', background: '#fff' }}>
    <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#d1fae5', color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          <Heart size={14} /> Platform Overview
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Two Powerful Apps,<br/>One <span style={{ color: '#8b5cf6' }}>Unified</span> Platform
        </h2>
        <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          The Learning Platform and School ERP work together seamlessly, sharing data and workflows across every role.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'center' }}>
        
        {/* Learning Platform (Left Column) */}
        <div style={{ background: '#f8fafc', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', background: '#fff', border: '1px solid #cbd5e1', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <img src={laptopMockupImg} alt="EduVerse Learning Platform" style={{ width: '100%', height: 'auto', display: 'block', mixBlendMode: 'multiply' }} />
          </div>
          
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#3b82f6', margin: '0 0 4px' }}>EduVerse Learning Platform</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 20px' }}>Interactive learning for every stakeholder</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><User size={18}/></div>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Teacher</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Manage classes, assignments, and student progress</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><GraduationCap size={18}/></div>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Student</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Access lessons, submit assignments, and track growth</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Users size={18}/></div>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Parent</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Monitor child's progress, attendance, and fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Connector Circle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 2, height: 60, background: '#cbd5e1' }} />
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#eff6ff', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)' }}>
            <Infinity size={24} color="#3b82f6" />
          </div>
          <div style={{ width: 2, height: 60, background: '#cbd5e1' }} />
        </div>

        {/* School ERP (Right Column) */}
        <div style={{ background: '#f8fafc', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#10b981', margin: '0 0 4px' }}>EduVerse School ERP</h3>
            <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 20px' }}>Complete administration and operations management</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><ShieldCheck size={18}/></div>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Principal</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Overview school operations and academic excellence</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Settings size={18}/></div>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Admin Manager</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Manage staff, students, finance, and infrastructure</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Briefcase size={18}/></div>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Finance Manager</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Handle fee collection, expenses, budgets, and financial reports</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Phone size={18}/></div>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Receptionist</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Manage inquiries, visitor logs, and front office operations</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Bus size={18}/></div>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>Transport Manager</strong>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Manage routes, vehicles, and student tracking</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', background: '#fff', border: '1px solid #cbd5e1', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'center', padding: 16 }}>
            <img src={phoneMockupImg} alt="EduVerse School ERP on Mobile" style={{ height: 180, width: 'auto', display: 'block', mixBlendMode: 'multiply' }} />
          </div>
        </div>
        
      </div>
    </div>
  </section>
);
