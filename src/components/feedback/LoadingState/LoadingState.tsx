import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '../Skeleton';
import styles from './LoadingState.module.css';

type LoadingVariant = 'cards' | 'table' | 'chart' | 'dashboard' | 'form' | 'profile' | 'list' | 'search' | 'spinner';

interface LoadingStateProps {
  variant?: LoadingVariant;
  message?: string;
  count?: number;
}

const CardsSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <div className={styles.cardsGrid}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={styles.cardSkeleton}>
        <Skeleton width="40%" height="14px" />
        <Skeleton width="100%" height="24px" />
        <Skeleton width="70%" height="14px" />
        <div style={{ marginTop: '12px' }}>
          <Skeleton width="100%" height="8px" variant="rect" />
        </div>
      </div>
    ))}
  </div>
);

const TableSkeleton: React.FC = () => (
  <div className={styles.tableSkeleton}>
    <div className={styles.tableHeader}>
      {[1, 2, 3, 4, 5].map(i => (
        <Skeleton key={i} width={`${60 + Math.random() * 40}%`} height="14px" />
      ))}
    </div>
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className={styles.tableRow}>
        {[1, 2, 3, 4, 5].map(j => (
          <Skeleton key={j} width={`${50 + Math.random() * 50}%`} height="14px" />
        ))}
      </div>
    ))}
  </div>
);

const DashboardSkeleton: React.FC = () => (
  <div className={styles.dashboardGrid}>
    {/* KPI row */}
    <div className={styles.kpiRow}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className={styles.kpiCard}>
          <Skeleton width="50%" height="12px" />
          <Skeleton width="60%" height="28px" />
        </div>
      ))}
    </div>
    {/* Chart + sidebar */}
    <div className={styles.dashboardBody}>
      <div className={styles.chartSkeleton}>
        <Skeleton width="100%" height="240px" variant="rect" />
      </div>
      <div className={styles.sidebarSkeleton}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={styles.sidebarItem}>
            <Skeleton width="36px" height="36px" variant="circle" />
            <div style={{ flex: 1 }}>
              <Skeleton width="80%" height="12px" />
              <Skeleton width="50%" height="10px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FormSkeleton: React.FC = () => (
  <div className={styles.formSkeleton}>
    {[1, 2, 3, 4].map(i => (
      <div key={i} className={styles.formField}>
        <Skeleton width="30%" height="12px" />
        <Skeleton width="100%" height="40px" variant="rect" />
      </div>
    ))}
    <div style={{ marginTop: '16px' }}>
      <Skeleton width="120px" height="40px" variant="rect" />
    </div>
  </div>
);

const ProfileSkeleton: React.FC = () => (
  <div className={styles.profileSkeleton}>
    <Skeleton width="80px" height="80px" variant="circle" />
    <Skeleton width="180px" height="20px" />
    <Skeleton width="120px" height="14px" />
    <div className={styles.profileDetails}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ display: 'flex', gap: '16px', width: '100%' }}>
          <Skeleton width="30%" height="14px" />
          <Skeleton width="50%" height="14px" />
        </div>
      ))}
    </div>
  </div>
);

const ListSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <div className={styles.listSkeleton}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={styles.listItem}>
        <Skeleton width="40px" height="40px" variant="circle" />
        <div style={{ flex: 1 }}>
          <Skeleton width={`${60 + Math.random() * 30}%`} height="14px" />
          <Skeleton width="40%" height="10px" />
        </div>
        <Skeleton width="60px" height="24px" variant="rect" />
      </div>
    ))}
  </div>
);

const SearchSkeleton: React.FC = () => (
  <div className={styles.searchSkeleton}>
    <Skeleton width="100%" height="44px" variant="rect" />
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Skeleton width="32px" height="32px" variant="rect" />
          <div style={{ flex: 1 }}>
            <Skeleton width={`${50 + Math.random() * 40}%`} height="14px" />
            <Skeleton width="30%" height="10px" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SpinnerLoading: React.FC<{ message?: string }> = ({ message }) => (
  <div className={styles.spinnerContainer}>
    <motion.div
      className={styles.spinner}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
    {message && <p className={styles.spinnerMessage}>{message}</p>}
  </div>
);

const ChartSkeleton: React.FC = () => (
  <div className={styles.chartOnlySkeleton}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <Skeleton width="120px" height="16px" />
      <Skeleton width="80px" height="28px" variant="rect" />
    </div>
    <Skeleton width="100%" height="220px" variant="rect" />
  </div>
);

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  message,
  count = 4,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      {variant === 'cards' && <CardsSkeleton count={count} />}
      {variant === 'table' && <TableSkeleton />}
      {variant === 'chart' && <ChartSkeleton />}
      {variant === 'dashboard' && <DashboardSkeleton />}
      {variant === 'form' && <FormSkeleton />}
      {variant === 'profile' && <ProfileSkeleton />}
      {variant === 'list' && <ListSkeleton count={count} />}
      {variant === 'search' && <SearchSkeleton />}
      {variant === 'spinner' && <SpinnerLoading message={message} />}
    </motion.div>
  );
};
