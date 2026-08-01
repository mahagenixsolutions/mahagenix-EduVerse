import type { Integration } from '../types';

export const INTEGRATIONS: Integration[] = [
  {
    id: 'google',
    name: 'Google Workspace',
    description: 'Sync with Google Classroom, Drive, Calendar, and Meet for seamless collaboration.',
    icon: 'Chrome',
    category: 'Productivity',
  },
  {
    id: 'microsoft',
    name: 'Microsoft 365',
    description: 'Integrate with Teams, Outlook, OneDrive, and Azure Active Directory.',
    icon: 'AppWindow',
    category: 'Productivity',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'One-click video classes and meetings with automatic recording and attendance.',
    icon: 'Video',
    category: 'Communication',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Send automated notifications, reminders, and alerts directly to parents via WhatsApp.',
    icon: 'MessageCircle',
    category: 'Communication',
  },
  {
    id: 'payment',
    name: 'Payment Gateways',
    description: 'Razorpay, Stripe, PayU — accept fees via UPI, cards, net banking, and wallets.',
    icon: 'CreditCard',
    category: 'Finance',
  },
  {
    id: 'sms',
    name: 'SMS Gateway',
    description: 'Bulk SMS for attendance alerts, fee reminders, and emergency notifications.',
    icon: 'Smartphone',
    category: 'Communication',
  },
  {
    id: 'email',
    name: 'Email Services',
    description: 'SendGrid, Mailgun integration for transactional emails and marketing campaigns.',
    icon: 'Mail',
    category: 'Communication',
  },
  {
    id: 'biometric',
    name: 'Biometric Devices',
    description: 'Connect fingerprint and face recognition devices for automated attendance.',
    icon: 'Fingerprint',
    category: 'Hardware',
  },
];
