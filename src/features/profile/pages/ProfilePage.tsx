import React from "react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate } from "react-router-dom";
import {
  profileData,
  guardianInfo,
  academicStats,
  profileAchievements,
  skills,
  interests,
} from "@/mock/profile";
import * as Icons from "lucide-react";
import { TeacherProfilePage } from "@/features/teacher/pages/TeacherProfilePage";
import styles from "./profile.module.css";

// Parent Profile Sub-Component (retains original or standard structure)
const ParentProfileView: React.FC = () => {
  const { currentUser, logout } = useRole();
  const navigate = useNavigate();

  const child = {
    name: "Sarah Doe",
    grade: "10th Grade, Section A",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    studentId: "GFA-2025-10042"
  };

  return (
    <div className={styles.profilePage}>
      {/* 1. Hero Cover Banner Section */}
      <div className={`${styles.heroProfileCard} ${styles.parentHeroCard}`}>
        <div className={styles.heroMainSection}>
          <div className={styles.avatarContainer}>
            <img
              src={currentUser?.avatar || ""}
              alt={currentUser?.name || "Parent"}
              className={styles.heroAvatar}
              style={{ borderColor: '#FFFFFF' }}
            />
            <div className={styles.cameraBadge}>
              <Icons.Camera size={14} />
            </div>
          </div>
          
          <div className={styles.heroDetails}>
            <div className={styles.nameRow}>
              <h1 style={{ color: '#FFFFFF', margin: 0 }}>{currentUser?.name}</h1>
              <span className={styles.parentBadge}>Parent</span>
            </div>
            <p className={styles.classSubtitle} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>
              Sarah Doe's Parent
            </p>
            
            <div className={styles.contactBlocksRow} style={{ marginTop: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div className={styles.contactBlock} style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '6px 14px', borderRadius: '99px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.Mail size={13} />
                <span>{currentUser?.email}</span>
              </div>
              <div className={styles.contactBlock} style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '6px 14px', borderRadius: '99px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.Phone size={13} />
                <span>{currentUser?.phone}</span>
              </div>
            </div>
          </div>

          {/* Account Verified Glass Box */}
          <div className={styles.parentVerifiedBox}>
            <div className={styles.verifiedIconCircle}>
              <Icons.ShieldCheck size={20} />
            </div>
            <div className={styles.verifiedDetails} style={{ color: '#FFFFFF' }}>
              <strong>Account Verified</strong>
              <p>Your account is secure and active.</p>
              <span>Member since: May 12, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Two Column Grid */}
      <div className={styles.parentGrid}>
        
        {/* Left Column: Child Information */}
        <div className={styles.parentCard}>
          <div className={styles.parentCardHeader}>
            <div className={styles.parentCardIconCircle}>
              <Icons.Users size={18} />
            </div>
            <div className={styles.parentCardHeaderInfo}>
              <h3>Child Information</h3>
              <p>Details of your connected child.</p>
            </div>
          </div>

          <div className={styles.childProfileCard}>
            <div className={styles.childProfileHeader}>
              <div className={styles.childMetaRow}>
                <img src={child.avatar} alt={child.name} className={styles.childAvatarImg} />
                <div className={styles.childTextMeta}>
                  <h4>{child.name}</h4>
                  <p>{child.grade}</p>
                  <span>ID: {child.studentId}</span>
                </div>
              </div>
              <span className={styles.studentStatusBadge}>
                <Icons.GraduationCap size={13} /> Active Student
              </span>
            </div>

            <div className={styles.childStatsGrid}>
              <div className={styles.childStatCol}>
                <div className={styles.childStatIconCircle}>
                  <Icons.BookOpen size={14} />
                </div>
                <div className={styles.childStatText}>
                  <span>Grade</span>
                  <strong>10th Grade</strong>
                </div>
              </div>

              <div className={styles.childStatCol}>
                <div className={styles.childStatIconCircle}>
                  <Icons.Users size={14} />
                </div>
                <div className={styles.childStatText}>
                  <span>Section</span>
                  <strong>A</strong>
                </div>
              </div>

              <div className={styles.childStatCol}>
                <div className={styles.childStatIconCircle}>
                  <Icons.Calendar size={14} />
                </div>
                <div className={styles.childStatText}>
                  <span>Admission ID</span>
                  <strong>{child.studentId}</strong>
                </div>
              </div>
            </div>
          </div>

          <button className={styles.addChildBtn} onClick={() => alert('Add student form simulation')}>
            <Icons.UserPlus size={16} /> Add Another Child
          </button>
        </div>

        {/* Right Column: Quick Settings list */}
        <div className={styles.parentCard}>
          <div className={styles.parentCardHeader}>
            <div className={styles.parentCardIconCircle} style={{ background: 'rgba(34, 197, 94, 0.08)', color: '#22C55E' }}>
              <Icons.Settings size={18} />
            </div>
            <div className={styles.parentCardHeaderInfo}>
              <h3>Quick Settings</h3>
              <p>Manage your account preferences.</p>
            </div>
          </div>

          <div className={styles.settingsNavList}>
            <div className={styles.settingsNavItem} onClick={() => navigate('/settings')}>
              <div className={styles.settingsNavItemLeft}>
                <div className={styles.settingsNavIconBox}>
                  <Icons.Shield size={18} />
                </div>
                <div className={styles.settingsNavText}>
                  <h4>Privacy & Security</h4>
                  <p>Manage your privacy settings and account security</p>
                </div>
              </div>
              <Icons.ChevronRight size={16} color="#94A3B8" />
            </div>

            <div className={styles.settingsNavItem} onClick={() => navigate('/settings')}>
              <div className={styles.settingsNavItemLeft}>
                <div className={styles.settingsNavIconBox}>
                  <Icons.Bell size={18} />
                </div>
                <div className={styles.settingsNavText}>
                  <h4>Notifications</h4>
                  <p>Manage notification preferences and alerts</p>
                </div>
              </div>
              <Icons.ChevronRight size={16} color="#94A3B8" />
            </div>

            <div className={styles.settingsNavItem} onClick={() => navigate('/settings')}>
              <div className={styles.settingsNavItemLeft}>
                <div className={styles.settingsNavIconBox}>
                  <Icons.User size={18} />
                </div>
                <div className={styles.settingsNavText}>
                  <h4>Account Preferences</h4>
                  <p>Update your account and communication preferences</p>
                </div>
              </div>
              <Icons.ChevronRight size={16} color="#94A3B8" />
            </div>

            <div className={`${styles.settingsNavItem} ${styles.logoutRow}`} onClick={() => logout()}>
              <div className={styles.settingsNavItemLeft}>
                <div className={styles.settingsNavIconBox}>
                  <Icons.LogOut size={18} />
                </div>
                <div className={styles.settingsNavText}>
                  <h4>Logout</h4>
                  <p>Sign out from your parent account</p>
                </div>
              </div>
              <Icons.ChevronRight size={16} color="#EF4444" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Re-implemented Student Profile View mapping the reference image exactly
const StudentProfileView: React.FC = () => {
  return (
    <div className={styles.profilePage}>
      {/* 1. Hero Profile Card */}
      <div className={styles.heroProfileCard}>
        <div className={styles.heroDecoration}>🎓</div>

        <div className={styles.heroMainSection}>
          {/* Avatar with verify checkmark */}
          <div className={styles.avatarContainer}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
              alt="Sarah Doe"
              className={styles.heroAvatar}
            />
            <div className={styles.avatarCheckmark}>
              <Icons.Check size={14} strokeWidth={3} />
            </div>
          </div>

          {/* Profile Completion Circle Gauge */}
          <div className={styles.profileGaugeWrap}>
            <div className={styles.gaugeContainer}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="6"
                />
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke="white"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 30}
                  strokeDashoffset={2 * Math.PI * 30 * (1 - 0.92)}
                  strokeLinecap="round"
                  transform="rotate(-90 36 36)"
                />
              </svg>
              <span className={styles.gaugeLabel}>92%</span>
            </div>
            <span className={styles.gaugeSubtitle}>Profile Complete</span>
          </div>

          {/* Title and Badge blocks */}
          <div className={styles.heroDetails}>
            <div className={styles.nameRow}>
              <h1>Sarah Doe</h1>
              <span className={styles.statusPill}>Active Student</span>
            </div>
            <p className={styles.classSubtitle}>
              10th Grade, Section A • Roll No: 12
            </p>

            <div className={styles.badgeBlocksRow}>
              <div className={styles.badgeBlock}>
                <span>Admission No</span>
                <strong>GFA-2025-10042</strong>
              </div>
              <div className={styles.badgeBlock}>
                <span>House</span>
                <strong>Phoenix</strong>
              </div>
              <div className={styles.badgeBlock}>
                <span>Academic Year</span>
                <strong>2025 - 26</strong>
              </div>
              <div className={styles.badgeBlock}>
                <span>Blood Group</span>
                <strong>O+</strong>
              </div>
            </div>
          </div>

          {/* Digital ID box on the right */}
          <div className={styles.digitalIdCard}>
            <div className={styles.idHeader}>
              <span>Student ID</span>
              <strong>GFA-2025-10042</strong>
            </div>
            <div
              style={{
                width: "56px",
                height: "56px",
                backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=56x56&data=verify_student_sarah_doe')`,
                backgroundSize: "cover",
              }}
            />
            {/* Simulated Barcode */}
            <div
              style={{
                width: "120px",
                height: "18px",
                display: "flex",
                gap: "2px",
                alignItems: "stretch",
                background: "#cbd5e1",
                padding: "2px 0",
              }}
            >
              {[2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1, 4, 2].map((w, idx) => (
                <div key={idx} style={{ flex: w, background: "black" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Contacts information */}
        <div className={styles.contactBlocksRow}>
          <div className={styles.contactBlock}>
            <div className={styles.contactIconWrap}>
              <Icons.Mail size={14} color="white" />
            </div>
            <span>sarah.doe@student.greenfieldacademy.edu</span>
          </div>
          <div className={styles.contactBlock}>
            <div className={styles.contactIconWrap}>
              <Icons.Phone size={14} color="white" />
            </div>
            <span>+91 98765 43210</span>
          </div>
        </div>

        {/* Quick action buttons links */}
        <div className={styles.heroActionsRow}>
          <button className={styles.heroActionBtn}>
            <Icons.Edit3 size={14} /> Edit Profile
          </button>
          <button className={styles.heroActionBtn}>
            <Icons.Download size={14} /> Download ID
          </button>
          <button className={styles.heroActionBtn}>
            <Icons.Calendar size={14} /> View Timetable
          </button>
          <button className={styles.heroActionBtn} style={{ color: "#EF4444" }}>
            <Icons.PhoneCall size={14} /> Emergency Contact
          </button>
        </div>
      </div>

      {/* Grid containing remaining 6 sections */}
      <div className={styles.profileGrid}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* 2. Personal Information */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Personal Information</p>
              <button className={styles.headerIconBtn}>
                <Icons.Edit3 size={14} />
              </button>
            </div>

            <div className={styles.infoDetailsGrid}>
              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.Calendar size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Date of Birth</span>
                  <strong>March 15, 2010</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.Phone size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Phone</span>
                  <strong>+91 98765 43210</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.User size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Gender</span>
                  <strong>Female</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.Mail size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Email</span>
                  <strong>sarah.doe@student.greenfieldacademy.edu</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.Globe size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Nationality</span>
                  <strong>Indian</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.MapPin size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Address</span>
                  <strong>
                    456 Greenfield Avenue, Phoenix, Arizona, USA - 85001
                  </strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.Languages size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Language</span>
                  <strong>English</strong>
                </div>
              </div>
            </div>
          </Card>

          {/* 3. Guardian Information */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Guardian Information</p>
              <span className={styles.headerLink}>View All</span>
            </div>

            <div className={styles.guardiansList}>
              <div className={styles.guardianRow}>
                <div className={styles.guardianLeft}>
                  <div className={styles.guardianIconWrap}>
                    <Icons.User size={18} />
                  </div>
                  <div className={styles.guardianDetails}>
                    <p className={styles.listItemTitle}>John Doe</p>
                    <span>Father • Software Engineer • +91 98765 43211</span>
                  </div>
                </div>
                <div className={styles.guardianActions}>
                  <button className={styles.guardianActionIconBtn}>
                    <Icons.PhoneCall size={14} />
                  </button>
                  <button className={styles.guardianActionIconBtn}>
                    <Icons.MessageSquare size={14} />
                  </button>
                </div>
              </div>

              <div className={styles.guardianRow}>
                <div className={styles.guardianLeft}>
                  <div className={styles.guardianIconWrap}>
                    <Icons.User size={18} />
                  </div>
                  <div className={styles.guardianDetails}>
                    <p className={styles.listItemTitle}>Emily Doe</p>
                    <span>Mother • Architect • +91 98765 43212</span>
                  </div>
                </div>
                <div className={styles.guardianActions}>
                  <button className={styles.guardianActionIconBtn}>
                    <Icons.PhoneCall size={14} />
                  </button>
                  <button className={styles.guardianActionIconBtn}>
                    <Icons.MessageSquare size={14} />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* 4. Skills & Interests */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Skills & Interests</p>
              <span className={styles.headerLink}>View All</span>
            </div>

            <div className={styles.tagsWrap}>
              <div className={styles.tagGroup}>
                <p className={styles.tagGroupTitle}>Skills</p>
                <div className={styles.chipsContainer}>
                  {[
                    "Mathematics",
                    "Python",
                    "Physics",
                    "Public Speaking",
                    "Creative Writing",
                    "Web Development",
                  ].map((sk) => (
                    <span key={sk} className={styles.skillChip}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.tagGroup}>
                <p className={styles.tagGroupTitle}>Interests</p>
                <div className={styles.chipsContainer}>
                  {[
                    "Coding",
                    "Robotics",
                    "Basketball",
                    "Photography",
                    "Chess",
                    "Reading",
                  ].map((int) => (
                    <span key={int} className={styles.interestChip}>
                      {int}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* 5. Academic Overview */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Academic Overview</p>
              <span className={styles.headerLink}>View Details</span>
            </div>

            <div className={styles.academicGraphsRow}>
              {/* Radial Overall Grade chart */}
              <div className={styles.radialGradeBox}>
                <div
                  style={{
                    position: "relative",
                    width: "90px",
                    height: "90px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <circle
                      cx="45"
                      cy="45"
                      r="38"
                      fill="none"
                      stroke="var(--bg-secondary)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="45"
                      cy="45"
                      r="38"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 38}
                      strokeDashoffset={2 * Math.PI * 38 * (1 - 0.864)}
                      strokeLinecap="round"
                      transform="rotate(-90 45 45)"
                    />
                  </svg>
                  <strong
                    style={{
                      position: "absolute",
                      fontSize: "1rem",
                      color: "var(--text-main)",
                    }}
                  >
                    86.4%
                  </strong>
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                  Overall Grade
                </span>
              </div>

              {/* Line graph tracing Grade Trend */}
              <div className={styles.gradeTrendBox}>
                <span>Grade Trend</span>
                <svg
                  width="100%"
                  height="80"
                  viewBox="0 0 200 80"
                  style={{ overflow: "visible" }}
                >
                  {/* Grid Lines */}
                  <line
                    x1="0"
                    y1="60"
                    x2="200"
                    y2="60"
                    stroke="var(--border-color)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <line
                    x1="0"
                    y1="30"
                    x2="200"
                    y2="30"
                    stroke="var(--border-color)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />

                  {/* Trend Path */}
                  <path
                    d="M 10 50 Q 40 30, 80 40 T 150 20 T 190 22"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                  />

                  {/* Data Points */}
                  <circle cx="10" cy="50" r="3" fill="#10B981" />
                  <circle cx="48" cy="32" r="3" fill="#10B981" />
                  <circle cx="80" cy="40" r="3" fill="#10B981" />
                  <circle cx="115" cy="28" r="3" fill="#10B981" />
                  <circle cx="150" cy="20" r="3" fill="#10B981" />
                  <circle cx="190" cy="22" r="3" fill="#10B981" />

                  {/* Labels */}
                  <text
                    x="10"
                    y="75"
                    fontSize="8"
                    fill="var(--text-light)"
                    textAnchor="middle"
                  >
                    Apr
                  </text>
                  <text
                    x="48"
                    y="75"
                    fontSize="8"
                    fill="var(--text-light)"
                    textAnchor="middle"
                  >
                    May
                  </text>
                  <text
                    x="80"
                    y="75"
                    fontSize="8"
                    fill="var(--text-light)"
                    textAnchor="middle"
                  >
                    Jun
                  </text>
                  <text
                    x="115"
                    y="75"
                    fontSize="8"
                    fill="var(--text-light)"
                    textAnchor="middle"
                  >
                    Jul
                  </text>
                  <text
                    x="150"
                    y="75"
                    fontSize="8"
                    fill="var(--text-light)"
                    textAnchor="middle"
                  >
                    Aug
                  </text>
                  <text
                    x="190"
                    y="75"
                    fontSize="8"
                    fill="var(--text-light)"
                    textAnchor="middle"
                  >
                    Sep
                  </text>
                </svg>
              </div>
            </div>

            {/* Subject Progress bars */}
            <div className={styles.subjectProgressList}>
              {[
                { name: "Mathematics", val: "92%", color: "#10B981" },
                { name: "Computer Science", val: "90%", color: "#3B82F6" },
                { name: "Physics", val: "88%", color: "#6366F1" },
                { name: "Chemistry", val: "78%", color: "#F59E0B" },
              ].map((sub) => (
                <div key={sub.name} className={styles.subjectProgressItem}>
                  <div className={styles.subjectProgressMeta}>
                    <span>{sub.name}</span>
                    <span>{sub.val}</span>
                  </div>
                  <div className={styles.subjectProgressBarBg}>
                    <div
                      className={styles.subjectProgressBarFill}
                      style={{ width: sub.val, backgroundColor: sub.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 6. Achievements & Certificates */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Achievements & Certificates</p>
              <span className={styles.headerLink}>View All</span>
            </div>

            <div className={styles.achievementsList}>
              {[
                {
                  title: "Math Olympiad Gold",
                  category: "Competition",
                  date: "Sep 2025",
                  icon: Icons.Trophy,
                  color: "#F59E0B",
                  bg: "rgba(245,158,11,0.06)",
                },
                {
                  title: "Science Fair Best Project",
                  category: "Academic",
                  date: "Jul 2025",
                  icon: Icons.Award,
                  color: "#10B981",
                  bg: "rgba(16,185,129,0.06)",
                },
                {
                  title: "Perfect Attendance — August",
                  category: "Discipline",
                  date: "Aug 2025",
                  icon: Icons.Star,
                  color: "#3B82F6",
                  bg: "rgba(59,130,246,0.06)",
                },
                {
                  title: "Coding Club Project Lead",
                  category: "Leadership",
                  date: "Jun 2025",
                  icon: Icons.BookOpen,
                  color: "#6366F1",
                  bg: "rgba(99,102,241,0.06)",
                },
                {
                  title: "Inter-School Debate Winner",
                  category: "Extra-curricular",
                  date: "May 2025",
                  icon: Icons.Sparkles,
                  color: "#EC4899",
                  bg: "rgba(236,72,153,0.06)",
                },
              ].map((ach, idx) => {
                const AchIcon = ach.icon;
                return (
                  <div key={idx} className={styles.achievementItem}>
                    <div
                      className={styles.achievementIconWrap}
                      style={{ backgroundColor: ach.bg, color: ach.color }}
                    >
                      <AchIcon size={20} />
                    </div>
                    <div className={styles.achievementDetails}>
                      <p className={styles.listItemTitle}>{ach.title}</p>
                      <span>
                        {ach.category} • {ach.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 7. Quick Settings */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Quick Settings</p>
            </div>

            <div className={styles.settingsList}>
              <div className={styles.settingRow}>
                <div className={styles.settingRowLeft}>
                  <Icons.Shield size={16} /> Privacy & Security
                </div>
                <Icons.ChevronRight size={14} color="var(--text-light)" />
              </div>

              <div className={styles.settingRow}>
                <div className={styles.settingRowLeft}>
                  <Icons.Smartphone size={16} /> Connected Devices
                </div>
                <Icons.ChevronRight size={14} color="var(--text-light)" />
              </div>

              <div className={styles.settingRow}>
                <div className={styles.settingRowLeft}>
                  <Icons.Bell size={16} /> Notification Preferences
                </div>
                <Icons.ChevronRight size={14} color="var(--text-light)" />
              </div>

              <div
                className={styles.settingRow}
                onClick={() => alert("Logging out...")}
              >
                <div
                  className={styles.settingRowLeft + " " + styles.dangerSetting}
                >
                  <Icons.LogOut size={16} /> Logout
                </div>
                <Icons.ChevronRight size={14} color="#EF4444" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Role-Resolved Profile Page
export const ProfilePage: React.FC = () => {
  const { currentUser } = useRole();

  if (!currentUser) return null;

  switch (currentUser.role) {
    case "teacher":
      return <TeacherProfilePage />;
    case "parent":
      return <ParentProfileView />;
    case "student":
    default:
      return <StudentProfileView />;
  }
};
