import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'parent' | 'teacher';

export interface UserProfile {
  name: string;
  role: UserRole;
  avatar: string;
  details: string; // e.g., Grade/Class or Subject
  email?: string;
  phone?: string;
}

export interface Permissions {
  canCreateHomework: boolean;
  canEditHomework: boolean;
  canMarkAttendance: boolean;
  canPublishMarks: boolean;
  canCreateAnnouncements: boolean;
}

interface RoleContextType {
  currentUser: UserProfile | null;
  permissions: Permissions;
  login: (role: UserRole) => void;
  logout: () => void;
}

const DEFAULT_PERMISSIONS: Record<UserRole, Permissions> = {
  student: {
    canCreateHomework: false,
    canEditHomework: false,
    canMarkAttendance: false,
    canPublishMarks: false,
    canCreateAnnouncements: false,
  },
  parent: {
    canCreateHomework: false,
    canEditHomework: false,
    canMarkAttendance: false,
    canPublishMarks: false,
    canCreateAnnouncements: false,
  },
  teacher: {
    canCreateHomework: true,
    canEditHomework: true,
    canMarkAttendance: true,
    canPublishMarks: true,
    canCreateAnnouncements: true,
  },
};

const USER_MOCKS: Record<UserRole, UserProfile> = {
  student: {
    name: 'Sarah Doe',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    details: '10th Grade, Sec A',
    email: 'sarah.doe@eduverse.com',
    phone: '+1 (555) 019-2834',
  },
  parent: {
    name: 'Robert Doe',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?u=robert',
    details: "Sarah Doe's Parent",
    email: 'robert.doe@mail.com',
    phone: '+1 (555) 019-5678',
  },
  teacher: {
    name: 'Mr. John Smith',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?u=smith',
    details: 'Senior Math & Physics Teacher',
    email: 'john.smith@eduverse.com',
    phone: '+1 (555) 019-4321',
  },
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('eduverse_role');
    if (saved && USER_MOCKS[saved as UserRole]) {
      return USER_MOCKS[saved as UserRole];
    }
    return null;
  });

  const login = (role: UserRole) => {
    localStorage.setItem('eduverse_role', role);
    setCurrentUser(USER_MOCKS[role]);
  };

  const logout = () => {
    localStorage.removeItem('eduverse_role');
    setCurrentUser(null);
  };

  const permissions = currentUser ? DEFAULT_PERMISSIONS[currentUser.role] : DEFAULT_PERMISSIONS.student;

  return (
    <RoleContext.Provider value={{ currentUser, permissions, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
