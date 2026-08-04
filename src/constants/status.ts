export const AttendanceStatus = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused',
} as const;
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

export const HomeworkStatus = {
  ASSIGNED: 'assigned',
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  OVERDUE: 'overdue',
} as const;
export type HomeworkStatus = (typeof HomeworkStatus)[keyof typeof HomeworkStatus];

export const EventStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

export const FeeStatus = {
  PAID: 'paid',
  PENDING: 'pending',
  PARTIAL: 'partial',
  OVERDUE: 'overdue',
} as const;
export type FeeStatus = (typeof FeeStatus)[keyof typeof FeeStatus];

export const STATUS_THEMES = {
  attendance: {
    present: { label: 'Present', badgeClass: 'badgePresent', dotClass: 'dotPresent' },
    absent: { label: 'Absent', badgeClass: 'badgeAbsent', dotClass: 'dotAbsent' },
    late: { label: 'Late', badgeClass: 'badgeLate', dotClass: 'dotLate' },
    excused: { label: 'Excused', badgeClass: 'badgeExcused', dotClass: 'dotExcused' },
  },
  homework: {
    assigned: { label: 'Assigned', variant: 'info' },
    pending: { label: 'Pending', variant: 'warning' },
    submitted: { label: 'Submitted', variant: 'primary' },
    graded: { label: 'Graded', variant: 'success' },
    overdue: { label: 'Overdue', variant: 'danger' },
  },
} as const;
