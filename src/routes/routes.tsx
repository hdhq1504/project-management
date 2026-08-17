import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import path from '@/constants/path';
import AuthLayout from '@/layouts/auth-layout';
import { ProtectedRoute } from '@/features/auth/guards/protected-route';
import { PublicRoute } from '@/features/auth/guards/public-route';

const Login = lazy(() => import('@/pages/auth/login/login-page'));
const Signup = lazy(() => import('@/pages/auth/signup/signup-page'));
const Workspace = lazy(() => import('@/pages/workspace/workspace-page'));
const NotFound = lazy(() => import('@/pages/not-found'));

export const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: path.workspace,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Workspace />
          </Suspense>
        )
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
