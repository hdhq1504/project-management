import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import path from '@/constants/path';
import AuthLayout from '@/layouts/auth-layout';

const Login = lazy(() => import('@/pages/auth/login/login-page'));
const Signup = lazy(() => import('@/pages/auth/signup/signup-page'));
const Workspace = lazy(() => import('@/pages/workspace/workspace-page'));
const NotFound = lazy(() => import('@/pages/not-found'));

export const routes: RouteObject[] = [
  {
    path: path.workspace,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Workspace />
      </Suspense>
    )
  },
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
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
];
