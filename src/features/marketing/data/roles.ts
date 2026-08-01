import type { Role } from '../types';

export const ROLES: Role[] = [
  {
    id: 'teacher',
    name: 'Teacher',
    description: 'Manage classes, assignments, grades, and student progress',
    icon: 'GraduationCap',
    platform: 'learning',
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Access lessons, submit homework, view grades and attendance',
    icon: 'BookOpen',
    platform: 'learning',
  },
  {
    id: 'parent',
    name: 'Parent',
    description: 'Monitor child progress, communicate with teachers, pay fees',
    icon: 'Users',
    platform: 'learning',
  },
  {
    id: 'principal',
    name: 'Principal',
    description: 'Oversee school operations, analytics, and strategic decisions',
    icon: 'Crown',
    platform: 'erp',
  },
  {
    id: 'hr',
    name: 'HR Manager',
    description: 'Manage staff records, payroll, leave, and recruitment',
    icon: 'UserCog',
    platform: 'erp',
  },
  {
    id: 'finance',
    name: 'Finance Manager',
    description: 'Handle fee collection, expenses, budgets, and financial reports',
    icon: 'Wallet',
    platform: 'erp',
  },
  {
    id: 'reception',
    name: 'Receptionist',
    description: 'Manage admissions, visitor logs, and front-desk operations',
    icon: 'Headphones',
    platform: 'erp',
  },
  {
    id: 'library',
    name: 'Librarian',
    description: 'Catalog books, manage lending, and track library resources',
    icon: 'Library',
    platform: 'erp',
  },
  {
    id: 'transport',
    name: 'Transport Manager',
    description: 'Manage routes, vehicles, drivers, and bus tracking',
    icon: 'Bus',
    platform: 'erp',
  },
  {
    id: 'hostel',
    name: 'Hostel Warden',
    description: 'Room allocation, hostel attendance, mess management',
    icon: 'Building',
    platform: 'erp',
  },
  {
    id: 'security',
    name: 'Security Officer',
    description: 'Gate management, visitor verification, and campus safety',
    icon: 'ShieldCheck',
    platform: 'erp',
  },
];

export const LEARNING_ROLES = ROLES.filter(r => r.platform === 'learning');
export const ERP_ROLES = ROLES.filter(r => r.platform === 'erp');
