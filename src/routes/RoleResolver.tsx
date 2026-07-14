import React from 'react';
import { useRole } from '@/contexts/RoleContext';
import { HomePage } from '@/features/home';
import { TeacherDashboard } from '@/features/teacher';
import { ParentDashboard } from '@/features/parent';
import { Navigate } from 'react-router-dom';

export const RoleResolver: React.FC = () => {
  const { currentUser } = useRole();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  switch (currentUser.role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'student':
    default:
      return <HomePage />;
  }
};
