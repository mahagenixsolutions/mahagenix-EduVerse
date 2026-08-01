import React from 'react';
import { useNavigate } from 'react-router-dom';
import { teacherClasses, performanceAlerts, studentDirectory } from '@/mock/teacher';
import {
  ChevronRight,
  BarChart3,
  CheckSquare,
  AlertTriangle,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import styles from './TeacherReportsPage.module.css';

// Wave line helper component for stats cards
const WaveChart: React.FC<{ stroke: string; fill: string; id: string; d: string }> = ({
  stroke,
  fill,
  id,
  d,
}) => (
  <svg
    viewBox="0 0 100 30"
    preserveAspectRatio="none"
    style={{ width: '100%', height: '48px', display: 'block' }}
  >
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={fill} stopOpacity="0.2" />
        <stop offset="100%" stopColor={fill} stopOpacity="0.0" />
      </linearGradient>
    </defs>
    <path d={`${d} L100,30 L0,30 Z`} fill={`url(#${id})`} />
    <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TeacherReportsPage: React.FC = () => {
  const navigate = useNavigate();

  // Compute aggregate metrics
  const totalStudents = teacherClasses.reduce((sum, c) => sum + c.studentCount, 0);
  const avgAttendance = Math.round(
    teacherClasses.reduce((sum, c) => sum + (c.todayAttendance.present / c.studentCount) * 100, 0) / teacherClasses.length
  );
  const avgPerformance =
    Math.round(
      (teacherClasses.reduce((sum, c) => sum + c.averagePerformance, 0) / teacherClasses.length) * 10
    ) / 10;
  const totalPendingHw = teacherClasses.reduce((sum, c) => sum + c.homeworkStatus.pending, 0);

  // Top 5 students by exam score
  const topStudents = [...studentDirectory]
    .sort((a, b) => b.lastExamScore - a.lastExamScore)
    .slice(0, 5);

  // Best performing class
  const bestClass = [...teacherClasses].sort((a, b) => b.averagePerformance - a.averagePerformance)[0];

  // Helper for bar color class
  const getBarColor = (val: number, threshold = 80) =>
    val >= threshold ? styles.barFillGreen : val >= 70 ? styles.barFillOrange : styles.barFillRed;

  // Rank badge styling
  const rankClass = (idx: number) => {
    if (idx === 0) return styles.rankGold;
    if (idx === 1) return styles.rankSilver;
    if (idx === 2) return styles.rankBronze;
    return styles.rankDefault;
  };

  // Alert type to display label
  const alertLabel = (type: string) => {
    const map: Record<string, string> = {
      'low-performance': 'Low Performance',
      'low-attendance': 'Low Attendance',
      'missing-homework': 'Missing Homework',
    };
    return map[type] || type;
  };

  const alertBadgeClass = (type: string) => {
    if (type === 'low-performance') return styles.badgeDanger;
    if (type === 'low-attendance') return styles.badgeBlue;
    return styles.badgeWarning;
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <span className={styles.crumbLink} onClick={() => navigate('/app')}>
          Dashboard
        </span>
        <ChevronRight size={12} style={{ color: '#cbd5e1' }} />
        <span>Reports</span>
      </nav>

      {/* Page Header */}
      <div className={styles.headerMain}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIconBox}>
            <img
              src="/assets/stickers/clipboard_clock_sticker.png"
              alt="Reports Sticker"
              className={styles.headerSticker}
            />
          </div>
          <div className={styles.titleArea}>
            <h1>Reports</h1>
            <p>Analytics and performance insights across your classes</p>
          </div>
        </div>
        <img
          src="/assets/stickers/clipboard_clock_sticker.png"
          alt="Reports Illustration"
          className={styles.headerIllustration}
        />
      </div>

      {/* 4 Stats Cards */}
      <div className={styles.statsGrid}>
        {/* Total Students */}
        <div className={`${styles.statCard} ${styles.cardGreen}`}>
          <div className={`${styles.illustrationBg} ${styles.illustrationBgGreen}`}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{totalStudents}</span>
            <span className={styles.statLabel}>Total Students</span>
          </div>
          <div className={styles.waveContainer}>
            <WaveChart
              id="wave-students"
              stroke="#10b981"
              fill="#10b981"
              d="M0,25 C15,10 30,22 50,8 C70,25 85,5 100,18"
            />
          </div>
        </div>

        {/* Avg Attendance */}
        <div className={`${styles.statCard} ${styles.cardBlue}`}>
          <div className={`${styles.illustrationBg} ${styles.illustrationBgBlue}`}>
            <CheckSquare size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{avgAttendance}%</span>
            <span className={styles.statLabel}>Avg Attendance</span>
          </div>
          <div className={styles.waveContainer}>
            <WaveChart
              id="wave-attendance"
              stroke="#10b981"
              fill="#10b981"
              d="M0,18 C20,25 40,5 60,20 C80,30 90,10 100,15"
            />
          </div>
        </div>

        {/* Avg Performance */}
        <div className={`${styles.statCard} ${styles.cardOrange}`}>
          <div className={`${styles.illustrationBg} ${styles.illustrationBgOrange}`}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{avgPerformance}%</span>
            <span className={styles.statLabel}>Avg Performance</span>
          </div>
          <div className={styles.waveContainer}>
            <WaveChart
              id="wave-performance"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              d="M0,22 C15,5 35,25 55,10 C75,25 90,8 100,15"
            />
          </div>
        </div>

        {/* Pending Homework */}
        <div className={`${styles.statCard} ${styles.cardPurple}`}>
          <div className={`${styles.illustrationBg} ${styles.illustrationBgPurple}`}>
            <BookOpen size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{totalPendingHw}</span>
            <span className={styles.statLabel}>Pending Homework</span>
          </div>
          <div className={styles.waveContainer}>
            <WaveChart
              id="wave-homework"
              stroke="#f59e0b"
              fill="#f59e0b"
              d="M0,15 C20,8 40,25 60,12 C80,5 90,22 100,18"
            />
          </div>
        </div>
      </div>

      {/* Two-Column: Class Performance + Attendance By Class */}
      <div className={styles.sectionGrid}>
        {/* Class Performance */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderLeft}>
              <div className={`${styles.sectionIcon} ${styles.sectionIconGreen}`}>
                <BarChart3 size={18} />
              </div>
              <h3 className={styles.sectionTitle}>Class Performance</h3>
            </div>
            <span className={styles.viewLink}>
              View Details <ArrowRight size={13} />
            </span>
          </div>
          {teacherClasses.map(cls => (
            <div key={cls.id} className={styles.barRow}>
              <span className={styles.barLabel}>{cls.name}-{cls.section}</span>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${getBarColor(cls.averagePerformance)}`}
                  style={{ width: `${cls.averagePerformance}%` }}
                />
              </div>
              <span className={styles.barPercent}>{cls.averagePerformance}%</span>
            </div>
          ))}
          <div className={`${styles.highlightRow} ${styles.highlightRowGold}`}>
            <Star size={16} className={styles.highlightIcon} style={{ color: '#f59e0b' }} />
            <span>{bestClass.name}-{bestClass.section} is performing the best this month!</span>
            <img
              src="/assets/stickers/sports_sticker.png"
              alt=""
              className={styles.rowSticker}
            />
          </div>
        </div>

        {/* Today's Attendance by Class */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderLeft}>
              <div className={`${styles.sectionIcon} ${styles.sectionIconBlue}`}>
                <CheckSquare size={18} />
              </div>
              <h3 className={styles.sectionTitle}>Today's Attendance by Class</h3>
            </div>
            <span className={styles.viewLink}>
              View All <ArrowRight size={13} />
            </span>
          </div>
          {teacherClasses.map(cls => {
            const rate = Math.round((cls.todayAttendance.present / cls.studentCount) * 100);
            return (
              <div key={cls.id} className={styles.barRow}>
                <span className={styles.barLabel}>{cls.name}-{cls.section}</span>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${getBarColor(rate, 90)}`}
                    style={{ width: `${rate}%` }}
                  />
                </div>
                <span className={styles.barPercent}>{rate}%</span>
              </div>
            );
          })}
          <div className={`${styles.highlightRow} ${styles.highlightRowGreen}`}>
            <CheckCircle size={16} className={styles.highlightIcon} style={{ color: '#16a34a' }} />
            <span>Great job! Overall attendance is excellent today.</span>
            <img
              src="/assets/stickers/calendar_badge.png"
              alt=""
              className={styles.rowSticker}
            />
          </div>
        </div>
      </div>

      {/* Performance Alerts */}
      <div className={styles.alertsCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <div className={`${styles.sectionIcon} ${styles.sectionIconRed}`}>
              <AlertTriangle size={18} />
            </div>
            <h3 className={styles.sectionTitle}>Performance Alerts</h3>
          </div>
          <span className={styles.viewLink}>
            View All Alerts <ArrowRight size={13} />
          </span>
        </div>
        {performanceAlerts.map(alert => {
          // Find student avatar
          const student = studentDirectory.find(s => s.name === alert.student);
          return (
            <div
              key={alert.id}
              className={`${styles.alertRow} ${
                alert.severity === 'high' ? styles.alertRowHigh : styles.alertRowMedium
              }`}
            >
              <div className={styles.alertLeft}>
                <img
                  src={student?.avatar || `https://i.pravatar.cc/150?u=${alert.student.replace(/\s/g, '')}`}
                  alt={alert.student}
                  className={styles.alertAvatar}
                />
                <div>
                  <div className={styles.alertName}>
                    {alert.student} — {alert.class}
                  </div>
                  <div className={styles.alertMessage}>{alert.message}</div>
                </div>
              </div>
              <span className={`${styles.alertBadge} ${alertBadgeClass(alert.type)}`}>
                {alertLabel(alert.type)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Top Performing Students */}
      <div className={styles.performersCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <div className={`${styles.sectionIcon} ${styles.sectionIconGold}`}>
              <Trophy size={18} />
            </div>
            <h3 className={styles.sectionTitle}>Top Performing Students</h3>
          </div>
          <span className={styles.viewLink}>
            View Full List <ArrowRight size={13} />
          </span>
        </div>
        {topStudents.map((student, idx) => (
          <div key={student.id} className={styles.performerRow}>
            <span className={`${styles.rankBadge} ${rankClass(idx)}`}>
              #{idx + 1}
            </span>
            <img
              src={student.avatar}
              alt={student.name}
              className={styles.performerAvatar}
            />
            <span className={styles.performerName}>{student.name}</span>
            <span className={styles.performerClass}>
              {student.class}-{student.section}
            </span>
            <div className={styles.performerBar}>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${styles.barFillGreen}`}
                  style={{ width: `${student.lastExamScore}%` }}
                />
              </div>
            </div>
            <span className={styles.performerScore}>{student.lastExamScore}%</span>
          </div>
        ))}
        {/* Stickers in bottom corners */}
        <img
          src="/assets/stickers/books_stack_sticker.png"
          alt=""
          className={styles.stickerBottomLeft}
        />
        <img
          src="/assets/stickers/sports_sticker.png"
          alt=""
          className={styles.stickerBottomRight}
        />
      </div>
    </div>
  );
};
