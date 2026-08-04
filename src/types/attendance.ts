import { AttendanceStatus } from '../constants/status';

export interface AttendanceRecord {
  id: number | string;
  studentId?: string | number;
  studentName?: string;
  date: string;
  status: `${AttendanceStatus}`;
  subject?: string;
  period?: string;
  notes?: string;
}

export interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  percentage: number;
}

export const AttendanceRecord = {} as any;
export const AttendanceSummary = {} as any;
