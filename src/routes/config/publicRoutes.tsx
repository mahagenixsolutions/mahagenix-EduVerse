import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const MarketingPage = lazy(() =>
  import('@/features/marketing').then((m) => ({ default: m.MarketingPage })),
);
const PlanDetailsPage = lazy(() =>
  import('@/features/marketing').then((m) => ({ default: m.PlanDetailsPage })),
);
const RegisterPage = lazy(() =>
  import('@/features/registration').then((m) => ({ default: m.RegisterPage })),
);
const LoginPage = lazy(() =>
  import('@/features/auth').then((m) => ({ default: m.LoginPage })),
);

export const renderPublicRoutes = () => (
  <>
    <Route path={ROUTES.HOME} element={<MarketingPage />} />
    <Route path="/pricing/:planId" element={<PlanDetailsPage />} />
    <Route path={ROUTES.PLAN_DETAILS} element={<PlanDetailsPage />} />
    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
  </>
);
