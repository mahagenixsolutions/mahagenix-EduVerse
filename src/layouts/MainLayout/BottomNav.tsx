import React from 'react';
import { Home, BookOpen, MessageCircle, Activity, User, ClipboardList, Users, GraduationCap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import styles from './layout.module.css';

export const BottomNav: React.FC = () => {
  const { currentUser } = useRole();

  const getNavItems = () => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case 'teacher':
        return [
          { icon: Home, label: 'Dashboard', path: '/' },
          { icon: ClipboardList, label: 'Classes', path: '/teacher/classes' },
          { icon: Users, label: 'Students', path: '/teacher/students' },
          { icon: MessageCircle, label: 'Messages', path: '/messages' },
          { icon: User, label: 'Profile', path: '/profile' },
        ];
      case 'parent':
        return [
          { icon: Home, label: 'Home', path: '/' },
          { icon: GraduationCap, label: 'Children', path: '/profile' },
          { icon: MessageCircle, label: 'Messages', path: '/messages' },
          { icon: Activity, label: 'Activity', path: '/activity' },
          { icon: User, label: 'Profile', path: '/profile' },
        ];
      case 'student':
      default:
        return [
          { icon: Home, label: 'Home', path: '/' },
          { icon: BookOpen, label: 'Learn', path: '/learn' },
          { icon: MessageCircle, label: 'Messages', path: '/messages' },
          { icon: Activity, label: 'Activity', path: '/activity' },
          { icon: User, label: 'Profile', path: '/profile' },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => (
        <NavLink 
          key={item.label} 
          to={item.path}
          className={({ isActive }) => 
            isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
          }
        >
          <item.icon size={24} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
