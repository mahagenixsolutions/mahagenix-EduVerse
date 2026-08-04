import { UserRole } from '../constants/roles';

export type Role = `${UserRole}`;

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  grade?: string;
  section?: string;
  rollNo?: string;
  department?: string;
  phone?: string;
}

export interface StudentProfile extends User {
  role: 'student';
  attendanceRate?: number;
  parentContact?: string;
}

export interface TeacherProfile extends User {
  role: 'teacher';
  subject?: string;
  classesHandled?: string[];
}

export const User = {} as any;
export const StudentProfile = {} as any;
export const TeacherProfile = {} as any;
