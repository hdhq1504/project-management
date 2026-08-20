import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import path from '@/constants/path';
import AuthLayout from '@/layouts/auth-layout';
import AppLayout from '@/layouts/app-layout';
import WorkspaceLayout from '@/layouts/workspace-layout';
import { ProtectedRoute } from '@/features/auth/guards/protected-route';
import { PublicRoute } from '@/features/auth/guards/public-route';

const Login = lazy(() => import('@/pages/auth/login/login-page'));
const Signup = lazy(() => import('@/pages/auth/signup/signup-page'));
const Issues = lazy(() => import('@/pages/issues/issues-page'));
const NotFound = lazy(() => import('@/pages/not-found'));

export const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Navigate to={path.issues} replace />
      },
      {
        element: <AppLayout />,
        children: [
          {
            element: <WorkspaceLayout />,
            children: [
              {
                path: path.issues,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Issues />
                  </Suspense>
                )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: path.login,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            )
          },
          {
            path: path.signup,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Signup />
              </Suspense>
            )
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    )
  }
];
