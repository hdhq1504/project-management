import { useState } from 'react';
import type { GroupedIssues, Issue } from '@/types/issue.types';
import type { IssueStatusId } from '@/constants/issue-status';
import type { IssuePriorityId } from '@/constants/issue-priority';
import { useIssueModalStore } from '@/stores/issue-modal.store';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/atoms/collapsible';
import { IssueGroupHeader } from './issue-group-header';
import { IssueRow } from './issue-row';
import { cn } from '@/libs/utils';

export type IssueGroupProps = {
  group: GroupedIssues;
  onUpdateIssue?: (id: string, patch: Partial<Omit<Issue, 'id'>>) => void;
  defaultOpen?: boolean;
  className?: string;
};

export function IssueGroup({ group, onUpdateIssue, defaultOpen = true, className }: IssueGroupProps) {
  const { status, name, issues } = group;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const openModal = useIssueModalStore((state) => state.open);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn('group/collapsible flex flex-col', className)}>
      <CollapsibleTrigger asChild>
        <button type="button" className="w-full text-left outline-none">
          <IssueGroupHeader
            status={status}
            name={name}
            count={issues.length}
            isOpen={isOpen}
            onAddClick={() => openModal({ status })}
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col">
        {issues.map((issue) => (
          <IssueRow
            key={issue.id}
            issue={issue}
            onStatusChange={(newStatus: IssueStatusId) => onUpdateIssue?.(issue.id, { status: newStatus })}
            onPriorityChange={(newPriority: IssuePriorityId) => onUpdateIssue?.(issue.id, { priority: newPriority })}
            onLabelsChange={(newLabels: string[]) => onUpdateIssue?.(issue.id, { labels: newLabels })}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default IssueGroup;
