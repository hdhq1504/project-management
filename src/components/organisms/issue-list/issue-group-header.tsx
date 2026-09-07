import type { IssueStatusId } from '@/constants/issue-status';
import { StatusIcon } from '@/components/atoms/icon/status-icon';
import { ChevronDownIcon } from '@/components/atoms/icon/chevron-down-icon';
import { cn } from '@/libs/utils';

export type IssueGroupHeaderProps = {
  status: IssueStatusId;
  name: string;
  count: number;
  isOpen?: boolean;
  className?: string;
};

function IssueGroupHeader({ status, name, count, isOpen, className }: IssueGroupHeaderProps) {
  return (
    <div
      className={cn(
        'group/header border-border/60 flex h-9 items-center gap-2 px-4 font-medium select-none',
        className
      )}
    >
      <div className="flex size-4 shrink-0 items-center justify-center">
        <ChevronDownIcon
          className={cn(
            'text-muted-foreground/70 size-2.5 transition-transform duration-200 group-data-[state=closed]/collapsible:-rotate-90',
            isOpen === false && '-rotate-90'
          )}
        />
      </div>

      <div className="flex size-6 shrink-0 items-center justify-center">
        <StatusIcon status={status} />
      </div>

      <div className="flex flex-1 items-center gap-2">
        <span className="text-foreground text-sm font-semibold tracking-tight">{name}</span>
        <span className="text-muted-foreground text-xs font-medium">{count}</span>
      </div>
    </div>
  );
}

export { IssueGroupHeader };
