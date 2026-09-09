import { AppSidebar } from '@/components/organisms/sidebar';
import { IssueModal } from '@/components/organisms/issue-modal';
import type { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
  topbar?: ReactNode;
};

function AppLayout({ children, topbar }: AppLayoutProps) {
  return (
    <div className="flex min-h-dvh">
      <aside className="border-border sticky top-0 h-dvh shrink-0 border-r md:w-[250px]">
        <AppSidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {topbar}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <IssueModal />
    </div>
  );
}

export { AppLayout };
