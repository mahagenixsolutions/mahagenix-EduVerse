import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { RoleGuard } from '../RoleGuard';

const ServicesPage = lazy(() =>
  import('@/features/services').then((m) => ({ default: m.ServicesPage })),
);
const FeesPage = lazy(() =>
  import('@/features/services').then((m) => ({ default: m.FeesPage })),
);
const StorePage = lazy(() =>
  import('@/features/services').then((m) => ({ default: m.StorePage })),
);
const HostelPage = lazy(() =>
  import('@/features/services').then((m) => ({ default: m.HostelPage })),
);
const CertificatesPage = lazy(() =>
  import('@/features/services').then((m) => ({ default: m.CertificatesPage })),
);
const LibraryPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.LibraryPage })),
);
const TransportPage = lazy(() =>
  import('@/features/school').then((m) => ({ default: m.TransportPage })),
);

export const renderServiceRoutes = () => (
  <>
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
  </>
);
