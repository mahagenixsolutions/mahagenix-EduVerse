import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import type { UserRole } from '@/contexts/RoleContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import type { FeatureFlag } from '@/config/featureFlags';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  featureFlag?: FeatureFlag;
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, featureFlag, children }) => {
  const { currentUser } = useRole();
  const { isFeatureEnabled } = useSubscription();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/app" replace />;
  }

  if (featureFlag && !isFeatureEnabled(featureFlag)) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
};
