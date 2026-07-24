import React, { useRef, useEffect } from 'react';
import styles from './splash.module.css';

interface SplashVideoProps {
  onEnded: () => void;
  onError: () => void;
}

export const SplashVideo: React.FC<SplashVideoProps> = ({ onEnded, onError }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct user click gesture on Login button enables unmuted audio playback
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: If browser autoplay policy limits unmuted audio, play muted smoothly
        if (video) {
          video.muted = true;
          video.play().catch(() => {
            onError();
          });
        }
      });
    }
  }, [onError]);

  return (
    <video
      ref={videoRef}
      src="/splash.mp4"
      className={styles.splashVideo}
      autoPlay
      playsInline
      controls={false}
      loop={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      onEnded={onEnded}
      onError={onError}
    />
  );
};
