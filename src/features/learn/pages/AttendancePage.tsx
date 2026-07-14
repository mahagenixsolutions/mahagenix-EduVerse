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
      <header className={styles.hero}>
        <div>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <button type="button" onClick={() => navigate("/")}>
              Home
            </button>
            <ChevronRight size={14} />
            <button type="button" onClick={() => navigate("/learn")}>
              Learn
            </button>
            <ChevronRight size={14} />
            <span>Attendance</span>
          </nav>
          <h1>{title}</h1>
          <p>Track daily attendance trends and stay updated</p>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <span className={styles.orbitDotOne} />
          <span className={styles.orbitDotTwo} />
          <img src="/assets/stickers/student_attendance_hero.png" alt="" />
        </div>
      </header>

      <section className={styles.statsGrid} aria-label="Attendance summary">
        <article className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statTop}>
            <span className={`${styles.iconBubble} ${styles.iconGreen}`}>
              <TrendingUp size={28} />
            </span>
            <strong>{overallRate}%</strong>
          </div>
          <p>Overall Attendance</p>
          <Sparkline tone="green" />
        </article>

        <article className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statTop}>
            <span className={`${styles.iconBubble} ${styles.iconGreen}`}>
              <CalendarDays size={27} />
            </span>
            <strong>{presentDays}</strong>
          </div>
          <p>Days Present</p>
          <Sparkline tone="green" variant="peaks" />
        </article>

        <article className={`${styles.statCard} ${styles.statRed}`}>
          <div className={styles.statTop}>
            <span className={`${styles.iconBubble} ${styles.iconRed}`}>
              <UserX size={27} />
            </span>
            <strong>{absentDays}</strong>
          </div>
          <p>Days Absent</p>
          <Sparkline tone="red" />
        </article>

        <article className={`${styles.statCard} ${styles.statOrange}`}>
          <div className={styles.statTop}>
            <span className={`${styles.iconBubble} ${styles.iconOrange}`}>
              <Clock size={27} />
            </span>
            <strong>{lateDays}</strong>
          </div>
          <p>Days Late</p>
          <Sparkline tone="orange" variant="peaks" />
        </article>
      </section>

      <section
        className={styles.historyCard}
        aria-labelledby="recent-history-heading"
      >
        <div className={styles.historyHeader}>
          <h2 id="recent-history-heading">Recent History</h2>
          <button type="button" className={styles.weekFilter}>
            <Calendar size={16} />
            This Week
            <ChevronRight size={16} className={styles.filterChevron} />
          </button>
        </div>

        <div className={styles.historyList}>
          {attendance.map((day, index) => {
            const theme = statusTheme[day.status];
            const date = splitDate(day.date);

            return (
              <div key={`${day.date}-${index}`} className={styles.historyRow}>
                <div className={`${styles.dateTile} ${theme.date}`}>
                  <strong>{date.day}</strong>
                  <span>{date.month}</span>
                </div>
                <div className={styles.historyText}>
                  <p className={styles.historyRowTitle}>{day.day}</p>
                  {day.reason && <p>{day.reason}</p>}
                </div>
                <span className={`${styles.statusDot} ${theme.dot}`} />
                <span className={`${styles.statusBadge} ${theme.badge}`}>
                  {theme.label}
                </span>
                <ChevronRight size={22} className={styles.rowChevron} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
