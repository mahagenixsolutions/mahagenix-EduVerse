import React from 'react';
import { Link } from 'react-router-dom';
import { quickActions } from '@/mock/data';
import * as Icons from 'lucide-react';
import styles from './home-sections.module.css';

export const QuickActions: React.FC = () => (
  <section className={styles.quickActions}>
    {quickActions.map(action => {
      const Icon = (Icons as any)[action.icon];
      return (
        <Link key={action.id} to={action.path} className={`${styles.actionCard} hover-lift`} style={{ textDecoration: 'none' }}>
          <div className={styles.actionIcon} style={{ backgroundColor: `${action.color}20`, color: action.color }}>
            <Icon size={24} />
          </div>
          <span>{action.label}</span>
        </Link>
      );
    })}
  </section>
);
