import { Navigate, Outlet, useLocation } from 'react-router';
import path from '@/constants/path';
import { useAuthStore } from '@/features/auth/stores/auth.store';

export function ProtectedRoute() {
  const location = useLocation();
  const session = useAuthStore((state) => state.session);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) return <div>Đang kiểm tra phiên đăng nhập...</div>;

  if (!session) {
    return <Navigate to={path.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
