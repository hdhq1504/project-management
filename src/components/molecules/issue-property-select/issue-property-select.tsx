import { useState, type ReactNode } from 'react';
import { cn } from '@/libs/utils';
import { Select } from '@/components/atoms/select';
import { CheckIcon } from '@/components/atoms/icon/check-icon';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';

type IssuePropertyItem = {
  readonly id: string;
  readonly name: string;
  readonly shortcut?: string;
};

type IssuePropertySelectProps<T extends IssuePropertyItem> = {
  items: readonly T[];
  value?: T['id'] | null;
  onValueChange: (value: T['id']) => void;
  onClear?: () => void;
  renderIcon: (item: T) => ReactNode;
  renderTrigger?: (item?: T) => ReactNode;
  placeholder?: string;
  fallbackIcon?: ReactNode;
};

function IssuePropertySelect<T extends IssuePropertyItem>({
  items,
  value,
  onValueChange,
  onClear,
  renderIcon,
  renderTrigger,
  placeholder,
  fallbackIcon
}: IssuePropertySelectProps<T>) {
  const [open, setOpen] = useState(false);
  const currentItem = items.find((item) => item.id === value);

  const label = currentItem?.name ?? placeholder;
  const trigger = renderTrigger ? (
    renderTrigger(currentItem)
  ) : (
    <ButtonIssueProperty icon={currentItem ? renderIcon(currentItem) : fallbackIcon}>{label}</ButtonIssueProperty>
  );

  const isCleared = value === null || value === undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[230px] p-0 shadow-xl"
        onKeyDown={(e) => {
          if (onClear && e.key === '0') {
            e.preventDefault();
            onClear();
            setOpen(false);
          }
        }}
      >
        <div className="flex w-[230px] flex-col p-1.5 select-none">
          {onClear && (
            <button
              type="button"
              className={cn(
                'group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium transition-colors outline-none select-none',
                'hover:bg-muted/70 focus:bg-muted/70',
                isCleared ? 'bg-muted/50 text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => {
                onClear();
                setOpen(false);
              }}
            >
              <div className="flex size-4 items-center justify-center">{fallbackIcon}</div>
              <span className={cn('flex-1 truncate', isCleared && 'text-foreground')}>Unassigned</span>
              <div className="flex items-center gap-2">
                {isCleared && <CheckIcon className="text-foreground size-3.5" />}
                <span className="text-muted-foreground/60 text-xs font-normal">0</span>
              </div>
            </button>
          )}
          <Select
            items={items}
            value={value ?? undefined}
            getValue={(item) => item.id}
            getShortcut={(item) => item.shortcut}
            onValueChange={(item) => {
              onValueChange(item.id as T['id']);
              setOpen(false);
            }}
            className="gap-0.5"
            renderItem={(item, { selected }) => (
              <>
                <div className="flex size-4 items-center justify-center">{renderIcon(item)}</div>
                <span className="text-foreground flex-1 truncate">{item.name}</span>
                <div className="flex items-center gap-2">
                  {selected && <CheckIcon className="text-foreground size-3.5" />}
                  {item.shortcut && (
                    <span className="text-muted-foreground/60 text-xs font-normal">{item.shortcut}</span>
                  )}
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
