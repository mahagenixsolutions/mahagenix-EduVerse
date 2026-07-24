import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { RoleProvider, useRole } from "@/contexts/RoleContext";
import { MainLayout } from "@/layouts/MainLayout";
import { RoleResolver } from "@/routes/RoleResolver";
import { RoleGuard } from "@/routes/RoleGuard";
import { GlobalErrorBoundary } from "@/components/feedback";
import { EventBus } from "@/mock-server/EventBus";
import { SplashProvider, useSplashScreen, AppSplashScreen } from "@/components/splash";

// Fallback Loader during Lazy Module Resolution
const PageFallbackLoader: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "24px",
      width: "100%",
    }}
  >
    <div
      className="skeleton"
      style={{ width: "200px", height: "32px", borderRadius: "12px" }}
    ></div>
    <div
      className="skeleton"
      style={{ width: "100%", height: "320px", borderRadius: "18px" }}
    ></div>
  </div>
);

// Lazy Loaded Auth Page
const LoginPage = lazy(() =>
  import("@/features/auth").then((m) => ({ default: m.LoginPage })),
);

// Lazy Loaded Student / Learn Pages
const LearnHub = lazy(() =>
  import("@/features/learn").then((m) => ({ default: m.LearnHub })),
);
const LessonsPage = lazy(() =>
  import("@/features/learn").then((m) => ({ default: m.LessonsPage })),
);
const HomeworkPage = lazy(() =>
  import("@/features/learn").then((m) => ({ default: m.HomeworkPage })),
);
const AssignmentsPage = lazy(() =>
  import("@/features/learn").then((m) => ({ default: m.AssignmentsPage })),
);
const NotesPage = lazy(() =>
  import("@/features/learn").then((m) => ({ default: m.NotesPage })),
);
const PracticePage = lazy(() =>
  import("@/features/learn").then((m) => ({ default: m.PracticePage })),
);
const AttendancePage = lazy(() =>
  import("@/features/learn").then((m) => ({ default: m.AttendancePage })),
);
const ResultsPage = lazy(() =>
  import("@/features/learn").then((m) => ({ default: m.ResultsPage })),
);

// Lazy Loaded School Pages
const SchoolPage = lazy(() =>
  import("@/features/school").then((m) => ({ default: m.SchoolPage })),
);
const EventsPage = lazy(() =>
  import("@/features/school").then((m) => ({ default: m.EventsPage })),
);
const CalendarPage = lazy(() =>
  import("@/features/school").then((m) => ({ default: m.CalendarPage })),
);
const ClubsPage = lazy(() =>
  import("@/features/school").then((m) => ({ default: m.ClubsPage })),
);
const GalleryPage = lazy(() =>
  import("@/features/school").then((m) => ({ default: m.GalleryPage })),
);
const LibraryPage = lazy(() =>
  import("@/features/school").then((m) => ({ default: m.LibraryPage })),
);
const TransportPage = lazy(() =>
  import("@/features/school").then((m) => ({ default: m.TransportPage })),
);
const AnnouncementsPage = lazy(() =>
  import("@/features/school").then((m) => ({ default: m.AnnouncementsPage })),
);

// Lazy Loaded Communication & Notifications
const CommunicationPage = lazy(() =>
  import("@/features/communication").then((m) => ({
    default: m.CommunicationPage,
  })),
);
const ClassDiscussionPage = lazy(() =>
  import("@/features/communication").then((m) => ({
    default: m.ClassDiscussionPage,
  })),
);
const NotificationCenterPage = lazy(() =>
  import("@/features/notifications").then((m) => ({
    default: m.NotificationCenterPage,
  })),
);

// Lazy Loaded Services
const ServicesPage = lazy(() =>
  import("@/features/services").then((m) => ({ default: m.ServicesPage })),
);
const FeesPage = lazy(() =>
  import("@/features/services").then((m) => ({ default: m.FeesPage })),
);
const StorePage = lazy(() =>
  import("@/features/services").then((m) => ({ default: m.StorePage })),
);
const HostelPage = lazy(() =>
  import("@/features/services").then((m) => ({ default: m.HostelPage })),
);
const CertificatesPage = lazy(() =>
  import("@/features/services").then((m) => ({ default: m.CertificatesPage })),
);

// Lazy Loaded Activity & Profile Pages
const ActivityPage = lazy(() =>
  import("@/features/activity").then((m) => ({ default: m.ActivityPage })),
);
const AchievementsPage = lazy(() =>
  import("@/features/activity").then((m) => ({ default: m.AchievementsPage })),
);
const ProfilePage = lazy(() =>
  import("@/features/profile").then((m) => ({ default: m.ProfilePage })),
);
const SettingsPage = lazy(() =>
  import("@/features/profile").then((m) => ({ default: m.SettingsPage })),
);

// Lazy Loaded Teacher Pages
const MyClassesPage = lazy(() =>
  import("@/features/teacher").then((m) => ({ default: m.MyClassesPage })),
);
const StudentsDirectoryPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.StudentsDirectoryPage,
  })),
);
const TeacherAttendancePage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherAttendancePage,
  })),
);
const TeacherHomeworkPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherHomeworkPage,
  })),
);
const TeacherAssignmentsPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherAssignmentsPage,
  })),
);
const TeacherMarksPage = lazy(() =>
  import("@/features/teacher").then((m) => ({ default: m.TeacherMarksPage })),
);
const TeacherAnnouncementsPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherAnnouncementsPage,
  })),
);
const TeacherEventsPage = lazy(() =>
  import("@/features/teacher").then((m) => ({ default: m.TeacherEventsPage })),
);
const TeacherCalendarPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherCalendarPage,
  })),
);
const TeacherReportsPage = lazy(() =>
  import("@/features/teacher").then((m) => ({ default: m.TeacherReportsPage })),
);
const TeacherCoursesPage = lazy(() =>
  import("@/features/teacher").then((m) => ({ default: m.TeacherCoursesPage })),
);
const TeacherLessonPlannerPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherLessonPlannerPage,
  })),
);
const TeacherBehaviourPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherBehaviourPage,
  })),
);
const TeacherQuestionsPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherQuestionsPage,
  })),
);
const TeacherGradebookPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherGradebookPage,
  })),
);
const TeacherResourcesPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherResourcesPage,
  })),
);
const TeacherParentMeetingsPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherParentMeetingsPage,
  })),
);
const TeacherCurriculumPage = lazy(() =>
  import("@/features/teacher").then((m) => ({
    default: m.TeacherCurriculumPage,
  })),
);

// Lazy Loaded System & State Showcase Pages
const NotFoundPage = lazy(() =>
  import("@/features/system").then((m) => ({ default: m.NotFoundPage })),
);
const ServerErrorPage = lazy(() =>
  import("@/features/system").then((m) => ({ default: m.ServerErrorPage })),
);
const MaintenancePage = lazy(() =>
  import("@/features/system").then((m) => ({ default: m.MaintenancePage })),
);
const UnauthorizedPage = lazy(() =>
  import("@/features/system").then((m) => ({ default: m.UnauthorizedPage })),
);
const ForbiddenPage = lazy(() =>
  import("@/features/system").then((m) => ({ default: m.ForbiddenPage })),
);
const OfflinePage = lazy(() =>
  import("@/features/system").then((m) => ({ default: m.OfflinePage })),
);
const SystemStatusPage = lazy(() =>
  import("@/features/system").then((m) => ({ default: m.SystemStatusPage })),
);
const SystemShowcasePage = lazy(() =>
  import("@/features/system").then((m) => ({ default: m.SystemShowcasePage })),
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

// Auth Guard Wrapper
const GuardedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useRole();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const MainAppContent: React.FC = () => {
  const { isSplashActive } = useSplashScreen();

  return (
    <>
      {isSplashActive && <AppSplashScreen />}
      <BrowserRouter>
        <GlobalErrorBoundary>
          <Suspense fallback={<PageFallbackLoader />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              {/* Main Application Layout */}
              <Route
                path="/"
                element={
                  <GuardedRoute>
                    <MainLayout />
                  </GuardedRoute>
                }
              >
                {/* Role Resolver for root dashboard */}
                <Route index element={<RoleResolver />} />

                {/* TEACHER WORKSPACE */}
                <Route
                  path="teacher/classes"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <MyClassesPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/curriculum"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherCurriculumPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/lesson-planner"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherLessonPlannerPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/students"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <StudentsDirectoryPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/attendance"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherAttendancePage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/behaviour"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherBehaviourPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/questions"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherQuestionsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/homework"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherHomeworkPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/assignments"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherAssignmentsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/gradebook"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherGradebookPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/marks"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherMarksPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/resources"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherResourcesPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/courses"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherCoursesPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/announcements"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherAnnouncementsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/meetings"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherParentMeetingsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/events"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherEventsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/calendar"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherCalendarPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="teacher/reports"
                  element={
                    <RoleGuard allowedRoles={["teacher"]}>
                      <TeacherReportsPage />
                    </RoleGuard>
                  }
                />

                {/* STUDENT WORKSPACE */}
                <Route
                  path="learn"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <LearnHub />
                    </RoleGuard>
                  }
                />
                <Route
                  path="learn/lessons"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <LessonsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="learn/homework"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <HomeworkPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="learn/assignments"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <AssignmentsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="learn/notes"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <NotesPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="learn/practice"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <PracticePage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="learn/attendance"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <AttendancePage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="learn/results"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <ResultsPage />
                    </RoleGuard>
                  }
                />

                {/* School */}
                <Route
                  path="school"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <SchoolPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="school/announcements"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <AnnouncementsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="school/calendar"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <CalendarPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="school/events"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <EventsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="school/clubs"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <ClubsPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="school/gallery"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <GalleryPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="school/library"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <LibraryPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="school/transport"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <TransportPage />
                    </RoleGuard>
                  }
                />

                {/* Communication */}
                <Route path="messages" element={<CommunicationPage />} />
                <Route
                  path="messages/chat"
                  element={<Navigate to="/messages" replace />}
                />
                <Route
                  path="messages/discussion"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <ClassDiscussionPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="messages/notifications"
                  element={<NotificationCenterPage />}
                />

                {/* Services */}
                <Route
                  path="services"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <ServicesPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="services/library"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <LibraryPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="services/transport"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <TransportPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="services/hostel"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <HostelPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="services/fees"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <FeesPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="services/certificates"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <CertificatesPage />
                    </RoleGuard>
                  }
                />
                <Route
                  path="store"
                  element={
                    <RoleGuard allowedRoles={["student", "parent"]}>
                      <StorePage />
                    </RoleGuard>
                  }
                />
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

                {/* SYSTEM STATES & UTILITY PAGES */}
                <Route
                  path="system/showcase"
                  element={<SystemShowcasePage />}
                />
                <Route
                  path="system/maintenance"
                  element={<MaintenancePage />}
                />
                <Route path="system/status" element={<SystemStatusPage />} />
                <Route path="system/offline" element={<OfflinePage />} />
                <Route
                  path="system/unauthorized"
                  element={<UnauthorizedPage />}
                />
                <Route path="system/forbidden" element={<ForbiddenPage />} />
                <Route path="system/500" element={<ServerErrorPage />} />

                {/* 404 Catch-All Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </GlobalErrorBoundary>
      </BrowserRouter>
    </>
  );
};

function App() {
  return (
    <RoleProvider>
      <SplashProvider>
        <MainAppContent />
      </SplashProvider>
    </RoleProvider>
  );
}

export default App;
