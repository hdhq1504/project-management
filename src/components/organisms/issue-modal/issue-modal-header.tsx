import { Button } from '@/components/atoms/button';
import { ExpandIcon, CloseIcon, NetworkIcon } from '@/components/atoms/icon';
import { ModalClose } from '@/components/organisms/modal';

export type IssueModalHeaderProps = {
  onClose?: () => void;
};

export function IssueModalHeader({ onClose }: IssueModalHeaderProps) {
  return (
    <>
      <div id="new-issue-title" className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <span className="bg-muted/70 flex h-6 items-center gap-1.5 rounded-md px-2 font-medium">
          <NetworkIcon className="text-decoration-teal size-3" />
          QUA
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

        <ModalClose asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground size-7"
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
        </ModalClose>
      </div>
    </>
  );
}

export default IssueModalHeader;
