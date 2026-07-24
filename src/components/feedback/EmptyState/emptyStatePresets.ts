export interface EmptyStateConfig {
  title: string;
  description: string;
  actionLabel?: string;
  actionPath?: string;
}

export const EMPTY_STATE_PRESETS: Record<string, EmptyStateConfig> = {
  homework: {
    title: 'No Pending Homework',
    description: 'You are all caught up! No active homework tasks assigned.',
    actionLabel: 'View Past Homework',
    actionPath: '/learn/homework'
  },
  assignments: {
    title: 'No Assignments Found',
    description: 'There are no active coursework assignments at this moment.',
    actionLabel: 'Check Curriculum',
    actionPath: '/learn'
  },
  courses: {
    title: 'No Enrolled Courses',
    description: 'You haven\'t enrolled in any learning modules yet.',
    actionLabel: 'Explore Courses',
    actionPath: '/learn'
  },
  books: {
    title: 'No Issued Books',
    description: 'You currently have no physical or digital library books borrowed.',
    actionLabel: 'Browse Library',
    actionPath: '/school/library'
  },
  notifications: {
    title: 'All Clear!',
    description: 'You have no unread notifications or alerts.',
    actionLabel: 'View History',
    actionPath: '/messages/notifications'
  },
  messages: {
    title: 'No Messages Yet',
    description: 'Start a conversation with a teacher, student, or guardian.',
    actionLabel: 'New Message',
    actionPath: '/messages'
  },
  attendance: {
    title: 'No Attendance Records',
    description: 'Attendance logs for this selected date range are empty.',
    actionLabel: 'Check Calendar',
    actionPath: '/school/calendar'
  },
  results: {
    title: 'No Exam Results Published',
    description: 'Grades and report cards will appear here once published by teachers.',
    actionLabel: 'View Schedule',
    actionPath: '/school/calendar'
  },
  reports: {
    title: 'No Analytics Data',
    description: 'Performance reports and academic charts are not generated yet.',
    actionLabel: 'Refresh Data'
  },
  events: {
    title: 'No Upcoming Events',
    description: 'No campus events or workshops scheduled for this month.',
    actionLabel: 'View Full Calendar',
    actionPath: '/school/calendar'
  },
  announcements: {
    title: 'No Active Notices',
    description: 'There are no school announcements or principal circulars right now.',
    actionLabel: 'Refresh Feed'
  },
  visitors: {
    title: 'No Campus Visitors Today',
    description: 'No visitor check-ins or gate entry logs recorded today.',
    actionLabel: 'Register Visitor'
  },
  employees: {
    title: 'No Staff Directory Records',
    description: 'No faculty members match your selected search filter.',
    actionLabel: 'Clear Search'
  },
  students: {
    title: 'No Student Profiles Found',
    description: 'No active student records match your selected class or filter.',
    actionLabel: 'Clear Filters'
  },
  finance: {
    title: 'No Pending Fee Dues',
    description: 'All tuition, transport, and hostel fee receipts are up to date.',
    actionLabel: 'View Payment History',
    actionPath: '/services/fees'
  },
  transactions: {
    title: 'No Recent Transactions',
    description: 'No financial transaction receipts recorded for this account.',
    actionLabel: 'Make Payment',
    actionPath: '/services/fees'
  },
  transport: {
    title: 'No Bus Transport Records',
    description: 'You are not assigned to any active school bus route.',
    actionLabel: 'View Transport Routes',
    actionPath: '/school/transport'
  },
  hostel: {
    title: 'No Hostel Room Allocated',
    description: 'Hostel room details and night attendance records will appear here upon allocation.',
    actionLabel: 'Apply for Hostel',
    actionPath: '/services/hostel'
  }
};
