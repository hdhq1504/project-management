import { useState, type ReactNode } from 'react';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/molecules/checkbox-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';

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
  renderItem?: (item: T) => ReactNode;
  placeholder?: string;
};

function IssuePropertyCheckbox<T extends CheckboxItem>({
  items,
  value,
  onValueChange,
  renderIcon,
  renderTriggerIcon,
  renderTrigger,
  renderItem,
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
        <div className="flex w-[230px] flex-col select-none">
          <CheckboxGroup
            name={placeholder.toLowerCase()}
            value={value}
            onValueChange={onValueChange}
            aria-label={placeholder}
            className="flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1.5"
          >
            {items.map((item) => (
              <CheckboxGroupItem key={item.id} value={item.id}>
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <>
                    {renderIcon(item)}
                    <span className="text-foreground min-w-0 truncate text-[13px] font-medium">{item.name}</span>
                  </>
                )}
              </CheckboxGroupItem>
            ))}
          </CheckboxGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { IssuePropertyCheckbox };
