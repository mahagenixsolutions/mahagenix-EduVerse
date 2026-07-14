import React, { useState } from "react";
import {
  Home,
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
  Layers,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { Avatar } from "@/components/ui/Avatar";
import styles from "./layout.module.css";

interface NavItem {
  icon: any;
  label: string;
  path: string;
  children?: { icon: any; label: string; path: string }[];
}

export const Sidebar: React.FC = () => {
  const { currentUser, logout } = useRole();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("eduverse_sidebar_collapsed");
    return saved === "true";
  });
  const [expanded, setExpanded] = useState<string | null>("Learn");

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
    navigate("/profile");
  };

  const getNavItems = (): NavItem[] => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case "teacher":
        return [
          { icon: Home, label: "Dashboard", path: "/" },
          {
            icon: ClipboardList,
            label: "My Classes",
            path: "/teacher/classes",
          },
          { icon: Users, label: "Students", path: "/teacher/students" },
          {
            icon: CheckSquare,
            label: "Attendance",
            path: "/teacher/attendance",
          },
          { icon: PenTool, label: "Homework", path: "/teacher/homework" },
          {
            icon: FileText,
            label: "Assignments",
            path: "/teacher/assignments",
          },
          { icon: Award, label: "Exams & Marks", path: "/teacher/marks" },
          { icon: Layers, label: "Courses", path: "/teacher/courses" },
          {
            icon: Megaphone,
            label: "Announcements",
            path: "/teacher/announcements",
          },
          { icon: Calendar, label: "Events", path: "/teacher/events" },
          { icon: MessageCircle, label: "Communication", path: "/messages" },
          { icon: Calendar, label: "Calendar", path: "/teacher/calendar" },
          { icon: BarChart3, label: "Reports", path: "/teacher/reports" },
          { icon: User, label: "Profile", path: "/profile" },
        ];

      case "parent":
        return [
          { icon: Home, label: "Home", path: "/" },
          { icon: GraduationCap, label: "Children Profile", path: "/profile" },
          { icon: MessageCircle, label: "Communication", path: "/messages" },
          { icon: Compass, label: "Services", path: "/services" },
          { icon: Activity, label: "Activity Feed", path: "/activity" },
        ];

      case "student":
      default:
        return [
          { icon: Home, label: "Home", path: "/" },
          {
            icon: BookOpen,
            label: "Learn",
            path: "/learn",
            children: [
              { icon: ClipboardList, label: "Courses", path: "/learn" },
              { icon: PenTool, label: "Homework", path: "/learn/homework" },
              {
                icon: FileText,
                label: "Assignments",
                path: "/learn/assignments",
              },
              { icon: StickyNote, label: "Notes", path: "/learn/notes" },
              {
                icon: FlaskConical,
                label: "Practice",
                path: "/learn/practice",
              },
              {
                icon: CheckSquare,
                label: "Attendance",
                path: "/learn/attendance",
              },
              { icon: Award, label: "Results", path: "/learn/results" },
            ],
          },
          { icon: Building, label: "School", path: "/school" },
          { icon: MessageCircle, label: "Communication", path: "/messages" },
          { icon: Compass, label: "Services", path: "/services" },
          { icon: Activity, label: "Activity", path: "/activity" },
          { icon: User, label: "Profile", path: "/profile" },
        ];
    }
  };

  const navItems = getNavItems();

  const renderBadge = (label: string) => {
    if (label === "Communication" || label === "Messages") {
      return <span className={styles.badgePill}>3</span>;
    }
    if (label === "Activity" || label === "Activity Feed") {
      return <span className={styles.badgeDot}></span>;
    }
    return null;
  };

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
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
        {navItems.map((item) => (
          <div key={item.label} className={styles.sidebarItemWrapper}>
            {item.children ? (
              <>
                <button
                  className={`${styles.sidebarItem} ${expanded === item.label ? styles.sidebarItemExpanded : ""}`}
                  onClick={() =>
                    !isCollapsed &&
                    setExpanded(expanded === item.label ? null : item.label)
                  }
                  style={{ width: "100%" }}
                >
                  <item.icon size={20} className={styles.itemIcon} />
                  {!isCollapsed && (
                    <span className={styles.itemLabel}>{item.label}</span>
                  )}

                  {/* Badge */}
                  {renderBadge(item.label)}

                  {!isCollapsed &&
                    (expanded === item.label ? (
                      <ChevronDown size={16} className={styles.chevron} />
                    ) : (
                      <ChevronRight size={16} className={styles.chevron} />
                    ))}
                </button>

                {/* Subnav (shown in-place when expanded OR absolute-positioned on hover when collapsed) */}
                {(expanded === item.label || isCollapsed) && (
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
                {!isCollapsed && (
                  <span className={styles.itemLabel}>{item.label}</span>
                )}

                {/* Badge */}
                {renderBadge(item.label)}
              </NavLink>
            )}
          </div>
        ))}
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
    </aside>
  );
};
