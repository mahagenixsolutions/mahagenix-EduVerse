import React, { useState } from 'react';
import styles from './Tabs.module.css';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange?: (id: string) => void;
  onChange?: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, onChange }) => {
  const handleChange = (id: string) => {
    if (onTabChange) onTabChange(id);
    if (onChange) onChange(id);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          onClick={() => handleChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && <span className={styles.count}>{tab.count}</span>}
        </button>
      ))}
    </div>
  );
};
