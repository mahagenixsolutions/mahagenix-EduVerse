import React from 'react';
import { Plus, CheckSquare, Bell } from 'lucide-react';
import { PageHeader } from '@/components/navigation/PageHeader';
import { Button } from '@/components/ui/Button';

interface TeacherDashboardHeaderProps {
  teacherName?: string;
  onOpenHomeworkModal: () => void;
  onOpenAttendanceModal: () => void;
  onOpenAnnouncementModal: () => void;
}

export const TeacherDashboardHeader: React.FC<TeacherDashboardHeaderProps> = ({
  teacherName = "Mr. Smith",
  onOpenHomeworkModal,
  onOpenAttendanceModal,
  onOpenAnnouncementModal,
}) => {
  return (
    <PageHeader
      title={`Welcome back, ${teacherName}`}
      subtitle="Here is your teaching overview, active classes, and quick management tasks for today."
      actions={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="outline" size="sm" onClick={onOpenAttendanceModal}>
            <CheckSquare size={14} /> Quick Attendance
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenAnnouncementModal}>
            <Bell size={14} /> Announcement
          </Button>
          <Button variant="primary" size="sm" onClick={onOpenHomeworkModal}>
            <Plus size={14} /> Assign Homework
          </Button>
        </div>
      }
    />
  );
};
