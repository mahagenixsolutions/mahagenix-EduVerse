import React from 'react';
import * as LucideIcons from 'lucide-react';

/* Dynamically resolves a Lucide icon by its name string */
export const DynamicIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 20 }) => {
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return null;
  return <Icon size={size} />;
};
