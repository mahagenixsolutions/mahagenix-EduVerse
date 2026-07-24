import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/components/feedback/ErrorPage';
import { RefreshCw, Home } from 'lucide-react';

export const OfflinePage: React.FC = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  const handleCheckConnection = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      if (navigator.onLine) {
        navigate('/');
      }
    }, 1200);
  };

  return (
    <ErrorPage
      title="No Internet Connection"
      message="You are currently offline. Check your Wi-Fi or cellular network settings to reconnect to EduVerse."
      illustration="offline"
      primaryAction={{
        label: checking ? 'Checking Connection...' : 'Try Reconnecting',
        onClick: handleCheckConnection,
        icon: <RefreshCw size={16} />
      }}
      secondaryAction={{
        label: 'View Offline Dashboard',
        onClick: () => navigate('/'),
        icon: <Home size={16} />
      }}
    />
  );
};
