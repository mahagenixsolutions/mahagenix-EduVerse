import React, { useState, useEffect } from "react";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  MessageCircle,
  Activity,
  User,
  Building,
  Compass,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ClipboardList,
  FileText,
  PenTool,
  CheckSquare,
  Award,
  StickyNote,
  FlaskConical,
  GraduationCap,
  Settings,
  LogOut,
  Users,
  Megaphone,
  Calendar,
  BarChart3,
  ShieldAlert,
  HelpCircle,
  FolderGit2,
  CalendarCheck,
  Video,
  Library,
  Bus,
  CreditCard,
  FileCheck,
  Trophy,
  Bell,
  MessageSquare
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { Avatar } from "@/components/ui/Avatar";
import styles from "./layout.module.css";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string | number;
  children?: { icon: React.ElementType; label: string; path: string }[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { currentUser, logout } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("eduverse_sidebar_collapsed");
    return saved === "true";
  });

  // Track collapsed state per section
  const [sectionCollapsedState, setSectionCollapsedState] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("eduverse_sidebar_sections");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>("Learn");

  // Save section collapse state to localStorage
  const toggleSection = (title: string) => {
    setSectionCollapsedState((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      localStorage.setItem("eduverse_sidebar_sections", JSON.stringify(next));
      return next;
    });
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("eduverse_sidebar_collapsed", String(next));
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  // Get Structured Sections based on role
  const getNavSections = (): NavSection[] => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case "teacher":
        return [
          {
            title: "Overview",
            items: [
              { icon: LayoutDashboard, label: "Dashboard", path: "/" },
            ],
          },
          {
            title: "Teaching",
            items: [
              { icon: ClipboardList, label: "My Classes", path: "/teacher/classes" },
              { icon: BookOpen, label: "Curriculum", path: "/teacher/curriculum" },
              { icon: CalendarCheck, label: "Lesson Planner", path: "/teacher/lesson-planner" },
            ],
          },
          {
            title: "Students",
            items: [
              { icon: Users, label: "Student Management", path: "/teacher/students" },
              { icon: CheckSquare, label: "Attendance", path: "/teacher/attendance" },
              { icon: ShieldAlert, label: "Student Behaviour", path: "/teacher/behaviour" },
              { icon: HelpCircle, label: "Student Questions", path: "/teacher/questions" },
            ],
          },
          {
            title: "Academic",
            items: [
              { icon: PenTool, label: "Homework", path: "/teacher/homework" },
              { icon: FileText, label: "Assignments", path: "/teacher/assignments" },
              { icon: GraduationCap, label: "Gradebook", path: "/teacher/gradebook" },
              { icon: FolderGit2, label: "Resources", path: "/teacher/resources" },
            ],
          },
          {
            title: "Communication",
            items: [
              { icon: MessageCircle, label: "Messages", path: "/messages", badge: "3" },
              { icon: Megaphone, label: "Announcements", path: "/teacher/announcements" },
              { icon: Users, label: "Parent Meetings", path: "/teacher/meetings" },
            ],
          },
          {
            title: "Planning",
            items: [
              { icon: Calendar, label: "Calendar", path: "/teacher/calendar" },
              { icon: Compass, label: "Events", path: "/teacher/events" },
            ],
          },
          {
            title: "Insights",
            items: [
              { icon: BarChart3, label: "Reports", path: "/teacher/reports" },
            ],
          },
          {
            title: "Account",
            items: [
              { icon: User, label: "Profile", path: "/profile" },
              { icon: Settings, label: "Settings", path: "/settings" },
              { icon: HelpCircle, label: "System States", path: "/system/showcase" },
            ],
          },
        ];

      case "parent":
        return [
          {
            title: "Overview",
            items: [
              { icon: Home, label: "Home", path: "/" },
              { icon: GraduationCap, label: "Children Profile", path: "/profile" },
              { icon: MessageCircle, label: "Communication", path: "/messages", badge: "3" },
              { icon: Compass, label: "Services", path: "/services" },
              { icon: Activity, label: "Activity Feed", path: "/activity" },
            ],
          },
        ];

      case "student":
      default:
        return [
          {
            title: "Learning",
            items: [
              { icon: Home, label: "Home", path: "/" },
            ],
          },
          {
            title: "Learn",
            items: [
              { icon: BookOpen, label: "Courses", path: "/learn" },
              { icon: Video, label: "Lessons", path: "/learn/lessons" },
              { icon: StickyNote, label: "Notes", path: "/learn/notes" },
              { icon: FlaskConical, label: "Practice", path: "/learn/practice" },
            ],
          },
          {
            title: "Academic",
            items: [
              { icon: PenTool, label: "Homework", path: "/learn/homework" },
              { icon: FileText, label: "Assignments", path: "/learn/assignments" },
              { icon: CheckSquare, label: "Attendance", path: "/learn/attendance" },
              { icon: Award, label: "Results", path: "/learn/results" },
            ],
          },
          {
            title: "School",
            items: [
              { icon: Megaphone, label: "Announcements", path: "/school/announcements" },
              { icon: Compass, label: "Events", path: "/school/events" },
              { icon: Calendar, label: "Calendar", path: "/school/calendar" },
            ],
          },
          {
            title: "Communication",
            items: [
              { icon: MessageCircle, label: "Messages", path: "/messages", badge: "3" },
              { icon: MessageSquare, label: "Class Discussion", path: "/messages/discussion" },
            ],
          },
          {
            title: "Services",
            items: [
              { icon: Library, label: "Library", path: "/school/library" },
              { icon: Bus, label: "Transport", path: "/school/transport" },
              { icon: Building, label: "Hostel", path: "/services/hostel" },
              { icon: CreditCard, label: "Fee Payments", path: "/services/fees" },
              { icon: FileCheck, label: "Certificates", path: "/services/certificates" },
            ],
          },
          {
            title: "Activity",
            items: [
              { icon: Activity, label: "Learning Activity", path: "/activity" },
              { icon: Trophy, label: "Achievements", path: "/activity/achievements" },
              { icon: Bell, label: "Notifications", path: "/messages/notifications" },
            ],
          },
          {
            title: "Account",
            items: [
              { icon: User, label: "Profile", path: "/profile" },
              { icon: Settings, label: "Settings", path: "/settings" },
              { icon: HelpCircle, label: "System States", path: "/system/showcase" },
            ],
          },
        ];
    }
  };

  const navSections = getNavSections();

  // Auto expand active parent section when path changes
  useEffect(() => {
    navSections.forEach((sec) => {
      const hasActiveChild = sec.items.some(
        (item) => item.path === location.pathname || (item.children && item.children.some((c) => c.path === location.pathname))
      );
      if (hasActiveChild && sectionCollapsedState[sec.title]) {
        setSectionCollapsedState((prev) => ({ ...prev, [sec.title]: false }));
      }
    });
  }, [location.pathname]);

  const renderBadge = (item: NavItem) => {
    if (item.badge) {
      return <span className={styles.badgePill}>{item.badge}</span>;
    }
    if (item.label === "Activity" || item.label === "Activity Feed") {
      return <span className={styles.badgeDot}></span>;
    }
    return null;
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <div
          className={styles.logoWrapper}
          style={{
            width: "100%",
            justifyContent: isCollapsed ? "center" : "flex-start",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isCollapsed ? (
            <img
              src="/logo-icon.png"
              alt="Logo Icon"
              style={{ height: "65px", objectFit: "contain", borderRadius: "50%" }}
            />
          ) : (
            <>
              <img
                src="/logo-icon.png"
                alt="Logo Icon"
                style={{
                  height: "80px",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
              <img
                src="/logo-text.png"
                alt="EduVerse"
                style={{ height: "50px", objectFit: "contain", marginLeft: "-15px" }}
              />
            </>
          )}
        </div>
        <button
          onClick={toggleCollapse}
          className={styles.collapseBtn}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Section */}
      <nav className={styles.sidebarNav}>
        {navSections.map((section) => {
          const isSectionCollapsed = !!sectionCollapsedState[section.title];
          const hasActiveItem = section.items.some(
            (i) => i.path === location.pathname || (i.children && i.children.some((c) => c.path === location.pathname))
          );

          return (
            <div key={section.title} className={styles.sectionGroup}>
              {/* Section Header */}
              {!isCollapsed && (
                <div
                  className={`${styles.sectionHeader} ${hasActiveItem ? styles.sectionHeaderActive : ""}`}
                  onClick={() => toggleSection(section.title)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSection(section.title);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={!isSectionCollapsed}
                >
                  <span className={styles.sectionTitle}>{section.title}</span>
                  <div className={styles.sectionChevron}>
                    {isSectionCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              )}

              {/* Collapsed Divider for Icon Mode */}
              {isCollapsed && <div className={styles.sectionDivider} title={section.title} />}

              {/* Section Items Container */}
              {!isSectionCollapsed && (
                <div className={styles.sectionItemsList}>
                  {section.items.map((item) => (
                    <div key={item.label} className={styles.sidebarItemWrapper}>
                      {item.children ? (
                        <>
                          <button
                            className={`${styles.sidebarItem} ${expandedSubMenu === item.label ? styles.sidebarItemExpanded : ""}`}
                            onClick={() =>
                              !isCollapsed &&
                              setExpandedSubMenu(expandedSubMenu === item.label ? null : item.label)
                            }
                            style={{ width: "100%" }}
                          >
                            <item.icon size={20} className={styles.itemIcon} />
                            {!isCollapsed && <span className={styles.itemLabel}>{item.label}</span>}
                            {renderBadge(item)}
                            {!isCollapsed &&
                              (expandedSubMenu === item.label ? (
                                <ChevronDown size={16} className={styles.chevron} />
                              ) : (
                                <ChevronRight size={16} className={styles.chevron} />
                              ))}
                          </button>

                          {(expandedSubMenu === item.label || isCollapsed) && (
                            <div className={styles.subNav}>
                              {item.children.map((child) => (
                                <NavLink
                                  key={child.path}
                                  to={child.path}
                                  className={({ isActive }) =>
                                    isActive
                                      ? `${styles.subItem} ${styles.subItemActive}`
                                      : styles.subItem
                                  }
                                  end={child.path === "/learn"}
                                >
                                  <child.icon size={16} className={styles.subIcon} />
                                  <span className={styles.subLabel}>{child.label}</span>
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            isActive
                              ? `${styles.sidebarItem} ${styles.sidebarItemActive}`
                              : styles.sidebarItem
                          }
                          end={item.path === "/"}
                        >
                          <item.icon size={20} className={styles.itemIcon} />
                          {!isCollapsed && <span className={styles.itemLabel}>{item.label}</span>}
                          {renderBadge(item)}
                        </NavLink>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Profile Section */}
      {currentUser && (
        <div className={styles.profileSection}>
          <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
              <Avatar src={currentUser.avatar} fallback={currentUser.name.substring(0, 2)} />
              <span className={styles.onlineIndicator}></span>
            </div>
            {!isCollapsed && (
              <div className={styles.profileMeta}>
                <span className={styles.profileName}>{currentUser.name}</span>
                <span className={styles.profileRole}>
                  {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                </span>
                <span className={styles.profileSchool}>EduVerse Academy</span>
              </div>
            )}
          </div>

          <div className={styles.profileActions}>
            <button
              className={styles.profileActionBtn}
              onClick={handleSettings}
              title="Settings"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
            <button
              className={styles.profileActionBtn}
              onClick={handleLogout}
              title="Log Out"
              aria-label="Log Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
