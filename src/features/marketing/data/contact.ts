import type { ContactInfo } from '../types';

export const CONTACT_CATEGORIES: ContactInfo[] = [
  {
    category: 'sales',
    label: 'Sales',
    email: 'sales@eduverse.com',
    phone: '+91 98765 43210',
    description: 'Talk to our sales team about pricing, plans, and custom solutions for your institution.',
  },
  {
    category: 'support',
    label: 'Support',
    email: 'support@eduverse.com',
    phone: '+91 98765 43211',
    description: 'Get help with your existing EduVerse account, troubleshooting, and technical issues.',
  },
  {
    category: 'technical',
    label: 'Technical',
    email: 'tech@eduverse.com',
    description: 'API integration, SSO setup, data migration, and advanced technical consultations.',
  },
  {
    category: 'partner',
    label: 'Partnerships',
    email: 'partners@eduverse.com',
    description: 'Interested in reselling, integration partnerships, or affiliate programs? Let\'s talk.',
  },
  {
    category: 'career',
    label: 'Careers',
    email: 'careers@eduverse.com',
    description: 'Join our mission to transform education. View open positions and apply.',
  },
];

export const OFFICE_INFO = {
  address: '4th Floor, Innovation Tower, Hitech City, Hyderabad, Telangana 500081, India',
  email: 'hello@eduverse.com',
  phone: '+91 98765 43210',
  hours: 'Monday – Saturday, 9:00 AM – 6:00 PM IST',
};

export const SOCIAL_LINKS = [
  { name: 'Twitter', url: 'https://twitter.com/eduverse', icon: 'Twitter' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/eduverse', icon: 'Linkedin' },
  { name: 'YouTube', url: 'https://youtube.com/@eduverse', icon: 'Youtube' },
  { name: 'Instagram', url: 'https://instagram.com/eduverse', icon: 'Instagram' },
  { name: 'GitHub', url: 'https://github.com/eduverse', icon: 'Github' },
];
