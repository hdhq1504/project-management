import { useMemo } from 'react';
import { useIssuesStore } from '@/stores/issues.store';
import { groupIssuesByStatus } from '@/utils/issue.utils';
import { IssueGroup } from './issue-group';
import { cn } from '@/libs/utils';

export type IssueListProps = {
  className?: string;
};

export function IssueList({ className }: IssueListProps) {
  const issues = useIssuesStore((state) => state.issues);
  const updateIssue = useIssuesStore((state) => state.updateIssue);

  const groupedIssues = useMemo(() => groupIssuesByStatus(issues).filter((g) => g.issues.length > 0), [issues]);

  if (groupedIssues.length === 0) return null;

  return (
    <div className={cn('divide-border/30 flex flex-col divide-y pb-16', className)}>
      {groupedIssues.map((group) => (
        <IssueGroup key={group.status} group={group} onUpdateIssue={updateIssue} />
      ))}
    </div>
  );
}

export default IssueList;
