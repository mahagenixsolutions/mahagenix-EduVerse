import type { FeatureHighlight } from '../types';

export const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
  {
    id: 'role-access',
    title: 'Role-Based Access',
    description: 'Every user sees exactly what they need. Granular permissions ensure data security while maximizing usability across 11+ distinct roles.',
    icon: 'ShieldCheck',
    bullets: [
      '11 pre-built roles from Teacher to Security',
      'Custom role creation with granular permissions',
      'Feature-level access control',
      'Audit trail for all actions',
    ],
  },
  {
    id: 'notifications',
    title: 'Real-Time Notifications',
    description: 'Never miss an important update. Push notifications, in-app alerts, SMS, email, and WhatsApp — all channels, one platform.',
    icon: 'Bell',
    bullets: [
      'Multi-channel delivery (Push, SMS, Email, WhatsApp)',
      'Customizable notification preferences',
      'Smart notification batching',
      'Read receipts and delivery tracking',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile Friendly',
    description: 'Access EduVerse from any device. Our responsive web app and native mobile apps ensure you\'re always connected.',
    icon: 'Smartphone',
    bullets: [
      'Progressive Web App (PWA)',
      'Native iOS & Android apps',
      'Offline mode for essential features',
      'Touch-optimized interface',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud-Based',
    description: 'Zero infrastructure to maintain. EduVerse runs on enterprise-grade cloud infrastructure with automatic scaling and updates.',
    icon: 'Cloud',
    bullets: [
      'Auto-scaling infrastructure',
      'Zero-downtime deployments',
      'Global CDN for fast access',
      'Automatic backups every 6 hours',
    ],
  },
  {
    id: 'security',
    title: 'Secure Data',
    description: 'Bank-grade security for your institution\'s data. Encryption, compliance, and regular audits keep your information safe.',
    icon: 'Lock',
    bullets: [
      'AES-256 encryption at rest',
      'TLS 1.3 encryption in transit',
      'SOC 2 Type II certified',
      'GDPR compliant',
    ],
  },
  {
    id: 'multi-school',
    title: 'Multi-School Support',
    description: 'Manage multiple branches from a single dashboard. Consolidated analytics, centralized policies, and branch-level autonomy.',
    icon: 'Building2',
    bullets: [
      'Unified multi-branch dashboard',
      'Branch-level data isolation',
      'Consolidated reporting',
      'Centralized policy management',
    ],
  },
  {
    id: 'ai',
    title: 'AI Automation',
    description: 'Let artificial intelligence handle the routine. Smart scheduling, predictive analytics, and automated report generation.',
    icon: 'Sparkles',
    bullets: [
      'Predictive student performance',
      'Smart timetable generation',
      'Automated report creation',
      'Natural language data queries',
    ],
  },
  {
    id: 'reports',
    title: 'Reports & Dashboards',
    description: '100+ pre-built reports with drag-and-drop customization. Visualize your institution\'s performance in real-time.',
    icon: 'BarChart3',
    bullets: [
      '100+ pre-built report templates',
      'Custom report builder',
      'Scheduled report delivery',
      'Export to PDF, Excel, CSV',
    ],
  },
];
