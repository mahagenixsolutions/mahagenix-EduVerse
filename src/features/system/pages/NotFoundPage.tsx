import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/components/feedback/ErrorPage';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      code={404}
      title="Page Not Found"
      message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      illustration="not-found"
      showSearch
      primaryAction={{
        label: 'Back to Dashboard',
        onClick: () => navigate('/app'),
        icon: <Home size={16} />
      }}
      secondaryAction={{
        label: 'Go Back',
        onClick: () => navigate(-1),
        icon: <ArrowLeft size={16} />
      }}
      suggestions={[
        { label: 'Dashboard', path: '/app' },
        { label: 'Courses & Curriculum', path: '/learn' },
        { label: 'Homework & Assignments', path: '/learn/homework' },
        { label: 'School Calendar', path: '/school/calendar' },
        { label: 'Fee Payments', path: '/services/fees' }
      ]}
    />
  );
};
