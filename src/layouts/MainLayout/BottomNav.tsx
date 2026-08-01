import React from 'react';
import { Home, BookOpen, MessageCircle, Activity, User, ClipboardList, Users, GraduationCap, Menu as MenuIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { EventBus } from '@/mock-server/EventBus';
import styles from './layout.module.css';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  action?: string;
}

export const BottomNav: React.FC = () => {
  const { currentUser } = useRole();

  const getNavItems = (): NavItem[] => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case 'teacher':
        return [
          { icon: Home, label: 'Dashboard', path: '/app' },
          { icon: ClipboardList, label: 'Classes', path: '/app/teacher/classes' },
          { icon: Users, label: 'Students', path: '/app/teacher/students' },
          { icon: MessageCircle, label: 'Messages', path: '/app/messages' },
          { icon: MenuIcon, label: 'Menu', action: 'toggle_menu' },
        ];
      case 'parent':
        return [
          { icon: Home, label: 'Home', path: '/app' },
          { icon: GraduationCap, label: 'Children', path: '/app/profile' },
          { icon: MessageCircle, label: 'Messages', path: '/app/messages' },
          { icon: Activity, label: 'Activity', path: '/app/activity' },
          { icon: MenuIcon, label: 'Menu', action: 'toggle_menu' },
        ];
      case 'student':
      default:
        return [
          { icon: Home, label: 'Home', path: '/app' },
          { icon: BookOpen, label: 'Learn', path: '/app/learn' },
          { icon: MessageCircle, label: 'Messages', path: '/app/messages' },
          { icon: Activity, label: 'Activity', path: '/app/activity' },
          { icon: MenuIcon, label: 'Menu', action: 'toggle_menu' },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        if (item.action === 'toggle_menu') {
          return (
            <button 
              key={item.label}
              className={styles.navItem}
              onClick={() => EventBus.publish('TOGGLE_MOBILE_MENU')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <item.icon size={24} />
              <span>{item.label}</span>
            </button>
          );
        }

        return (
          <NavLink 
            key={item.label} 
            to={item.path!}
            className={({ isActive }) => 
              isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
            }
            end
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
