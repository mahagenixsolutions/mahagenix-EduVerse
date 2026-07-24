import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SystemIllustration } from '../SystemIllustration';
import { Button } from '@/components/ui/Button';
import { Home, ArrowRight } from 'lucide-react';
import styles from './SuccessPage.module.css';

interface SuccessPageProps {
  title: string;
  message: string;
  details?: { label: string; value: string }[];
  primaryAction?: { label: string; onClick: () => void; icon?: React.ReactNode };
  secondaryAction?: { label: string; onClick: () => void; icon?: React.ReactNode };
}

export const SuccessPage: React.FC<SuccessPageProps> = ({
  title,
  message,
  details,
  primaryAction,
  secondaryAction,
}) => {
  const navigate = useNavigate();

  const defaultPrimary = primaryAction || {
    label: 'Go to Dashboard',
    onClick: () => navigate('/'),
    icon: <Home size={16} />,
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SystemIllustration variant="success" size={200} />

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>

        {details && details.length > 0 && (
          <motion.div
            className={styles.detailsCard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {details.map((d, i) => (
              <div key={i} className={styles.detailRow}>
                <span className={styles.detailLabel}>{d.label}</span>
                <span className={styles.detailValue}>{d.value}</span>
              </div>
            ))}
          </motion.div>
        )}

        <div className={styles.actions}>
          <Button onClick={defaultPrimary.onClick}>
            {defaultPrimary.icon}
            <span style={{ marginLeft: '6px' }}>{defaultPrimary.label}</span>
          </Button>
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.icon}
              <span style={{ marginLeft: '6px' }}>{secondaryAction.label}</span>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
