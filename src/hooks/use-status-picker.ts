import { useCallback, type KeyboardEvent } from 'react';
import { ISSUE_STATUSES, type IssueStatus } from '@/constants/issue-status';

export type UseStatusPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onSelect?: () => void;
};

export function useStatusPicker({ value = 'backlog', onChange, onValueChange, onSelect }: UseStatusPickerProps = {}) {
  const handleSelect = useCallback(
    (status: IssueStatus) => {
      onChange?.(status.id);
      onValueChange?.(status.id);
      onSelect?.();
    },
    [onChange, onValueChange, onSelect]
  );

  const handleContentKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const status = ISSUE_STATUSES.find((s) => s.shortcut === e.key);
      if (status) {
        e.preventDefault();
        handleSelect(status);
      }
    },
    [handleSelect]
  );

  return {
    statuses: ISSUE_STATUSES,
    selectedStatus: value,
    handleSelect,
    handleContentKeyDown
  };
}
