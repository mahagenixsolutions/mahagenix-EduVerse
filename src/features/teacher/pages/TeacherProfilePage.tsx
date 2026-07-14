import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useRole } from '@/contexts/RoleContext';
import { teacherProfileData, teacherSchedule, teacherRecentActivity } from '@/mock/teacher';
import {
  Mail, Phone, Calendar, Briefcase, Award, Clock, BookOpen,
  Shield, Bell, Settings, GraduationCap, MapPin, Edit3, 
  Activity, Users, ChevronRight, CheckSquare, Megaphone, 
  BarChart2, MessageSquare, User, ArrowRight
} from 'lucide-react';
import styles from './TeacherProfilePage.module.css';

export const TeacherProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useRole();
  const profile = teacherProfileData;

  // Custom function for rendering schedule icons based on mock IDs
  const getScheduleMeta = (id: number) => {
    switch (id) {
      case 1: return { icon: BookOpen, iconClass: styles.scheduleIconGreen };
      case 2: return { icon: Activity, iconClass: styles.scheduleIconPurple };
      case 3: return { icon: BookOpen, iconClass: styles.scheduleIconOrange };
      case 4: return { icon: Users, iconClass: styles.scheduleIconPink };
      default: return { icon: BookOpen, iconClass: styles.scheduleIconGreen };
    }
  };

  const getStatusClass = (status: string) => {
    if (status === 'completed') return styles.badgeCompleted;
    if (status === 'ongoing') return styles.badgeOngoing;
    return styles.badgeUpcoming;
  };

  return (
    <div className={styles.profilePage}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link to="/teacher" className={styles.crumbLink}>Dashboard</Link>
        <ChevronRight size={12} style={{ color: '#cbd5e1' }} />
        <span>Profile</span>
      </nav>

      {/* Top Banner & Header */}
      <div className={styles.profileHeaderCard}>
        <div className={styles.coverPhoto} />
        <div className={styles.headerContent}>
          <div className={styles.avatarSection}>
            <Avatar src={currentUser?.avatar || profile.avatar} alt={profile.name} size="xl" className={styles.profileAvatar} />
            <button className={styles.editAvatarBtn}><Edit3 size={14} /></button>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.nameRow}>
              <h1>{currentUser?.name || profile.name}</h1>
              <span className={styles.facultyBadge}>Faculty</span>
            </div>
            <p className={styles.subtitle}>{profile.designation} • {profile.department}</p>
            <div className={styles.metaRow}>
              <span><Mail size={14} /> john.smith@eduverse.com</span>
              <span className={styles.metaSeparator}>|</span>
              <span><Phone size={14} /> +1 (555) 019-4321</span>
            </div>
          </div>
          <div className={styles.actionsBox}>
            <div className={styles.qrCodeBox}>
              <Calendar size={20} />
              <div className={styles.qrCodeInfo}>
                <span>Employee ID</span>
                <strong>EMP-2018-0042</strong>
              </div>
            </div>
            <button className={styles.actionBtn} onClick={() => navigate('/settings')}>
              <Settings size={16} /> Settings
            </button>
          </div>
        </div>
      </div>

      <div className={styles.gridLayout}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          {/* Professional Information */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeaderIcon}>
              <div className={`${styles.cardIconWrap} ${styles.iconWrapGreen}`}>
                <Briefcase size={18} />
              </div>
              <h3>Professional Information</h3>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItemRow}>
                <div className={styles.infoItemIconBox}>
                  <Calendar size={18} />
                </div>
                <div className={styles.infoItemContent}>
                  <label>Joining Date</label>
                  <p>August 15, 2018</p>
                </div>
              </div>
              <div className={styles.infoItemRow}>
                <div className={styles.infoItemIconBox}>
                  <Briefcase size={18} />
                </div>
                <div className={styles.infoItemContent}>
                  <label>Experience</label>
                  <p>7 Years</p>
                </div>
              </div>
              <div className={styles.infoItemRow}>
                <div className={styles.infoItemIconBox}>
                  <GraduationCap size={18} />
                </div>
                <div className={styles.infoItemContent}>
                  <label>Qualification</label>
                  <p>M.Sc. Mathematics, B.Ed.</p>
                </div>
              </div>
              <div className={styles.infoItemRow}>
                <div className={styles.infoItemIconBox}>
                  <Clock size={18} />
                </div>
                <div className={styles.infoItemContent}>
                  <label>Office Hours</label>
                  <p>Mon - Fri, 3:00 PM - 4:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects & Classes */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeaderIcon}>
              <div className={`${styles.cardIconWrap} ${styles.iconWrapBlue}`}>
                <BookOpen size={18} />
              </div>
              <h3>Subjects & Classes</h3>
            </div>
            <div className={styles.tagsSection}>
              <h4>Subjects</h4>
              <div className={styles.tagsWrap}>
                <span className={styles.tag}>Mathematics</span>
                <span className={styles.tag}>Physics</span>
                <span className={styles.tag}>Advanced Algebra</span>
              </div>
            </div>
            <div className={styles.tagsSection}>
              <h4>Assigned Classes</h4>
              <div className={styles.tagsWrap}>
                <span className={styles.tagAlt}>Grade 10-A</span>
                <span className={styles.tagAlt}>Grade 10-B</span>
                <span className={styles.tagAlt}>Grade 11-A</span>
                <span className={styles.tagAlt}>Grade 9-C</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeaderIcon}>
              <div className={`${styles.cardIconWrap} ${styles.iconWrapGreen}`}>
                <Award size={18} />
              </div>
              <h3>Certifications</h3>
            </div>
            <div className={styles.certsList}>
              <div className={styles.certItem}>
                <div className={styles.certIconWrap}>
                  <Award size={16} />
                </div>
                <span className={styles.certName}>Google Certified Educator</span>
              </div>
              <div className={styles.certItem}>
                <div className={styles.certIconWrap}>
                  <GraduationCap size={16} />
                </div>
                <span className={styles.certName}>Cambridge Teaching Certificate</span>
              </div>
              <div className={styles.certItem}>
                <div className={styles.certIconWrap}>
                  <Briefcase size={16} />
                </div>
                <span className={styles.certName}>STEM Education Specialist</span>
              </div>
            </div>
          </div>

          {/* Leave Balance */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeaderIcon}>
              <div className={`${styles.cardIconWrap} ${styles.iconWrapGreen}`}>
                <CheckSquare size={18} />
              </div>
              <h3>Leave Balance</h3>
            </div>
            <div className={styles.leaveRow}>
              <div className={styles.leaveItemRow}>
                <div className={`${styles.leaveIconBox} ${styles.leaveIconGreen}`}>
                  <Calendar size={16} />
                </div>
                <div className={styles.leaveDetails}>
                  <label>Casual Leave</label>
                  <p>8 days</p>
                </div>
              </div>
              <div className={styles.leaveItemRow}>
                <div className={`${styles.leaveIconBox} ${styles.leaveIconPurple}`}>
                  <Users size={16} />
                </div>
                <div className={styles.leaveDetails}>
                  <label>Sick Leave</label>
                  <p>5 days</p>
                </div>
              </div>
              <div className={styles.leaveItemRow}>
                <div className={`${styles.leaveIconBox} ${styles.leaveIconOrange}`}>
                  <Award size={16} />
                </div>
                <div className={styles.leaveDetails}>
                  <label>Earned Leave</label>
                  <p>12 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Go to Calendar bottom card */}
          <div className={styles.planBox}>
            <div className={styles.planLeft}>
              <h4 className={styles.planTitle}>Plan better, teach better.</h4>
              <p className={styles.planSubtitle}>
                Keep your schedule updated and never miss an important event.
              </p>
              <button className={styles.planBtn} onClick={() => navigate('/teacher/calendar')}>
                Go to Calendar <ArrowRight size={14} />
              </button>
            </div>
            <img 
              src="/assets/stickers/profile_illustration.png" 
              alt="Plan Calendar Illustration"
              className={styles.planIllustration} 
            />
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Today's Schedule */}
          <div className={styles.statsCard}>
            <div className={styles.scheduleHeader}>
              <h3>Today's Schedule</h3>
              <span className={styles.viewAllLink} onClick={() => navigate('/teacher/calendar')}>View all</span>
            </div>
            <div className={styles.scheduleList}>
              {teacherSchedule.slice(0, 4).map(slot => {
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
            <span className={styles.scheduleFooterLink} onClick={() => navigate('/teacher/calendar')}>
              View full schedule <ArrowRight size={14} />
            </span>
          </div>

          {/* Recent Activity */}
          <div className={styles.achievementsCard}>
            <div className={styles.activityHeader}>
              <div className={`${styles.cardIconWrap} ${styles.iconWrapBlue}`}>
                <Activity size={18} />
              </div>
              <h3>Recent Activity</h3>
            </div>
            <div className={styles.achievementsList}>
              <div className={styles.achievementItem}>
                <div className={`${styles.achIcon} ${styles.achIconRed}`}>
                  <CheckSquare size={18} />
                </div>
                <div className={styles.achContent}>
                  <h4>Graded homework</h4>
                  <p>Calculus Integration - Grade 10-A • 10 mins ago</p>
                </div>
              </div>
              <div className={styles.achievementItem}>
                <div className={`${styles.achIcon} ${styles.achIconGreen}`}>
                  <CheckSquare size={18} />
                </div>
                <div className={styles.achContent}>
                  <h4>Published attendance</h4>
                  <p>Grade 10-B - Oct 8 • 25 mins ago</p>
                </div>
              </div>
              <div className={styles.achievementItem}>
                <div className={`${styles.achIcon} ${styles.achIconMegaRed}`}>
                  <Megaphone size={18} />
                </div>
                <div className={styles.achContent}>
                  <h4>Created announcement</h4>
                  <p>Physics Lab Safety Guidelines Updated • 1 hour ago</p>
                </div>
              </div>
              <div className={styles.achievementItem}>
                <div className={`${styles.achIcon} ${styles.achIconBlue}`}>
                  <BarChart2 size={18} />
                </div>
                <div className={styles.achContent}>
                  <h4>Uploaded marks</h4>
                  <p>Unit Test 3 - Grade 11-A • 2 hours ago</p>
                </div>
              </div>
              <div className={styles.achievementItem}>
                <div className={`${styles.achIcon} ${styles.achIconGrey}`}>
                  <MessageSquare size={18} />
                </div>
                <div className={styles.achContent}>
                  <h4>Sent message</h4>
                  <p>To Robert Doe (Parent) • 3 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className={styles.settingsPreview}>
            <div className={styles.settingsHeader}>
              <div className={`${styles.cardIconWrap} ${styles.iconWrapOrange}`}>
                <Settings size={18} />
              </div>
              <h3>Quick Settings</h3>
            </div>
            <div className={styles.settingsList}>
              <button className={styles.settingBtn}>
                <Shield size={18} /> Privacy & Security
                <ChevronRight size={16} className={styles.settingBtnChevron} />
              </button>
              <button className={styles.settingBtn}>
                <Bell size={18} /> Notifications
                <ChevronRight size={16} className={styles.settingBtnChevron} />
              </button>
              <button className={styles.settingBtn}>
                <Settings size={18} /> Theme & Display
                <ChevronRight size={16} className={styles.settingBtnChevron} />
              </button>
              <button className={styles.settingBtn}>
                <User size={18} /> Account Settings
                <ChevronRight size={16} className={styles.settingBtnChevron} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
