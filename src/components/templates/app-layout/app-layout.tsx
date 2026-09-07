import { AppSidebar } from '@/components/organisms/sidebar';
import { Topbar } from '@/components/organisms/topbar';
import { IssueModal } from '@/components/organisms/issue-modal';
import { useIssuesStore } from '@/stores/issues.store';
import type { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  const addIssue = useIssuesStore((state) => state.addIssue);

  return (
    <div className="flex min-h-dvh">
      <aside className="border-border sticky top-0 h-dvh shrink-0 border-r md:w-[250px]">
        <AppSidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <IssueModal onSubmit={(values) => addIssue(values)} />
    </div>
  );
}

export { AppLayout };
