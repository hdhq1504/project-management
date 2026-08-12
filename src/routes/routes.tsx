import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';
import path from '@/constants/path';
import AuthLayout from '@/layouts/auth-layout';

const Login = lazy(() => import('@/pages/auth/login/login-page'));
const Signup = lazy(() => import('@/pages/auth/signup/signup-page'));
const Workspace = lazy(() => import('@/pages/workspace/workspace'));
const NotFound = lazy(() => import('@/pages/not-found'));

export const routes: RouteObject[] = [
  {
    path: path.home,
    element: (
      <Suspense>
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
          <Suspense>
            <Login />
          </Suspense>
        )
      },
      {
        path: path.signup,
        element: (
          <Suspense>
            <Signup />
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
];
