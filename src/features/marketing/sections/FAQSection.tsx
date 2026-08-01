import React, { useState } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, CreditCard, User, Tag, 
  Clock, Shield, Database, Headset, Zap, Lock, RefreshCw, 
  Settings, CheckCircle2, Award
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: '? All Questions' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'support', label: 'Support' },
  { id: 'security', label: 'Data Security' },
  { id: 'migration', label: 'Migration' },
  { id: 'customization', label: 'Customization' }
];

const FAQS_LEFT = [
  {
    id: 1,
    cat: 'pricing',
    icon: CreditCard,
    iconBg: '#d1fae5',
    iconColor: '#10b981',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards, net banking, UPI, and bank transfers for your convenience. All payments are secured with industry-standard encryption.'
  },
  {
    id: 2,
    cat: 'pricing',
    icon: User,
    iconBg: '#eff6ff',
    iconColor: '#3b82f6',
    question: 'Can I switch plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Prorated charges or credits will be applied automatically.'
  },
  {
    id: 3,
    cat: 'pricing',
    icon: Tag,
    iconBg: '#f3e8ff',
    iconColor: '#8b5cf6',
    question: 'Is there a free trial?',
    answer: 'Absolutely. We offer a 14-day full feature free trial with no credit card required so you can test EduVerse thoroughly.'
  },
  {
    id: 4,
    cat: 'pricing',
    icon: Tag,
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees whatsoever. Our pricing is completely transparent and includes all hosting, security updates, and maintenance.'
  },
  {
    id: 5,
    cat: 'implementation',
    icon: Clock,
    iconBg: '#fce7f3',
    iconColor: '#ec4899',
    question: 'How long does implementation take?',
    answer: 'Our standard onboarding takes just 7 days from initial organization setup to final go-live launch.'
  },
  {
    id: 6,
    cat: 'implementation',
    icon: Award,
    iconBg: '#d1fae5',
    iconColor: '#10b981',
    question: 'Do you provide training?',
    answer: 'Yes, we provide hands-on interactive training sessions for your administrators, teachers, and support staff.'
  },
  {
    id: 7,
    cat: 'migration',
    icon: Database,
    iconBg: '#eff6ff',
    iconColor: '#3b82f6',
    question: 'Can I import existing data?',
    answer: 'Yes, our automated data import tools allow you to seamlessly transfer student, teacher, and academic records from Excel or CSV files.'
  }
];

const FAQS_RIGHT = [
  {
    id: 8,
    cat: 'support',
    icon: Headset,
    iconBg: '#f3e8ff',
    iconColor: '#8b5cf6',
    question: 'What support channels are available?',
    answer: 'We provide 24/7 dedicated support via live chat, email, phone, and priority ticket escalation.'
  },
  {
    id: 9,
    cat: 'support',
    icon: Zap,
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    question: 'What is your average response time?',
    answer: 'Our average first-response time is under 15 minutes for support requests and instant for urgent line calls.'
  },
  {
    id: 10,
    cat: 'security',
    icon: Shield,
    iconBg: '#d1fae5',
    iconColor: '#10b981',
    question: 'How is our data protected?',
    answer: 'Your data is encrypted using AES-256 bit encryption at rest and TLS 1.3 in transit with SOC 2 Type II compliance.'
  },
  {
    id: 11,
    cat: 'security',
    icon: Database,
    iconBg: '#eff6ff',
    iconColor: '#3b82f6',
    question: 'Where is data stored?',
    answer: 'All data is hosted on ISO 27001 certified cloud data centers with automatic daily multi-region backups.'
  },
  {
    id: 12,
    cat: 'security',
    icon: Lock,
    iconBg: '#f3e8ff',
    iconColor: '#8b5cf6',
    question: 'Do you support Single Sign-On (SSO)?',
    answer: 'Yes, EduVerse supports SSO integration with Google Workspace, Microsoft 365, SAML 2.0, and Azure AD.'
  },
  {
    id: 13,
    cat: 'migration',
    icon: RefreshCw,
    iconBg: '#fce7f3',
    iconColor: '#ec4899',
    question: 'Can I migrate from another school ERP?',
    answer: 'Yes, our migration team handles end-to-end data extraction and verification from legacy ERP solutions.'
  },
  {
    id: 14,
    cat: 'migration',
    icon: Tag,
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    question: 'Is there downtime during migration?',
    answer: 'No downtime required. We perform full parallel migrations so your daily operations run completely uninterrupted.'
  },
  {
    id: 15,
    cat: 'customization',
    icon: Settings,
    iconBg: '#d1fae5',
    iconColor: '#10b981',
    question: 'Can EduVerse be customized for our school?',
    answer: 'Custom grade scales, report cards, fee structures, role permissions, and custom branding are fully supported.'
  },
  {
    id: 16,
    cat: 'customization',
    icon: Tag,
    iconBg: '#eff6ff',
    iconColor: '#3b82f6',
    question: 'Do you offer white-label options?',
    answer: 'Yes, Enterprise plans include custom domain configuration, branded mobile apps, and custom logo styling.'
  }
];

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeOpenId, setActiveOpenId] = useState<number | null>(1); // First item expanded by default

  const filterItems = (items: typeof FAQS_LEFT) => 
    activeCategory === 'all' ? items : items.filter(item => item.cat === activeCategory);

  const leftList = filterItems(FAQS_LEFT);
  const rightList = filterItems(FAQS_RIGHT);

  return (
    <section className="mkt-section" id="faq" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)' }}>
      <div className="mkt-container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 30, background: '#d1fae5', color: '#10b981', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <HelpCircle size={14} /> FAQ
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Frequently Asked <span style={{ color: '#10b981' }}>Questions</span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            Everything you need to know about EduVerse. Can't find an answer? Contact our team.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 44 }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 30,
                  border: isActive ? 'none' : '1px solid #cbd5e1',
                  background: isActive ? '#10b981' : '#fff',
                  color: isActive ? '#fff' : '#475569',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(16, 185, 129, 0.35)' : 'none',
                  fontFamily: 'inherit'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column Accordions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {leftList.map((item) => {
              const isOpen = activeOpenId === item.id;
              const Icon = item.icon;
              return (
                <div 
                  key={item.id}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    border: isOpen ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                    boxShadow: isOpen ? '0 4px 16px rgba(16, 185, 129, 0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setActiveOpenId(isOpen ? null : item.id)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit'
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: item.iconBg, color: item.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} />
                    </div>
                    <strong style={{ flex: 1, fontSize: 14, color: '#0f172a', fontWeight: 700 }}>{item.question}</strong>
                    {isOpen ? <ChevronUp size={18} color="#10b981" /> : <ChevronDown size={18} color="#94a3b8" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 20px 18px 68px', fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rightList.map((item) => {
              const isOpen = activeOpenId === item.id;
              const Icon = item.icon;
              return (
                <div 
                  key={item.id}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    border: isOpen ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                    boxShadow: isOpen ? '0 4px 16px rgba(16, 185, 129, 0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setActiveOpenId(isOpen ? null : item.id)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit'
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: item.iconBg, color: item.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} />
                    </div>
                    <strong style={{ flex: 1, fontSize: 14, color: '#0f172a', fontWeight: 700 }}>{item.question}</strong>
                    {isOpen ? <ChevronUp size={18} color="#10b981" /> : <ChevronDown size={18} color="#94a3b8" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 20px 18px 68px', fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
