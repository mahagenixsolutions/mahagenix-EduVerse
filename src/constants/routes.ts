export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MARKETING: '/marketing',
  PLAN_DETAILS: '/marketing/plan/:planId',
  
  // Learn / Student Routes
  LEARN: {
    HUB: '/learn',
    LESSONS: '/learn/lessons',
    HOMEWORK: '/learn/homework',
    ASSIGNMENTS: '/learn/assignments',
    NOTES: '/learn/notes',
    PRACTICE: '/learn/practice',
    ATTENDANCE: '/learn/attendance',
    RESULTS: '/learn/results',
  },

  // School Routes
  SCHOOL: {
    MAIN: '/school',
    ANNOUNCEMENTS: '/school/announcements',
    EVENTS: '/school/events',
    CALENDAR: '/school/calendar',
    CLUBS: '/school/clubs',
    GALLERY: '/school/gallery',
    LIBRARY: '/school/library',
    TRANSPORT: '/school/transport',
  },

  // Communication & Notifications
  COMMUNICATION: {
    MAIN: '/communication',
    DISCUSSION: '/communication/discussion',
    NOTIFICATIONS: '/notifications',
  },

  // Services
  SERVICES: {
    MAIN: '/services',
    FEES: '/services/fees',
    STORE: '/services/store',
    HOSTEL: '/services/hostel',
    CERTIFICATES: '/services/certificates',
  },

  // Activity & Profile
  ACTIVITY: {
    MAIN: '/activity',
    ACHIEVEMENTS: '/activity/achievements',
  },
  PROFILE: '/profile',

  // Teacher Specific Routes
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    CLASSES: '/teacher/classes',
    COURSES: '/teacher/courses',
    LESSON_PLANNER: '/teacher/lesson-planner',
    CURRICULUM: '/teacher/curriculum',
    ASSIGNMENTS: '/teacher/assignments',
    HOMEWORK: '/teacher/homework',
    QUESTIONS: '/teacher/questions',
    ATTENDANCE: '/teacher/attendance',
    GRADEBOOK: '/teacher/gradebook',
    MARKS: '/teacher/marks',
    REPORTS: '/teacher/reports',
    STUDENTS: '/teacher/students',
    BEHAVIOUR: '/teacher/behaviour',
    PARENT_MEETINGS: '/teacher/parent-meetings',
    EVENTS: '/teacher/events',
    CALENDAR: '/teacher/calendar',
    ANNOUNCEMENTS: '/teacher/announcements',
    RESOURCES: '/teacher/resources',
    PROFILE: '/teacher/profile',
  },

  // Parent Specific Routes
  PARENT: {
    DASHBOARD: '/parent/dashboard',
  },

  // System Pages
  SYSTEM: {
    MAINTENANCE: '/maintenance',
    SHOWCASE: '/system/showcase',
    STATUS: '/system/status',
    UNAUTHORIZED: '/unauthorized',
    FORBIDDEN: '/forbidden',
    NOT_FOUND: '/404',
    SERVER_ERROR: '/500',
  },
} as const;
