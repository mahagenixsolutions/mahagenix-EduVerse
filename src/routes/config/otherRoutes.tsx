import React, { lazy } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { RoleGuard } from '../RoleGuard';
import { EventBus } from '@/mock-server/EventBus';

const CommunicationPage = lazy(() =>
  import('@/features/communication').then((m) => ({ default: m.CommunicationPage })),
);
const ClassDiscussionPage = lazy(() =>
  import('@/features/communication').then((m) => ({ default: m.ClassDiscussionPage })),
);
const NotificationCenterPage = lazy(() =>
  import('@/features/notifications').then((m) => ({ default: m.NotificationCenterPage })),
);
const ActivityPage = lazy(() =>
  import('@/features/activity').then((m) => ({ default: m.ActivityPage })),
);
const AchievementsPage = lazy(() =>
  import('@/features/activity').then((m) => ({ default: m.AchievementsPage })),
);
const ProfilePage = lazy(() =>
  import('@/features/profile').then((m) => ({ default: m.ProfilePage })),
);
const SettingsPage = lazy(() =>
  import('@/features/profile').then((m) => ({ default: m.SettingsPage })),
);

const AIAssistantRedirect: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      EventBus.publish("OPEN_AI_ASSISTANT");
    }, 100);
    navigate(-1);
    return () => clearTimeout(timer);
  }, [navigate]);
  return null;
};

export const renderCommunicationAndOtherRoutes = () => (
  <>
    {/* Communication */}
    <Route path="messages" element={<CommunicationPage />} />
    <Route path="messages/chat" element={<Navigate to="/messages" replace />} />
    <Route
      path="messages/discussion"
      element={
        <RoleGuard allowedRoles={["student", "parent"]}>
          <ClassDiscussionPage />
        </RoleGuard>
      }
    />
    <Route path="messages/notifications" element={<NotificationCenterPage />} />

    {/* Assistant Redirect */}
    <Route path="assistant" element={<AIAssistantRedirect />} />

    {/* Activity & Profile */}
    <Route
      path="activity"
      element={
        <RoleGuard allowedRoles={["student", "parent"]}>
          <ActivityPage />
        </RoleGuard>
      }
    />
    <Route
      path="activity/achievements"
      element={
        <RoleGuard allowedRoles={["student", "parent"]}>
          <AchievementsPage />
        </RoleGuard>
      }
    />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="settings" element={<SettingsPage />} />
  </>
);
