import AppSidebar from '@/layouts/app-layout/app-sidebar';
import { Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="border-border w-[220px] shrink-0 border-r">
        <AppSidebar />
      </aside>

      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
