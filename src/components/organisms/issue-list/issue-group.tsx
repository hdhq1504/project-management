import { useState } from 'react';
import type { GroupedIssues, UpdateIssueInput } from '@/types/issue.types';
import type { LabelItem } from '@/services/label.service';
import type { IssuePropertyItem } from '@/components/molecules/issue-property-select';
import { useIssueModalStore } from '@/stores/issue-modal.store';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/atoms/collapsible';
import { IssueGroupHeader } from './issue-group-header';
import { IssueRow } from './issue-row';
import { cn } from '@/libs/utils';

export type IssueGroupProps = {
  group: GroupedIssues;
  labels: readonly LabelItem[];
  assignees: readonly (IssuePropertyItem & { avatarUrl: string | null })[];
  onUpdateIssue: (issueId: string, input: UpdateIssueInput) => Promise<void>;
  defaultOpen?: boolean;
  className?: string;
};

function IssueGroup({ group, labels, assignees, onUpdateIssue, defaultOpen = true, className }: IssueGroupProps) {
  const { status, name, issues } = group;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const openModal = useIssueModalStore((state) => state.open);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn('group/collapsible flex flex-col', className)}>
      <div className="border-border/60 bg-muted/50 sticky top-0 z-10 flex h-9 items-center border-b backdrop-blur-xs">
        <CollapsibleTrigger asChild>
          <button type="button" className="min-w-0 flex-1 text-left outline-none">
            <IssueGroupHeader status={status} name={name} count={issues.length} isOpen={isOpen} />
          </button>
        </CollapsibleTrigger>

        <button
          type="button"
          onClick={() => openModal({ status })}
          aria-label={`Add issue to ${name}`}
          className="text-muted-foreground hover:bg-muted hover:text-foreground mr-4 flex size-6 cursor-pointer items-center justify-center rounded-sm text-base transition-colors"
        >
          +
        </button>
      </div>

      <CollapsibleContent className="flex flex-col">
        {issues.map((issue) => (
          <IssueRow key={issue.id} issue={issue} labels={labels} assignees={assignees} onUpdateIssue={onUpdateIssue} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export { IssueGroup };
