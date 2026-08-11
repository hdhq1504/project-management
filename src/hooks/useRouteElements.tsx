import { useRoutes } from 'react-router-dom';
import Login from '@/pages/auth/Login/Login';
import Signup from '@/pages/auth/Signup/Signup';
import Dashboard from '@/pages/dashboard/Dashboard';
import AuthLayout from '@/layouts/AuthLayout';

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <Dashboard />
    },
    {
      path: '',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        }
      ]
    }
  ]);
  return routeElements;
}
