import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Crown, Users, Box, Lock, GraduationCap } from 'lucide-react';
import { PLANS, MODULES, ROLES, DynamicIcon, type PlanTierId } from '@/features/marketing';
import styles from './provisioning.module.css';

interface ProvisioningScreenProps {
  planId: PlanTierId;
}

const BUBBLE_CONFIG = [
  { id: 'students', icon: 'GraduationCap', color: '#10b981', x: -240, y: -30, label: 'Students' },
  { id: 'teachers', icon: 'User', color: '#3b82f6', x: -180, y: 35, label: 'Teachers' },
  { id: 'fees', icon: 'CircleDollarSign', color: '#10b981', x: -140, y: 90, label: 'Fees' },
  { id: 'exams', icon: 'FileText', color: '#ef4444', x: -90, y: 40, label: 'Exams' },
  { id: 'attendance', icon: 'Calendar', color: '#f59e0b', x: -110, y: -50, label: 'Attendance' },
  { id: 'library', icon: 'BookOpen', color: '#8b5cf6', x: 110, y: -50, label: 'Library' },
  { id: 'transport', icon: 'Bus', color: '#f97316', x: 190, y: -65, label: 'Transport' },
  { id: 'hostel', icon: 'Bed', color: '#10b981', x: 250, y: 10, label: 'Hostel' },
  { id: 'analytics', icon: 'BarChart2', color: '#3b82f6', x: 140, y: 35, label: 'Analytics' },
  { id: 'ai', icon: 'Bot', color: '#ec4899', x: 210, y: 90, label: 'AI Assistant' },
];

export const ProvisioningScreen: React.FC<ProvisioningScreenProps> = ({ planId }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const plan = PLANS.find(p => p.id === planId) || PLANS.find(p => p.id === 'enterprise') || PLANS[0];
  const includedModules = MODULES.filter(m => m.availableIn.includes(plan.id));
  const includedRoles = ROLES.filter(r => plan.roles.includes(r.id));

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    let current = 0;
    
    const timer = setInterval(() => {
      current += interval;
      setProgress(Math.min((current / duration) * 100, 100));
      
      if (current >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className={styles.wrapper}>
      {/* ─── Main Welcome Screen (First Image Layout) ────────────────── */}
      <motion.div 
        className={styles.mainCard}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <motion.div 
            className={styles.successIconWrapper}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Check strokeWidth={3} />
          </motion.div>
          
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to EduVerse! 🎉
          </motion.h1>

          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your organization has been created successfully. Thank you for <strong>choosing EduVerse</strong>.<br/>
            You are now all set to explore a smarter way to manage your institution.
          </motion.p>
        </div>

        {/* 3 Grid Columns (Plan, Roles, Modules) */}
        <div className={styles.columnsContainer}>
          {/* Plan Column */}
          <motion.div 
            className={`${styles.column} ${styles.planColumn}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.columnHeader}>
              <div className={`${styles.iconBox} ${styles.planIcon}`}><Crown size={16} /></div>
              <span className={styles.columnTitle}>Your Plan</span>
            </div>
            <div className={styles.planTitleRow}>
              <h2>{plan.name} Plan</h2>
              <span className={styles.trialBadge}>14-Day Free Trial</span>
            </div>
            <p className={styles.planDesc}>
              {plan.description}
            </p>
            <div className={styles.featuresList}>
              {plan.features.slice(0, 5).map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <Check size={16} /> {f}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Roles Column */}
          <motion.div 
            className={`${styles.column} ${styles.rolesColumn}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.columnHeader}>
              <div className={`${styles.iconBox} ${styles.rolesIcon}`}><Users size={16} /></div>
              <span className={styles.columnTitle}>Included Roles</span>
            </div>
            <div className={styles.gridList}>
              {includedRoles.slice(0, 10).map((r, i) => (
                <div key={i} className={styles.gridItem}>
                  <DynamicIcon name={r.icon || 'User'} size={14} />
                  {r.name}
                </div>
              ))}
            </div>
            <div className={styles.columnFooter}>
              <Users size={14}/> {includedRoles.length} Roles Included
            </div>
          </motion.div>

          {/* Modules Column */}
          <motion.div 
            className={`${styles.column} ${styles.modulesColumn}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className={styles.columnHeader}>
              <div className={`${styles.iconBox} ${styles.modulesIcon}`}><Box size={16} /></div>
              <span className={styles.columnTitle}>Top Modules</span>
            </div>
            <div className={styles.gridList}>
              {includedModules.slice(0, 10).map((m, i) => (
                <div key={i} className={styles.gridItem}>
                  <DynamicIcon name={m.icon || 'Box'} size={14} />
                  {m.name}
                </div>
              ))}
            </div>
            <div className={styles.columnFooter}>
              <Box size={14}/> {includedModules.length}+ Modules Included
            </div>
          </motion.div>
        </div>

        {/* ─── Loading Card Overlay (Second Image Layout Overlaying First) ──── */}
        <div className={styles.overlayBackdrop}>
          <motion.div 
            className={styles.loadingModalCard}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.animationText}>
              <h4>Preparing your institution...</h4>
              <p>Setting up your experience</p>
            </div>
            
            <div className={styles.canvas}>
              {/* SVG Connecting Lines */}
              <svg className={styles.linesOverlay} viewBox="0 0 600 280">
                <defs>
                  <linearGradient id="lineGradLeft" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="rgba(52, 211, 153, 0.4)" />
                    <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
                  </linearGradient>
                  <linearGradient id="lineGradRight" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(52, 211, 153, 0.4)" />
                    <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
                  </linearGradient>
                </defs>
                {BUBBLE_CONFIG.map((b, i) => {
                  const isLeft = b.x < 0;
                  const startX = 300;
                  const startY = 140;
                  const endX = 300 + b.x;
                  const endY = 140 + b.y;
                  const controlX = 300 + b.x * 0.5;
                  const controlY = 140 + b.y - 20;
                  return (
                    <path 
                      key={i} 
                      d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`} 
                      fill="none" 
                      stroke={isLeft ? "url(#lineGradLeft)" : "url(#lineGradRight)"}
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>

              {/* Center EduVerse Logo */}
              <div className={styles.centerLogoWrapper} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className={styles.logoGlow} />
                <GraduationCap size={32} color="#10b981" />
                <span>EduVerse</span>
              </div>
              
              {/* Floating Bubbles */}
              {BUBBLE_CONFIG.map((b, i) => (
                <motion.div 
                  key={i}
                  className={styles.bubble}
                  style={{ left: `calc(50% + ${b.x}px)`, top: `calc(50% + ${b.y}px)`, transform: 'translate(-50%, -50%)' }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 2.8, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.15
                  }}
                >
                  <div className={styles.bubbleIconWrapper} style={{ color: b.color }}>
                    <DynamicIcon name={b.icon} size={18} />
                  </div>
                  <div className={styles.bubbleLabel}>{b.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Progress Section */}
            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <motion.div 
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={styles.redirectText}>
                <Lock size={14}/> Redirecting you to login securely in a moment...
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};
