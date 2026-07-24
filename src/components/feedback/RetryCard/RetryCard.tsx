import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import styles from './RetryCard.module.css';

interface RetryCardProps {
  title?: string;
  message?: string;
  onRetry: () => void | Promise<void>;
  compact?: boolean;
}

export const RetryCard: React.FC<RetryCardProps> = ({
  title = 'Something went wrong',
  message = 'We couldn\'t load this data. Please try again.',
  onRetry,
  compact = false,
}) => {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    setRetrying(true);
    try {
      await onRetry();
    } finally {
      setRetrying(false);
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${compact ? styles.compact : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.iconWrap}>
        <AlertTriangle size={compact ? 18 : 24} />
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        {!compact && <p className={styles.message}>{message}</p>}
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={handleRetry}
        disabled={retrying}
        className={styles.retryBtn}
      >
        <motion.div
          animate={retrying ? { rotate: 360 } : {}}
          transition={{ duration: 0.8, repeat: retrying ? Infinity : 0, ease: 'linear' }}
          style={{ display: 'flex' }}
        >
          <RefreshCw size={14} />
        </motion.div>
        <span style={{ marginLeft: '6px' }}>{retrying ? 'Retrying...' : 'Retry'}</span>
      </Button>
    </motion.div>
  );
};
