import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/components/feedback/ErrorPage';
import { RefreshCw, Activity } from 'lucide-react';

export const MaintenancePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      code={503}
      title="Scheduled System Maintenance"
      message="EduVerse is currently undergoing scheduled infrastructure upgrades to improve database performance and reliability."
      illustration="maintenance"
      estimatedRecovery="30 minutes (04:00 PM EST)"
      showStatus
      primaryAction={{
        label: 'Refresh Page',
        onClick: () => window.location.reload(),
        icon: <RefreshCw size={16} />
      }}
      secondaryAction={{
        label: 'View Live System Status',
        onClick: () => navigate('/system/status'),
        icon: <Activity size={16} />
      }}
    />
  );
};
