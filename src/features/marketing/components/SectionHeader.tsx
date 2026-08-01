import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badgeIcon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ badge, title, subtitle, badgeIcon }) => (
  <div className="mkt-section-header">
    {badge && (
      <div className="mkt-section-badge">
        {badgeIcon}
        {badge}
      </div>
    )}
    <h2 className="mkt-section-title">{title}</h2>
    {subtitle && <p className="mkt-section-subtitle">{subtitle}</p>}
  </div>
);
