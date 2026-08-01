import React, { useState } from 'react';
import { 
  ShieldCheck, Bell, Smartphone, Cloud, Lock, 
  Building2, Sparkles, BarChart3, ChevronRight, 
  CheckCircle2, Server, ShieldAlert, Activity, FileCheck,
  Send, Mail, Smartphone as MobileIcon, Layers, Database,
  TrendingUp, Cpu, PieChart, Check
} from 'lucide-react';

const FEATURES = [
  {
    id: 'role-based',
    icon: ShieldCheck,
    title: 'Role-Based Access',
    color: '#8b5cf6',
    bg: '#f3e8ff',
    badge: 'Most Secure',
    desc: 'Every user sees exactly what they need. Granular permissions ensure data security while maximizing usability across 11+ distinct roles.',
    bullets: [
      '11 pre-built roles from Teacher to Security',
      'Custom role creation with granular permissions',
      'Feature-level access control',
      'Audit trail for all actions'
    ]
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Real-Time Notifications',
    color: '#3b82f6',
    bg: '#eff6ff',
    badge: 'Instant Alerts',
    desc: 'Keep everyone in the loop with instant alerts for attendance, fees, exams, and announcements via SMS, email, and push notifications.',
    bullets: [
      'Instant push notifications on mobile',
      'Automated SMS for fee reminders',
      'Customizable email templates',
      'In-app notification center'
    ]
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Friendly',
    color: '#06b6d4',
    bg: '#ecfeff',
    badge: 'Cross-Platform',
    desc: 'A unified experience across all devices. Parents, students, and staff can access their portals seamlessly on smartphones and tablets.',
    bullets: [
      'Native iOS and Android apps available',
      'Fully responsive web portals',
      'Offline sync capabilities',
      'Touch-optimized interfaces'
    ]
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud-Based',
    color: '#f59e0b',
    bg: '#fef3c7',
    badge: '99.9% Uptime',
    desc: 'Access your school data from anywhere, anytime. Our cloud infrastructure scales automatically to meet your needs without hardware costs.',
    bullets: [
      'Zero on-premise hardware required',
      'Automatic daily backups',
      'Infinite storage scaling',
      'Access from any global location'
    ]
  },
  {
    id: 'secure',
    icon: Lock,
    title: 'Secure Data',
    color: '#10b981',
    bg: '#d1fae5',
    badge: 'AES-256 Bit',
    desc: 'Enterprise-grade encryption for all data at rest and in transit. Your institution\'s sensitive information is protected against modern threats.',
    bullets: [
      'AES-256 data encryption',
      'Regular penetration testing',
      'SOC 2 Type II compliant data centers',
      'Strict password policies'
    ]
  },
  {
    id: 'multi',
    icon: Building2,
    title: 'Multi-School Support',
    color: '#3b82f6',
    bg: '#eff6ff',
    badge: 'Group Management',
    desc: 'Manage multiple branches or institutions from a single centralized dashboard. Aggregate reports and maintain consistent standards.',
    bullets: [
      'Centralized admin dashboard',
      'Cross-branch reporting and analytics',
      'Standardized settings deployment',
      'Global fee structures'
    ]
  },
  {
    id: 'ai',
    icon: Sparkles,
    title: 'AI Automation',
    color: '#8b5cf6',
    bg: '#f3e8ff',
    badge: 'Smart Engine',
    desc: 'Leverage artificial intelligence to automate repetitive tasks, generate insights, and provide 24/7 assistance to students and staff.',
    bullets: [
      'AI-powered student performance insights',
      'Automated timetable generation',
      'Smart fee default prediction',
      'Intelligent chatbots for queries'
    ]
  },
  {
    id: 'reports',
    icon: BarChart3,
    title: 'Reports & Dashboards',
    color: '#ef4444',
    bg: '#fee2e2',
    badge: 'Real-Time Insights',
    desc: 'Transform raw data into actionable intelligence. Generate comprehensive reports on attendance, academics, finance, and more.',
    bullets: [
      '100+ pre-built report templates',
      'Custom report builder with drag-and-drop',
      'Visual data dashboards',
      'Scheduled automated email exports'
    ]
  }
];

export const FeatureHighlightsSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState(FEATURES[0].id);
  const activeFeature = FEATURES.find(f => f.id === activeTabId)!;

  const renderIllustration = () => {
    switch (activeTabId) {
      case 'notifications':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 20, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MobileIcon size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>Push Notification</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Attendance marked for Class 10-A</div>
              </div>
              <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>Just now</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fef3c7', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>Email Sent</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Fee receipt #4912 sent to Parent</div>
              </div>
              <span style={{ fontSize: 10, color: '#6b7280' }}>2m ago</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>SMS Broadcast</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Exam timetable alert to 450 parents</div>
              </div>
              <span style={{ fontSize: 10, color: '#6b7280' }}>5m ago</span>
            </div>
          </div>
        );
      case 'mobile':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <div style={{ width: 140, height: 240, background: '#0f172a', borderRadius: 24, padding: 8, border: '4px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ width: 40, height: 4, background: '#334155', borderRadius: 2, margin: '2px auto 4px' }} />
              <div style={{ flex: 1, background: '#f8fafc', borderRadius: 16, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ height: 16, background: '#06b6d4', borderRadius: 4 }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  <div style={{ height: 30, background: '#e0f2fe', borderRadius: 4 }} />
                  <div style={{ height: 30, background: '#e0f2fe', borderRadius: 4 }} />
                </div>
                <div style={{ height: 40, background: '#fff', borderRadius: 6, border: '1px solid #e2e8f0' }} />
                <div style={{ height: 40, background: '#fff', borderRadius: 6, border: '1px solid #e2e8f0' }} />
              </div>
            </div>
          </div>
        );
      case 'cloud':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #f59e0b, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)' }}>
              <Cloud size={32} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Global Cloud Network</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 11, background: '#fff', padding: '4px 8px', borderRadius: 6, border: '1px solid #e2e8f0', color: '#475569' }}>AWS Multi-Region</span>
              <span style={{ fontSize: 11, background: '#fff', padding: '4px 8px', borderRadius: 6, border: '1px solid #e2e8f0', color: '#475569' }}>Auto Backup</span>
            </div>
          </div>
        );
      case 'secure':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
              <Lock size={32} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>AES-256 Encryption</div>
            <div style={{ fontSize: 11, color: '#059669', background: '#d1fae5', padding: '4px 12px', borderRadius: 12, fontWeight: 600 }}>SOC 2 Type II Certified</div>
          </div>
        );
      case 'multi':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)' }}>
              <Building2 size={32} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Centralized Campus Control</div>
            <div style={{ fontSize: 11, color: '#1d4ed8', background: '#eff6ff', padding: '4px 12px', borderRadius: 12, fontWeight: 600 }}>Manage 50+ Branches</div>
          </div>
        );
      case 'ai':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)' }}>
              <Sparkles size={32} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>AI Intelligence Engine</div>
            <div style={{ fontSize: 11, color: '#6d28d9', background: '#f3e8ff', padding: '4px 12px', borderRadius: 12, fontWeight: 600 }}>Automated Timetables & Analytics</div>
          </div>
        );
      case 'reports':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #ef4444, #b91c1c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)' }}>
              <BarChart3 size={32} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Interactive Analytics</div>
            <div style={{ fontSize: 11, color: '#b91c1c', background: '#fee2e2', padding: '4px 12px', borderRadius: 12, fontWeight: 600 }}>100+ Custom Export Formats</div>
          </div>
        );
      default: // role-based
        return (
          <div className="mkt-security-illus" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div className="mkt-sec-node mkt-sec-node--tl" style={{ position: 'absolute', top: 20, left: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={14}/></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 11, color: '#1e293b' }}>Principal</strong><span style={{ fontSize: 10, color: '#64748b' }}>Full Access</span></div>
            </div>
            <div className="mkt-sec-node mkt-sec-node--ml" style={{ position: 'absolute', top: 100, left: 5, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldAlert size={14}/></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 11, color: '#1e293b' }}>Teacher</strong><span style={{ fontSize: 10, color: '#64748b' }}>Limited Access</span></div>
            </div>
            <div className="mkt-sec-node mkt-sec-node--bl" style={{ position: 'absolute', bottom: 25, left: 20, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: '#d1fae5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={14}/></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 11, color: '#1e293b' }}>Student</strong><span style={{ fontSize: 10, color: '#64748b' }}>Basic Access</span></div>
            </div>
            <div className="mkt-sec-node mkt-sec-node--tr" style={{ position: 'absolute', top: 50, right: 10, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={14}/></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 11, color: '#1e293b' }}>Accountant</strong><span style={{ fontSize: 10, color: '#64748b' }}>Financial Access</span></div>
            </div>
            
            <div style={{ position: 'absolute', top: '50%', left: '55%', transform: 'translate(-50%, -50%)', width: 80, height: 90, background: 'linear-gradient(135deg, #a855f7, #6366f1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(139, 92, 246, 0.35)', zIndex: 3 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={24} color="#fff" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="mkt-section mkt-features-section" id="features" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #f8f9fc 0%, #fff 100%)' }}>
      <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#f3e8ff', color: '#8b5cf6', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <Sparkles size={14} /> Features That Matter
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Built for <span style={{ background: 'linear-gradient(90deg, #8b5cf6, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Modern Schools</span>
          </h2>
          <p style={{ fontSize: 17, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Every feature is designed with security, scalability, and simplicity in mind.
          </p>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)', overflow: 'hidden', marginBottom: 32, border: '1px solid #e5e7eb' }}>
          
          {/* Tabs Column */}
          <div style={{ width: 270, flexShrink: 0, background: '#fafbfd', borderRight: '1px solid #f1f5f9', padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeTabId === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTabId(feature.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    padding: '14px 20px',
                    background: isActive ? '#faf5ff' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? '3px solid #8b5cf6' : '3px solid transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: feature.bg, color: feature.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} strokeWidth={2} />
                  </div>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: isActive ? '#8b5cf6' : '#334155' }}>
                    {feature.title}
                  </span>
                  {isActive && (
                    <ChevronRight size={16} color="#8b5cf6" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel Column */}
          <div style={{ flex: 1, padding: 36, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: activeFeature.bg, color: activeFeature.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <activeFeature.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>{activeFeature.title}</h3>
              <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20, color: activeFeature.color, background: activeFeature.bg }}>
                {activeFeature.badge}
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
              
              {/* Text Content */}
              <div>
                <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, margin: '0 0 20px 0' }}>{activeFeature.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {activeFeature.bullets.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#334155', fontWeight: 500 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Graphic Illustration */}
              <div style={{ position: 'relative', height: 260, background: 'linear-gradient(135deg, #faf5ff 0%, #eff6ff 100%)', borderRadius: 16, border: '1px solid #f3e8ff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {renderIllustration()}
              </div>

            </div>
          </div>
        </div>

        {/* Security Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Server size={20}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>100%</strong>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Secure Platform</span>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={20}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>99.9%</strong>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Uptime Guarantee</span>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Activity size={20}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>24/7</strong>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>System Monitoring</span>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileCheck size={20}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>GDPR</strong>
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Compliant</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
