import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/components/feedback/ErrorPage';
import { LogIn, Home } from 'lucide-react';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      code={401}
      title="Session Expired"
      message="Your login session has expired or authentication credentials are invalid. Please log in again to continue accessing your EduVerse workspace."
      illustration="unauthorized"
      primaryAction={{
        label: 'Log In Again',
        onClick: () => navigate('/login'),
        icon: <LogIn size={16} />
      }}
      secondaryAction={{
        label: 'Return to Home',
        onClick: () => navigate('/'),
        icon: <Home size={16} />
      }}
    />
  );
};
