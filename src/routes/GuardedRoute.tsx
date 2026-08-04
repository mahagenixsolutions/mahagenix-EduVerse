import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';

export const GuardedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useRole();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
