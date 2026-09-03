import { useCallback } from 'react';

export type UseLabelPickerProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  onValueChange?: (value: string[]) => void;
};

export function useLabelPicker({ value = [], onChange, onValueChange }: UseLabelPickerProps = {}) {
  const handleValueChange = useCallback(
    (val: string[]) => {
      onChange?.(val);
      onValueChange?.(val);
    },
    [onChange, onValueChange]
  );

  return {
    selectedLabels: value,
    handleValueChange
  };
}
