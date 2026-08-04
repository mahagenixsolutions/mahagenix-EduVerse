import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const LearnHub = lazy(() =>
  import('@/features/learn').then((m) => ({ default: m.LearnHub })),
);
const LessonsPage = lazy(() =>
  import('@/features/learn').then((m) => ({ default: m.LessonsPage })),
);
const HomeworkPage = lazy(() =>
  import('@/features/homework').then((m) => ({ default: m.HomeworkPage })),
);
const AssignmentsPage = lazy(() =>
  import('@/features/learn').then((m) => ({ default: m.AssignmentsPage })),
);
const NotesPage = lazy(() =>
  import('@/features/learn').then((m) => ({ default: m.NotesPage })),
);
const PracticePage = lazy(() =>
  import('@/features/learn').then((m) => ({ default: m.PracticePage })),
);
const AttendancePage = lazy(() =>
  import('@/features/attendance').then((m) => ({ default: m.AttendancePage })),
);
const ResultsPage = lazy(() =>
  import('@/features/learn').then((m) => ({ default: m.ResultsPage })),
);

export const renderStudentRoutes = () => (
  <>
    <Route path="learn" element={<LearnHub />} />
    <Route path="learn/lessons" element={<LessonsPage />} />
    <Route path="learn/homework" element={<HomeworkPage />} />
    <Route path="learn/assignments" element={<AssignmentsPage />} />
    <Route path="learn/notes" element={<NotesPage />} />
    <Route path="learn/practice" element={<PracticePage />} />
    <Route path="learn/attendance" element={<AttendancePage />} />
    <Route path="learn/results" element={<ResultsPage />} />
  </>
);
