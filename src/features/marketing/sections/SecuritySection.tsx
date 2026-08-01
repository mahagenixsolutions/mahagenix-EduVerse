import React from 'react';
import { Shield, Lock, Cloud, Database, KeyRound, FileCheck } from 'lucide-react';

const SECURITY_ITEMS = [
  {
    icon: Lock,
    color: '#8b5cf6',
    bg: '#f3e8ff',
    title: 'SSL Encryption',
    text: 'All data encrypted in transit with TLS 1.3 and at rest with AES-256 encryption.',
  },
  {
    icon: Cloud,
    color: '#3b82f6',
    bg: '#eff6ff',
    title: 'Cloud Infrastructure',
    text: 'Hosted on ISO 27001-certified cloud data centers with 99.99% uptime SLA.',
  },
  {
    icon: Database,
    color: '#10b981',
    bg: '#d1fae5',
    title: 'Daily Backups',
    text: 'Automatic backups every 6 hours with geo-redundant storage and instant recovery.',
  },
  {
    icon: KeyRound,
    color: '#f59e0b',
    bg: '#fef3c7',
    title: 'Role Permissions',
    text: 'Granular role-based access control ensures users see only what they need.',
  },
  {
    icon: FileCheck,
    color: '#ec4899',
    bg: '#fce7f3',
    title: 'Audit Logs',
    text: 'Complete audit trail of every action for compliance, accountability, and transparency.',
  },
  {
    icon: Shield,
    color: '#06b6d4',
    bg: '#ecfeff',
    title: 'Data Encryption',
    text: 'SOC 2 Type II certified with GDPR compliance and regular penetration testing.',
  },
];

export const SecuritySection: React.FC = () => (
  <section className="mkt-section" id="security" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)' }}>
    <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#f3e8ff', color: '#8b5cf6', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          <Shield size={14} /> Security & Compliance
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Bank-Grade <span style={{ color: '#8b5cf6' }}>Security</span> for Your Data
        </h2>
        <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          We take data protection seriously. Your institution's data is safeguarded with enterprise-grade security at every layer.
        </p>
      </div>

      {/* 3x2 Security Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {SECURITY_ITEMS.map((item, i) => {
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
                alignItems: 'flex-start',
                gap: 18,
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </section>
);
