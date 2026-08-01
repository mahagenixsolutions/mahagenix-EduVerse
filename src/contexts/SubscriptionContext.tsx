import React, { createContext, useContext, useState, useMemo } from 'react';
import type { FeatureFlag, SubscriptionPlanId } from '@/config/featureFlags';
import {
  SUBSCRIPTION_PLANS,
  BASIC_PLAN_FEATURE_FLAGS,
} from '@/config/featureFlags';

interface SubscriptionContextType {
  currentPlan: SubscriptionPlanId;
  enabledFlags: Set<FeatureFlag>;
  isFeatureEnabled: (flag?: FeatureFlag) => boolean;
  setPlan: (planId: SubscriptionPlanId) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlan, setCurrentPlanState] = useState<SubscriptionPlanId>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan') || urlParams.get('eduverse_plan');
    if (planParam && ['basic', 'starter', 'professional', 'enterprise', 'master'].includes(planParam)) {
      localStorage.setItem('eduverse_plan', planParam);
      return planParam as SubscriptionPlanId;
    }
    const saved = localStorage.getItem('eduverse_plan');
    if (saved && ['basic', 'starter', 'professional', 'enterprise', 'master'].includes(saved)) {
      return saved as SubscriptionPlanId;
    }
    return 'master'; // Default to Master Plan (Full module access)
  });

  const enabledFlags = useMemo(() => {
    const planConfig = SUBSCRIPTION_PLANS[currentPlan] || SUBSCRIPTION_PLANS.basic;
    return new Set<FeatureFlag>(planConfig.enabledFeatureFlags || BASIC_PLAN_FEATURE_FLAGS);
  }, [currentPlan]);

  const isFeatureEnabled = (flag?: FeatureFlag): boolean => {
    if (!flag) return true; // If no flag specified, accessible by default
    return enabledFlags.has(flag);
  };

  const setPlan = (planId: SubscriptionPlanId) => {
    localStorage.setItem('eduverse_plan', planId);
    setCurrentPlanState(planId);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        currentPlan,
        enabledFlags,
        isFeatureEnabled,
        setPlan,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

interface FeatureGuardProps {
  flag: FeatureFlag;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGuard: React.FC<FeatureGuardProps> = ({ flag, children, fallback = null }) => {
  const { isFeatureEnabled } = useSubscription();
  if (!isFeatureEnabled(flag)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};
