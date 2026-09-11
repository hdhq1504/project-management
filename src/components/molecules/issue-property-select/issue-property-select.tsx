import { useState, type ReactNode } from 'react';
import { cn } from '@/libs/utils';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';
import { IssuePropertyOptions } from '@/components/molecules/issue-property-select/issue-property-options';

export type IssuePropertyItem = {
  readonly id: string;
  readonly name: string;
  readonly shortcut?: string;
};

export type IssuePropertyTriggerState<T> = {
  item: T | null;
  isCleared: boolean;
  isInvalid: boolean;
};

export type IssuePropertySelectProps<T extends IssuePropertyItem> = {
  items: readonly T[];
  value?: T['id'] | null;
  onValueChange: (value: T['id']) => void;
  onClear?: () => void;
  clearLabel?: string;
  clearShortcut?: string;
  invalidLabel?: string;
  renderIcon: (item: T) => ReactNode;
  renderTrigger?: (state: IssuePropertyTriggerState<T>) => ReactNode;
  placeholder?: string;
  fallbackIcon?: ReactNode;
};

function IssuePropertySelect<T extends IssuePropertyItem>({
  items,
  value,
  onValueChange,
  onClear,
  clearLabel = 'Clear',
  clearShortcut,
  invalidLabel = 'Unknown item',
  renderIcon,
  renderTrigger,
  placeholder,
  fallbackIcon
}: IssuePropertySelectProps<T>) {
  const [open, setOpen] = useState(false);
  const currentItem = items.find((item) => item.id === value) ?? null;
  const isCleared = value == null;
  const isInvalid = value != null && currentItem == null;

  const triggerState: IssuePropertyTriggerState<T> = {
    item: currentItem,
    isCleared,
    isInvalid
  };

  const label = isInvalid ? invalidLabel : (currentItem?.name ?? placeholder);
  const trigger = renderTrigger ? (
    renderTrigger(triggerState)
  ) : (
    <ButtonIssueProperty
      icon={currentItem ? renderIcon(currentItem) : fallbackIcon}
      className={cn(isInvalid && 'text-muted-foreground/80 italic')}
    >
      {label}
    </ButtonIssueProperty>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[230px] p-0 shadow-xl"
        onKeyDown={(e) => {
          if (onClear && clearShortcut && e.key === clearShortcut) {
            e.preventDefault();
            onClear();
            setOpen(false);
          }
        }}
      >
        <IssuePropertyOptions
          items={items}
          value={value}
          onValueChange={(value) => {
            onValueChange(value);
            setOpen(false);
          }}
          onClear={
            onClear
              ? () => {
                  onClear();
                  setOpen(false);
                }
              : undefined
          }
          clearLabel={clearLabel}
          clearShortcut={clearShortcut}
          renderIcon={renderIcon}
          fallbackIcon={fallbackIcon}
        />
      </PopoverContent>
    </Popover>
  );
}

export { IssuePropertySelect };
