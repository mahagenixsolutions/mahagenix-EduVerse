import React from 'react';
import { PageHeader } from '@/components/navigation/PageHeader';

interface AttendanceHeaderProps {
  title?: string;
  description?: string;
}

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  title = "Student Attendance Log",
  description = "Track daily presence, view attendance rates, and monitor historical records."
}) => {
  return (
    <PageHeader
      title={title}
      subtitle={description}
    />
  );
};
