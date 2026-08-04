import React from "react";
import { Card } from "@/components/ui/Card";
import {
  profileData,
  guardianInfo,
  academicStats,
  profileAchievements,
  skills,
  interests,
} from "@/mock/profile";
import * as Icons from "lucide-react";
import styles from "../pages/profile.module.css";

export const StudentProfileView: React.FC = () => {
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
                  <Icons.Mail size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Personal Email</span>
                  <strong>sarah.d@gmail.com</strong>
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
                  <Icons.Home size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Residential Address</span>
                  <strong>42 Parkview Enclave, Sector 15, City</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.Globe size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Nationality & Language</span>
                  <strong>Indian • English, Hindi</strong>
                </div>
              </div>
            </div>
          </Card>

          {/* 3. Guardian & Family */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Guardian & Family</p>
            </div>

            <div className={styles.infoDetailsGrid}>
              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.UserCheck size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Primary Guardian</span>
                  <strong>{guardianInfo.father.name}</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.Briefcase size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Occupation</span>
                  <strong>{guardianInfo.father.occupation}</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.PhoneCall size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Guardian Phone</span>
                  <strong>{guardianInfo.father.phone}</strong>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoRowIconWrap}>
                  <Icons.Heart size={16} />
                </div>
                <div className={styles.infoRowContent}>
                  <span>Mother's Name</span>
                  <strong>{guardianInfo.mother.name}</strong>
                </div>
              </div>
            </div>
          </Card>

          {/* 4. Skills & Extracurriculars */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Skills & Extracurriculars</p>
              <button
                style={{
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  color: '#059669',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Icons.Plus size={12} /> Add Skill
              </button>
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', marginBottom: '20px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                Core Competencies
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#EFF6FF',
                      border: '1px solid #DBEAFE',
                      color: '#2563EB',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '8px 16px',
                      borderRadius: '999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.04)',
                      transition: 'transform 0.2s ease',
                      cursor: 'default',
                    }}
                  >
                    <Icons.Star size={13} color="#2563EB" /> {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                Interests & Clubs
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {interests.map((interest, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      color: '#334155',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '8px 16px',
                      borderRadius: '999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      transition: 'transform 0.2s ease',
                      cursor: 'default',
                    }}
                  >
                    <Icons.Smile size={13} color="#64748B" /> {interest}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* 5. Academic Performance Summary */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Academic Summary</p>
              <span
                style={{
                  background: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid #A7F3D0',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                CGPA: {academicStats.overallPercentage}%
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #F1F5F9',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
                  Overall CGPA
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, marginBottom: '4px' }}>
                  {academicStats.overallPercentage}%
                </div>
                <div style={{ fontSize: '0.725rem', color: '#10B981', fontWeight: 600 }}>
                  Top 5% of class
                </div>
              </div>

              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #F1F5F9',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
                  Attendance
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, marginBottom: '4px' }}>
                  96%
                </div>
                <div style={{ fontSize: '0.725rem', color: '#64748B' }}>
                  172/180 days
                </div>
              </div>

              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #F1F5F9',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
                  Assignments
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, marginBottom: '4px' }}>
                  {academicStats.assignmentsSubmitted}
                </div>
                <div style={{ fontSize: '0.725rem', color: '#10B981', fontWeight: 600 }}>
                  100% submission
                </div>
              </div>

              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #F1F5F9',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>
                  Class Rank
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, marginBottom: '4px' }}>
                  #{academicStats.classRank}
                </div>
                <div style={{ fontSize: '0.725rem', color: '#64748B' }}>
                  Section A
                </div>
              </div>
            </div>
          </Card>

          {/* 6. Achievements & Milestones */}
          <Card className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Achievements & Milestones</p>
              <a
                href="/app/profile"
                style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}
              >
                View All
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {profileAchievements.map((ach) => {
                const IconComponent =
                  (Icons[ach.icon as keyof typeof Icons] as React.FC<{
                    size?: number;
                  }>) || Icons.Trophy;

                return (
                  <div
                    key={ach.id}
                    style={{
                      background: '#F8FAFC',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      border: '1px solid #F1F5F9',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: ach.id === 1 ? '#FFF7ED' : ach.id === 2 ? '#EFF6FF' : '#ECFDF5',
                        color: ach.id === 1 ? '#F97316' : ach.id === 2 ? '#3B82F6' : '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={18} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: '0 0 2px 0', fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                        {ach.title}
                      </p>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
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
