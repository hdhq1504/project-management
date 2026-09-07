import { useState, type ReactNode } from 'react';
import { Select } from '@/components/atoms/select';
import { CheckIcon } from '@/components/atoms/icon/check-icon';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';

// Fix #4: readonly properties — constants are immutable, component should not require mutable items
type IssuePropertyItem = {
  readonly id: string;
  readonly name: string;
  readonly shortcut: string;
};

type IssuePropertySelectProps<T extends IssuePropertyItem> = {
  items: readonly T[];
  value: T['id'];
  onValueChange: (value: T['id']) => void;
  renderIcon: (item: T) => ReactNode;
  renderTrigger?: (item: T) => ReactNode;
  placeholder?: string;
};

function IssuePropertySelect<T extends IssuePropertyItem>({
  items,
  value,
  onValueChange,
  renderIcon,
  renderTrigger,
  placeholder
}: IssuePropertySelectProps<T>) {
  const [open, setOpen] = useState(false);
  const currentItem = items.find((item) => item.id === value) ?? items[0];
  if (!currentItem) return null;

  const label = currentItem.name ?? placeholder;
  const trigger = renderTrigger ? (
    renderTrigger(currentItem)
  ) : (
    <ButtonIssueProperty icon={renderIcon(currentItem)}>{label}</ButtonIssueProperty>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent align="start" className="w-[230px] p-0 shadow-xl">
        <div className="flex w-[230px] flex-col p-1.5 select-none">
          <Select
            items={items}
            value={value}
            getValue={(item) => item.id}
            getShortcut={(item) => item.shortcut}
            onValueChange={(item) => {
              onValueChange(item.id as T['id']);
              setOpen(false);
            }}
            className="gap-0.5"
            renderItem={(item, { selected }) => (
              <>
                {renderIcon(item)}
                <span className="text-foreground flex-1 truncate">{item.name}</span>
                <div className="flex items-center gap-2">
                  {selected && <CheckIcon className="text-foreground size-3.5" />}
                  <span className="text-muted-foreground/60 text-xs font-normal">{item.shortcut}</span>
                </div>
              </>
            )}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { IssuePropertySelect };
