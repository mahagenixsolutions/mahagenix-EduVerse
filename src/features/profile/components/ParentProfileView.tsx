import React from "react";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import styles from "../pages/profile.module.css";

export const ParentProfileView: React.FC = () => {
  const { currentUser, logout } = useRole();
  const navigate = useNavigate();

  const child = {
    name: "Sarah Doe",
    grade: "10th Grade, Section A",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    studentId: "GFA-2025-10042",
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
              style={{ borderColor: "#FFFFFF" }}
            />
            <div className={styles.cameraBadge}>
              <Icons.Camera size={14} />
            </div>
          </div>

          <div className={styles.heroDetails}>
            <div className={styles.nameRow}>
              <h1 style={{ color: "#FFFFFF", margin: 0 }}>{currentUser?.name}</h1>
              <span className={styles.parentBadge}>Parent</span>
            </div>
            <p
              className={styles.classSubtitle}
              style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: 0 }}
            >
              Sarah Doe's Parent
            </p>

            <div
              className={styles.contactBlocksRow}
              style={{ marginTop: "12px", display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <div
                className={styles.contactBlock}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  padding: "6px 14px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Icons.Mail size={13} />
                <span>{currentUser?.email}</span>
              </div>
              <div
                className={styles.contactBlock}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  padding: "6px 14px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
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
            <div className={styles.verifiedDetails} style={{ color: "#FFFFFF" }}>
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

          <button
            className={styles.addChildBtn}
            onClick={() => alert("Add student form simulation")}
          >
            <Icons.UserPlus size={16} /> Add Another Child
          </button>
        </div>

        {/* Right Column: Quick Settings list */}
        <div className={styles.parentCard}>
          <div className={styles.parentCardHeader}>
            <div
              className={styles.parentCardIconCircle}
              style={{ background: "rgba(34, 197, 94, 0.08)", color: "#22C55E" }}
            >
              <Icons.Settings size={18} />
            </div>
            <div className={styles.parentCardHeaderInfo}>
              <h3>Quick Settings</h3>
              <p>Manage your account preferences.</p>
            </div>
          </div>

          <div className={styles.settingsNavList}>
            <div className={styles.settingsNavItem} onClick={() => navigate("/settings")}>
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

            <div className={styles.settingsNavItem} onClick={() => navigate("/settings")}>
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

            <div className={styles.settingsNavItem} onClick={() => navigate("/settings")}>
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

            <div
              className={`${styles.settingsNavItem} ${styles.logoutRow}`}
              onClick={() => logout()}
            >
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
