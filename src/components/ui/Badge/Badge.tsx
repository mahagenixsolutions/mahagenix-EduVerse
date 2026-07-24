import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'purple' | 'secondary';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', size = 'sm', style, children }) => {
  return (
    <span 
      className={`${styles.badge} ${styles[`badge-${variant}`]} ${styles[`badge-${size}`]}`}
      style={style}
    >
      {children}
    </span>
  );
};
