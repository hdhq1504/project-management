import { Button } from '@/components/atoms/button';
import { ExpandIcon, CloseIcon, NetworkIcon } from '@/components/atoms/icon';

export type IssueModalHeaderProps = {
  onClose?: () => void;
  workspaceSlug?: string;
};

function IssueModalHeader({ onClose, workspaceSlug }: IssueModalHeaderProps) {
  return (
    <>
      <div id="new-issue-title" className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <span className="bg-muted/70 flex h-6 items-center gap-1.5 rounded-md px-2 font-medium">
          <NetworkIcon className="text-decoration-teal size-3" />
          {workspaceSlug?.toUpperCase() ?? 'Workspace'}
        </span>
        <span>›</span>
        <span className="text-foreground font-medium">New issue</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground size-7"
        >
          <ExpandIcon />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground size-7"
          onClick={() => onClose?.()}
        >
          <CloseIcon />
        </Button>
      </div>
    </>
  );
}

export { IssueModalHeader };
