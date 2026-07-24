import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/components/feedback/ErrorPage';
import { ShieldAlert, ArrowLeft, Send } from 'lucide-react';

export const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();
  const [requested, setRequested] = useState(false);

  const handleRequestAccess = () => {
    setRequested(true);
  };

  return (
    <ErrorPage
      code={403}
      title="Access Denied"
      message="You do not have permission to access this module or administrative page. Contact your school administrator to request authorization."
      illustration="forbidden"
      primaryAction={{
        label: requested ? 'Access Requested ✓' : 'Request Permission',
        onClick: handleRequestAccess,
        icon: <Send size={16} />
      }}
      secondaryAction={{
        label: 'Go Back',
        onClick: () => navigate(-1),
        icon: <ArrowLeft size={16} />
      }}
    />
  );
};
