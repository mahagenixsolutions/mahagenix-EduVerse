import React from 'react';
import { Plug, Video, MessageCircle, CreditCard, MessageSquare, Mail, Fingerprint } from 'lucide-react';

const INTEGRATIONS_DATA = [
  {
    id: 'google',
    name: 'Google Workspace',
    desc: 'Sync with Google Classroom, Drive, Calendar, and Gmail for seamless collaboration.',
    customLogo: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z"/>
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
      </svg>
    )
  },
  {
    id: 'microsoft',
    name: 'Microsoft 365',
    desc: 'Integrate with Teams, Outlook, OneDrive, and Azure Active Directory.',
    customLogo: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
      </svg>
    )
  },
  {
    id: 'zoom',
    name: 'Zoom',
    desc: 'One-click video classes and meetings with automatic recording and attendance.',
    icon: Video,
    color: '#2D8CFF',
    bg: '#EBF4FF'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    desc: 'Send automated notifications, reminders, and alerts directly to parents via WhatsApp.',
    icon: MessageCircle,
    color: '#25D366',
    bg: '#DCF8C6'
  },
  {
    id: 'payment',
    name: 'Payment Gateways',
    desc: 'Razorpay, Stripe, PayU — accept fees via UPI, cards, net banking, and wallets.',
    icon: CreditCard,
    color: '#8b5cf6',
    bg: '#f3e8ff'
  },
  {
    id: 'sms',
    name: 'SMS Gateway',
    desc: 'Bulk SMS for attendance alerts, fee reminders, exam updates, and more.',
    icon: MessageSquare,
    color: '#f97316',
    bg: '#ffedd5'
  },
  {
    id: 'email',
    name: 'Email Services',
    desc: 'SendGrid, Mailgun integration for transactional emails and marketing campaigns.',
    icon: Mail,
    color: '#3b82f6',
    bg: '#eff6ff'
  },
  {
    id: 'biometric',
    name: 'Biometric Devices',
    desc: 'Connect fingerprint and face recognition devices for automated attendance.',
    icon: Fingerprint,
    color: '#ec4899',
    bg: '#fce7f3'
  }
];

export const IntegrationsSection: React.FC = () => (
  <section className="mkt-section" id="integrations" style={{ padding: '80px 0', background: '#fff' }}>
    <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#d1fae5', color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          <Plug size={14} /> Integrations
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Connects With <span style={{ color: '#3b82f6' }}>Tools You Already Use</span>
        </h2>
        <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
          EduVerse integrates seamlessly with popular productivity, communication, and payment platforms.
        </p>
      </div>

      {/* 4x2 Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {INTEGRATIONS_DATA.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: 24,
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 12,
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              {/* Logo / Icon Container */}
              <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg || '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.customLogo ? (
                  item.customLogo
                ) : Icon ? (
                  <Icon size={24} color={item.color} strokeWidth={2} />
                ) : null}
              </div>

              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{item.name}</h3>
                <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </section>
);
