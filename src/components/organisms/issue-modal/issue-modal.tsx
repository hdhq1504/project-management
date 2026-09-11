import { useCallback } from 'react';
import { useIssueModalStore } from '@/stores/issue-modal.store';
import { Modal } from '@/components/organisms/modal';
import { useCurrentWorkspace } from '@/hooks/use-current-workspace';
import { useCreateIssue } from '@/hooks/use-create-issue';
import { IssueForm, type IssueFormProps, type WorkspaceState } from './issue-form';

export type IssueModalProps = Partial<Omit<IssueFormProps, 'onClose'>>;

function IssueModal({ onSubmit, isPending, ...rest }: IssueModalProps) {
  const isOpen = useIssueModalStore((state) => state.isOpen);
  const close = useIssueModalStore((state) => state.close);

  const { data: workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();
  const createIssueMutation = useCreateIssue(workspace?.id, workspace?.slug);

  const pending = isPending ?? createIssueMutation.isPending;
  const handleClose = useCallback(() => {
    if (!pending) close();
  }, [close, pending]);

  const handleSubmit =
    onSubmit ??
    (async (values) => {
      await createIssueMutation.mutateAsync(values);
    });

  const workspaceState: WorkspaceState = isWorkspaceLoading ? 'loading' : workspace ? 'ready' : 'unavailable';

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="new-issue-title">
      <IssueForm
        {...rest}
        workspaceSlug={workspace?.slug}
        workspaceId={workspace?.id}
        workspaceState={workspaceState}
        onSubmit={handleSubmit}
        isPending={pending}
        onClose={handleClose}
      />
    </Modal>
  );
}

export { IssueModal };
