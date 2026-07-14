import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number; /* 0-100 */
  color?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'var(--primary-color)',
  size = 'sm',
  showLabel = false,
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const getMappedColor = (c: string) => {
    if (c === '#6366f1' || c === 'var(--primary-color)') return 'var(--primary-color)';
    if (c === '#ec4899') return 'var(--text-light)';
    if (c === '#10b981') return 'var(--success)';
    if (c === '#3b82f6') return 'var(--info)';
    if (c === '#f59e0b') return 'var(--warning)';
    return c;
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.track} ${styles[`track-${size}`]}`}>
        <div
          className={styles.fill}
          style={{ width: `${clamped}%`, backgroundColor: getMappedColor(color) }}
        />
      </div>
      {showLabel && <span className={styles.label}>{clamped}%</span>}
    </div>
  );
};
