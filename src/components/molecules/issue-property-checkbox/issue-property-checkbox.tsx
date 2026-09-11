import { useState, type ReactNode } from 'react';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';
import { IssuePropertyCheckboxMenu } from '@/components/molecules/issue-property-checkbox';

type CheckboxItem = {
  id: string;
  name: string;
};

type IssuePropertyCheckboxProps<T extends CheckboxItem> = {
  items: readonly T[];
  value: string[];
  onValueChange: (value: string[]) => void;
  renderIcon: (item: T) => ReactNode;
  renderTriggerIcon?: (selectedItems: T[]) => ReactNode;
  renderTrigger?: (selectedItems: T[]) => ReactNode;
  placeholder?: string;
};

function IssuePropertyCheckbox<T extends CheckboxItem>({
  items,
  value,
  onValueChange,
  renderIcon,
  renderTriggerIcon,
  renderTrigger,
  placeholder = 'Select'
}: IssuePropertyCheckboxProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedItems = value
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is T => item !== undefined);

  const summary =
    selectedItems.length === 0
      ? placeholder
      : selectedItems.length === 1
        ? selectedItems[0].name
        : `${selectedItems.length} ${placeholder.toLowerCase()}`;

  const triggerIcon = renderTriggerIcon?.(selectedItems);

  const trigger = renderTrigger ? (
    renderTrigger(selectedItems)
  ) : (
    <ButtonIssueProperty icon={triggerIcon}>{summary}</ButtonIssueProperty>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent align="start" className="w-[230px] p-0 shadow-xl" onOpenAutoFocus={(e) => e.preventDefault()}>
        <IssuePropertyCheckboxMenu items={items} value={value} onValueChange={onValueChange} renderIcon={renderIcon} />
      </PopoverContent>
    </Popover>
  );
}

export { IssuePropertyCheckbox };
