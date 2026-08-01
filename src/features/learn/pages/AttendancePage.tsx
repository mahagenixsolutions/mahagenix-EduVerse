import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/navigation/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAttendance } from "@/features/attendance/hooks/useAttendance";
import { useRole } from "@/contexts/RoleContext";
import {
  Calendar,
  CalendarDays,
  ChevronRight,
  Clock,
  TrendingUp,
  UserX,
  BarChart2,
  PieChart,
  CheckCircle,
  ChevronDown,
  MoreVertical,
  ArrowUp,
  AlertTriangle,
  Trophy,
  ArrowRight
} from "lucide-react";
import styles from "./AttendancePage.module.css";

const statusTheme = {
  present: {
    dot: styles.dotPresent,
    badge: styles.badgePresent,
    date: styles.datePresent,
    label: "Present",
  },
  absent: {
    dot: styles.dotAbsent,
    badge: styles.badgeAbsent,
    date: styles.dateAbsent,
    label: "Absent",
  },
  late: {
    dot: styles.dotLate,
    badge: styles.badgeLate,
    date: styles.dateLate,
    label: "Late",
  },
} as const;

const splitDate = (date: string) => {
  const parts = date.replace(",", "").split(" ");

  if (parts.length >= 2 && Number.isNaN(Number(parts[0]))) {
    return { day: parts[1].padStart(2, "0"), month: parts[0] };
  }

  return { day: parts[0].padStart(2, "0"), month: parts[1] || "Oct" };
};

const Sparkline: React.FC<{
  tone: "green" | "red" | "orange";
  variant?: "soft" | "peaks";
}> = ({ tone, variant = "soft" }) => {
  const strokeClass =
    tone === "green"
      ? styles.sparkGreen
      : tone === "red"
        ? styles.sparkRed
        : styles.sparkOrange;
  const path =
    variant === "peaks"
      ? "M4 42 C18 42 22 30 34 31 C44 32 46 42 60 42 C74 42 76 30 90 30 C102 30 104 41 120 41"
      : "M4 42 C20 42 24 40 36 40 C50 40 48 32 62 34 C76 38 78 42 90 42 C104 42 104 34 118 35 C128 36 132 41 140 42";

  return (
    <svg className={styles.sparkline} viewBox="0 0 144 48" aria-hidden="true">
      <path d={path} className={strokeClass} />
    </svg>
  );
};

export const AttendancePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useRole();
  const { attendance, markAttendance, isMarking } = useAttendance();

  const isTeacher = currentUser?.role === "teacher";
  const isParent = currentUser?.role === "parent";

  const [attendStatus, setAttendStatus] = useState<
    Record<string, "present" | "absent" | "late">
  >({
    "Sarah Doe": "present",
    "John Lee": "present",
    "Alex Vance": "present",
    "Emily Rose": "present",
  });

  const studentsList = Object.keys(attendStatus);

  const handleMarkAttendanceSubmit = async () => {
    const todayStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const records = Object.entries(attendStatus).map(([, status]) => ({
      date: todayStr,
      day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
      status,
      reason: status === "absent" ? "Unexcused Absence" : undefined,
    }));
    await markAttendance(records);
    alert("Attendance published successfully!");
  };

  const totalDays = attendance.length;
  const presentDays = attendance.filter((a) => a.status === "present").length;
  const absentDays = attendance.filter((a) => a.status === "absent").length;
  const lateDays = attendance.filter((a) => a.status === "late").length;
  const overallRate =
    totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

  if (isTeacher) {
    return (
      <div>
        <PageHeader
          title="Attendance Controls"
          subtitle="Submit and update class attendance logs"
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Learn", path: "/learn" },
            { label: "Attendance" },
          ]}
        />

        <Card
          style={{ marginTop: "var(--space-4)", padding: "var(--space-4)" }}
        >
          <h3 style={{ marginBottom: "var(--space-3)" }}>
            Mark Student Attendance (Today)
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
              marginBottom: "var(--space-4)",
            }}
          >
            {studentsList.map((student) => (
              <div
                key={student}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <span style={{ fontWeight: 500 }}>{student}</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  {(["present", "absent", "late"] as const).map((mode) => {
                    const active = attendStatus[student] === mode;
                    let activeBg = "var(--bg-color)";
                    let activeColor = "var(--text-muted)";
                    let activeBorder = "var(--border-color)";

                    if (active) {
                      if (mode === "present") {
                        activeBg = "rgba(16, 185, 129, 0.15)";
                        activeColor = "var(--success)";
                        activeBorder = "var(--success)";
                      }
                      if (mode === "absent") {
                        activeBg = "rgba(239, 68, 68, 0.15)";
                        activeColor = "var(--danger)";
                        activeBorder = "var(--danger)";
                      }
                      if (mode === "late") {
                        activeBg = "rgba(245, 158, 11, 0.15)";
                        activeColor = "var(--warning)";
                        activeBorder = "var(--warning)";
                      }
                    }

                    return (
                      <button
                        key={mode}
                        onClick={() =>
                          setAttendStatus((prev) => ({
                            ...prev,
                            [student]: mode,
                          }))
                        }
                        style={{
                          padding: "6px 16px",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          background: activeBg,
                          color: activeColor,
                          border: `1px solid ${activeBorder}`,
                          transition: "all var(--transition-fast)",
                        }}
                      >
                        {mode.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="primary"
              onClick={handleMarkAttendanceSubmit}
              disabled={isMarking}
            >
              {isMarking ? "Publishing..." : "Publish Today's Attendance"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const title = isParent ? "Sarah's Attendance" : "Attendance";

  return (
    <div className={styles.attendancePage}>
      <div className={styles.overviewContainer}>
        <div className={styles.overviewHeader}>
          <div className={styles.overviewTitleWrap}>
            <h2>Attendance Overview</h2>
            <p>Track daily attendance trends and stay updated</p>
          </div>
          <div className={styles.overviewControls}>
            <button className={styles.controlDropdown}>
              <Calendar size={16} />
              This Month
              <ChevronDown size={16} />
            </button>
            <button className={styles.controlButton}>
              <TrendingUp size={16} />
              View Detailed Report
            </button>
          </div>
        </div>

        <div className={styles.overviewCards}>
          <div className={`${styles.overviewCard} ${styles.green}`}>
            <div className={styles.cardTopRow}>
              <div className={`${styles.cardIconWrap} ${styles.green}`}>
                <TrendingUp size={24} />
              </div>
              <div className={styles.cardBadgeWrap}>
                <div className={`${styles.cardBadge} ${styles.green}`}>
                  <ArrowUp size={14} /> 12%
                </div>
                <span className={styles.cardBadgeSub}>vs last 30 days</span>
              </div>
            </div>
            <div className={`${styles.cardNumber} ${styles.green}`}>{overallRate}%</div>
            <div className={styles.cardTitle}>Overall Attendance</div>
            <div className={styles.cardSubtitle}>Average attendance percentage</div>
            <div className={styles.cardChart}>
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradGreen" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 35 C 15 35, 20 20, 35 25 C 50 30, 60 25, 75 25 C 85 25, 95 15, 100 15 L 100 40 L 0 40 Z" fill="url(#gradGreen)" />
                <path d="M0 35 C 15 35, 20 20, 35 25 C 50 30, 60 25, 75 25 C 85 25, 95 15, 100 15" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <circle cx="100" cy="15" r="3" fill="#10b981" />
              </svg>
            </div>
          </div>

          <div className={`${styles.overviewCard} ${styles.blue}`}>
            <div className={styles.cardTopRow}>
              <div className={`${styles.cardIconWrap} ${styles.blue}`}>
                <CalendarDays size={24} />
              </div>
              <div className={styles.cardBadgeWrap}>
                <div className={`${styles.cardBadge} ${styles.blue}`}>
                  <CheckCircle size={14} /> Good
                </div>
              </div>
            </div>
            <div className={`${styles.cardNumber} ${styles.blue}`}>{presentDays}</div>
            <div className={styles.cardTitle}>Days Present</div>
            <div className={styles.cardSubtitle}>Total days students were present</div>
            <div className={styles.cardChart}>
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <rect x="5" y="25" width="6" height="15" fill="#93c5fd" rx="2" />
                <rect x="18" y="25" width="6" height="15" fill="#93c5fd" rx="2" />
                <rect x="31" y="20" width="6" height="20" fill="#93c5fd" rx="2" />
                <rect x="44" y="25" width="6" height="15" fill="#93c5fd" rx="2" />
                <rect x="57" y="15" width="6" height="25" fill="#93c5fd" rx="2" />
                <rect x="70" y="20" width="6" height="20" fill="#93c5fd" rx="2" />
                <rect x="83" y="25" width="6" height="15" fill="#93c5fd" rx="2" />
                <rect x="94" y="10" width="6" height="30" fill="#3b82f6" rx="2" />
              </svg>
            </div>
          </div>

          <div className={`${styles.overviewCard} ${styles.red}`}>
            <div className={styles.cardTopRow}>
              <div className={`${styles.cardIconWrap} ${styles.red}`}>
                <UserX size={24} />
              </div>
              <div className={styles.cardBadgeWrap}>
                <div className={`${styles.cardBadge} ${styles.red}`}>
                  <AlertTriangle size={14} /> Needs Attention
                </div>
              </div>
            </div>
            <div className={`${styles.cardNumber} ${styles.red}`}>{absentDays}</div>
            <div className={styles.cardTitle}>Days Absent</div>
            <div className={styles.cardSubtitle}>Total days students were absent</div>
            <div className={styles.cardChart}>
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradRed" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 35 C 15 35, 20 32, 35 32 C 45 32, 55 18, 65 25 C 75 32, 85 30, 100 28 L 100 40 L 0 40 Z" fill="url(#gradRed)" />
                <path d="M0 35 C 15 35, 20 32, 35 32 C 45 32, 55 18, 65 25 C 75 32, 85 30, 100 28" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <circle cx="100" cy="28" r="3" fill="#ef4444" />
              </svg>
            </div>
          </div>

          <div className={`${styles.overviewCard} ${styles.orange}`}>
            <div className={styles.cardTopRow}>
              <div className={`${styles.cardIconWrap} ${styles.orange}`}>
                <Clock size={24} />
              </div>
              <div className={styles.cardBadgeWrap}>
                <div className={`${styles.cardBadge} ${styles.orange}`}>
                  <ArrowUp size={14} /> 8%
                </div>
                <span className={styles.cardBadgeSub}>vs last 30 days</span>
              </div>
            </div>
            <div className={`${styles.cardNumber} ${styles.orange}`}>{lateDays}</div>
            <div className={styles.cardTitle}>Days Late</div>
            <div className={styles.cardSubtitle}>Total days students were late</div>
            <div className={styles.cardChart}>
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradOrange" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 35 L 20 35 C 30 35, 35 25, 45 25 C 55 25, 60 33, 75 33 C 85 33, 95 28, 100 28 L 100 40 L 0 40 Z" fill="url(#gradOrange)" />
                <path d="M0 35 L 20 35 C 30 35, 35 25, 45 25 C 55 25, 60 33, 75 33 C 85 33, 95 28, 100 28" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                <circle cx="100" cy="28" r="3" fill="#f59e0b" />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.overviewFooter}>
          <div className={styles.footerLeft}>
            <div className={styles.footerIcon}>
              <Trophy size={16} />
            </div>
            <div className={styles.footerText}>
              <strong>Keep it up!</strong> Your attendance is better than 72% of other classes.
            </div>
          </div>
          <button className={styles.footerButton}>
            View Insights <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <section className={styles.notificationGrid}>
        <div className={styles.notificationHeader}>
          <h3>Attendance Alerts</h3>
        </div>
        <div className={styles.notificationCardsList}>
          {attendance.filter(a => a.status !== 'present').map((day, index) => {
            const theme = statusTheme[day.status];
            const date = splitDate(day.date);
            return (
              <div key={`alert-${index}`} className={`${styles.notificationCard} ${theme.badge}`}>
                <div className={`${styles.notificationIcon} ${theme.dot}`}></div>
                <div className={styles.notificationContent}>
                  <p className={styles.notificationTitle}>
                    <strong>{theme.label}</strong> on {day.day}, {date.month} {date.day}
                  </p>
                  <p className={styles.notificationReason}>{day.reason || 'Please check with your teacher.'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.dashboardGrid}>
        {/* Attendance Overview (Area Chart) */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitleWrap}>
              <BarChart2 size={20} className={styles.chartIcon} />
              <h3>Attendance Overview</h3>
            </div>
            <div className={styles.chartControls}>
              <button className={styles.filterSelect}>
                <Calendar size={14} color="#64748B" />
                Last 30 Days
                <ChevronDown size={14} color="#64748B" />
              </button>
              <MoreVertical size={16} color="#94A3B8" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          
          <div className={styles.areaChartContainer}>
            <svg width="100%" height="100%" viewBox="0 0 800 250" preserveAspectRatio="none">
              <defs>
                <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.25)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
                </linearGradient>
              </defs>
              
              {/* Horizontal Grid Lines */}
              <line x1="0" y1="20" x2="800" y2="20" className={styles.gridLine} />
              <line x1="0" y1="70" x2="800" y2="70" className={styles.gridLine} />
              <line x1="0" y1="120" x2="800" y2="120" className={styles.gridLine} />
              <line x1="0" y1="170" x2="800" y2="170" className={styles.gridLine} />
              <line x1="0" y1="220" x2="800" y2="220" className={styles.gridLine} />
              
              {/* Y-axis Labels */}
              <text x="0" y="24" className={styles.axisLabel}>100%</text>
              <text x="0" y="74" className={styles.axisLabel}>75%</text>
              <text x="0" y="124" className={styles.axisLabel}>50%</text>
              <text x="0" y="174" className={styles.axisLabel}>25%</text>
              <text x="0" y="224" className={styles.axisLabel}>0%</text>

              {/* X-axis Labels */}
              <text x="60" y="245" className={styles.axisLabel}>Apr 24</text>
              <text x="180" y="245" className={styles.axisLabel}>Apr 28</text>
              <text x="300" y="245" className={styles.axisLabel}>May 2</text>
              <text x="420" y="245" className={styles.axisLabel}>May 6</text>
              <text x="540" y="245" className={styles.axisLabel}>May 10</text>
              <text x="660" y="245" className={styles.axisLabel}>May 14</text>
              <text x="760" y="245" className={styles.axisLabel}>May 18</text>

              {/* Chart Paths */}
              <g transform="translate(60, 0)">
                <path className={styles.areaPath} d="M0 220 L0 100 C 60 100, 90 120, 120 120 C 180 120, 210 90, 240 90 C 300 90, 330 110, 360 110 C 420 110, 450 90, 480 120 C 540 150, 570 90, 600 100 C 660 110, 690 90, 720 100 L720 220 Z" />
                <path className={styles.linePath} d="M0 100 C 60 100, 90 120, 120 120 C 180 120, 210 90, 240 90 C 300 90, 330 110, 360 110 C 420 110, 450 90, 480 120 C 540 150, 570 90, 600 100 C 660 110, 690 90, 720 100" />
                
                {/* Points */}
                <circle cx="0" cy="100" r="4" className={styles.dataPoint} />
                <circle cx="120" cy="120" r="4" className={styles.dataPoint} />
                <circle cx="240" cy="90" r="4" className={styles.dataPoint} />
                <circle cx="360" cy="110" r="4" className={styles.dataPoint} />
                
                {/* Active Point (May 10) */}
                <g transform="translate(480, 120)">
                  <circle cx="0" cy="0" r="6" className={styles.dataPointActive} />
                  <line x1="0" y1="0" x2="0" y2="100" className={styles.gridLine} style={{ stroke: '#94A3B8' }} />
                </g>

                <circle cx="600" cy="100" r="4" className={styles.dataPoint} />
                <circle cx="720" cy="100" r="4" className={styles.dataPoint} />
              </g>
            </svg>
            
            {/* Tooltip Overlay */}
            <div className={styles.chartTooltip} style={{ left: '540px', top: '100px' }}>
              <p className={styles.tooltipDate}>May 10</p>
              <p className={styles.tooltipValue}>
                <span className={styles.tooltipDot}></span>
                Attendance: <strong>72%</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Attendance Summary (Donut Chart) */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitleWrap}>
              <PieChart size={20} className={styles.chartIcon} color="#64748B" />
              <h3>Attendance Summary</h3>
            </div>
          </div>

          <div className={styles.donutContainer}>
            <div className={styles.donutSvgWrap}>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                
                {/* Present (Green) */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="12" 
                        strokeDasharray="168.3 251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                
                {/* Absent (Red) */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="12" 
                        strokeDasharray="42.7 251.2" strokeDashoffset="-105.5" strokeLinecap="round" />
                
                {/* Late (Orange) */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="12" 
                        strokeDasharray="42.7 251.2" strokeDashoffset="-148.2" strokeLinecap="round" />
              </svg>
              <div className={styles.donutCenter}>
                <span className={styles.donutNumber}>6</span>
                <span className={styles.donutLabel}>Total Days</span>
              </div>
            </div>

            <div className={styles.donutLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendLeft}>
                  <span className={styles.legendDot} style={{ background: '#10B981' }}></span>
                  Present
                </div>
                <div className={styles.legendRight}>4 (67%)</div>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendLeft}>
                  <span className={styles.legendDot} style={{ background: '#EF4444' }}></span>
                  Absent
                </div>
                <div className={styles.legendRight}>1 (17%)</div>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendLeft}>
                  <span className={styles.legendDot} style={{ background: '#F59E0B' }}></span>
                  Late
                </div>
                <div className={styles.legendRight}>1 (17%)</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div className={styles.successBanner}>
              <CheckCircle size={16} />
              Great job! Keep up the consistency.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
