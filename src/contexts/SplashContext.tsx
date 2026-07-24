import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { UserRole } from '@/contexts/RoleContext';
import { preloadDashboardData } from '@/utils/preloadDashboard';

export interface SplashContextType {
  isSplashActive: boolean;
  isSplashFinished: boolean;
  isFadingOut: boolean;
  triggerLaunchExperience: (role: UserRole, onComplete?: () => void) => void;
  finishVideo: () => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cold load / page refresh defaults to finished = true (splash does NOT play on initial visit or refresh)
  const [isSplashActive, setIsSplashActive] = useState(false);
  const [isSplashFinished, setIsSplashFinished] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const onCompleteRef = useRef<(() => void) | null>(null);

  const triggerLaunchExperience = useCallback((role: UserRole, onComplete?: () => void) => {
    onCompleteRef.current = onComplete || null;
    setIsSplashActive(true);
    setIsSplashFinished(false);
    setIsFadingOut(false);

    // Preload all student/role dashboard data, fonts, icons, and assets while splash plays
    preloadDashboardData(role);
  }, []);

  const finishVideo = useCallback(() => {
    if (isFadingOut || isSplashFinished) return;
    setIsFadingOut(true);

    // Fade out splash screen over 600ms (500–700ms requirement)
    setTimeout(() => {
      setIsSplashFinished(true);
      setIsSplashActive(false);
      setIsFadingOut(false);
      document.body.style.overflow = '';

      if (onCompleteRef.current) {
        onCompleteRef.current();
        onCompleteRef.current = null;
      }
    }, 600);
  }, [isFadingOut, isSplashFinished]);

  useEffect(() => {
    if (isSplashActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isSplashActive]);

  return (
    <SplashContext.Provider
      value={{
        isSplashActive,
        isSplashFinished,
        isFadingOut,
        triggerLaunchExperience,
        finishVideo,
      }}
    >
      {children}
    </SplashContext.Provider>
  );
};

export const useSplashScreenContext = (): SplashContextType => {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error('useSplashScreen must be used within a SplashProvider');
  }
  return context;
};
