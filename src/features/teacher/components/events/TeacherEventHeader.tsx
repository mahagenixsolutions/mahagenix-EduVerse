import React from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Button } from '@/components/ui/Button';

interface TeacherEventHeaderProps {
  onOpenCreateModal: () => void;
}

export const TeacherEventHeader: React.FC<TeacherEventHeaderProps> = ({ onOpenCreateModal }) => {
  return (
    <PageHeader
      title="Events & Activity Management"
      subtitle="Organize school events, monitor student registrations, and manage check-in rosters."
      actions={
        <Button variant="primary" onClick={onOpenCreateModal}>
          <Plus size={16} /> Create New Event
        </Button>
      }
    />
  );
};
