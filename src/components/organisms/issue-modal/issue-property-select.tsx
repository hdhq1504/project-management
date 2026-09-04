import { useState, type ReactNode } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Select } from '@/components/atoms/select';
import { CheckIcon } from '@/components/atoms/icon/check-icon';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';
import type { IssueFields } from '@/schemas/issue.schema';

type IssuePropertyItem = {
  readonly id: string;
  readonly name: string;
  readonly shortcut: string;
};

type IssuePropertySelectProps<T extends IssuePropertyItem> = {
  name: keyof Pick<IssueFields, 'status' | 'priority'>;
  items: readonly T[];
  defaultValue: T['id'];
  placeholder: string;
  renderIcon: (item: T) => ReactNode;
};

export function IssuePropertySelect<T extends IssuePropertyItem>({
  name,
  items,
  defaultValue,
  placeholder,
  renderIcon
}: IssuePropertySelectProps<T>) {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext<IssueFields>();

  const {
    field: { value: rawValue, onChange }
  } = useController({ control, name });

  const currentValue = (rawValue as string | undefined) ?? defaultValue;
  const currentItem = items.find((item) => item.id === currentValue) ?? items[0];
  const label = currentValue === defaultValue ? placeholder : currentItem.name;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonIssueProperty icon={renderIcon(currentItem)}>{label}</ButtonIssueProperty>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[230px] p-0 shadow-xl">
        <div className="flex w-[230px] flex-col p-1.5 select-none">
          <Select
            items={items}
            value={currentValue}
            getValue={(item) => item.id}
            getShortcut={(item) => item.shortcut}
            onValueChange={(item) => {
              onChange(item.id);
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
