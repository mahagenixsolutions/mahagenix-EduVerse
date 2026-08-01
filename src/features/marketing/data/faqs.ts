import type { FAQItem } from '../types';

export const FAQS: FAQItem[] = [
  // ─── Pricing ──────────────────────────────
  {
    id: 'faq-p1',
    category: 'pricing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and wire transfers. For Enterprise plans, we also support purchase orders and invoicing with net-30 terms.',
  },
  {
    id: 'faq-p2',
    category: 'pricing',
    question: 'Can I switch plans later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you get instant access to new features. When downgrading, changes take effect at the next billing cycle.',
  },
  {
    id: 'faq-p3',
    category: 'pricing',
    question: 'Is there a free trial?',
    answer: 'Yes! Every plan comes with a 14-day free trial with full access to all features in that tier. No credit card required to start.',
  },
  {
    id: 'faq-p4',
    category: 'pricing',
    question: 'Are there any hidden fees?',
    answer: 'None at all. The price you see includes hosting, maintenance, updates, and standard support. Only custom development or on-site training may incur additional costs.',
  },

  // ─── Implementation ───────────────────────
  {
    id: 'faq-i1',
    category: 'implementation',
    question: 'How long does implementation take?',
    answer: 'Starter plans can be live in 1–3 days. Professional plans typically take 1–2 weeks. Enterprise implementations are customized and usually complete within 3–6 weeks.',
  },
  {
    id: 'faq-i2',
    category: 'implementation',
    question: 'Do you provide training?',
    answer: 'Yes. All plans include online training sessions and video tutorials. Professional and Enterprise plans include dedicated training workshops and on-site training options.',
  },
  {
    id: 'faq-i3',
    category: 'implementation',
    question: 'Can I import existing data?',
    answer: 'We support data import from Excel, CSV, and most popular school management systems. Our team assists with data mapping, validation, and migration at no extra cost.',
  },

  // ─── Support ──────────────────────────────
  {
    id: 'faq-s1',
    category: 'support',
    question: 'What support channels are available?',
    answer: 'Starter: Email support during business hours. Professional: Priority email + phone support with extended hours. Enterprise: Dedicated account manager with 24/7 support via phone, email, and chat.',
  },
  {
    id: 'faq-s2',
    category: 'support',
    question: 'What is your average response time?',
    answer: 'Starter: 24 hours. Professional: 4 hours. Enterprise: 1 hour for critical issues with guaranteed SLA.',
  },

  // ─── Security ─────────────────────────────
  {
    id: 'faq-sec1',
    category: 'security',
    question: 'How is our data protected?',
    answer: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain SOC 2 Type II compliance, conduct regular penetration testing, and offer GDPR-compliant data handling.',
  },
  {
    id: 'faq-sec2',
    category: 'security',
    question: 'Where is data stored?',
    answer: 'Data is stored in ISO 27001-certified cloud data centers with automatic daily backups, geo-redundancy, and 99.99% uptime SLA.',
  },
  {
    id: 'faq-sec3',
    category: 'security',
    question: 'Do you support Single Sign-On (SSO)?',
    answer: 'Enterprise plans support SSO via SAML 2.0, OAuth 2.0, and LDAP integration. This allows seamless authentication with your existing identity provider.',
  },

  // ─── Migration ────────────────────────────
  {
    id: 'faq-m1',
    category: 'migration',
    question: 'Can I migrate from another school ERP?',
    answer: 'Yes. We provide a guided migration process with dedicated support. Our team handles data extraction, transformation, validation, and parallel running to ensure zero data loss.',
  },
  {
    id: 'faq-m2',
    category: 'migration',
    question: 'Is there downtime during migration?',
    answer: 'We use a parallel running approach — your existing system stays active while we set up EduVerse. The actual switch happens over a weekend with minimal disruption.',
  },

  // ─── Customization ───────────────────────
  {
    id: 'faq-c1',
    category: 'customization',
    question: 'Can EduVerse be customized for our school?',
    answer: 'Professional and Enterprise plans support custom fields, workflows, report templates, and branding. Enterprise plans additionally support custom module development and API integration.',
  },
  {
    id: 'faq-c2',
    category: 'customization',
    question: 'Do you offer white-label options?',
    answer: 'Yes! Enterprise plans include white-label branding — your school\'s logo, colors, and domain. Perfect for school groups and franchise networks.',
  },
];

export const FAQ_CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Questions' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'support', label: 'Support' },
  { id: 'security', label: 'Data Security' },
  { id: 'migration', label: 'Migration' },
  { id: 'customization', label: 'Customization' },
];
