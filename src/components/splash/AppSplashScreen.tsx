import React from 'react';
import { useSplashScreen } from '@/hooks/useSplashScreen';
import { SplashVideo } from './SplashVideo';
import styles from './splash.module.css';

export const AppSplashScreen: React.FC = () => {
  const { isSplashActive, isFadingOut, finishVideo } = useSplashScreen();

  if (!isSplashActive) {
    return null;
  }

  return (
    <div
      className={`${styles.splashOverlay} ${isFadingOut ? styles.splashOverlayFading : ''}`}
      onContextMenu={(e) => e.preventDefault()}
      aria-label="EduVerse Launch Experience"
    >
      <div className={styles.videoContainer}>
        <SplashVideo onEnded={finishVideo} onError={finishVideo} />
      </div>
    </div>
  );
};
