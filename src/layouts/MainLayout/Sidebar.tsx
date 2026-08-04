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
  MessageSquare,
  Grid,
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import type { FeatureFlag } from "@/config/featureFlags";
import { Avatar } from "@/components/ui/Avatar";
import { EventBus } from "@/mock-server/EventBus";
import { LogoutFeedbackModal } from "@/components/feedback/LogoutFeedbackModal";
import styles from "./layout.module.css";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  featureFlag?: FeatureFlag;
  badge?: string | number;
  children?: {
    icon: React.ElementType;
    label: string;
    path: string;
    featureFlag?: FeatureFlag;
  }[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { currentUser, logout } = useRole();
  const { isFeatureEnabled } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("eduverse_sidebar_collapsed");
    return saved === "true";
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const unsub = EventBus.subscribe("TOGGLE_MOBILE_MENU", () => {
      setIsMobileOpen((prev) => !prev);
    });
    return () => unsub();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Track collapsed state per section
  const [sectionCollapsedState, setSectionCollapsedState] = useState<
    Record<string, boolean>
  >(() => {
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

  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(
    "Learn",
  );
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/app/settings");
  };

  // Get Structured Sections based on role and plan
  const getNavSections = (): NavSection[] => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case "teacher":
        return [
          {
            title: "Overview",
            items: [
              {
                icon: LayoutDashboard,
                label: "Dashboard",
                path: "/app",
                featureFlag: "dashboard",
              },
            ],
          },
          {
            title: "Teaching",
            items: [
              {
                icon: ClipboardList,
                label: "My Classes",
                path: "/app/teacher/classes",
                featureFlag: "my_classes",
              },
              {
                icon: BookOpen,
                label: "Curriculum",
                path: "/app/teacher/curriculum",
                featureFlag: "curriculum_planner",
              },
              {
                icon: CalendarCheck,
                label: "Lesson Planner",
                path: "/app/teacher/lesson-planner",
                featureFlag: "lesson_planner",
              },
            ],
          },
          {
            title: "Students",
            items: [
              {
                icon: Users,
                label: "My Students",
                path: "/app/teacher/students",
                featureFlag: "my_students",
              },
              {
                icon: CheckSquare,
                label: "Attendance",
                path: "/app/teacher/attendance",
                featureFlag: "attendance",
              },
              {
                icon: ShieldAlert,
                label: "Student Behaviour",
                path: "/app/teacher/behaviour",
                featureFlag: "behavior_tracking",
              },
              {
                icon: HelpCircle,
                label: "Student Questions",
                path: "/app/teacher/questions",
                featureFlag: "questions_bank",
              },
            ],
          },
          {
            title: "Academic",
            items: [
              {
                icon: PenTool,
                label: "Homework",
                path: "/app/teacher/homework",
                featureFlag: "homework",
              },
              {
                icon: FileText,
                label: "Assignments",
                path: "/app/teacher/assignments",
                featureFlag: "assignments",
              },
              {
                icon: GraduationCap,
                label: "Results / Gradebook",
                path: "/app/teacher/gradebook",
                featureFlag: "results",
              },
              {
                icon: FolderGit2,
                label: "Resources",
                path: "/app/teacher/resources",
                featureFlag: "resources_repository",
              },
            ],
          },
          {
            title: "Communication",
            items: [
              {
                icon: MessageCircle,
                label: "Messages",
                path: "/app/messages",
                featureFlag: "messages",
                badge: "3",
              },
              {
                icon: Megaphone,
                label: "Announcements",
                path: "/app/teacher/announcements",
                featureFlag: "announcements",
              },
              {
                icon: Users,
                label: "Parent Meetings",
                path: "/app/teacher/meetings",
                featureFlag: "parent_meetings",
              },
            ],
          },
          {
            title: "Planning",
            items: [
              {
                icon: Calendar,
                label: "Calendar",
                path: "/app/teacher/calendar",
                featureFlag: "calendar",
              },
              {
                icon: Compass,
                label: "Events",
                path: "/app/teacher/events",
                featureFlag: "live_classes",
              },
            ],
          },
          {
            title: "Insights",
            items: [
              {
                icon: BarChart3,
                label: "Reports",
                path: "/app/teacher/reports",
                featureFlag: "advanced_reports",
              },
            ],
          },
          {
            title: "Account",
            items: [
              {
                icon: User,
                label: "Profile",
                path: "/app/profile",
                featureFlag: "profile",
              },
              {
                icon: Settings,
                label: "Settings",
                path: "/app/settings",
                featureFlag: "settings",
              },
              {
                icon: HelpCircle,
                label: "System States",
                path: "/app/system/showcase",
                featureFlag: "digital_documents",
              },
            ],
          },
        ];

      case "parent":
        return [
          {
            title: "Overview",
            items: [
              {
                icon: Home,
                label: "Dashboard",
                path: "/app",
                featureFlag: "dashboard",
              },
              {
                icon: GraduationCap,
                label: "Child Profile",
                path: "/app/profile",
                featureFlag: "child_profile",
              },
              {
                icon: CheckSquare,
                label: "Attendance",
                path: "/app/learn/attendance",
                featureFlag: "attendance",
              },
              {
                icon: PenTool,
                label: "Homework",
                path: "/app/learn/homework",
                featureFlag: "homework",
              },
              {
                icon: FileText,
                label: "Assignments",
                path: "/app/learn/assignments",
                featureFlag: "assignments",
              },
              {
                icon: Award,
                label: "Results",
                path: "/app/learn/results",
                featureFlag: "results",
              },
              {
                icon: Megaphone,
                label: "Announcements",
                path: "/app/school/announcements",
                featureFlag: "announcements",
              },
              {
                icon: MessageCircle,
                label: "Messages",
                path: "/app/messages",
                featureFlag: "messages",
                badge: "3",
              },
              {
                icon: Calendar,
                label: "School Calendar",
                path: "/app/school/calendar",
                featureFlag: "calendar",
              },
              {
                icon: User,
                label: "Profile",
                path: "/app/profile",
                featureFlag: "profile",
              },
              {
                icon: Settings,
                label: "Settings",
                path: "/app/settings",
                featureFlag: "settings",
              },
            ],
          },
          {
            title: "Services",
            items: [
              {
                icon: Grid,
                label: "All Services",
                path: "/app/services",
                featureFlag: "dashboard",
              },
              {
                icon: CreditCard,
                label: "Fee Information",
                path: "/app/services/fees",
                featureFlag: "fees",
              },
              {
                icon: Library,
                label: "Library",
                path: "/app/school/library",
                featureFlag: "digital_library",
              },
              {
                icon: Bus,
                label: "Transport",
                path: "/app/school/transport",
                featureFlag: "transport_tracking",
              },
              {
                icon: Building,
                label: "Hostel",
                path: "/app/services/hostel",
                featureFlag: "hostel_management",
              },
            ],
          },
        ];

      case "student":
      default:
        return [
          {
            title: "Learning",
            items: [
              {
                icon: Home,
                label: "Dashboard",
                path: "/app",
                featureFlag: "dashboard",
              },
              {
                icon: BookOpen,
                label: "My Courses",
                path: "/app/learn",
                featureFlag: "my_courses",
              },
              {
                icon: Video,
                label: "Lessons",
                path: "/app/learn/lessons",
                featureFlag: "live_classes",
              },
              {
                icon: StickyNote,
                label: "Notes",
                path: "/app/learn/notes",
                featureFlag: "digital_documents",
              },
              {
                icon: FlaskConical,
                label: "Practice",
                path: "/app/learn/practice",
                featureFlag: "practice_tests",
              },
            ],
          },
          {
            title: "Academic",
            items: [
              {
                icon: PenTool,
                label: "Homework",
                path: "/app/learn/homework",
                featureFlag: "homework",
              },
              {
                icon: FileText,
                label: "Assignments",
                path: "/app/learn/assignments",
                featureFlag: "assignments",
              },
              {
                icon: CheckSquare,
                label: "Attendance",
                path: "/app/learn/attendance",
                featureFlag: "attendance",
              },
              {
                icon: Award,
                label: "Results",
                path: "/app/learn/results",
                featureFlag: "results",
              },
            ],
          },
          {
            title: "School",
            items: [
              {
                icon: Megaphone,
                label: "Announcements",
                path: "/app/school/announcements",
                featureFlag: "announcements",
              },
              {
                icon: Compass,
                label: "Events",
                path: "/app/school/events",
                featureFlag: "live_classes",
              },
              {
                icon: Calendar,
                label: "Calendar",
                path: "/app/school/calendar",
                featureFlag: "calendar",
              },
            ],
          },
          {
            title: "Communication",
            items: [
              {
                icon: MessageCircle,
                label: "Messages",
                path: "/app/messages",
                featureFlag: "messages",
                badge: "3",
              },
              {
                icon: MessageSquare,
                label: "Class Discussion",
                path: "/app/messages/discussion",
                featureFlag: "class_discussion",
              },
            ],
          },
          {
            title: "Services",
            items: [
              {
                icon: Grid,
                label: "All Services",
                path: "/app/services",
                featureFlag: "dashboard",
              },
              {
                icon: Library,
                label: "Library",
                path: "/app/school/library",
                featureFlag: "digital_library",
              },
              {
                icon: Bus,
                label: "Transport",
                path: "/app/school/transport",
                featureFlag: "transport_tracking",
              },
              {
                icon: Building,
                label: "Hostel",
                path: "/app/services/hostel",
                featureFlag: "hostel_management",
              },
              {
                icon: FileCheck,
                label: "Certificates",
                path: "/app/services/certificates",
                featureFlag: "certificates",
              },
            ],
          },
          {
            title: "Activity",
            items: [
              {
                icon: Activity,
                label: "Learning Activity",
                path: "/app/activity",
                featureFlag: "learning_analytics",
              },
              {
                icon: Trophy,
                label: "Achievements",
                path: "/app/activity/achievements",
                featureFlag: "achievements",
              },
              {
                icon: Bell,
                label: "Notifications",
                path: "/app/messages/notifications",
                featureFlag: "announcements",
              },
            ],
          },
          {
            title: "Account",
            items: [
              {
                icon: User,
                label: "Profile",
                path: "/app/profile",
                featureFlag: "profile",
              },
              {
                icon: Settings,
                label: "Settings",
                path: "/app/settings",
                featureFlag: "settings",
              },
            ],
          },
        ];
    }
  };

  // Filter sections and items based on subscription feature flags
  const rawSections = getNavSections();
  const navSections = rawSections
    .map((sec) => ({
      ...sec,
      items: sec.items.filter((item) => isFeatureEnabled(item.featureFlag)),
    }))
    .filter((sec) => sec.items.length > 0);

  // Auto expand active parent section when path changes
  useEffect(() => {
    navSections.forEach((sec) => {
      const hasActiveChild = sec.items.some(
        (item) =>
          item.path === location.pathname ||
          (item.children &&
            item.children.some((c) => c.path === location.pathname)),
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
    <>
      <div
        className={`${styles.sidebarOverlay} ${isMobileOpen ? styles.visible : ""}`}
        onClick={() => setIsMobileOpen(false)}
      />
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""} ${isMobileOpen ? styles.mobileOpen : ""}`}
      >
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
                style={{
                  height: "65px",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
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
                  style={{
                    height: "50px",
                    objectFit: "contain",
                    marginLeft: "-15px",
                  }}
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
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className={styles.sidebarNav}>
          {navSections.map((section) => {
            const isSectionCollapsed = !!sectionCollapsedState[section.title];
            const hasActiveItem = section.items.some(
              (i) =>
                i.path === location.pathname ||
                (i.children &&
                  i.children.some((c) => c.path === location.pathname)),
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
                      {isSectionCollapsed ? (
                        <ChevronRight size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </div>
                  </div>
                )}

                {/* Collapsed Divider for Icon Mode */}
                {isCollapsed && (
                  <div
                    className={styles.sectionDivider}
                    title={section.title}
                  />
                )}

                {/* Section Items Container */}
                {!isSectionCollapsed && (
                  <div className={styles.sectionItemsList}>
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className={styles.sidebarItemWrapper}
                      >
                        {item.children ? (
                          <>
                            <button
                              className={`${styles.sidebarItem} ${expandedSubMenu === item.label ? styles.sidebarItemExpanded : ""}`}
                              onClick={() =>
                                !isCollapsed &&
                                setExpandedSubMenu(
                                  expandedSubMenu === item.label
                                    ? null
                                    : item.label,
                                )
                              }
                              style={{ width: "100%" }}
                            >
                              <item.icon
                                size={20}
                                className={styles.itemIcon}
                              />
                              {!isCollapsed && (
                                <span className={styles.itemLabel}>
                                  {item.label}
                                </span>
                              )}
                              {renderBadge(item)}
                              {!isCollapsed &&
                                (expandedSubMenu === item.label ? (
                                  <ChevronDown
                                    size={16}
                                    className={styles.chevron}
                                  />
                                ) : (
                                  <ChevronRight
                                    size={16}
                                    className={styles.chevron}
                                  />
                                ))}
                            </button>

                            {(expandedSubMenu === item.label ||
                              isCollapsed) && (
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
                                    end
                                  >
                                    <child.icon
                                      size={16}
                                      className={styles.subIcon}
                                    />
                                    <span className={styles.subLabel}>
                                      {child.label}
                                    </span>
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
                            end
                          >
                            <item.icon size={20} className={styles.itemIcon} />
                            {!isCollapsed && (
                              <span className={styles.itemLabel}>
                                {item.label}
                              </span>
                            )}
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
                <Avatar
                  src={currentUser.avatar}
                  fallback={currentUser.name.substring(0, 2)}
                />
                <span className={styles.onlineIndicator}></span>
              </div>
              {!isCollapsed && (
                <div className={styles.profileMeta}>
                  <span className={styles.profileName}>{currentUser.name}</span>
                  <span className={styles.profileRole}>
                    {currentUser.role.charAt(0).toUpperCase() +
                      currentUser.role.slice(1)}
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

        <LogoutFeedbackModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirmLogout={handleConfirmLogout}
        />
      </aside>
    </>
  );
};
