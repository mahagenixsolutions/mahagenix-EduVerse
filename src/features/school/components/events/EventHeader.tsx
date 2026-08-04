import React from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';

interface EventHeaderProps {
  title?: string;
  description?: string;
}

export const EventHeader: React.FC<EventHeaderProps> = ({
  title = "School Events & Activities",
  description = "Explore upcoming field trips, workshops, competitions, and campus celebrations."
}) => {
  return (
    <PageHeader
      title={title}
      subtitle={description}
    />
  );
};
