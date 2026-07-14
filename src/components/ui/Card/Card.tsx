import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hoverable = false, className = '', ...props }) => {
  return (
    <div 
      className={`${styles.card} ${hoverable ? 'hover-lift' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
