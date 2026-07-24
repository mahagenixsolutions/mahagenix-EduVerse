import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/components/feedback/ErrorPage';
import { RefreshCw, Home, Mail } from 'lucide-react';

export const ServerErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      window.location.reload();
    }, 1200);
  };

  return (
    <ErrorPage
      code={500}
      title="Internal Server Error"
      message="Something went wrong on our servers. Our engineering team has been alerted automatically."
      illustration="server-error"
      showStatus
      primaryAction={{
        label: retrying ? 'Retrying Connection...' : 'Retry Request',
        onClick: handleRetry,
        icon: <RefreshCw size={16} className={retrying ? 'spin' : ''} />
      }}
      secondaryAction={{
        label: 'Return to Dashboard',
        onClick: () => navigate('/'),
        icon: <Home size={16} />
      }}
    />
  );
};
