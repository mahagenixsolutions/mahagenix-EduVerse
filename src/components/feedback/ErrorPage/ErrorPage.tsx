import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SystemIllustration, type IllustrationVariant } from '../SystemIllustration';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Home, ArrowLeft, RefreshCw, Search, Mail, ChevronRight } from 'lucide-react';
import styles from './ErrorPage.module.css';

interface ErrorPageProps {
  code?: number | string;
  title: string;
  message: string;
  illustration?: IllustrationVariant;
  primaryAction?: { label: string; onClick: () => void; icon?: React.ReactNode };
  secondaryAction?: { label: string; onClick: () => void; icon?: React.ReactNode };
  suggestions?: { label: string; path: string }[];
  showSearch?: boolean;
  showStatus?: boolean;
  estimatedRecovery?: string;
  children?: React.ReactNode;
}

const codeToIllustration: Record<number, IllustrationVariant> = {
  404: 'not-found',
  500: 'server-error',
  503: 'maintenance',
  401: 'unauthorized',
  403: 'forbidden',
};

export const ErrorPage: React.FC<ErrorPageProps> = ({
  code,
  title,
  message,
  illustration,
  primaryAction,
  secondaryAction,
  suggestions,
  showSearch = false,
  showStatus = false,
  estimatedRecovery,
  children,
}) => {
  const navigate = useNavigate();
  const variant = illustration || (code ? codeToIllustration[Number(code)] : 'server-error') || 'server-error';

  const defaultPrimary = primaryAction || {
    label: 'Go Home',
    onClick: () => navigate('/'),
    icon: <Home size={16} />,
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SystemIllustration variant={variant} size={220} />

        {code && <span className={styles.code}>{code}</span>}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>

        {estimatedRecovery && (
          <div className={styles.recoveryBadge}>
            <RefreshCw size={14} />
            Estimated recovery: {estimatedRecovery}
          </div>
        )}

        {showSearch && (
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for a page..."
              className={styles.searchInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/?q=${(e.target as HTMLInputElement).value}`);
                }
              }}
            />
          </div>
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

        {suggestions && suggestions.length > 0 && (
          <motion.div
            className={styles.suggestions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className={styles.suggestionsTitle}>Suggested pages</h4>
            {suggestions.map((s) => (
              <button key={s.path} className={styles.suggestionLink} onClick={() => navigate(s.path)}>
                <ChevronRight size={14} />
                {s.label}
              </button>
            ))}
          </motion.div>
        )}

        {showStatus && (
          <a href="/system/status" className={styles.statusLink}>
            <Mail size={14} />
            Check System Status
          </a>
        )}

        {children}
      </motion.div>
    </div>
  );
};
