import type { Industry } from '../types';

export const INDUSTRIES: Industry[] = [
  {
    id: 'k12',
    name: 'K-12 Schools',
    description: 'Complete management for primary and secondary schools with age-appropriate features.',
    icon: 'School',
  },
  {
    id: 'higher-ed',
    name: 'Higher Education',
    description: 'University and college management with department, faculty, and research modules.',
    icon: 'Building2',
  },
  {
    id: 'coaching',
    name: 'Coaching Institutes',
    description: 'Test series, batch management, and performance tracking for competitive exam prep.',
    icon: 'Target',
  },
  {
    id: 'corporate',
    name: 'Corporate Learning',
    description: 'Employee training, skill development, certification tracking, and LMS integration.',
    icon: 'Briefcase',
  },
  {
    id: 'training',
    name: 'Training Centers',
    description: 'Vocational training management with course scheduling, trainer allocation, and certification.',
    icon: 'Wrench',
  },
];
