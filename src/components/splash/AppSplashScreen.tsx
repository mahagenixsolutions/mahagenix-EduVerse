import React, { useState, useEffect } from 'react';
import { useSplashScreen } from '@/hooks/useSplashScreen';
import { BookOpen, Calendar, GraduationCap, MessageSquare, ClipboardList, Settings, Bus, Coffee } from 'lucide-react';
import styles from './splash.module.css';

const LOADING_PHRASES = [
  "Packing your backpack...",
  "Gathering your notes...",
  "Sharpening pencils...",
  "Loading the classroom...",
  "Preparing modules...",
];

const MODULE_ICONS = [
  { icon: BookOpen, color: "#3B82F6" },
  { icon: Calendar, color: "#10B981" },
  { icon: GraduationCap, color: "#F59E0B" },
  { icon: MessageSquare, color: "#8B5CF6" },
  { icon: ClipboardList, color: "#EC4899" },
  { icon: Bus, color: "#14B8A6" },
  { icon: Coffee, color: "#F43F5E" },
  { icon: Settings, color: "#64748B" },
];

export const AppSplashScreen: React.FC = () => {
  const { isSplashActive, isFadingOut, finishVideo } = useSplashScreen();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isSplashActive) return;

    const totalDuration = 2800; // 2.8s
    const updateInterval = 50;
    let elapsed = 0;

    const intervalId = setInterval(() => {
      elapsed += updateInterval;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));

      if (elapsed >= totalDuration) {
        clearInterval(intervalId);
        finishVideo();
      }
    }, updateInterval);

    // Change phrase every 800ms
    const phraseIntervalId = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 800);

    return () => {
      clearInterval(intervalId);
      clearInterval(phraseIntervalId);
    };
  }, [isSplashActive, finishVideo]);

  if (!isSplashActive) {
    return null;
  }

  return (
    <div
      className={`${styles.splashOverlay} ${isFadingOut ? styles.splashOverlayFading : ''}`}
      onContextMenu={(e) => e.preventDefault()}
      aria-label="EduVerse Launch Experience"
    >
      <div className={styles.splashContent}>
        
        <div className={styles.packContainer}>
          {/* Central Bag/Logo */}
          <div className={styles.logoContainer}>
            <img src="/logo-icon.png" alt="EduVerse Logo" className={styles.centralLogo} />
          </div>
          
          {/* Orbiting Modules */}
          {MODULE_ICONS.map((Module, index) => {
            const IconComponent = Module.icon;
            const angle = (index / MODULE_ICONS.length) * 360;
            const radius = 135;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const delay = index * 0.15;
            
            return (
              <div 
                key={index} 
                className={styles.moduleItem}
                style={{ 
                  '--target-x': `${x}px`, 
                  '--target-y': `${y}px`,
                  '--delay': `${delay}s`,
                  backgroundColor: 'white',
                  color: Module.color,
                } as React.CSSProperties}
              >
                <IconComponent size={24} />
              </div>
            );
          })}
        </div>

        <div className={styles.loadingContainer}>
          <p key={phraseIndex} className={styles.loadingPhrase}>
            {LOADING_PHRASES[phraseIndex]}
          </p>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
