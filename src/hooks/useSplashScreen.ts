import { useSplashScreenContext, type SplashContextType } from '@/contexts/SplashContext';

export const useSplashScreen = (): SplashContextType => {
  return useSplashScreenContext();
};
