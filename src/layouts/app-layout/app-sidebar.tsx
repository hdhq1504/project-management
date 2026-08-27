import SidebarHeader from '@/layouts/app-layout/sidebar/sidebar-header';
import SidebarContent from '@/layouts/app-layout/sidebar/sidebar-content';
import SidebarFooter from '@/layouts/app-layout/sidebar/sidebar-footer';

export default function AppSidebar() {
  return (
    <div className="flex h-full flex-col gap-4 px-4 py-3">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </div>
  );
}
