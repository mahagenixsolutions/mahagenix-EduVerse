import { useState, useCallback } from 'react';

export interface AppInitializationState {
  isInitializing: boolean;
  isComplete: boolean;
  handleVideoEnd: () => void;
  skipSplash: () => void;
}

export const useAppInitialization = (): AppInitializationState => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const finishSplash = useCallback(() => {
    setIsInitializing(false);
    setTimeout(() => {
      setIsComplete(true);
    }, 600); // 600ms smooth dissolve timing
  }, []);

  return {
    isInitializing,
    isComplete,
    handleVideoEnd: finishSplash,
    skipSplash: finishSplash,
  };
};
