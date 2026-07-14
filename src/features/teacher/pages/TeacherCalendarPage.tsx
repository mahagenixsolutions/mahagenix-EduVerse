import React, { useState } from 'react';
import { 
  Plus, ChevronLeft, ChevronRight, ChevronDown, Calendar, 
  Clock, RefreshCw, Users, BookOpen, Activity, Palette, Quote, ArrowRight
} from 'lucide-react';
import { teacherSchedule, teacherEvents } from '@/mock/teacher';
import styles from './TeacherCalendarPage.module.css';

export const TeacherCalendarPage: React.FC = () => {
  const [currentMonth] = useState('October 2025');

  // Exact calendar days matching October 2025 from the screenshot
  const calendarDays = [
    { value: 28, isCurrentMonth: false },
    { value: 29, isCurrentMonth: false },
    { value: 30, isCurrentMonth: false },
    { value: 1, isCurrentMonth: true },
    { value: 2, isCurrentMonth: true },
    { value: 3, isCurrentMonth: true },
    { value: 4, isCurrentMonth: true },
    { value: 5, isCurrentMonth: true },
    { value: 6, isCurrentMonth: true },
    { value: 7, isCurrentMonth: true },
    { value: 8, isCurrentMonth: true, isSelected: true, dotColor: 'green' },
    { value: 9, isCurrentMonth: true },
    { value: 10, isCurrentMonth: true },
    { value: 11, isCurrentMonth: true },
    { value: 12, isCurrentMonth: true },
    { value: 13, isCurrentMonth: true },
    { value: 14, isCurrentMonth: true },
    { value: 15, isCurrentMonth: true, dotColor: 'green' },
    { value: 16, isCurrentMonth: true },
    { value: 17, isCurrentMonth: true },
    { value: 18, isCurrentMonth: true },
    { value: 19, isCurrentMonth: true },
    { value: 20, isCurrentMonth: true },
    { value: 21, isCurrentMonth: true },
    { value: 22, isCurrentMonth: true, dotColor: 'green' },
    { value: 23, isCurrentMonth: true },
    { value: 24, isCurrentMonth: true },
    { value: 25, isCurrentMonth: true },
    { value: 26, isCurrentMonth: true },
    { value: 27, isCurrentMonth: true },
    { value: 28, isCurrentMonth: true, dotColor: 'green' },
    { value: 29, isCurrentMonth: true },
    { value: 30, isCurrentMonth: true },
    { value: 31, isCurrentMonth: true },
    { value: 1, isCurrentMonth: false }
  ];

  // Upcoming this week list
  const upcomingWeekItems = [
    { date: 'Wed, Oct 15', title: 'Parent-Teacher Meeting', time: '02:00 PM', theme: 'Blue', sticker: '/assets/stickers/meeting_sticker.png' },
    { date: 'Thu, Oct 16', title: 'Chemistry Practical', time: '11:00 AM', theme: 'Green', sticker: '/assets/stickers/chemistry_sticker.png' },
    { date: 'Fri, Oct 17', title: 'Sports Meet (Finals)', time: '09:00 AM', theme: 'Pink', sticker: '/assets/stickers/sports_sticker.png' },
    { date: 'Sat, Oct 18', title: 'Art & Craft Workshop', time: '10:00 AM', theme: 'Purple', sticker: '/assets/stickers/art_sticker.png' }
  ];

  // Map schedule slots to specific colors/icons
  const getScheduleMeta = (id: number) => {
    switch (id) {
      case 1: return { icon: BookOpen, iconClass: styles.scheduleIconGreen };
      case 2: return { icon: Activity, iconClass: styles.scheduleIconPurple };
      case 3: return { icon: BookOpen, iconClass: styles.scheduleIconOrange };
      case 4: return { icon: Users, iconClass: styles.scheduleIconPink };
      case 5: return { icon: BookOpen, iconClass: styles.scheduleIconGreen };
      case 6: return { icon: Clock, iconClass: styles.scheduleIconBlue };
      default: return { icon: BookOpen, iconClass: styles.scheduleIconGreen };
    }
  };

  const getStatusClass = (status: string) => {
    if (status === 'completed') return styles.badgeCompleted;
    if (status === 'ongoing') return styles.badgeOngoing;
    return styles.badgeUpcoming;
  };

  const getCategoryBadgeClass = (category: string) => {
    if (category === 'Meeting') return styles.catBadgeMeeting;
    if (category === 'Academic') return styles.catBadgeAcademic;
    return styles.catBadgeWorkshop;
  };

  return (
    <div className={styles.container}>
      {/* Custom designed Header with breadcrumbs and green icon wrapper */}
      <div>
        <nav className={styles.breadcrumbs}>
          <span className={styles.crumbLink}>Dashboard</span>
          <ChevronRight size={12} style={{ color: '#cbd5e1' }} />
          <span>Calendar</span>
        </nav>
        <div className={styles.headerMain}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIconBox}>
              <Calendar size={28} />
            </div>
            <div className={styles.titleArea}>
              <h1>Calendar</h1>
              <p>View your schedule, events, and important dates</p>
            </div>
          </div>
          <button className={styles.addEventBtn}>
            <Plus size={18} /> Add Event
          </button>
        </div>
      </div>

      <div className={styles.gridContainer}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Calendar Card */}
          <div className={styles.calendarCard}>
            <div className={styles.calendarHeader}>
              <div className={styles.navArrows}>
                <button className={styles.arrowBtn}><ChevronLeft size={16} /></button>
                <button className={styles.monthDropdown}>
                  {currentMonth} <ChevronDown size={16} />
                </button>
                <button className={styles.arrowBtn}><ChevronRight size={16} /></button>
              </div>
              <button className={styles.todayBtn}>Today</button>
            </div>

            {/* Weekday headers with custom coloring for Sun and Sat */}
            <div className={styles.weekdaysRow}>
              <div className={`${styles.weekdayHeader} ${styles.weekdaySunday}`}>Sun</div>
              <div className={styles.weekdayHeader}>Mon</div>
              <div className={styles.weekdayHeader}>Tue</div>
              <div className={styles.weekdayHeader}>Wed</div>
              <div className={styles.weekdayHeader}>Thu</div>
              <div className={styles.weekdayHeader}>Fri</div>
              <div className={`${styles.weekdayHeader} ${styles.weekdaySaturday}`}>Sat</div>
            </div>

            {/* Days Grid */}
            <div className={styles.daysGrid}>
              {calendarDays.map((day, i) => (
                <div 
                  key={i} 
                  className={`
                    ${styles.dayCell} 
                    ${!day.isCurrentMonth ? styles.dayOutside : ''} 
                    ${day.isSelected ? styles.daySelected : ''}
                  `}
                >
                  <span className={styles.dayNumber}>{day.value}</span>
                  {day.dotColor === 'green' && (
                    <span className={`${styles.dayDot} ${day.isSelected ? styles.dotSelected : styles.dotGreen}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Legend and Sync Button */}
            <div className={styles.legendRow}>
              <div className={styles.legendList}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#10b981' }} />
                  Events
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#3b82f6' }} />
                  Exams
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#ec4899' }} />
                  Holidays
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#f59e0b' }} />
                  Reminders
                </div>
              </div>
              <button className={styles.syncBtn}>
                <RefreshCw size={14} /> Sync Calendar
              </button>
            </div>
          </div>

          {/* Upcoming This Week */}
          <div className={styles.upcomingWeekCard}>
            <div className={styles.sectionHeaderWrap}>
              <div className={styles.sectionHeaderLeft}>
                <img src="/assets/stickers/calendar_badge.png" alt="Calendar" className={styles.headerSticker} />
                <div className={styles.headerTitleArea}>
                  <h3>Upcoming This Week</h3>
                  <p>Your schedule at a glance</p>
                </div>
              </div>
              <button className={styles.viewAllBtn}>
                View All <ArrowRight size={16} />
              </button>
            </div>
            
            <div className={styles.upcomingGrid}>
              {upcomingWeekItems.map(item => {
                const themeClass = styles[`item${item.theme}`];

                return (
                  <div key={item.date} className={`${styles.upcomingItem} ${themeClass}`}>
                    <div className={styles.topAccentBar} />
                    <span className={styles.upcomingDate}>{item.date}</span>
                    <div className={styles.stickerWrap}>
                      <img src={item.sticker} alt={item.title} className={styles.itemSticker} />
                    </div>
                    <h4 className={styles.upcomingTitle}>{item.title}</h4>
                    <div className={styles.dottedSeparator} />
                    <div className={styles.timeBadge}>
                      <Clock size={13} />
                      <span>{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B.B. King Quote Box */}
          <div className={styles.quoteBox}>
            <div className={styles.quoteLeft}>
              <div className={styles.quoteIconWrap}>
                <Quote size={22} />
              </div>
              <div className={styles.quoteText}>
                <blockquote>
                  "The beautiful thing about learning is nobody can take it away from you."
                </blockquote>
                <cite>— B.B. King</cite>
              </div>
            </div>
            <img 
              src="/assets/stickers/calendar_illustration.png" 
              alt="Calendar Books Illustration"
              className={styles.quoteIllustration} 
            />
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.sideContainer}>
          {/* Today's Schedule Card */}
          <div className={styles.scheduleCard}>
            <div className={styles.cardHeader}>
              <h3>Today's Schedule</h3>
              <span className={styles.viewAllLink}>View all</span>
            </div>

            <div className={styles.scheduleList}>
              {teacherSchedule.map(slot => {
                const meta = getScheduleMeta(slot.id);
                const SlotIcon = meta.icon;

                return (
                  <div key={slot.id} className={styles.scheduleItem}>
                    <span className={styles.scheduleTime}>{slot.time}</span>
                    <div className={`${styles.scheduleIconBox} ${meta.iconClass}`}>
                      <SlotIcon size={18} />
                    </div>
                    <div className={styles.scheduleDetails}>
                      <h4>{slot.subject}</h4>
                      <p>{slot.class !== '—' ? `${slot.class} • ` : ''}{slot.room}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${getStatusClass(slot.status)}`}>
                      {slot.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className={styles.eventsCard}>
            <div className={styles.cardHeader}>
              <h3>Upcoming Events</h3>
              <span className={styles.viewAllLink}>View all</span>
            </div>

            <div className={styles.eventsList}>
              {teacherEvents.map(event => {
                // Split date "Oct 15" into Month and Day
                const [month, day] = event.date.split(' ');
                const weekday = event.id === 1 || event.id === 2 ? 'WED' : 'TUE';

                return (
                  <div key={event.id} className={styles.eventsItem}>
                    <div className={styles.eventsDateBlock}>
                      <span className={styles.eventsDateMonth}>{month}</span>
                      <span className={styles.eventsDateDay}>{day}</span>
                      <span className={styles.eventsDateWeekday}>{weekday}</span>
                    </div>

                    <div className={styles.eventsDetails}>
                      <span className={`${styles.categoryBadge} ${getCategoryBadgeClass(event.category)}`}>
                        {event.category}
                      </span>
                      <h4 className={styles.eventsItemTitle}>{event.title}</h4>
                      <span className={styles.eventsItemTime}>
                        <Clock size={12} /> {event.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className={styles.allEventsFooterBtn}>
              View All Events <ChevronRight size={14} />
            </button>
          </div>

          {/* Academic Year Box */}
          <div className={styles.academicYearBox}>
            <div className={styles.academicYearText}>
              <span className={styles.academicYearLabel}>Academic Year</span>
              <span className={styles.academicYearValue}>2025 – 2026</span>
            </div>
            <button className={styles.academicYearBtn}>
              <Calendar size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
