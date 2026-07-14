import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAttendance } from "@/features/attendance/hooks/useAttendance";
import { teacherClasses } from "@/mock/teacher";
import { studentDirectory } from "@/mock/data/teacher/students";
import {
  Users,
  Clock,
  ChevronRight,
  Send,
  ArrowRight,
  UserCheck,
  UserX,
  CheckCircle,
  GraduationCap,
  Atom,
  BookOpen,
  Calculator
} from "lucide-react";
import styles from "./TeacherAttendancePage.module.css";

const TotalStudentsIllustration = () => (
  <img
    src="/assets/stickers/total_students_sticker.png"
    alt="Total Students"
    className={styles.cardIllustration}
  />
);

const PresentIllustration = () => (
  <img
    src="/assets/stickers/present_sticker.png"
    alt="Present"
    className={styles.cardIllustration}
  />
);

const AbsentIllustration = () => (
  <img
    src="/assets/stickers/absent_sticker.png"
    alt="Absent"
    className={styles.cardIllustration}
  />
);

const LateIllustration = () => (
  <img
    src="/assets/stickers/late_sticker.png"
    alt="Late"
    className={styles.cardIllustration}
  />
);

export const TeacherAttendancePage: React.FC = () => {
  const navigate = useNavigate();
  const { attendance, markAttendance, isMarking } = useAttendance();
  const [selectedClass, setSelectedClass] = useState(teacherClasses[0]);

  // Per-class student attendance state
  const classStudentMap: Record<number, string[]> = {
    1: ["Sarah Doe", "John Lee", "Alex Vance", "Priya Sharma"],
    2: ["Emily Rose", "Dan Wright", "Kelly Adams", "Tom Harris"],
    3: ["Raj Patel", "Maya Chen", "Liam Scott", "Nina Brooks"],
    4: ["Lucas Martin", "Anna Taylor", "Jake Wilson", "Mia Clark"],
  };

  const students = classStudentMap[selectedClass.id] || [];
  const [attendStatus, setAttendStatus] = useState<
    Record<string, "present" | "absent" | "late">
  >(() => {
    const init: Record<string, "present" | "absent" | "late"> = {};
    students.forEach((s) => {
      init[s] = "present";
    });
    return init;
  });

  const handleClassChange = (cls: (typeof teacherClasses)[0]) => {
    setSelectedClass(cls);
    const newStudents = classStudentMap[cls.id] || [];
    const init: Record<string, "present" | "absent" | "late"> = {};
    newStudents.forEach((s) => {
      init[s] = "present";
    });
    setAttendStatus(init);
  };

  const currentStudents = classStudentMap[selectedClass.id] || [];

  const handleSubmit = async () => {
    const todayStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const records = Object.entries(attendStatus).map(([name, status]) => ({
      date: todayStr,
      day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
      status,
      reason: status === "absent" ? "Unexcused Absence" : undefined,
    }));
    await markAttendance(records);
    alert("Attendance published successfully!");
  };

  const presentCount = Object.values(attendStatus).filter(
    (s) => s === "present",
  ).length;
  const absentCount = Object.values(attendStatus).filter(
    (s) => s === "absent",
  ).length;
  const lateCount = Object.values(attendStatus).filter(
    (s) => s === "late",
  ).length;

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <span className={styles.crumbLink} onClick={() => navigate("/")}>
          Dashboard
        </span>
        <ChevronRight size={12} style={{ color: "#cbd5e1" }} />
        <span>Attendance</span>
      </nav>

      {/* Redesigned Header with Clipboard Sticker */}
      <div className={styles.headerMain}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIconBox}>
            <img
              src="/assets/stickers/attendance_badge_sticker.png"
              alt="Attendance Sticker"
              className={styles.headerSticker}
            />
          </div>
          <div className={styles.titleArea}>
            <h1>Attendance</h1>
            <p>Mark, edit, and publish class attendance</p>
          </div>
        </div>
        <img
          src="/attendance_checkmark_3d.png"
          alt="Clipboard Clock Illustration"
          className={styles.clipboardIllustration}
        />
      </div>

      {/* Class Selector Tab Bar */}
      <div className={styles.classSelectorGrid}>
        {teacherClasses.map((cls) => {
          const isActive = selectedClass.id === cls.id;
          
          // Icon mapping
          let icon = <Users size={20} />;
          let iconClass = styles.tabIconTotal;
          if (cls.id === 1) { icon = <GraduationCap size={20} />; iconClass = styles.tabIconGradeA; }
          if (cls.id === 2) { icon = <Atom size={20} />; iconClass = styles.tabIconGradeB; }
          if (cls.id === 3) { icon = <BookOpen size={20} />; iconClass = styles.tabIconGradeC; }
          if (cls.id === 4) { icon = <Calculator size={20} />; iconClass = styles.tabIconGradeD; }

          return (
            <button
              key={cls.id}
              onClick={() => handleClassChange(cls)}
              className={`${styles.classTabCard} ${isActive ? styles.classTabCardActive : ""}`}
            >
              <div className={`${styles.tabIconBox} ${iconClass}`}>
                {icon}
              </div>
              <div className={styles.tabContent}>
                <span className={styles.tabClassName}>{cls.name}-{cls.section}</span>
                <span className={styles.tabSubjectName}>{cls.subject}</span>
              </div>
              {isActive && <div className={styles.tabActiveIndicator} />}
            </button>
          );
        })}
      </div>

      {/* Summary Metrics Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.cardTotal}`}>
          <div className={`${styles.illustrationBg} ${styles.illustrationBgGreen}`}>
            <TotalStudentsIllustration />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{currentStudents.length}</span>
            <span className={styles.statLabel}>Total Students</span>
            <div className={`${styles.accentIndicator} ${styles.indicatorTotal}`} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.cardPresent}`}>
          <div className={`${styles.illustrationBg} ${styles.illustrationBgGreen}`}>
            <PresentIllustration />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{presentCount}</span>
            <span className={styles.statLabel}>Present</span>
            <div className={`${styles.accentIndicator} ${styles.indicatorPresent}`} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.cardAbsent}`}>
          <div className={`${styles.illustrationBg} ${styles.illustrationBgPink}`}>
            <AbsentIllustration />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{absentCount}</span>
            <span className={styles.statLabel}>Absent</span>
            <div className={`${styles.accentIndicator} ${styles.indicatorAbsent}`} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.cardLate}`}>
          <div className={`${styles.illustrationBg} ${styles.illustrationBgOrange}`}>
            <LateIllustration />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{lateCount}</span>
            <span className={styles.statLabel}>Late</span>
            <div className={`${styles.accentIndicator} ${styles.indicatorLate}`} />
          </div>
        </div>
      </div>

      {/* Attendance Form Section Card */}
      <div className={styles.attendanceCard}>
        <div className={styles.attendanceHeader}>
          <div className={styles.attendanceHeaderLeft}>
            <img src="/assets/stickers/calendar_badge.png" alt="Sticker" className={styles.calendarIcon} />
            <h3>
              Mark Attendance — {selectedClass.name}-{selectedClass.section}{" "}
              (Today)
            </h3>
          </div>
          <div className={styles.legendsList}>
            <span className={`${styles.legendItem} ${styles.dotPresent}`}>
              <span className={`${styles.dot} ${styles.dotGreen}`} /> PRESENT
            </span>
            <span className={`${styles.legendItem} ${styles.dotAbsent}`}>
              <span className={`${styles.dot} ${styles.dotRed}`} /> ABSENT
            </span>
            <span className={`${styles.legendItem} ${styles.dotLate}`}>
              <span className={`${styles.dot} ${styles.dotOrange}`} /> LATE
            </span>
          </div>
        </div>

        <div className={styles.studentList}>
          {currentStudents.map((student) => {
            // Find avatar URL from directory, or fallback to pravatar
            const studentInfo = studentDirectory.find(
              (s) => s.name === student,
            );
            const avatarUrl =
              studentInfo?.avatar ||
              `https://i.pravatar.cc/150?u=${encodeURIComponent(student)}`;
            const currentStatus = attendStatus[student];

            return (
              <div key={student} className={styles.studentRow}>
                <div className={styles.studentMeta}>
                  <img
                    src={avatarUrl}
                    alt={student}
                    className={styles.studentAvatar}
                  />
                  <span className={styles.studentName}>{student}</span>
                </div>
                <div className={styles.attendanceActions}>
                  <button
                    onClick={() =>
                      setAttendStatus((prev) => ({
                        ...prev,
                        [student]: "present",
                      }))
                    }
                    className={`${styles.btnOption} ${currentStatus === "present" ? styles.btnActivePresent : ""}`}
                  >
                    <CheckCircle size={14} /> Present
                  </button>
                  <button
                    onClick={() =>
                      setAttendStatus((prev) => ({
                        ...prev,
                        [student]: "absent",
                      }))
                    }
                    className={`${styles.btnOption} ${currentStatus === "absent" ? styles.btnActiveAbsent : ""}`}
                  >
                    <UserX size={14} /> Absent
                  </button>
                  <button
                    onClick={() =>
                      setAttendStatus((prev) => ({
                        ...prev,
                        [student]: "late",
                      }))
                    }
                    className={`${styles.btnOption} ${currentStatus === "late" ? styles.btnActiveLate : ""}`}
                  >
                    <Clock size={14} /> Late
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.formControlsRow}>
          <img
            src="/teacher_overview_backpack.png"
            alt="Backpack Sticker"
            className={styles.backpackIllustration}
          />
          <div className={styles.actionButtonsRight}>
            <button className={styles.btnSaveDraft}>Save Draft</button>
            <button
              className={styles.btnPublish}
              onClick={handleSubmit}
              disabled={isMarking}
            >
              <Send size={15} />{" "}
              {isMarking ? "Publishing..." : "Publish Today's Attendance"}
            </button>
          </div>
        </div>
      </div>

      {/* Attendance History Section Card */}
      <div className={styles.historyCard}>
        <div className={styles.historyHeader}>
          <div className={styles.historyHeaderLeft}>
            <img
              src="/assets/stickers/calendar_badge.png"
              alt="Calendar Badge"
              className={styles.calendarIcon}
            />
            <h3>Recent History</h3>
          </div>
          <img
            src="/assets/stickers/books_stack_sticker.png"
            alt="Books Illustration"
            className={styles.historySticker}
          />
        </div>

        {attendance.length === 0 ? (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            <Clock size={32} />
            <p style={{ marginTop: "8px" }}>No attendance history yet.</p>
          </div>
        ) : (
          <div className={styles.historyList}>
            {attendance.map((day, i) => {
              const statusClass =
                day.status === "present"
                  ? styles.badgePresent
                  : day.status === "late"
                    ? styles.badgeLate
                    : styles.badgeAbsent;

              return (
                <div key={i} className={styles.historyRowItem}>
                  <div className={styles.historyItemLeft}>
                    <h4 className={styles.historyItemTitle}>
                      {day.date} — {day.day}
                    </h4>
                    {day.reason && (
                      <p className={styles.historyItemReason}>{day.reason}</p>
                    )}
                  </div>
                  <div className={styles.historyItemRight}>
                    <span className={`${styles.historyBadge} ${statusClass}`}>
                      {day.status}
                    </span>
                    <span className={styles.chevronIcon}>
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button className={styles.viewAllBtnFooter}>
          View All History <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
