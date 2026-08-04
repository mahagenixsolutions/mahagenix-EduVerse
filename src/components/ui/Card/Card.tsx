import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

interface CardSubComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardComponent: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`${styles.card} ${hoverable ? 'hover-lift' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardSubComponentProps> = ({ children, className = '', ...props }) => (
  <div className={`${styles.cardHeader} ${className}`} {...props}>
    {children}
  </div>
);

const CardBody: React.FC<CardSubComponentProps> = ({ children, className = '', ...props }) => (
  <div className={`${styles.cardBody} ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter: React.FC<CardSubComponentProps> = ({ children, className = '', ...props }) => (
  <div className={`${styles.cardFooter} ${className}`} {...props}>
    {children}
  </div>
);

export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
