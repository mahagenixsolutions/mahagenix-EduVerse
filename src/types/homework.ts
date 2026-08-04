import { HomeworkStatus } from '../constants/status';

export interface HomeworkItem {
  id: number;
  subject: string;
  title: string;
  dueDate: string;
  assignedDate?: string;
  teacher: string;
  status?: `${HomeworkStatus}` | 'assigned' | 'pending' | 'submitted' | 'graded' | 'overdue';
  isDraft?: boolean;
  grade?: string;
  feedback?: string;
  description?: string;
}

export interface Submission {
  id: number;
  homeworkId: number;
  studentName: string;
  submittedAt: string;
  fileUrl?: string;
  grade?: string;
  feedback?: string;
}

export const HomeworkItem = {} as any;
export const Submission = {} as any;
