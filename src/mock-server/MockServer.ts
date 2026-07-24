import { EventBus } from './EventBus';
import { homeworkItems as seedHomework, courses as seedCourses, assignments as seedAssignments, notes as seedNotes } from '@/mock/learning';
import { attendanceData as seedAttendance, resultsData as seedResults, calendarEvents as seedCalendarEvents, upcomingEvents as seedUpcomingEvents } from '@/mock/school';
import { announcements as seedAnnouncements, chatList as seedChats, chatMessages as seedMessages, noticeBoard as seedNoticeBoard } from '@/mock/messages';

// Core types for Lifecycles
export interface HomeworkItem {
  id: number;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'overdue' | 'reviewed';
  teacher: string;
  attachments: number;
  grade?: string;
  feedback?: string;
  submissionContent?: string;
  submittedAt?: string;
  isDraft?: boolean;
}

export interface AttendanceRecord {
  date: string;
  day: string;
  status: 'present' | 'absent' | 'late';
  reason?: string;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  author: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  content: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'homework' | 'attendance' | 'announcement' | 'result' | 'event' | 'event_new' | 'registration_success' | 'payment_success' | 'event_reminder' | 'event_update' | 'event_cancel';
  eventId?: number;
}

export interface ResultItem {
  id: number;
  examName: string;
  date: string;
  totalMarks: number;
  obtained: number;
  percentage: number;
  rank: number;
  subjects: { name: string; total: number; obtained: number; grade: string; }[];
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'exam' | 'event' | 'holiday' | 'meeting';
  color: string;
  time?: string;
  endTime?: string;
  location?: string;
  category?: 'Educational Trip' | 'Sports' | 'Cultural' | 'Workshop' | 'Competition' | 'Industrial Visit' | 'Seminar' | 'Extracurricular' | 'Technology' | 'Academics' | 'Campus Store' | 'Science' | 'Arts' | 'Other';
  registered?: boolean;
  coverImage?: string;
  description?: string;
  highlights?: string[];
  venue?: string;
  googleMapLink?: string;
  organizer?: string;
  contactNumber?: string;
  maxSeats?: number;
  registrationDeadline?: string;
  fee?: number;
  paymentRequired?: boolean;
  pdfUrl?: string;
  gallery?: string[];
  instructions?: string;
  status?: 'draft' | 'published';
}

export interface Registration {
  id: number;
  eventId: number;
  studentId: string;
  studentName: string;
  studentPhoto: string;
  class: string;
  section: string;
  rollNumber: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  paymentStatus: 'pending' | 'paid';
  amountPaid: number;
  registrationDate: string;
  status: 'interested' | 'registered';
  transactionId?: string;
  ticketNumber?: string;
}

class MockServerClass {
  private db: {
    homework: HomeworkItem[];
    attendance: AttendanceRecord[];
    announcements: AnnouncementItem[];
    results: ResultItem[];
    events: CalendarEvent[];
    notifications: NotificationItem[];
    chats: any[];
    messages: any[];
    registrations: Registration[];
  } = {
    homework: [],
    attendance: [],
    announcements: [],
    results: [],
    events: [],
    notifications: [],
    chats: [],
    messages: [],
    registrations: []
  };

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const saved = localStorage.getItem('eduverse_db');
    if (saved) {
      try {
        this.db = JSON.parse(saved);
        // Automatically migrate/reset database if it's from an older version
        if (!this.db.registrations || !this.db.events || !this.db.events.some(e => e.id === 108) || !this.db.notifications || !this.db.notifications.some(n => n.id === 1003)) {
          this.seed();
        } else {
          // Self-heal: Deduplicate events
          if (Array.isArray(this.db.events)) {
            const seen = new Set();
            this.db.events = this.db.events.filter(e => {
              if (seen.has(e.id)) return false;
              seen.add(e.id);
              return true;
            });
          }
          // Self-heal: Deduplicate registrations
          if (Array.isArray(this.db.registrations)) {
            const seen = new Set();
            this.db.registrations = this.db.registrations.filter(r => {
              if (seen.has(r.id)) return false;
              seen.add(r.id);
              return true;
            });
          }
          // Self-heal: Deduplicate notifications
          if (Array.isArray(this.db.notifications)) {
            const seen = new Set();
            this.db.notifications = this.db.notifications.filter(n => {
              if (seen.has(n.id)) return false;
              seen.add(n.id);
              return true;
            });
          }
        }
        return;
      } catch (e) {
        // Reset DB to initial seed state on parse failure
      }
    }
    this.seed();
  }

  private saveToStorage() {
    localStorage.setItem('eduverse_db', JSON.stringify(this.db));
  }

  private seed() {
    this.db.homework = seedHomework.map(h => ({
      ...h,
      description: 'Solve the equations and upload the PDF file containing your worked steps.',
      attachments: h.attachments || 0,
      isDraft: false
    }));
    this.db.attendance = seedAttendance.recent;
    this.db.announcements = seedAnnouncements;
    this.db.results = seedResults;
    
    // Seed detailed events for Student Event Hub
    this.db.events = [
      {
        id: 101,
        title: 'Summer Camp 2025',
        date: '2026-06-01',
        time: '08:00 AM',
        endTime: '05:00 PM',
        type: 'event',
        color: '#10B981',
        location: 'Campus Activity Grounds',
        venue: 'Outdoor Pavilion & Science Wing',
        category: 'Extracurricular',
        coverImage: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=1200',
        description: 'Join our exciting 2-week Summer Camp featuring robotics workshops, outdoor athletics, creative arts, leadership training, and nature trails for all student grade levels.',
        highlights: [
          '2 Weeks of outdoor athletics & team survival challenges',
          'Hands-on robotics and coding bootcamps',
          'Art, acoustic music, and drama workshops',
          'Campfire grand finale and team trophy ceremony'
        ],
        googleMapLink: 'https://maps.google.com/?q=Campus+Activity+Grounds',
        organizer: 'Student Affairs & Activities Council',
        contactNumber: '+91 98765 43211',
        maxSeats: 150,
        registrationDeadline: '2026-05-25T23:59:59',
        fee: 1500,
        paymentRequired: true,
        pdfUrl: 'Summer_Camp_2025_Schedule.pdf',
        gallery: [
          'https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=600',
          'https://images.unsplash.com/photo-1506461883276-594a12b11cc3?q=80&w=600'
        ],
        instructions: 'Students should bring comfortable sports gear, water bottles, and school ID. Lunch and refreshments provided daily.',
        status: 'published',
        registered: false
      },
      {
        id: 102,
        title: 'AI & Machine Learning for Beginners',
        date: '2026-08-10',
        time: '10:00 AM',
        endTime: '04:00 PM',
        type: 'event',
        color: '#2563EB',
        location: 'Senior Computer Lab 2',
        venue: 'Tech & Innovation Hub',
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200',
        description: 'Master Python programming, build smart chatbots, neural networks, and explore machine learning models with hands-on projects and industry mentorship.',
        highlights: [
          'Python for Data Science and Machine Learning basics',
          'Building neural networks & computer vision models',
          'Hands-on chatbot and AI agent deployment',
          'Official EduVerse AI Certification upon completion'
        ],
        googleMapLink: 'https://maps.google.com/?q=Senior+IT+Lab',
        organizer: 'Department of Computer Science',
        contactNumber: '+91 98765 43222',
        maxSeats: 80,
        registrationDeadline: '2026-08-05T18:00:00',
        fee: 0,
        paymentRequired: false,
        pdfUrl: 'AI_Course_Syllabus.pdf',
        gallery: [
          'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600'
        ],
        instructions: 'Workstations with pre-configured Python environments will be provided. Bringing your own laptop is optional.',
        status: 'published',
        registered: false
      },
      {
        id: 103,
        title: 'Merit Scholarship Test 2025',
        date: '2026-05-31',
        time: '09:00 AM',
        endTime: '12:00 PM',
        type: 'event',
        color: '#D97706',
        location: 'Main Examination Block',
        venue: 'Hall A & B',
        category: 'Academics',
        coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200',
        description: 'EduVerse Annual Merit Scholarship Test offers tuition fee waivers up to 100% for top performing students in Grade 8 to 12.',
        highlights: [
          'Rank 1-5: 100% Tuition Fee Waiver',
          'Rank 6-20: 50% Tuition Fee Waiver',
          'Comprehensive STEM & Aptitude evaluation paper',
          'Personalized performance diagnostic report'
        ],
        googleMapLink: 'https://maps.google.com/?q=Main+Examination+Block',
        organizer: 'Academic Scholarship Board',
        contactNumber: '+91 98765 43233',
        maxSeats: 500,
        registrationDeadline: '2026-05-28T23:59:59',
        fee: 0,
        paymentRequired: false,
        pdfUrl: 'Scholarship_Test_Syllabus.pdf',
        gallery: [
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600'
        ],
        instructions: 'Reporting time is 08:30 AM. Carry printed admit slip and transparent geometry pouch.',
        status: 'published',
        registered: false
      },
      {
        id: 104,
        title: 'Study Material & Textbook Sale',
        date: '2026-04-20',
        time: '09:00 AM',
        endTime: '05:00 PM',
        type: 'event',
        color: '#C026D3',
        location: 'Student Resource Center',
        venue: 'Library Ground Floor',
        category: 'Campus Store',
        coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200',
        description: 'Get deep discounts on official STEM reference guides, solved past papers, lab manuals, and digital learning subscriptions.',
        highlights: [
          'Up to 40% discount on standard textbooks',
          'Free digital e-book access code bundled with physical purchases',
          'Curated past 10-year board examination answer keys',
          'Lab manual kits for Physics & Chemistry'
        ],
        googleMapLink: 'https://maps.google.com/?q=Student+Resource+Center',
        organizer: 'Campus Store & Library Department',
        contactNumber: '+91 98765 43244',
        maxSeats: 1000,
        registrationDeadline: '2026-04-20T17:00:00',
        fee: 0,
        paymentRequired: false,
        pdfUrl: 'Catalog_Discount_List.pdf',
        gallery: [
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600'
        ],
        instructions: 'Digital invoice will be delivered via EduVerse app. Physical store open till 5 PM.',
        status: 'published',
        registered: false
      },
      {
        id: 105,
        title: 'Annual Sports Meet 2025',
        date: '2026-04-15',
        time: '08:00 AM',
        endTime: '04:00 PM',
        type: 'event',
        color: '#EF4444',
        location: 'Main Athletics Stadium',
        venue: 'Sports Complex',
        category: 'Sports',
        coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200',
        description: 'Compete in track & field sprints, relay races, football, basketball, and table tennis. Showcase your athletic talent and win gold medals!',
        highlights: [
          '100m, 200m, 400m track sprints & relay finals',
          'Inter-house football & basketball championship',
          'Trophies & certificates presented by Olympic Athlete Chief Guest',
          'Refreshments & victory march for winning houses'
        ],
        googleMapLink: 'https://maps.google.com/?q=Sports+Complex',
        organizer: 'Physical Education Department',
        contactNumber: '+91 98765 43255',
        maxSeats: 400,
        registrationDeadline: '2026-04-12T18:00:00',
        fee: 0,
        paymentRequired: false,
        pdfUrl: 'Sports_Meet_Rulebook.pdf',
        gallery: [
          'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600'
        ],
        instructions: 'All participants must wear official house jerseys and athletic footwear.',
        status: 'published',
        registered: false
      },
      {
        id: 106,
        title: 'Robotics & Science Fair',
        date: '2026-04-30',
        time: '10:00 AM',
        endTime: '04:00 PM',
        type: 'event',
        color: '#059669',
        location: 'Science Building Hall B',
        venue: 'Innovation Lab',
        category: 'Science',
        coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200',
        description: 'Present your working hardware prototypes, IoT devices, automated bots, and green energy innovations to distinguished industry judges.',
        highlights: [
          'Hardware & software prototype exhibition',
          'IoT & drone flight obstacle arena',
          'Jury evaluation by IIT engineering professors',
          'Best Innovation Trophy + ₹15,000 cash grant'
        ],
        googleMapLink: 'https://maps.google.com/?q=Science+Building',
        organizer: 'Robotics & STEM Club',
        contactNumber: '+91 98765 43266',
        maxSeats: 100,
        registrationDeadline: '2026-04-26T23:59:59',
        fee: 100,
        paymentRequired: true,
        pdfUrl: 'Exhibition_Safety_Guidelines.pdf',
        gallery: [
          'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600'
        ],
        instructions: 'Setup starts at 08:30 AM. Power sockets and Wi-Fi access will be provided per booth.',
        status: 'published',
        registered: false
      },
      {
        id: 107,
        title: 'Campus CodeFest 2025',
        date: '2026-05-10',
        time: '09:00 AM',
        endTime: '06:00 PM',
        type: 'event',
        color: '#7C3AED',
        location: 'Senior IT Lab',
        venue: 'Computer Science Wing',
        category: 'Competition',
        coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200',
        description: 'Team up with fellow student developers, code innovative solutions for real community challenges, and win cash prizes worth ₹50,000!',
        highlights: [
          '24-Hour continuous coding hackathon',
          'Mentorship by tech founders and cloud architects',
          'Pitch session in front of venture investor judges',
          'Cash prizes up to ₹50,000 + tablet accessories'
        ],
        googleMapLink: 'https://maps.google.com/?q=Senior+IT+Lab',
        organizer: 'Coding & Developer Society',
        contactNumber: '+91 98765 43277',
        maxSeats: 60,
        registrationDeadline: '2026-05-07T23:59:59',
        fee: 250,
        paymentRequired: true,
        pdfUrl: 'CodeFest_API_Pack.pdf',
        gallery: [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600'
        ],
        instructions: 'Teams of up to 3 members allowed. Starter codebase repositories will be provided on GitHub.',
        status: 'published',
        registered: false
      },
      {
        id: 108,
        title: 'Campus Arts & Music Fest',
        date: '2026-05-20',
        time: '02:00 PM',
        endTime: '08:00 PM',
        type: 'event',
        color: '#EA580C',
        location: 'Auditorium & Fine Arts Studio',
        venue: 'Cultural Center',
        category: 'Arts',
        coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200',
        description: 'Express your artistic soul! Audition for live acoustic band performances, solo singing, digital painting, and street drama competitions.',
        highlights: [
          'Live acoustic band battle of the bands',
          'Canvas & digital painting live contest',
          'Solo vocal & instrument performance showcases',
          'Celebrity musician guest performance & trophy presentation'
        ],
        googleMapLink: 'https://maps.google.com/?q=Cultural+Center',
        organizer: 'Cultural & Arts Society',
        contactNumber: '+91 98765 43288',
        maxSeats: 250,
        registrationDeadline: '2026-05-16T18:00:00',
        fee: 0,
        paymentRequired: false,
        pdfUrl: 'Arts_Fest_Rules.pdf',
        gallery: [
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600'
        ],
        instructions: 'Musicians may bring their own instruments. Sound check opens at 12:00 PM.',
        status: 'published',
        registered: false
      }
    ];

    // Seed mock registrations (some existing students registered for events)
    this.db.registrations = [
      {
        id: 5001,
        eventId: 101,
        studentId: 'GFA-2025-10045', // Lucas
        studentName: 'Lucas Martin',
        studentPhoto: 'https://i.pravatar.cc/150?u=lucas_m',
        class: 'Grade 9',
        section: 'C',
        rollNumber: 19,
        parentName: 'Sofia Martin',
        parentPhone: '+1 (555) 078-9012',
        parentEmail: 'sofia.martin@email.com',
        paymentStatus: 'paid',
        amountPaid: 2500,
        registrationDate: '2026-07-01T10:30:00Z',
        status: 'registered',
        transactionId: 'TXN-90283401',
        ticketNumber: 'TKT-101-9023'
      },
      {
        id: 5002,
        eventId: 101,
        studentId: 'GFA-2025-10022', // Priya
        studentName: 'Priya Sharma',
        studentPhoto: 'https://i.pravatar.cc/150?u=priya_s',
        class: 'Grade 10',
        section: 'A',
        rollNumber: 25,
        parentName: 'Vikram Sharma',
        parentPhone: '+1 (555) 089-0123',
        parentEmail: 'vikram.sharma@email.com',
        paymentStatus: 'paid',
        amountPaid: 2500,
        registrationDate: '2026-07-02T14:45:00Z',
        status: 'registered',
        transactionId: 'TXN-88402931',
        ticketNumber: 'TKT-101-8840'
      },
      {
        id: 5003,
        eventId: 102,
        studentId: 'GFA-2025-10042', // Sarah Doe (self)
        studentName: 'Sarah Doe',
        studentPhoto: 'https://i.pravatar.cc/150?u=sarah',
        class: 'Grade 10',
        section: 'A',
        rollNumber: 12,
        parentName: 'John Doe',
        parentPhone: '+91 98765 43211',
        parentEmail: 'john.doe@email.com',
        paymentStatus: 'paid',
        amountPaid: 0,
        registrationDate: '2026-07-05T09:15:00Z',
        status: 'registered',
        transactionId: 'TXN-FREE-1002',
        ticketNumber: 'TKT-102-1002'
      },
      {
        id: 5004,
        eventId: 103,
        studentId: 'GFA-2025-10025', // Alex Vance
        studentName: 'Alex Vance',
        studentPhoto: 'https://i.pravatar.cc/150?u=alex_v',
        class: 'Grade 10',
        section: 'A',
        rollNumber: 3,
        parentName: 'Diana Vance',
        parentPhone: '+1 (555) 034-5678',
        parentEmail: 'diana.vance@email.com',
        paymentStatus: 'paid',
        amountPaid: 250,
        registrationDate: '2026-07-06T11:20:00Z',
        status: 'registered',
        transactionId: 'TXN-55401928',
        ticketNumber: 'TKT-103-5540'
      }
    ];

    // Seed notifications
    this.db.notifications = [
      { id: 1001, title: 'Calculus homework assignment', description: 'Calculus Exercises 1-20 is due today. Please submit in learn workspace.', time: '1 hr ago', read: false, type: 'homework' },
      { id: 1002, title: 'Coding Hackathon 2026', description: 'A new school event has been announced.', time: '2 hrs ago', read: false, type: 'event_new', eventId: 103 },
      { id: 1003, title: 'Ooty Educational Trip', description: 'A new school event has been announced.', time: '3 hrs ago', read: false, type: 'event_new', eventId: 101 },
      { id: 2, title: 'Attendance Marked', description: 'Your attendance for today has been marked as Present', time: '4 hrs ago', read: true, type: 'attendance' }
    ];
    this.db.chats = seedChats;
    this.db.messages = seedMessages;
    this.saveToStorage();
  }

  // --- Homework Services ---
  getHomework() {
    return Promise.resolve([...this.db.homework]);
  }

  publishHomework(hw: Omit<HomeworkItem, 'id' | 'status' | 'submissions' | 'attachments'>) {
    return new Promise<HomeworkItem>((resolve) => {
      setTimeout(() => {
        const newItem: HomeworkItem = {
          ...hw,
          id: Date.now(),
          status: 'pending',
          attachments: 0,
          isDraft: hw.isDraft ?? false
        };
        this.db.homework.unshift(newItem);
        this.saveToStorage();

        if (!newItem.isDraft) {
          EventBus.publish('HOMEWORK_CREATED', newItem);
          this.createNotification(
            'New Homework Assigned',
            `${newItem.subject}: ${newItem.title} has been assigned`,
            'homework'
          );
        }

        resolve(newItem);
      }, 500);
    });
  }

  submitHomework(id: number, content: string) {
    return new Promise<HomeworkItem>((resolve) => {
      setTimeout(() => {
        this.db.homework = this.db.homework.map(hw => {
          if (hw.id === id) {
            const updated = {
              ...hw,
              status: 'submitted' as const,
              submissionContent: content,
              submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            };
            EventBus.publish('HOMEWORK_SUBMITTED', updated);
            return updated;
          }
          return hw;
        });
        this.saveToStorage();
        const updatedItem = this.db.homework.find(h => h.id === id)!;
        resolve(updatedItem);
      }, 500);
    });
  }

  gradeHomework(id: number, grade: string, feedback: string) {
    return new Promise<HomeworkItem>((resolve) => {
      setTimeout(() => {
        this.db.homework = this.db.homework.map(hw => {
          if (hw.id === id) {
            const updated = { ...hw, status: 'reviewed' as const, grade, feedback };
            EventBus.publish('HOMEWORK_GRADED', updated);
            this.createNotification(
              'Homework Graded',
              `Your ${hw.subject} homework has been reviewed. Grade: ${grade}`,
              'homework'
            );
            return updated;
          }
          return hw;
        });
        this.saveToStorage();
        const updatedItem = this.db.homework.find(h => h.id === id)!;
        resolve(updatedItem);
      }, 500);
    });
  }

  // --- Attendance Services ---
  getAttendance() {
    return Promise.resolve([...this.db.attendance]);
  }

  markAttendance(records: AttendanceRecord[]) {
    return new Promise<AttendanceRecord[]>((resolve) => {
      setTimeout(() => {
        // Prepend new daily attendance
        this.db.attendance = [...records, ...this.db.attendance];
        this.saveToStorage();
        EventBus.publish('ATTENDANCE_PUBLISHED', records);
        this.createNotification(
          'Attendance Marked',
          `Attendance for ${records[0].date} has been published`,
          'attendance'
        );
        resolve(records);
      }, 500);
    });
  }

  // --- Announcements Services ---
  getAnnouncements() {
    return Promise.resolve([...this.db.announcements]);
  }

  publishAnnouncement(ann: Omit<AnnouncementItem, 'id' | 'date'>) {
    return new Promise<AnnouncementItem>((resolve) => {
      setTimeout(() => {
        const newItem: AnnouncementItem = {
          ...ann,
          id: Date.now(),
          date: 'Just now'
        };
        this.db.announcements.unshift(newItem);
        this.saveToStorage();
        EventBus.publish('ANNOUNCEMENT_PUBLISHED', newItem);
        this.createNotification(
          'New Announcement',
          newItem.title,
          'announcement'
        );
        resolve(newItem);
      }, 500);
    });
  }

  // --- Results Services ---
  getResults() {
    return Promise.resolve([...this.db.results]);
  }

  publishResults(result: ResultItem) {
    return new Promise<ResultItem>((resolve) => {
      setTimeout(() => {
        this.db.results.unshift(result);
        this.saveToStorage();
        EventBus.publish('RESULT_PUBLISHED', result);
        this.createNotification(
          'Exam Results Published',
          `${result.examName} results are now available`,
          'result'
        );
        resolve(result);
      }, 500);
    });
  }

  // --- Events Services ---
  getEvents() {
    return Promise.resolve([...this.db.events]);
  }

  getEventById(id: number) {
    const event = this.db.events.find(e => e.id === id);
    return Promise.resolve(event || null);
  }

  createEvent(event: Omit<CalendarEvent, 'id'>) {
    return new Promise<CalendarEvent>((resolve) => {
      setTimeout(() => {
        const newItem: CalendarEvent = {
          ...event,
          id: Date.now()
        };
        this.db.events.unshift(newItem);
        this.saveToStorage();
        
        if (newItem.status === 'published') {
          EventBus.publish('NOTIFICATION_DISPATCHED', newItem);
          this.createNotification(
            `🎒 ${newItem.title}`,
            'A new school event has been announced.',
            'event_new',
            newItem.id
          );
        }
        
        resolve(newItem);
      }, 300);
    });
  }

  publishEvent(id: number) {
    return new Promise<CalendarEvent | null>((resolve) => {
      setTimeout(() => {
        let updatedEvent: CalendarEvent | null = null;
        this.db.events = this.db.events.map(e => {
          if (e.id === id) {
            updatedEvent = { ...e, status: 'published' };
            return updatedEvent;
          }
          return e;
        });

        if (updatedEvent) {
          this.saveToStorage();
          EventBus.publish('NOTIFICATION_DISPATCHED', updatedEvent);
          this.createNotification(
            `🎒 ${(updatedEvent as CalendarEvent).title}`,
            'A new school event has been announced.',
            'event_new',
            (updatedEvent as CalendarEvent).id
          );
        }

        resolve(updatedEvent);
      }, 300);
    });
  }

  // --- Student Registration & Payments ---
  registerInterest(eventId: number, studentId: string) {
    return new Promise<Registration>((resolve) => {
      setTimeout(() => {
        const isSarah = studentId === 'GFA-2025-10042' || studentId === 'sarah';
        
        const newReg: Registration = {
          id: Date.now(),
          eventId,
          studentId: isSarah ? 'GFA-2025-10042' : studentId,
          studentName: isSarah ? 'Sarah Doe' : 'Student Name',
          studentPhoto: isSarah ? 'https://i.pravatar.cc/150?u=sarah' : 'https://i.pravatar.cc/150',
          class: isSarah ? 'Grade 10' : 'Grade 9',
          section: isSarah ? 'A' : 'B',
          rollNumber: isSarah ? 12 : 1,
          parentName: isSarah ? 'John Doe' : 'Parent Name',
          parentPhone: isSarah ? '+91 98765 43211' : '+91 98765 00000',
          parentEmail: isSarah ? 'john.doe@email.com' : 'parent@email.com',
          paymentStatus: 'pending',
          amountPaid: 0,
          registrationDate: new Date().toISOString(),
          status: 'interested'
        };

        this.db.registrations = this.db.registrations.filter(r => !(r.eventId === eventId && r.studentId === studentId));
        this.db.registrations.push(newReg);
        this.saveToStorage();
        resolve(newReg);
      }, 300);
    });
  }

  completePayment(eventId: number, studentId: string, paymentMethod: string, amount: number) {
    return new Promise<Registration>((resolve) => {
      setTimeout(() => {
        const cleanStudentId = (studentId === 'sarah' || studentId === 'GFA-2025-10042') ? 'GFA-2025-10042' : studentId;
        const regIndex = this.db.registrations.findIndex(r => r.eventId === eventId && r.studentId === cleanStudentId);
        
        const isSarah = cleanStudentId === 'GFA-2025-10042';
        let reg: Registration;
        
        const txId = 'TXN-' + Math.floor(Math.random() * 90000000 + 10000000);
        const ticketNum = 'TKT-' + eventId + '-' + Math.floor(Math.random() * 9000 + 1000);

        if (regIndex >= 0) {
          reg = {
            ...this.db.registrations[regIndex],
            paymentStatus: 'paid',
            amountPaid: amount,
            status: 'registered',
            transactionId: txId,
            ticketNumber: ticketNum,
            registrationDate: new Date().toISOString()
          };
          this.db.registrations[regIndex] = reg;
        } else {
          reg = {
            id: Date.now(),
            eventId,
            studentId: cleanStudentId,
            studentName: isSarah ? 'Sarah Doe' : 'Student Name',
            studentPhoto: isSarah ? 'https://i.pravatar.cc/150?u=sarah' : 'https://i.pravatar.cc/150',
            class: isSarah ? 'Grade 10' : 'Grade 9',
            section: isSarah ? 'A' : 'B',
            rollNumber: isSarah ? 12 : 1,
            parentName: isSarah ? 'John Doe' : 'Parent Name',
            parentPhone: isSarah ? '+91 98765 43211' : '+91 98765 00000',
            parentEmail: isSarah ? 'john.doe@email.com' : 'parent@email.com',
            paymentStatus: 'paid',
            amountPaid: amount,
            registrationDate: new Date().toISOString(),
            status: 'registered',
            transactionId: txId,
            ticketNumber: ticketNum
          };
          this.db.registrations.push(reg);
        }

        this.saveToStorage();

        const eventTitle = this.db.events.find(e => e.id === eventId)?.title || 'Event';
        this.createNotification(
          '🎉 Registration Successful',
          `Registered successfully for "${eventTitle}"`,
          'registration_success',
          eventId
        );
        this.createNotification(
          '💳 Payment Successful',
          `Payment of ₹${amount} completed using ${paymentMethod.toUpperCase()}`,
          'payment_success',
          eventId
        );

        EventBus.publish('NOTIFICATION_DISPATCHED', reg);
        resolve(reg);
      }, 300);
    });
  }

  getRegistrations(eventId?: number) {
    if (eventId) {
      return Promise.resolve(this.db.registrations.filter(r => r.eventId === eventId));
    }
    return Promise.resolve([...this.db.registrations]);
  }

  getStudentRegistrations(studentId: string) {
    const cleanStudentId = (studentId === 'sarah' || studentId === 'GFA-2025-10042') ? 'GFA-2025-10042' : studentId;
    return Promise.resolve(this.db.registrations.filter(r => r.studentId === cleanStudentId));
  }

  // --- Notifications Services ---
  getNotifications() {
    return Promise.resolve([...this.db.notifications]);
  }

  createNotification(title: string, description: string, type: NotificationItem['type'], eventId?: number) {
    const newItem: NotificationItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title,
      description,
      time: 'Just now',
      read: false,
      type,
      eventId
    };
    this.db.notifications.unshift(newItem);
    this.saveToStorage();
    EventBus.publish('NOTIFICATION_DISPATCHED', newItem);
    return newItem;
  }

  markNotificationsRead() {
    this.db.notifications = this.db.notifications.map(n => ({ ...n, read: true }));
    this.saveToStorage();
    EventBus.publish('NOTIFICATION_DISPATCHED', null);
    return Promise.resolve();
  }

  markNotificationRead(id: number) {
    this.db.notifications = this.db.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    this.saveToStorage();
    EventBus.publish('NOTIFICATION_DISPATCHED', null);
    return Promise.resolve();
  }

  deleteNotification(id: number) {
    this.db.notifications = this.db.notifications.filter(n => n.id !== id);
    this.saveToStorage();
    EventBus.publish('NOTIFICATION_DISPATCHED', null);
    return Promise.resolve();
  }

  // --- Reset/Debug ---
  clearDatabase() {
    localStorage.removeItem('eduverse_db');
    this.seed();
  }
}

export const MockServer = new MockServerClass();
export type { UserRole } from '@/contexts/RoleContext';
export type { UserProfile } from '@/contexts/RoleContext';
export type { Permissions } from '@/contexts/RoleContext';
