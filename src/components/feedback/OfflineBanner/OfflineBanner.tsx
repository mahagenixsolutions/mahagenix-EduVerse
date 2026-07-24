import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw, X } from 'lucide-react';
import styles from './OfflineBanner.module.css';

export const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [dismissed, setDismissed] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const handleOffline = () => { setIsOffline(true); setDismissed(false); };
    const handleOnline = () => { setIsOffline(false); setDismissed(false); };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      if (navigator.onLine) {
        setIsOffline(false);
      }
    }, 1500);
  };

  if (!isOffline || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.banner}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.content}>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <WifiOff size={18} />
          </motion.div>
          <span className={styles.text}>
            You're offline. Some features may be unavailable.
          </span>
        </div>

        <div className={styles.actions}>
          <button className={styles.retryBtn} onClick={handleRetry} disabled={retrying}>
            <motion.div animate={retrying ? { rotate: 360 } : {}} transition={{ duration: 0.8, repeat: retrying ? Infinity : 0, ease: 'linear' }}>
              <RefreshCw size={14} />
            </motion.div>
            {retrying ? 'Retrying...' : 'Retry'}
          </button>
          <button className={styles.dismissBtn} onClick={() => setDismissed(true)}>
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
