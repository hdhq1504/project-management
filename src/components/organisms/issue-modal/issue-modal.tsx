import { useIssueModalStore } from '@/stores/issue-modal.store';
import { Modal } from '@/components/organisms/modal';
import { IssueForm, type IssueFormProps } from './issue-form';

export type IssueModalProps = Omit<IssueFormProps, 'onClose'>;

export function IssueModal(props: IssueModalProps) {
  const isOpen = useIssueModalStore((state) => state.isOpen);
  const close = useIssueModalStore((state) => state.close);

  return (
    <Modal open={isOpen} onClose={close} aria-labelledby="new-issue-title">
      <IssueForm {...props} onClose={close} />
    </Modal>
  );
}

export default IssueModal;
