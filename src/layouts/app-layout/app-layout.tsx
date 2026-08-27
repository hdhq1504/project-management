import AppSidebar from '@/layouts/app-layout/app-sidebar';
import { Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <div className="flex min-h-dvh">
      <aside className="border-border sticky top-0 h-dvh w-[220px] shrink-0 border-r">
        <AppSidebar />
      </aside>

      <main className="min-h-100dvh min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
