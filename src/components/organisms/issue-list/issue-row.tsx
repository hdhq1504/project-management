import { useCallback, useState } from 'react';
import type { Issue, UpdateIssueInput } from '@/types/issue.types';
import type { IssueStatusId } from '@/constants/issue-status';
import type { IssuePriorityId } from '@/constants/issue-priority';
import type { LabelItem } from '@/services/label.service';
import type { IssuePropertyItem } from '@/components/molecules/issue-property-select';
import { ISSUE_STATUSES } from '@/constants/issue-status';
import { ISSUE_PRIORITIES } from '@/constants/issue-priority';
import { StatusIcon } from '@/components/atoms/icon/status-icon';
import { PriorityIcon } from '@/components/atoms/icon/priority-icon';
import { LabelIcon, UserCircleIcon } from '@/components/atoms/icon';
import { ColorDot } from '@/components/atoms/color-dot';
import { Badge } from '@/components/atoms/badge';
import { Avatar } from '@/components/atoms/avatar';
import { Checkbox } from '@/components/atoms/checkbox';
import { IssuePropertySelect } from '@/components/molecules/issue-property-select';
import { IssuePropertyCheckbox } from '@/components/molecules/issue-property-checkbox';
import { formatIssueDate } from '@/utils/issue.utils';
import { cn } from '@/libs/utils';

export type IssueRowProps = {
  issue: Issue;
  labels: readonly LabelItem[];
  assignees: readonly (IssuePropertyItem & { avatarUrl: string | null })[];
  onUpdateIssue: (issueId: string, input: UpdateIssueInput) => Promise<void>;
  className?: string;
};

function IssueRow({ issue, labels, assignees, onUpdateIssue, className }: IssueRowProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [updateError, setUpdateError] = useState<string>();
  const updateIssue = useCallback(
    (input: UpdateIssueInput) => {
      setUpdateError(undefined);

      void onUpdateIssue(issue.id, input).catch((error: unknown) => {
        setUpdateError(error instanceof Error ? error.message : 'Không thể cập nhật issue.');
      });
    },
    [issue.id, onUpdateIssue]
  );

  return (
    <div
      className={cn(
        'group border-border/40 hover:bg-muted/40 flex items-center gap-2 border-b px-4 py-2.5 text-sm transition-colors select-none',
        className
      )}
    >
      <div
        className={cn(
          'flex size-4 shrink-0 items-center justify-center transition-opacity',
          !isChecked && 'opacity-0 group-hover:opacity-100'
        )}
      >
        <Checkbox checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} />
      </div>

      <IssuePropertySelect
        value={issue.priority}
        items={ISSUE_PRIORITIES}
        onValueChange={(priority: IssuePriorityId) => updateIssue({ priority })}
        renderIcon={(item) => <PriorityIcon priority={item.id} className="size-3.5" />}
        renderTrigger={({ item }) => (
          <button
            type="button"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs transition-colors"
            aria-label="Change priority"
          >
            {item && <PriorityIcon priority={item.id} className="size-3.5" />}
          </button>
        )}
      />

      <span className="text-muted-foreground/70 shrink-0 text-sm font-medium tracking-tight">{issue.identifier}</span>

      <IssuePropertySelect
        value={issue.status}
        items={ISSUE_STATUSES}
        onValueChange={(status: IssueStatusId) => updateIssue({ status })}
        renderIcon={(item) => <StatusIcon status={item.id} className="size-4" />}
        renderTrigger={({ item }) => (
          <button
            type="button"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs transition-colors"
            aria-label="Change status"
          >
            {item && <StatusIcon status={item.id} className="size-4" />}
          </button>
        )}
      />

      <div className="min-w-0 flex-1 pr-4">
        <span className="text-foreground block truncate text-sm font-medium transition-colors group-hover:text-white">
          {issue.title}
        </span>
        {updateError && (
          <span role="alert" className="text-destructive block truncate text-xs" title={updateError}>
            {updateError}
          </span>
        )}
      </div>

      <IssuePropertyCheckbox
        items={labels}
        value={issue.labelIds ?? []}
        onValueChange={(labelIds) => updateIssue({ labelIds })}
        placeholder="Labels"
        renderIcon={(label) => <ColorDot color={label.color} />}
        renderTrigger={(selectedLabels) =>
          selectedLabels.length === 0 ? (
            <button
              type="button"
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs opacity-0 transition-all group-hover:opacity-100"
              aria-label="Add labels"
            >
              <LabelIcon className="size-3.5" />
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1.5 transition-opacity hover:opacity-80"
              aria-label="Manage labels"
            >
              {selectedLabels.map((label) => (
                <Badge key={label.id} variant="outline">
                  <ColorDot color={label.color} />
                  {label.name}
                </Badge>
              ))}
            </button>
          )
        }
      />

      <IssuePropertySelect
        items={assignees}
        value={issue.assigneeId}
        onValueChange={(assigneeId) => updateIssue({ assigneeId })}
        onClear={() => updateIssue({ assigneeId: null })}
        clearLabel="Unassigned"
        clearShortcut="0"
        invalidLabel="Current assignee"
        renderIcon={(assignee) => <Avatar size="xs" name={assignee.name} src={assignee.avatarUrl} />}
        placeholder="Assignee"
        fallbackIcon={<UserCircleIcon className="size-4" />}
        renderTrigger={({ item, isInvalid }) => (
          <button
            type="button"
            className={cn(
              'text-muted-foreground/60 hover:bg-muted hover:text-foreground flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors',
              isInvalid && 'text-amber-500 ring-1 ring-amber-500/50'
            )}
            aria-label={isInvalid ? 'Current assignee' : 'Change assignee'}
          >
            {item ? (
              <Avatar size="xs" name={item.name} src={item.avatarUrl} />
            ) : (
              <UserCircleIcon className={cn('size-4', isInvalid && 'text-amber-500')} />
            )}
          </button>
        )}
      />

      <span className="text-muted-foreground/60 shrink-0 text-right text-sm">{formatIssueDate(issue.createdAt)}</span>
    </div>
  );
}

export { IssueRow };
