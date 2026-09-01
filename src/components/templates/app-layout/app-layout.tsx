import { AppSidebar } from '@/components/organisms/sidebar';
import { IssueModal } from '@/components/organisms/issue-modal';
import type { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-dvh">
      <aside className="border-border sticky top-0 h-dvh shrink-0 border-r md:w-[250px]">
        <AppSidebar />
      </aside>

      <main className="min-h-100dvh min-w-0 flex-1">{children}</main>

      <IssueModal />
    </div>
  );
}

export { AppLayout };
