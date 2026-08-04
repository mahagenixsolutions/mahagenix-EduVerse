import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GuardedRoute } from './GuardedRoute';
import { MainLayout } from '@/layouts/MainLayout';
import { RoleResolver } from './RoleResolver';

import { renderPublicRoutes } from './config/publicRoutes';
import { renderTeacherRoutes } from './config/teacherRoutes';
import { renderStudentRoutes } from './config/studentRoutes';
import { renderSchoolRoutes } from './config/schoolRoutes';
import { renderServiceRoutes } from './config/serviceRoutes';
import { renderCommunicationAndOtherRoutes } from './config/otherRoutes';
import { renderSystemRoutes } from './config/systemRoutes';

export const AppRoutes: React.FC = () => (
  <Routes>
    {/* Public Marketing & Auth Routes */}
    {renderPublicRoutes()}

    {/* Main Application Layout Protected Area */}
    <Route
      path="/app"
      element={
        <GuardedRoute>
          <MainLayout />
        </GuardedRoute>
      }
    >
      {/* Role Resolver for root dashboard */}
      <Route index element={<RoleResolver />} />

      {/* Domain Routes */}
      {renderTeacherRoutes()}
      {renderStudentRoutes()}
      {renderSchoolRoutes()}
      {renderServiceRoutes()}
      {renderCommunicationAndOtherRoutes()}

      {/* System & Fallback Routes */}
      {renderSystemRoutes()}
    </Route>

    {/* Legacy Route Redirects */}
    <Route path="/learn/*" element={<Navigate to="/app/learn" replace />} />
    <Route path="/teacher/*" element={<Navigate to="/app/teacher/classes" replace />} />
    <Route path="/school/*" element={<Navigate to="/app/school/announcements" replace />} />
    <Route path="/messages/*" element={<Navigate to="/app/messages" replace />} />
    <Route path="/services/*" element={<Navigate to="/app/services" replace />} />
    <Route path="/activity/*" element={<Navigate to="/app/activity" replace />} />
    <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
    <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
  </Routes>
);
