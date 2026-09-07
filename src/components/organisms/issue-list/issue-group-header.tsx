import type { IssueStatusId } from '@/constants/issue-status';
import { StatusIcon } from '@/components/atoms/icon/status-icon';
import { ChevronDownIcon } from '@/components/atoms/icon/chevron-down-icon';
import { cn } from '@/libs/utils';

export type IssueGroupHeaderProps = {
  status: IssueStatusId;
  name: string;
  count: number;
  isOpen?: boolean;
  onAddClick?: () => void;
  className?: string;
};

export function IssueGroupHeader({ status, name, count, isOpen, onAddClick, className }: IssueGroupHeaderProps) {
  return (
    <div
      className={cn(
        'group/header border-border/60 sticky top-0 z-10 flex h-9 cursor-pointer items-center gap-2 border-b bg-[#21232E] px-4 font-medium backdrop-blur-xs transition-colors select-none',
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

      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onAddClick?.();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
            onAddClick?.();
          }
        }}
        className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-6 cursor-pointer items-center justify-center rounded-sm text-base transition-colors"
        aria-label={`Add issue to ${name}`}
      >
        +
      </div>
    </div>
  );
}

export default IssueGroupHeader;
