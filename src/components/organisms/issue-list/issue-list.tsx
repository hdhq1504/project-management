import { useCallback, useMemo } from 'react';
import { useCurrentWorkspace } from '@/hooks/use-current-workspace';
import { useIssues } from '@/hooks/use-issues';
import { useUpdateIssue } from '@/hooks/use-update-issue';
import { useLabels } from '@/hooks/use-labels';
import { useIssueModalStore } from '@/stores/issue-modal.store';
import { useAuthStore } from '@/stores/auth.store';
import type { UpdateIssueInput } from '@/types/issue.types';
import { groupIssuesByStatus } from '@/utils/issue.utils';
import { IssueGroup } from './issue-group';
import { IssuesEmptyState } from './issues-empty-state';
import { cn } from '@/libs/utils';

export type IssueListProps = {
  className?: string;
};

function IssueList({ className }: IssueListProps) {
  const currentWorkspaceQuery = useCurrentWorkspace();
  const { data: workspace, isLoading: isWorkspaceLoading } = currentWorkspaceQuery;
  const issuesQuery = useIssues(workspace?.id, workspace?.slug);
  const { mutateAsync: updateIssue } = useUpdateIssue(workspace?.id, workspace?.slug);
  const { data: issues = [], isLoading: isIssuesLoading } = issuesQuery;
  const { data: labels = [] } = useLabels(workspace?.id);
  const currentUser = useAuthStore((state) => state.user);
  const openModal = useIssueModalStore((state) => state.open);

  const groupedIssues = useMemo(() => groupIssuesByStatus(issues).filter((g) => g.issues.length > 0), [issues]);
  const assignees = useMemo(
    () => (currentUser ? [{ id: currentUser.id, name: currentUser.username, avatarUrl: currentUser.avatar_url }] : []),
    [currentUser]
  );
  const handleUpdateIssue = useCallback(
    async (issueId: string, input: UpdateIssueInput) => {
      await updateIssue({ issueId, input });
    },
    [updateIssue]
  );

  if (isWorkspaceLoading || isIssuesLoading) {
    return <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">Loading issues...</div>;
  }

  if (currentWorkspaceQuery.isError || issuesQuery.isError) {
    return (
      <div role="alert" className="text-destructive flex h-64 items-center justify-center text-sm">
        Không thể tải issues. Vui lòng thử lại.
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
        Chưa có workspace hiện tại.
      </div>
    );
  }

  if (groupedIssues.length === 0) {
    return <IssuesEmptyState onCreateIssue={() => openModal()} />;
  }

  return (
    <div className={cn('divide-border/30 flex flex-col divide-y', className)}>
      {groupedIssues.map((group) => (
        <IssueGroup
          key={group.status}
          group={group}
          labels={labels}
          assignees={assignees}
          onUpdateIssue={handleUpdateIssue}
        />
      ))}
    </div>
  );
}

export { IssueList };
