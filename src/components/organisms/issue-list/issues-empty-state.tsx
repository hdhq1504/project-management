import { cn } from '@/libs/utils';

type IssuesEmptyStateProps = {
  onCreateIssue: () => void;
  className?: string;
};

function IssuesEmptyState({ onCreateIssue, className }: IssuesEmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-24 text-center', className)}>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-foreground text-sm font-medium">No issues yet</p>
        <p className="text-muted-foreground text-xs">Track bugs, features, and improvements.</p>
      </div>

      <button
        type="button"
        onClick={onCreateIssue}
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors"
      >
        <span className="text-base leading-none">+</span>
        Create issue
      </button>
    </div>
  );
}

export { IssuesEmptyState };
