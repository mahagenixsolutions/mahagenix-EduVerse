import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { RoleGuard } from '../RoleGuard';

const MyClassesPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.MyClassesPage })),
);
const StudentsDirectoryPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.StudentsDirectoryPage })),
);
const TeacherAttendancePage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherAttendancePage })),
);
const TeacherHomeworkPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherHomeworkPage })),
);
const TeacherAssignmentsPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherAssignmentsPage })),
);
const TeacherMarksPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherMarksPage })),
);
const TeacherAnnouncementsPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherAnnouncementsPage })),
);
const TeacherEventsPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherEventsPage })),
);
const TeacherCalendarPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherCalendarPage })),
);
const TeacherReportsPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherReportsPage })),
);
const TeacherCoursesPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherCoursesPage })),
);
const TeacherLessonPlannerPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherLessonPlannerPage })),
);
const TeacherBehaviourPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherBehaviourPage })),
);
const TeacherQuestionsPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherQuestionsPage })),
);
const TeacherGradebookPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherGradebookPage })),
);
const TeacherResourcesPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherResourcesPage })),
);
const TeacherParentMeetingsPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherParentMeetingsPage })),
);
const TeacherCurriculumPage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherCurriculumPage })),
);
const TeacherDashboard = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherDashboard })),
);
const TeacherProfilePage = lazy(() =>
  import('@/features/teacher').then((m) => ({ default: m.TeacherProfilePage })),
);

export const renderTeacherRoutes = () => (
  <Route element={<RoleGuard allowedRoles={["teacher"]} />}>
    <Route path="teacher/dashboard" element={<TeacherDashboard />} />
    <Route
      path="teacher/classes"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="my_classes">
          <MyClassesPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/curriculum"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="curriculum_planner">
          <TeacherCurriculumPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/lesson-planner"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="lesson_planner">
          <TeacherLessonPlannerPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/students"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="my_students">
          <StudentsDirectoryPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/attendance"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="attendance">
          <TeacherAttendancePage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/behaviour"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="behavior_tracking">
          <TeacherBehaviourPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/questions"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="questions_bank">
          <TeacherQuestionsPage />
        </RoleGuard>
      }
    />
    <Route path="teacher/homework" element={<TeacherHomeworkPage />} />
    <Route path="teacher/assignments" element={<TeacherAssignmentsPage />} />
    <Route path="teacher/gradebook" element={<TeacherGradebookPage />} />
    <Route path="teacher/marks" element={<TeacherMarksPage />} />
    <Route
      path="teacher/resources"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="resources_repository">
          <TeacherResourcesPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/courses"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="my_courses">
          <TeacherCoursesPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/announcements"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="announcements">
          <TeacherAnnouncementsPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/meetings"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="parent_meetings">
          <TeacherParentMeetingsPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/events"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="live_classes">
          <TeacherEventsPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/calendar"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="calendar">
          <TeacherCalendarPage />
        </RoleGuard>
      }
    />
    <Route
      path="teacher/reports"
      element={
        <RoleGuard allowedRoles={["teacher"]} featureFlag="advanced_reports">
          <TeacherReportsPage />
        </RoleGuard>
      }
    />
    <Route path="teacher/profile" element={<TeacherProfilePage />} />
  </Route>
);
