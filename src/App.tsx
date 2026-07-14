import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { RoleProvider, useRole } from '@/contexts/RoleContext';
import { MainLayout } from '@/layouts/MainLayout';
import { RoleResolver } from '@/routes/RoleResolver';
import { RoleGuard } from '@/routes/RoleGuard';
import { LoginPage } from '@/features/auth';
import {
  LearnHub,
  HomeworkPage,
  AssignmentsPage,
  NotesPage,
  PracticePage,
  AttendancePage,
  ResultsPage,
} from '@/features/learn';
import { SchoolPage, EventsPage } from '@/features/school';
import { CommunicationPage } from '@/features/communication';
import { NotificationCenterPage } from '@/features/notifications';
import { ServicesPage } from '@/features/services';
import { ActivityPage } from '@/features/activity';
import { ProfilePage } from '@/features/profile';
import {
  MyClassesPage,
  StudentsDirectoryPage,
  TeacherAttendancePage,
  TeacherHomeworkPage,
  TeacherAssignmentsPage,
  TeacherMarksPage,
  TeacherAnnouncementsPage,
  TeacherEventsPage,
  TeacherCalendarPage,
  TeacherReportsPage,
  TeacherCoursesPage,
} from '@/features/teacher';

import { EventBus } from '@/mock-server/EventBus';

const PlaceholderPage = ({ title }: { title: string }) => (
  <div style={{ padding: 'var(--space-4)' }}>
    <h2>{title}</h2>
    <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>This module is coming soon.</p>
  </div>
);

const AIAssistantRedirect = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      EventBus.publish('OPEN_AI_ASSISTANT');
    }, 100);
    navigate(-1);
    return () => clearTimeout(timer);
  }, [navigate]);
  return null;
};

// A simple auth guard wrapper
const GuardedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useRole();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Secure Portal Layout */}
          <Route path="/" element={<GuardedRoute><MainLayout /></GuardedRoute>}>
            {/* Dynamic Home dashboard resolver */}
            <Route index element={<RoleResolver />} />

            {/* ============================================ */}
            {/* TEACHER WORKSPACE — /teacher/* routes        */}
            {/* Only accessible to teachers                  */}
            {/* ============================================ */}
            <Route path="teacher/classes" element={<RoleGuard allowedRoles={['teacher']}><MyClassesPage /></RoleGuard>} />
            <Route path="teacher/students" element={<RoleGuard allowedRoles={['teacher']}><StudentsDirectoryPage /></RoleGuard>} />
            <Route path="teacher/attendance" element={<RoleGuard allowedRoles={['teacher']}><TeacherAttendancePage /></RoleGuard>} />
            <Route path="teacher/homework" element={<RoleGuard allowedRoles={['teacher']}><TeacherHomeworkPage /></RoleGuard>} />
            <Route path="teacher/assignments" element={<RoleGuard allowedRoles={['teacher']}><TeacherAssignmentsPage /></RoleGuard>} />
            <Route path="teacher/marks" element={<RoleGuard allowedRoles={['teacher']}><TeacherMarksPage /></RoleGuard>} />
            <Route path="teacher/courses" element={<RoleGuard allowedRoles={['teacher']}><TeacherCoursesPage /></RoleGuard>} />
            <Route path="teacher/announcements" element={<RoleGuard allowedRoles={['teacher']}><TeacherAnnouncementsPage /></RoleGuard>} />
            <Route path="teacher/events" element={<RoleGuard allowedRoles={['teacher']}><TeacherEventsPage /></RoleGuard>} />
            <Route path="teacher/calendar" element={<RoleGuard allowedRoles={['teacher']}><TeacherCalendarPage /></RoleGuard>} />
            <Route path="teacher/reports" element={<RoleGuard allowedRoles={['teacher']}><TeacherReportsPage /></RoleGuard>} />

            {/* ============================================ */}
            {/* STUDENT & PARENT WORKSPACE — /learn/* routes  */}
            {/* Only accessible to students and parents      */}
            {/* ============================================ */}
            <Route path="learn" element={<RoleGuard allowedRoles={['student', 'parent']}><LearnHub /></RoleGuard>} />
            <Route path="learn/homework" element={<RoleGuard allowedRoles={['student', 'parent']}><HomeworkPage /></RoleGuard>} />
            <Route path="learn/assignments" element={<RoleGuard allowedRoles={['student', 'parent']}><AssignmentsPage /></RoleGuard>} />
            <Route path="learn/notes" element={<RoleGuard allowedRoles={['student', 'parent']}><NotesPage /></RoleGuard>} />
            <Route path="learn/practice" element={<RoleGuard allowedRoles={['student', 'parent']}><PracticePage /></RoleGuard>} />
            <Route path="learn/attendance" element={<RoleGuard allowedRoles={['student', 'parent']}><AttendancePage /></RoleGuard>} />
            <Route path="learn/results" element={<RoleGuard allowedRoles={['student', 'parent']}><ResultsPage /></RoleGuard>} />

            {/* ============================================ */}
            {/* SCHOOL — Student/Parent only                 */}
            {/* ============================================ */}
            <Route path="school" element={<RoleGuard allowedRoles={['student', 'parent']}><SchoolPage /></RoleGuard>} />
            <Route path="school/calendar" element={<RoleGuard allowedRoles={['student', 'parent']}><PlaceholderPage title="Calendar" /></RoleGuard>} />
            <Route path="school/events" element={<RoleGuard allowedRoles={['student', 'parent']}><EventsPage /></RoleGuard>} />
            <Route path="school/clubs" element={<RoleGuard allowedRoles={['student', 'parent']}><PlaceholderPage title="Clubs" /></RoleGuard>} />
            <Route path="school/gallery" element={<RoleGuard allowedRoles={['student', 'parent']}><PlaceholderPage title="Gallery" /></RoleGuard>} />
            <Route path="school/library" element={<RoleGuard allowedRoles={['student', 'parent']}><PlaceholderPage title="Library" /></RoleGuard>} />
            <Route path="school/transport" element={<RoleGuard allowedRoles={['student', 'parent']}><PlaceholderPage title="Transport" /></RoleGuard>} />

            {/* ============================================ */}
            {/* SHARED ROUTES — All roles                   */}
            {/* ============================================ */}
            <Route path="messages" element={<CommunicationPage />} />
            <Route path="messages/chat" element={<PlaceholderPage title="Chat" />} />
            <Route path="messages/notifications" element={<NotificationCenterPage />} />

            {/* Services — Student/Parent only */}
            <Route path="services" element={<RoleGuard allowedRoles={['student', 'parent']}><ServicesPage /></RoleGuard>} />
            <Route path="services/fees" element={<RoleGuard allowedRoles={['student', 'parent']}><PlaceholderPage title="Fees" /></RoleGuard>} />
            <Route path="store" element={<RoleGuard allowedRoles={['student', 'parent']}><PlaceholderPage title="Store" /></RoleGuard>} />
            <Route path="assistant" element={<AIAssistantRedirect />} />

            {/* User — Shared, role-resolved */}
            <Route path="activity" element={<RoleGuard allowedRoles={['student', 'parent']}><ActivityPage /></RoleGuard>} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;
