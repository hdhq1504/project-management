import { Navigate, Outlet } from 'react-router';
import path from '@/constants/path';
import { useAuthStore } from '@/features/auth/stores/auth.store';

export function PublicRoute() {
  const session = useAuthStore((state) => state.session);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) return <div>Đang kiểm tra phiên đăng nhập...</div>;
  return session ? <Navigate to={path.issues} replace /> : <Outlet />;
}
