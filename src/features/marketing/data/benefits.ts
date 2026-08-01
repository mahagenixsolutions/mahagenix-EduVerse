import type { Benefit } from '../types';

export const BENEFITS: Benefit[] = [
  {
    id: 'paperless',
    title: 'Paperless Administration',
    description: 'Eliminate manual paperwork with fully digital admissions, records, fee receipts, and report cards. Save time, reduce errors, and go green.',
    icon: 'FileX2',
  },
  {
    id: 'digital-learning',
    title: 'Digital Learning',
    description: 'Deliver interactive lessons, assignments, and assessments through a modern LMS that students and teachers love using.',
    icon: 'Monitor',
  },
  {
    id: 'communication',
    title: 'Centralized Communication',
    description: 'Keep everyone connected with instant messaging, announcements, push notifications, and parent-teacher communication — all in one place.',
    icon: 'MessageCircle',
  },
  {
    id: 'attendance',
    title: 'Attendance Automation',
    description: 'Automate attendance with biometric, QR, and RFID support. Instantly notify parents about absences and track patterns over time.',
    icon: 'ScanLine',
  },
  {
    id: 'fee-management',
    title: 'Fee Management',
    description: 'Simplify fee collection with online payments, automated reminders, receipt generation, and real-time financial dashboards.',
    icon: 'Banknote',
  },
  {
    id: 'analytics',
    title: 'Real-Time Analytics',
    description: 'Make data-driven decisions with live dashboards, custom reports, trend analysis, and predictive insights across every department.',
    icon: 'TrendingUp',
  },
  {
    id: 'parent-engagement',
    title: 'Parent Engagement',
    description: 'Empower parents with a dedicated mobile app for tracking grades, attendance, fees, homework, and direct communication with teachers.',
    icon: 'HeartHandshake',
  },
  {
    id: 'role-based-access',
    title: 'Role-Based Access',
    description: 'Ensure data security with granular role permissions. Every user sees only what they need — from principals to security staff.',
    icon: 'ShieldCheck',
  },
  {
    id: 'ai-insights',
    title: 'AI-Powered Insights',
    description: 'Leverage artificial intelligence for performance predictions, smart scheduling, automated reports, and natural language queries.',
    icon: 'BrainCircuit',
  },
];
