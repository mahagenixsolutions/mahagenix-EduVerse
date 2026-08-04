import React from 'react';
import styles from '../../pages/AttendancePage.module.css';

interface AttendanceSparklineProps {
  tone: 'green' | 'red' | 'orange';
  variant?: 'soft' | 'peaks';
}

export const AttendanceSparkline: React.FC<AttendanceSparklineProps> = ({
  tone,
  variant = 'soft',
}) => {
  const strokeClass =
    tone === 'green'
      ? styles.sparkGreen
      : tone === 'red'
        ? styles.sparkRed
        : styles.sparkOrange;
  const path =
    variant === 'peaks'
      ? 'M4 42 C18 42 22 30 34 31 C44 32 46 42 60 42 C74 42 76 30 90 30 C102 30 104 41 120 41'
      : 'M4 42 C20 42 24 40 36 40 C50 40 48 32 62 34 C76 38 78 42 90 42 C104 42 104 34 118 35 C128 36 132 41 140 42';

  return (
    <svg className={styles.sparkline} viewBox="0 0 144 48" aria-hidden="true">
      <path d={path} className={strokeClass} />
    </svg>
  );
};
