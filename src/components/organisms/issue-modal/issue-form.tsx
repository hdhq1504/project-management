import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/atoms/button';
import { Textarea } from '@/components/atoms/textarea';
import { ModalHeader, ModalContent, ModalFooter } from '@/components/organisms/modal';
import { Form, FormItem } from '@/components/molecules/form';
import { IssueModalHeader } from './issue-modal-header';
import { IssueProperties } from './issue-properties';
import { issueSchema, type IssueFields } from '@/schemas/issue.schema';
import { useIssueModalStore } from '@/stores/issue-modal.store';

export type WorkspaceState = 'loading' | 'ready' | 'unavailable';

export type IssueFormProps = {
  onClose?: () => void;
  onSubmit?: (values: IssueFields) => Promise<void> | void;
  isPending?: boolean;
  workspaceState?: WorkspaceState;
  workspaceSlug?: string;
  workspaceId?: string;
};

const DEFAULT_VALUES: IssueFields = {
  title: '',
  description: '',
  status: 'backlog',
  priority: 'no_priority',
  labelIds: [],
  assigneeId: null
};

function getSubmissionErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Không thể tạo issue. Vui lòng thử lại.';
}

function IssueForm({
  onClose,
  onSubmit,
  isPending = false,
  workspaceState = 'ready',
  workspaceSlug,
  workspaceId
}: IssueFormProps) {
  const storeDefaults = useIssueModalStore((state) => state.defaultValues);
  const [submissionError, setSubmissionError] = useState<string>();

  const form = useForm<IssueFields>({
    resolver: zodResolver(issueSchema),
    defaultValues: { ...DEFAULT_VALUES, ...storeDefaults }
  });

  const { reset } = form;

  useEffect(() => {
    reset({ ...DEFAULT_VALUES, ...storeDefaults });
    setSubmissionError(undefined);
  }, [storeDefaults, reset]);

  const handleClose = useCallback(
    (force = false) => {
      if (isPending && !force) return;

      setSubmissionError(undefined);
      reset();
      onClose?.();
    },
    [isPending, onClose, reset]
  );

  const handleFinish = async (values: IssueFields) => {
    if (!onSubmit) return;

    setSubmissionError(undefined);

    try {
      await onSubmit(values);
      handleClose(true);
    } catch (error) {
      setSubmissionError(getSubmissionErrorMessage(error));
    }
  };

  const title = form.watch('title');
  const isSubmitDisabled = isPending || workspaceState !== 'ready' || !title?.trim();

  return (
    <>
      <ModalHeader>
        <IssueModalHeader onClose={handleClose} workspaceSlug={workspaceSlug} />
      </ModalHeader>

      <Form form={form} onFinish={handleFinish} className="contents">
        <ModalContent>
          <FormItem<IssueFields> name="title">
            <input
              data-autofocus
              placeholder="Issue title"
              className="placeholder:text-muted-foreground/50 text-foreground w-full border-none bg-transparent text-lg font-medium outline-none"
            />
          </FormItem>

          <FormItem<IssueFields> name="description">
            <Textarea
              placeholder="Add description..."
              className="placeholder:text-muted-foreground/50 min-h-24 resize-none border-none p-0 text-sm shadow-none focus-visible:ring-0"
            />
          </FormItem>

          {submissionError && (
            <p role="alert" className="text-destructive text-sm">
              {submissionError}
            </p>
          )}
        </ModalContent>

        <IssueProperties workspaceId={workspaceId} />

        <ModalFooter>
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-primary font-medium text-white hover:bg-[#484cb5]"
          >
            {isPending ? 'Creating...' : 'Create issue'}
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
}

export { IssueForm };
