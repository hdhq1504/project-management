import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/atoms/button';
import { Textarea } from '@/components/atoms/textarea';
import { ModalHeader, ModalContent, ModalFooter } from '@/components/organisms/modal';
import { Form, FormItem } from '@/components/molecules/form';
import { IssueModalHeader } from './issue-modal-header';
import { IssueProperties } from './issue-properties';
import { issueSchema, type IssueFields } from '@/schemas/issue.schema';

export type IssueFormProps = {
  onClose?: () => void;
  onSubmit?: (values: IssueFields) => void;
  isPending?: boolean;
};

export function IssueForm({ onClose, onSubmit, isPending = false }: IssueFormProps) {
  const form = useForm<IssueFields>({
    resolver: zodResolver(issueSchema),
    defaultValues: { title: '', description: '', status: 'backlog', priority: 'no_priority', labels: [] }
  });

  const { reset } = form;

  const handleClose = useCallback(() => {
    reset();
    onClose?.();
  }, [onClose, reset]);

  const handleFinish = (values: IssueFields) => {
    console.log(values);
    onSubmit?.(values);
    handleClose();
  };

  return (
    <>
      <ModalHeader>
        <IssueModalHeader onClose={handleClose} />
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
        </ModalContent>

        <IssueProperties />

        <ModalFooter>
          <Button type="submit" disabled={isPending} className="bg-primary font-medium text-white hover:bg-[#484cb5]">
            {isPending ? 'Creating...' : 'Create issue'}
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
}

export default IssueForm;
