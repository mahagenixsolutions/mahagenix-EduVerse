import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const NotFoundPage = lazy(() =>
  import('@/features/system').then((m) => ({ default: m.NotFoundPage })),
);
const ServerErrorPage = lazy(() =>
  import('@/features/system').then((m) => ({ default: m.ServerErrorPage })),
);
const MaintenancePage = lazy(() =>
  import('@/features/system').then((m) => ({ default: m.MaintenancePage })),
);
const UnauthorizedPage = lazy(() =>
  import('@/features/system').then((m) => ({ default: m.UnauthorizedPage })),
);
const ForbiddenPage = lazy(() =>
  import('@/features/system').then((m) => ({ default: m.ForbiddenPage })),
);
const OfflinePage = lazy(() =>
  import('@/features/system').then((m) => ({ default: m.OfflinePage })),
);
const SystemStatusPage = lazy(() =>
  import('@/features/system').then((m) => ({ default: m.SystemStatusPage })),
);
const SystemShowcasePage = lazy(() =>
  import('@/features/system').then((m) => ({ default: m.SystemShowcasePage })),
);

export const renderSystemRoutes = () => (
  <>
    <Route path="system/showcase" element={<SystemShowcasePage />} />
    <Route path="system/maintenance" element={<MaintenancePage />} />
    <Route path="system/status" element={<SystemStatusPage />} />
    <Route path="system/offline" element={<OfflinePage />} />
    <Route path="system/unauthorized" element={<UnauthorizedPage />} />
    <Route path="system/forbidden" element={<ForbiddenPage />} />
    <Route path="system/500" element={<ServerErrorPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </>
);
