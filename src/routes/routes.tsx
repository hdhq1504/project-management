import { lazy, Suspense } from 'react';
import { Navigate, Outlet, type RouteObject } from 'react-router';
import path from '@/constants/path';
import { AppLayout } from '@/components/templates/app-layout';
import { AuthLayout } from '@/components/templates/auth-layout';
import { ProtectedRoute, PublicRoute } from '@/routes/guards';

const Login = lazy(() => import('@/pages/login'));
const Signup = lazy(() => import('@/pages/signup'));
const Issues = lazy(() => import('@/pages/issues'));
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
        element: (
          <AppLayout>
            <Outlet />
          </AppLayout>
        ),
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
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
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
