import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/atoms/button/button';
import { Textarea } from '@/components/atoms/textarea/textarea';
import { Modal } from '@/components/templates/modal/modal';
import { ColorDot } from '@/components/atoms/color-dot/color-dot';
import { IssueProperty } from './issue-property';
import {
  CircleIcon,
  CloseIcon,
  ExpandIcon,
  LabelIcon,
  NetworkIcon,
  PriorityIcon,
  UserCircleIcon
} from '@/components/atoms/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/organisms/popover/popover';
import LabelPicker from '@/features/issues/components/label-picker';
import { getLabelSummary, getSelectedLabelObjects } from '@/features/issues/utils/utils';
import { useIssueModalStore } from '@/features/issues/stores/issue-modal.store';

export function NewIssueModal() {
  const isOpen = useIssueModalStore((state) => state.isOpen);
  const close = useIssueModalStore((state) => state.close);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState<string[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const selectedLabels = getSelectedLabelObjects(labels);

  const handleClose = useCallback(() => {
    close();
    setTitle('');
    setDescription('');
    setLabels([]);
  }, [close]);

  useEffect(() => {
    if (!isOpen) return;

    titleRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    handleClose();
  };

  const labelIcon =
    selectedLabels.length === 0 ? (
      <LabelIcon />
    ) : selectedLabels.length === 1 ? (
      <ColorDot color={selectedLabels[0].color} />
    ) : (
      <div className="flex items-center -space-x-1">
        {selectedLabels.map((label) => (
          <ColorDot key={label.id} color={label.color} className="ring-background ring-1" />
        ))}
      </div>
    );

  return (
    <Modal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <dialog
          ref={modalRef}
          open
          aria-labelledby="new-issue-title"
          className="border-border bg-background text-foreground relative m-0 flex w-full max-w-[750px] flex-col rounded-xl border p-0 shadow-2xl"
        >
          <header className="border-border/30 flex h-11 items-center justify-between border-b px-3">
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

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground size-7"
                onClick={handleClose}
              >
                <CloseIcon />
              </Button>
            </div>
          </header>

          <main className="flex min-h-[180px] flex-1 flex-col gap-3 p-4">
            <input
              ref={titleRef}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Issue title"
              className="placeholder:text-muted-foreground/50 text-foreground w-full border-none bg-transparent text-lg font-medium outline-none"
            />

            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add description..."
              className="placeholder:text-muted-foreground/50 min-h-24 resize-none border-none p-0 text-sm shadow-none focus-visible:ring-0"
            />
          </main>

          <div className="flex flex-wrap items-center gap-1.5 px-4 py-3">
            <IssueProperty icon={<CircleIcon />}>Backlog</IssueProperty>

            <IssueProperty icon={<PriorityIcon />}>Priority</IssueProperty>

            <IssueProperty icon={<UserCircleIcon />}>Assignee</IssueProperty>

            <Popover>
              <PopoverTrigger>
                <IssueProperty icon={labelIcon}>{getLabelSummary(labels)}</IssueProperty>
              </PopoverTrigger>

              <PopoverContent>
                <LabelPicker value={labels} onValueChange={setLabels} />
              </PopoverContent>
            </Popover>
          </div>

          <footer className="border-border/40 flex h-[52px] items-center justify-end border-t px-4">
            <Button
              type="button"
              disabled={!title.trim()}
              onClick={handleSubmit}
              className="bg-primary font-medium text-white hover:bg-[#484cb5]"
            >
              Create issue
            </Button>
          </footer>
        </dialog>
      </div>
    </Modal>
  );
}
