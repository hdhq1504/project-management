import { useCallback, type KeyboardEvent } from 'react';
import { ISSUE_PRIORITIES, type IssuePriority } from '@/constants/issue-priority';

export type UsePriorityPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onSelect?: () => void;
};

export function usePriorityPicker({
  value = 'no_priority',
  onChange,
  onValueChange,
  onSelect
}: UsePriorityPickerProps = {}) {
  const handleSelect = useCallback(
    (priority: IssuePriority) => {
      onChange?.(priority.id);
      onValueChange?.(priority.id);
      onSelect?.();
    },
    [onChange, onValueChange, onSelect]
  );

  const handleContentKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const priority = ISSUE_PRIORITIES.find((p) => p.shortcut === e.key);
      if (priority) {
        e.preventDefault();
        handleSelect(priority);
      }
    },
    [handleSelect]
  );

  return {
    priorities: ISSUE_PRIORITIES,
    selectedPriority: value,
    handleSelect,
    handleContentKeyDown
  };
}
