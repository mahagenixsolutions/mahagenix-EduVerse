import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { RoleGuard } from '../RoleGuard';

const SchoolPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.SchoolPage })),
);
const EventsPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.EventsPage })),
);
const CalendarPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.CalendarPage })),
);
const ClubsPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.ClubsPage })),
);
const GalleryPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.GalleryPage })),
);
const LibraryPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.LibraryPage })),
);
const TransportPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.TransportPage })),
);
const AnnouncementsPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.AnnouncementsPage })),
);

export const renderSchoolRoutes = () => (
  <>
    <Route path="school" element={<SchoolPage />} />
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
  </>
);
