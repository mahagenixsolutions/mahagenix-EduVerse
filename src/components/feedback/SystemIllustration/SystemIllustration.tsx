import React from 'react';
import { motion } from 'framer-motion';
import styles from './SystemIllustration.module.css';

export type IllustrationVariant =
  | 'not-found'
  | 'server-error'
  | 'maintenance'
  | 'offline'
  | 'empty'
  | 'forbidden'
  | 'unauthorized'
  | 'success'
  | 'failed'
  | 'search-empty';

interface SystemIllustrationProps {
  variant: IllustrationVariant;
  size?: number;
  className?: string;
}

const floatTransition = {
  y: { duration: 3, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' },
};

const NotFoundSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circle */}
    <circle cx="140" cy="140" r="120" fill="var(--primary-light)" opacity="0.5" />
    <circle cx="140" cy="140" r="80" fill="var(--primary-light)" />
    {/* Magnifying glass */}
    <motion.g animate={{ rotate: [0, -8, 0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
      <circle cx="130" cy="120" r="45" stroke="var(--primary-color)" strokeWidth="6" fill="none" />
      <line x1="162" y1="152" x2="195" y2="185" stroke="var(--primary-color)" strokeWidth="6" strokeLinecap="round" />
    </motion.g>
    {/* Question mark */}
    <motion.text
      x="130" y="132" textAnchor="middle" fontSize="36" fontWeight="800" fill="var(--primary-color)"
      animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
    >?</motion.text>
    {/* 404 text */}
    <text x="140" y="220" textAnchor="middle" fontSize="28" fontWeight="800" fill="var(--text-muted)" opacity="0.6">404</text>
    {/* Decorative dots */}
    <circle cx="60" cy="80" r="5" fill="var(--primary-color)" opacity="0.3" />
    <circle cx="220" cy="70" r="8" fill="var(--warning)" opacity="0.3" />
    <circle cx="50" cy="200" r="6" fill="var(--info)" opacity="0.3" />
  </svg>
);

const ServerErrorSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="120" fill="var(--system-error-bg)" opacity="0.5" />
    <circle cx="140" cy="140" r="80" fill="var(--system-error-bg)" />
    {/* Server rack */}
    <rect x="90" y="85" width="100" height="30" rx="6" fill="var(--surface-color)" stroke="var(--border-color)" strokeWidth="2" />
    <rect x="90" y="120" width="100" height="30" rx="6" fill="var(--surface-color)" stroke="var(--border-color)" strokeWidth="2" />
    <rect x="90" y="155" width="100" height="30" rx="6" fill="var(--surface-color)" stroke="var(--system-error-border)" strokeWidth="2" />
    {/* Status lights */}
    <circle cx="108" cy="100" r="4" fill="var(--success)" />
    <circle cx="108" cy="135" r="4" fill="var(--success)" />
    <motion.circle cx="108" cy="170" r="4" fill="var(--danger)" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
    {/* Warning triangle */}
    <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
      <polygon points="140,195 155,220 125,220" fill="var(--danger)" opacity="0.9" />
      <text x="140" y="217" textAnchor="middle" fontSize="14" fontWeight="800" fill="white">!</text>
    </motion.g>
    <text x="140" y="250" textAnchor="middle" fontSize="24" fontWeight="800" fill="var(--text-muted)" opacity="0.5">500</text>
  </svg>
);

const MaintenanceSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="120" fill="var(--system-warning-bg)" opacity="0.4" />
    <circle cx="140" cy="140" r="80" fill="var(--system-warning-bg)" opacity="0.6" />
    {/* Gear */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '140px 125px' }}>
      <path d="M140 85 L148 95 L162 92 L158 106 L170 114 L160 122 L164 136 L150 132 L140 144 L130 132 L116 136 L120 122 L110 114 L122 106 L118 92 L132 95 Z"
        fill="var(--warning)" opacity="0.85" />
      <circle cx="140" cy="125" r="16" fill="var(--surface-color)" />
    </motion.g>
    {/* Wrench */}
    <motion.g animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '170px 180px' }}>
      <rect x="165" y="160" width="10" height="40" rx="3" fill="var(--text-muted)" opacity="0.6" />
      <circle cx="170" cy="158" r="12" stroke="var(--text-muted)" strokeWidth="4" fill="none" opacity="0.6" />
    </motion.g>
    <text x="140" y="245" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--text-muted)" opacity="0.5">503</text>
  </svg>
);

const OfflineSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="120" fill="var(--system-offline-bg)" opacity="0.5" />
    {/* Cloud */}
    <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
      <ellipse cx="140" cy="115" rx="55" ry="35" fill="var(--border-color)" />
      <ellipse cx="110" cy="120" rx="30" ry="25" fill="var(--border-color)" />
      <ellipse cx="170" cy="118" rx="28" ry="22" fill="var(--border-color)" />
    </motion.g>
    {/* Disconnect slash */}
    <motion.line x1="100" y1="160" x2="180" y2="160" stroke="var(--text-muted)" strokeWidth="3" strokeLinecap="round"
      strokeDasharray="8 6" animate={{ strokeDashoffset: [0, 28] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
    {/* Wifi icon with X */}
    <path d="M115 185 L140 210 L165 185" stroke="var(--text-light)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M125 195 L140 210 L155 195" stroke="var(--text-light)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <motion.g animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
      <line x1="130" y1="190" x2="150" y2="210" stroke="var(--danger)" strokeWidth="3" strokeLinecap="round" />
      <line x1="150" y1="190" x2="130" y2="210" stroke="var(--danger)" strokeWidth="3" strokeLinecap="round" />
    </motion.g>
  </svg>
);

const EmptySVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="110" fill="var(--primary-light)" opacity="0.3" />
    {/* Empty box */}
    <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
      <rect x="90" y="110" width="100" height="70" rx="8" fill="var(--surface-color)" stroke="var(--border-color)" strokeWidth="2" />
      <path d="M90 125 L140 140 L190 125" stroke="var(--border-color)" strokeWidth="2" fill="none" />
      <rect x="90" y="110" width="100" height="15" rx="8" fill="var(--primary-light)" />
    </motion.g>
    {/* Sparkle dots */}
    <motion.circle cx="80" cy="95" r="4" fill="var(--primary-color)" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.circle cx="200" cy="100" r="3" fill="var(--warning)" animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }} />
    <text x="140" y="220" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-light)">No data yet</text>
  </svg>
);

const ForbiddenSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="120" fill="var(--system-error-bg)" opacity="0.3" />
    {/* Shield */}
    <motion.g animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }}>
      <path d="M140 70 L195 100 L195 155 C195 190 140 220 140 220 C140 220 85 190 85 155 L85 100 Z"
        fill="var(--surface-color)" stroke="var(--danger)" strokeWidth="3" />
      {/* Lock icon */}
      <rect x="122" y="140" width="36" height="28" rx="5" fill="var(--danger)" opacity="0.85" />
      <path d="M127 140 L127 128 C127 118 133 112 140 112 C147 112 153 118 153 128 L153 140"
        stroke="var(--danger)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="140" cy="153" r="4" fill="white" />
    </motion.g>
    <text x="140" y="250" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--text-muted)" opacity="0.5">403</text>
  </svg>
);

const UnauthorizedSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="120" fill="var(--system-warning-bg)" opacity="0.3" />
    {/* Key */}
    <motion.g animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '140px 135px' }}>
      <circle cx="125" cy="120" r="25" stroke="var(--warning)" strokeWidth="4" fill="none" />
      <line x1="150" y1="120" x2="200" y2="120" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
      <line x1="185" y1="120" x2="185" y2="135" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
      <line x1="195" y1="120" x2="195" y2="132" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
    </motion.g>
    {/* Clock / expired */}
    <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}>
      <circle cx="140" cy="185" r="20" stroke="var(--text-muted)" strokeWidth="2.5" fill="var(--surface-color)" />
      <line x1="140" y1="175" x2="140" y2="185" stroke="var(--text-main)" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="185" x2="150" y2="190" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" />
    </motion.g>
    <text x="140" y="245" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--text-muted)" opacity="0.5">401</text>
  </svg>
);

const SuccessSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="120" fill="var(--system-success-bg)" opacity="0.4" />
    <motion.circle cx="140" cy="135" r="55" fill="var(--system-success-bg)" stroke="var(--system-success-color)" strokeWidth="4"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: 'spring' }} />
    {/* Animated checkmark */}
    <motion.path
      d="M115 135 L132 152 L168 116" stroke="var(--system-success-color)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
    />
    {/* Sparkle particles */}
    <motion.circle cx="80" cy="90" r="4" fill="var(--success)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatDelay: 2 }} />
    <motion.circle cx="200" cy="85" r="5" fill="var(--primary-color)" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }} transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatDelay: 2.5 }} />
    <motion.circle cx="210" cy="180" r="3" fill="var(--warning)" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0], scale: [0, 1.2, 0] }} transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const FailedSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="120" fill="var(--system-error-bg)" opacity="0.4" />
    <motion.circle cx="140" cy="135" r="55" fill="var(--system-error-bg)" stroke="var(--system-error-color)" strokeWidth="4"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, type: 'spring' }} />
    {/* X mark */}
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
      <line x1="120" y1="115" x2="160" y2="155" stroke="var(--system-error-color)" strokeWidth="6" strokeLinecap="round" />
      <line x1="160" y1="115" x2="120" y2="155" stroke="var(--system-error-color)" strokeWidth="6" strokeLinecap="round" />
    </motion.g>
  </svg>
);

const SearchEmptySVG: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="140" cy="140" r="110" fill="var(--primary-light)" opacity="0.3" />
    {/* Magnifying glass */}
    <circle cx="130" cy="125" r="40" stroke="var(--text-light)" strokeWidth="4" fill="none" />
    <line x1="158" y1="153" x2="190" y2="185" stroke="var(--text-light)" strokeWidth="5" strokeLinecap="round" />
    {/* Empty result lines */}
    <motion.g animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
      <rect x="105" y="195" width="70" height="6" rx="3" fill="var(--border-color)" />
      <rect x="115" y="210" width="50" height="6" rx="3" fill="var(--border-color)" />
    </motion.g>
  </svg>
);

const illustrationMap: Record<IllustrationVariant, React.FC<{ size: number }>> = {
  'not-found': NotFoundSVG,
  'server-error': ServerErrorSVG,
  'maintenance': MaintenanceSVG,
  'offline': OfflineSVG,
  'empty': EmptySVG,
  'forbidden': ForbiddenSVG,
  'unauthorized': UnauthorizedSVG,
  'success': SuccessSVG,
  'failed': FailedSVG,
  'search-empty': SearchEmptySVG,
};

export const SystemIllustration: React.FC<SystemIllustrationProps> = ({
  variant,
  size = 240,
  className = '',
}) => {
  const Illustration = illustrationMap[variant];

  return (
    <motion.div
      className={`${styles.container} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Illustration size={size} />
    </motion.div>
  );
};
