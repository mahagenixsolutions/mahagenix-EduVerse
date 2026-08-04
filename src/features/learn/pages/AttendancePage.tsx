import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  TrendingUp,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAttendance } from '@/features/attendance/hooks/useAttendance';
import { useRole } from '@/contexts/RoleContext';

export const AttendancePage: React.FC = () => {
  const { currentUser } = useRole();
  const { attendance, markAttendance, isMarking } = useAttendance();
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const isTeacher = currentUser?.role === 'teacher';

  const metrics = [
    {
      title: 'Overall Attendance',
      value: '96.4%',
      subtext: '+1.2% vs last month',
      subColor: '#10B981',
      icon: CheckCircle2,
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
      sparklineColor: '#10B981',
    },
    {
      title: 'Total Present Days',
      value: '162 Days',
      subtext: 'Academic Year 2025-26',
      subColor: '#64748B',
      icon: CalendarIcon,
      iconBg: '#EFF6FF',
      iconColor: '#3B82F6',
      sparklineColor: '#3B82F6',
    },
    {
      title: 'Absences / Late',
      value: '3 Days',
      subtext: '2 Excused, 1 Unexcused',
      subColor: '#EF4444',
      icon: XCircle,
      iconBg: '#FEF2F2',
      iconColor: '#EF4444',
      sparklineColor: '#EF4444',
      borderLeft: '4px solid #EF4444',
    },
    {
      title: 'Current Streak',
      value: '18 Days',
      subtext: 'Best: 45 Days 🔥',
      subColor: '#F97316',
      icon: Flame,
      iconBg: '#FFF7ED',
      iconColor: '#F97316',
      sparklineColor: '#F97316',
    },
  ];

  const subjectAttendance = [
    { subject: 'Mathematics', rate: 98, color: '#10B981' },
    { subject: 'Physics', rate: 94, color: '#10B981' },
    { subject: 'English', rate: 96, color: '#10B981' },
    { subject: 'Computer Science', rate: 100, color: '#10B981' },
    { subject: 'Chemistry', rate: 92, color: '#10B981' },
  ];

  // Calendar Grid Mock Data for 31 Days
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    if (day === 7 || day === 14 || day === 21 || day === 28) {
      return { day, status: 'weekend' };
    }
    if (day === 12) return { day, status: 'absent' };
    if (day === 19) return { day, status: 'late' };
    if (day === 15) return { day, status: 'holiday' };
    return { day, status: 'present' };
  });

  // Recent Attendance Logs Table Data
  const recentLogs = [
    { date: 'Aug 03, 2026', time: '08:00 AM', subject: 'Mathematics', status: 'present', teacher: 'Mr. Smith' },
    { date: 'Aug 02, 2026', time: '08:00 AM', subject: 'Physics', status: 'present', teacher: 'Mrs. Davis' },
    { date: 'Aug 01, 2026', time: '08:00 AM', subject: 'English', status: 'present', teacher: 'Ms. Wilson' },
    { date: 'Jul 31, 2026', time: '08:00 AM', subject: 'Computer Science', status: 'late', teacher: 'Mr. Johnson' },
    { date: 'Jul 30, 2026', time: '08:00 AM', subject: 'Chemistry', status: 'present', teacher: 'Dr. Brown' },
    { date: 'Jul 29, 2026', time: '08:00 AM', subject: 'Mathematics', status: 'absent', teacher: 'Mr. Smith' },
  ];

  const filteredLogs = recentLogs.filter((log) => {
    const matchesSearch =
      log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        paddingBottom: '40px',
      }}
    >
      {/* Page Header Banner */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px 32px',
          border: '1px solid #F1F5F9',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#10B981',
                background: '#ECFDF5',
                padding: '3px 10px',
                borderRadius: '999px',
              }}
            >
              Academic Year 2025-26
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>• Student Portal</span>
          </div>
          <p
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#0F172A',
              margin: '0 0 4px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Student Attendance Log 📅
          </p>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
            Track daily presence, view attendance rates, and monitor historical records.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              background: '#FFFFFF',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* 4 Metrics Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {metrics.map((m, idx) => {
          const IconC = m.icon;
          return (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '18px 20px',
                border: '1px solid #F1F5F9',
                borderLeft: m.borderLeft || 'none',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: m.iconBg,
                    color: m.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <IconC size={16} />
                </div>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#475569' }}>
                  {m.title}
                </span>
              </div>

              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, marginBottom: '6px' }}>
                {m.value}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 600, color: m.subColor }}>
                  {m.subtext}
                </span>

                <svg width="42" height="18" viewBox="0 0 48 20" fill="none">
                  <path
                    d="M 2 14 C 10 17, 16 6, 24 11 C 32 15, 38 3, 46 5"
                    stroke={m.sparklineColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Row 2: Monthly Calendar Visual + Subject-Wise Attendance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        {/* Monthly Attendance Calendar Box */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '24px 28px',
            border: '1px solid #F1F5F9',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
              Monthly Attendance Map
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                {selectedMonth}
              </span>
              <button
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* 7 Days Weekday Legend */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '10px',
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#94A3B8',
              marginBottom: '12px',
            }}
          >
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* 31 Days Visual Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {calendarDays.map((item) => {
              let bg = '#ECFDF5';
              let color = '#10B981';
              let label = 'P';

              if (item.status === 'absent') {
                bg = '#FEF2F2';
                color = '#EF4444';
                label = 'A';
              } else if (item.status === 'late') {
                bg = '#FFF7ED';
                color = '#F97316';
                label = 'L';
              } else if (item.status === 'holiday') {
                bg = '#F1F5F9';
                color = '#64748B';
                label = 'H';
              } else if (item.status === 'weekend') {
                bg = '#F8FAFC';
                color = '#CBD5E1';
                label = '-';
              }

              return (
                <div
                  key={item.day}
                  style={{
                    background: bg,
                    color: color,
                    borderRadius: '12px',
                    padding: '10px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{item.day}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Status Legend Row */}
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.775rem', color: '#64748B', justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
              Present (22)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
              Absent (1)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F97316' }} />
              Late (1)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#64748B' }} />
              Holiday (1)
            </span>
          </div>
        </div>

        {/* Subject-Wise Attendance Breakdown */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '24px 28px',
            border: '1px solid #F1F5F9',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
              Subject-Wise Breakdown
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {subjectAttendance.map((sub) => (
                <div key={sub.subject} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', fontWeight: 600, color: '#475569' }}>
                    <span>{sub.subject}</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{sub.rate}%</span>
                  </div>
                  <div style={{ height: '6px', width: '100%', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${sub.rate}%`, height: '100%', background: sub.color, borderRadius: '999px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '16px',
              padding: '14px',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.8rem',
              color: '#64748B',
            }}
          >
            <ShieldCheck size={20} color="#10B981" />
            <span>Attendance meets the minimum 75% school requirement for term exams.</span>
          </div>
        </div>
      </div>

      {/* Roster & Historical Attendance Table Section */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px 32px',
          border: '1px solid #F1F5F9',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
            Daily Attendance Roster
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '0.85rem',
              }}
            >
              <Search size={16} color="#94A3B8" />
              <input
                type="text"
                placeholder="Search subject or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', color: '#0F172A' }}
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '0.85rem',
                color: '#334155',
                fontWeight: 600,
                outline: 'none',
              }}
            >
              <option value="all">All Statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>

        {/* Attendance Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #F1F5F9', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px' }}>Time</th>
                <th style={{ padding: '12px 16px' }}>Subject</th>
                <th style={{ padding: '12px 16px' }}>Teacher</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((row, i) => {
                let badgeBg = '#ECFDF5';
                let badgeColor = '#10B981';
                if (row.status === 'absent') {
                  badgeBg = '#FEF2F2';
                  badgeColor = '#EF4444';
                } else if (row.status === 'late') {
                  badgeBg = '#FFF7ED';
                  badgeColor = '#F97316';
                }

                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0F172A', fontSize: '13.5px' }}>{row.date}</td>
                    <td style={{ padding: '14px 16px', color: '#64748B' }}>{row.time}</td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0F172A', fontSize: '13.5px' }}>{row.subject}</td>
                    <td style={{ padding: '14px 16px', color: '#64748B' }}>{row.teacher}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          background: badgeBg,
                          color: badgeColor,
                          padding: '4px 12px',
                          borderRadius: '999px',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
