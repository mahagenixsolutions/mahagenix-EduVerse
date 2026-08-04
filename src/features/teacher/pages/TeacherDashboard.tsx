import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import {
  Users,
  FileText,
  ClipboardList,
  CalendarDays,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Upload,
  MessageSquare,
  BarChart2,
  HelpCircle,
  CheckSquare,
  BookOpen,
  ArrowRight,
  Bell,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Static mock data
// ─────────────────────────────────────────────────────────
const scheduleItems = [
  { start: '08:30 AM', end: '09:20 AM', cls: 'Class 9 - A',  subject: 'Mathematics', room: 'Room 204',    accent: '#3B82F6', roomBg: '#EFF6FF' },
  { start: '09:30 AM', end: '10:20 AM', cls: 'Class 10 - B', subject: 'Mathematics', room: 'Room 204',    accent: '#3B82F6', roomBg: '#EFF6FF' },
  { start: '10:40 AM', end: '11:30 AM', cls: 'Class 8 - A',  subject: 'Mathematics', room: 'Orange 203', accent: '#F59E0B', roomBg: '#FFFBEB' },
  { start: '12:00 PM', end: '12:50 PM', cls: 'Class 9 - B',  subject: 'Mathematics', room: 'Room 205',    accent: '#3B82F6', roomBg: '#EFF6FF' },
  { start: '01:00 PM', end: '01:50 PM', cls: 'Class 10 - A', subject: 'Mathematics', room: 'Room 205',    accent: '#3B82F6', roomBg: '#EFF6FF' },
];

const classesOverview = [
  { name: 'Class 9 - A',  students: 24, progress: 88, barColor: '#22C55E' },
  { name: 'Class 10 - A', students: 22, progress: 75, barColor: '#F59E0B' },
  { name: 'Class 9 - B',  students: 26, progress: 90, barColor: '#22C55E' },
  { name: 'Class 10 - B', students: 21, progress: 80, barColor: '#22C55E' },
];

const pendingTasks = [
  {
    Icon: FileText,    iconBg: '#FFF7ED', iconColor: '#F97316',
    title: 'Review Math Assignment - Trigonometry',
    sub: 'Class 10 - A', count: 12, due: 'Due Today',     dueColor: '#EF4444',
  },
  {
    Icon: ClipboardList, iconBg: '#FFFBEB', iconColor: '#F59E0B',
    title: 'Grade Quiz - Algebra Basics',
    sub: 'Class 9 - B',  count: 18, due: 'Due Tomorrow', dueColor: '#F59E0B',
  },
  {
    Icon: BookOpen,    iconBg: '#F0FDF4', iconColor: '#22C55E',
    title: 'Review Homework - Linear Equations',
    sub: 'Class 8 - A', count: 22, due: 'Due 25 May',    dueColor: '#22C55E',
  },
  {
    Icon: Upload,      iconBg: '#EFF6FF', iconColor: '#3B82F6',
    title: 'Upload Study Materials',
    sub: 'Class 9 - A', count: null, due: 'Due 26 May',  dueColor: '#3B82F6',
  },
];

const announcements = [
  {
    title: 'Mathematics Club Activity',
    desc: 'Math puzzle competition next Friday. Interested students register with your class teacher.',
    date: 'Today', time: '10:30 AM', iconBg: '#EFF6FF', iconColor: '#3B82F6',
  },
  {
    title: 'Unit Test Schedule',
    desc: 'Unit Test 1 for Classes 8-10 will be conducted from June 1st - June 7th.',
    date: 'Yesterday', time: '04:15 PM', iconBg: '#F0FDF4', iconColor: '#22C55E',
  },
  {
    title: 'Teacher Meeting',
    desc: 'Monthly academic review meeting on Saturday at 10:00 AM in Conference Hall.',
    date: '21 May 2025', time: '02:20 PM', iconBg: '#F5F3FF', iconColor: '#8B5CF6',
  },
];

// May 2025: May 1 = Thursday → index 4 (0=Sun)
const calendarWeeks = [
  [{ d: 27, prev: true }, { d: 28, prev: true }, { d: 29, prev: true }, { d: 30, prev: true }, { d: 1 }, { d: 2 }, { d: 3 }],
  [{ d: 4 }, { d: 5 }, { d: 6 }, { d: 7 }, { d: 8 }, { d: 9 }, { d: 10 }],
  [{ d: 11 }, { d: 12 }, { d: 13 }, { d: 14 }, { d: 15 }, { d: 16 }, { d: 17 }],
  [{ d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23, today: true }, { d: 24 }],
  [{ d: 25 }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }, { d: 30 }, { d: 31 }],
];

const upcomingEvents = [
  { monthLabel: 'MAY', day: '24', title: 'Mathematics Quiz',      sub: 'Class 9 - A',  time: '09:30 AM - 10:30 AM', tag: 'Quiz',       tagBg: '#EFF6FF', tagColor: '#3B82F6', dateBg: '#EFF6FF', dateColor: '#3B82F6' },
  { monthLabel: 'MAY', day: '27', title: 'Project Submission',    sub: 'Class 10 - B', time: '11:30 AM - 12:30 PM', tag: 'Submission', tagBg: '#FFFBEB', tagColor: '#F59E0B', dateBg: '#FFFBEB', dateColor: '#F59E0B' },
  { monthLabel: 'MAY', day: '30', title: 'Unit Test 1',           sub: 'Class 8 - A',  time: '08:30 AM - 10:30 AM', tag: 'Exam',       tagBg: '#FEF2F2', tagColor: '#EF4444', dateBg: '#FEF2F2', dateColor: '#EF4444' },
  { monthLabel: 'JUN', day: '02', title: 'Parent-Teacher Meeting', sub: 'All Classes', time: '10:00 AM - 02:00 PM', tag: 'Meeting',    tagBg: '#F0FDF4', tagColor: '#22C55E', dateBg: '#F0FDF4', dateColor: '#22C55E' },
];

const quickActions = [
  { label: 'Take Attendance',  Icon: CheckSquare,  iconBg: '#EFF6FF', iconColor: '#3B82F6', route: '/app/teacher/attendance' },
  { label: 'Create Assignment', Icon: FileText,     iconBg: '#FFF7ED', iconColor: '#F97316', route: '/app/teacher/homework' },
  { label: 'Upload Materials', Icon: Upload,        iconBg: '#F0FDFA', iconColor: '#14B8A6', route: '/app/teacher/resources' },
  { label: 'Create Quiz',      Icon: HelpCircle,   iconBg: '#F5F3FF', iconColor: '#8B5CF6', route: '/app/teacher/questions' },
  { label: 'Send Message',     Icon: MessageSquare, iconBg: '#F0FDF4', iconColor: '#22C55E', route: '/app/teacher/announcements' },
  { label: 'Generate Report',  Icon: BarChart2,    iconBg: '#EFF6FF', iconColor: '#3B82F6', route: '/app/teacher/reports' },
];

const calendarLegend = [
  { label: 'Classes', color: '#3B82F6' },
  { label: 'Exams',   color: '#EF4444' },
  { label: 'Events',  color: '#22C55E' },
  { label: 'Tasks',   color: '#F59E0B' },
];

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useRole();

  const firstName = (currentUser?.name || 'Arjun').split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Shared card style
  const card: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #F1F5F9',
    boxShadow: '0 1px 6px rgba(15,23,42,0.06)',
    padding: '20px',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#0F172A',
    margin: 0,
  };

  const viewAllLink: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#3B82F6',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  const divider: React.CSSProperties = {
    borderBottom: '1px solid #F1F5F9',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>

      {/* ────────────────── HEADER ────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
            {greeting}, {firstName}! 👋
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '6px 0 0 0' }}>
            Here's what's happening in your classes today.
          </p>
        </div>
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#FFFFFF', border: '1px solid #E2E8F0',
            borderRadius: '10px', padding: '8px 14px',
            fontSize: '0.83rem', fontWeight: 600, color: '#374151',
            cursor: 'pointer', boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
          }}
        >
          <CalendarDays size={15} color="#3B82F6" />
          This Week
          <ChevronRight size={14} color="#94A3B8" />
        </button>
      </div>

      {/* ────────────────── STATS ROW ────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
        {[
          { value: '8',   label: 'My Classes',         sub: 'Active this semester',    iconBg: '#EFF6FF', iconColor: '#3B82F6', Icon: Users },
          { value: '24',  label: 'Total Students',     sub: 'Across all classes',      iconBg: '#F0FDF4', iconColor: '#22C55E', Icon: Users },
          { value: '12',  label: 'Pending Tasks',      sub: 'Assignments to review',   iconBg: '#FFF7ED', iconColor: '#F97316', Icon: ClipboardList },
          { value: '6',   label: "Today's Classes",    sub: 'Scheduled today',         iconBg: '#EFF6FF', iconColor: '#3B82F6', Icon: CalendarDays },
          { value: '87%', label: 'Avg. Class Progress', sub: 'This week',              iconBg: '#FFF1F2', iconColor: '#F43F5E', Icon: TrendingUp },
        ].map((s) => (
          <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: s.iconBg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}>
              <s.Icon size={20} color={s.iconColor} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginTop: '3px' }}>{s.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{s.sub}</span>
                <ChevronRight size={12} color="#CBD5E1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ────────────────── ROW 1: Schedule | Classes | Tasks ────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px', alignItems: 'start' }}>

        {/* TODAY'S SCHEDULE */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <CalendarDays size={15} color="#3B82F6" />
              <span style={sectionTitle}>Today's Schedule</span>
            </div>
            <button style={viewAllLink}>View Full Timetable</button>
          </div>
          <div>
            {scheduleItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 0',
                  ...(i < scheduleItems.length - 1 ? divider : {}),
                }}
              >
                {/* Time + colored left border */}
                <div style={{ borderLeft: `3px solid ${item.accent}`, paddingLeft: '8px', minWidth: '76px', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#374151' }}>{item.start}</div>
                  <div style={{ fontSize: '0.67rem', color: '#94A3B8', marginTop: '1px' }}>{item.end}</div>
                </div>
                {/* Class info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.81rem', fontWeight: 700, color: '#0F172A' }}>{item.cls}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '1px' }}>@ {item.subject}</div>
                </div>
                {/* Room badge */}
                <span style={{
                  fontSize: '0.68rem', fontWeight: 600,
                  color: item.accent, background: item.roomBg,
                  padding: '3px 8px', borderRadius: '6px', flexShrink: 0,
                }}>{item.room}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MY CLASSES OVERVIEW */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={sectionTitle}>My Classes Overview</span>
            <button style={viewAllLink}>View All Classes</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {classesOverview.map((cls) => (
              <div key={cls.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>{cls.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '1px' }}>{cls.students} Students</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A' }}>{cls.progress}%</div>
                      <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Progress</div>
                    </div>
                    <Users size={14} color="#CBD5E1" />
                  </div>
                </div>
                <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${cls.progress}%`, height: '100%', background: cls.barColor, borderRadius: '99px' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <button style={{ ...viewAllLink, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
              View Detailed Progress <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* PENDING TASKS */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={sectionTitle}>Pending Tasks</span>
            <button style={viewAllLink}>View All</button>
          </div>
          <div>
            {pendingTasks.map((task, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 0',
                  ...(i < pendingTasks.length - 1 ? divider : {}),
                }}
              >
                <div style={{
                  width: '34px', height: '34px', borderRadius: '9px',
                  background: task.iconBg, color: task.iconColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <task.Icon size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '1px' }}>{task.sub}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {task.count !== null ? (
                    <>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A' }}>{task.count}</div>
                      <div style={{ fontSize: '0.62rem', color: '#94A3B8' }}>Submissions</div>
                    </>
                  ) : (
                    <div style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 300 }}>—</div>
                  )}
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: task.dueColor, marginTop: '2px' }}>{task.due}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── ROW 2: Announcements | Calendar | Upcoming ────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px', alignItems: 'start' }}>

        {/* RECENT ANNOUNCEMENTS */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Bell size={15} color="#3B82F6" />
              <span style={sectionTitle}>Recent Announcements</span>
            </div>
            <button style={viewAllLink}>View All</button>
          </div>
          <div>
            {announcements.map((ann, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  padding: '10px 0',
                  ...(i < announcements.length - 1 ? divider : {}),
                }}
              >
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: ann.iconBg, color: ann.iconColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Bell size={15} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>{ann.title}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '3px', lineHeight: 1.4 }}>{ann.desc}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}>{ann.date}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '1px' }}>{ann.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALENDAR */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={sectionTitle}>Calendar</span>
            <button style={viewAllLink}>View Full Calendar</button>
          </div>
          {/* Month navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}>
              <ChevronLeft size={17} color="#64748B" />
            </button>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>May 2025</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={17} color="#64748B" />
            </button>
          </div>
          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
              <div key={d} style={{ textAlign: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#94A3B8', padding: '2px 0' }}>{d}</div>
            ))}
          </div>
          {/* Calendar days */}
          {calendarWeeks.map((week, wi) => (
            <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '2px' }}>
              {week.map((cell, di) => (
                <div
                  key={di}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '28px', height: '28px', margin: '0 auto',
                    borderRadius: '50%',
                    fontSize: '0.72rem',
                    fontWeight: (cell as any).today ? 800 : 500,
                    color: (cell as any).prev ? '#CBD5E1' : (cell as any).today ? '#FFFFFF' : '#374151',
                    background: (cell as any).today ? '#3B82F6' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {cell.d}
                </div>
              ))}
            </div>
          ))}
          {/* Legend */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {calendarLegend.map((l) => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: '#64748B' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={sectionTitle}>Upcoming</span>
            <button style={viewAllLink}>View All</button>
          </div>
          <div>
            {upcomingEvents.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 0',
                  ...(i < upcomingEvents.length - 1 ? divider : {}),
                }}
              >
                {/* Date box */}
                <div style={{
                  width: '44px', minWidth: '44px', height: '44px', borderRadius: '10px',
                  background: ev.dateBg, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <div style={{ fontSize: '0.55rem', fontWeight: 800, color: ev.dateColor, letterSpacing: '0.04em' }}>{ev.monthLabel}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: ev.dateColor, lineHeight: 1 }}>{ev.day}</div>
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>{ev.title}</div>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '1px' }}>{ev.sub}</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '1px' }}>{ev.time}</div>
                </div>
                {/* Tag */}
                <span style={{
                  fontSize: '0.66rem', fontWeight: 700,
                  color: ev.tagColor, background: ev.tagBg,
                  padding: '3px 9px', borderRadius: '6px', flexShrink: 0,
                }}>{ev.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── QUICK ACTIONS ────────────────── */}
      <div style={{ ...card, padding: '20px 24px' }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#3B82F6', margin: '0 0 16px 0' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.route)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                background: '#FAFAFA', border: '1px solid #F1F5F9', borderRadius: '12px',
                padding: '16px 8px', cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = a.iconColor;
                (e.currentTarget as HTMLButtonElement).style.background = a.iconBg;
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#F1F5F9';
                (e.currentTarget as HTMLButtonElement).style.background = '#FAFAFA';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: a.iconBg, color: a.iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <a.Icon size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.3 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
