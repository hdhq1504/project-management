import { useState } from 'react';
import type { Issue } from '@/types/issue.types';
import type { IssueStatusId } from '@/constants/issue-status';
import type { IssuePriorityId } from '@/constants/issue-priority';
import { LABELS } from '@/constants/issue-label';
import { ISSUE_STATUSES } from '@/constants/issue-status';
import { ISSUE_PRIORITIES } from '@/constants/issue-priority';
import { StatusIcon } from '@/components/atoms/icon/status-icon';
import { PriorityIcon } from '@/components/atoms/icon/priority-icon';
import { UserCircleIcon } from '@/components/atoms/icon/user-circle-icon';
import { ColorDot } from '@/components/atoms/color-dot';
import { Checkbox } from '@/components/atoms/checkbox';
import { Badge } from '@/components/atoms/badge';
import { IssuePropertySelect } from '@/components/organisms/issue-modal/issue-property-select';
import { IssuePropertyCheckbox } from '@/components/organisms/issue-modal/issue-property-checkbox';
import { formatIssueDate } from '@/utils/issue.utils';
import { cn } from '@/libs/utils';

export type IssueRowProps = {
  issue: Issue;
  onStatusChange?: (status: IssueStatusId) => void;
  onPriorityChange?: (priority: IssuePriorityId) => void;
  onLabelsChange?: (labels: string[]) => void;
  className?: string;
};

export function IssueRow({ issue, onStatusChange, onPriorityChange, onLabelsChange, className }: IssueRowProps) {
  const [isChecked, setIsChecked] = useState(false);

  const matchedLabels = (issue.labels || [])
    .map((labelId) => LABELS.find((l) => l.id === labelId))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

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
        <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
      </div>

      {/* Priority */}
      <IssuePropertySelect
        value={issue.priority}
        items={ISSUE_PRIORITIES}
        onValueChange={(val) => onPriorityChange?.(val as IssuePriorityId)}
        renderIcon={(item) => <PriorityIcon priority={item.id} className="size-3.5" />}
        renderTrigger={(item) => (
          <button
            type="button"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs transition-colors"
            aria-label="Change priority"
          >
            <PriorityIcon priority={item.id} className="size-3.5" />
          </button>
        )}
      />

      <span className="text-muted-foreground/70 shrink-0 text-sm font-medium tracking-tight">{issue.id}</span>

      {/* Status */}
      <IssuePropertySelect
        value={issue.status}
        items={ISSUE_STATUSES}
        onValueChange={(val) => onStatusChange?.(val as IssueStatusId)}
        renderIcon={(item) => <StatusIcon status={item.id} className="size-4" />}
        renderTrigger={(item) => (
          <button
            type="button"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs transition-colors"
            aria-label="Change status"
          >
            <StatusIcon status={item.id} className="size-4" />
          </button>
        )}
      />

      <div className="min-w-0 flex-1 pr-4">
        <span className="text-foreground block truncate text-sm font-medium transition-colors group-hover:text-white">
          {issue.title}
        </span>
      </div>

      {/* Labels */}
      {matchedLabels.length > 0 && (
        <IssuePropertyCheckbox
          items={LABELS}
          value={issue.labels ?? []}
          onValueChange={(newLabels) => onLabelsChange?.(newLabels)}
          placeholder="Labels"
          renderIcon={(label) => <ColorDot color={label.color} />}
          renderTrigger={(selected) => (
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1.5 transition-opacity hover:opacity-80"
              aria-label="Manage labels"
            >
              {selected.map((label) => (
                <Badge key={label.id} variant="outline">
                  <ColorDot color={label.color} />
                  {label.name}
                </Badge>
              ))}
            </button>
          )}
        />
      )}

      <div className="text-muted-foreground/60 flex size-4 shrink-0 items-center justify-center">
        <UserCircleIcon className="size-4" />
      </div>

      <span className="text-muted-foreground/60 shrink-0 text-right text-sm">{formatIssueDate(issue.createdAt)}</span>
    </div>
  );
}

export default IssueRow;
