import type { ReactNode } from 'react';
import type { IssuePropertyItem } from '@/components/molecules/issue-property-select';
import { cn } from '@/libs/utils';
import { CheckIcon } from 'lucide-react';
import { Select } from '@/components/atoms/select';

type IssuePropertyOptionsProps<T extends IssuePropertyItem> = {
  items: readonly T[];
  value?: T['id'] | null;
  onValueChange: (value: T['id']) => void;

  onClear?: () => void;
  clearLabel?: string;
  clearShortcut?: string;

  renderIcon: (item: T) => ReactNode;
  fallbackIcon?: ReactNode;
};

function IssuePropertyOptions<T extends IssuePropertyItem>({
  items,
  value,
  onValueChange,
  onClear,
  clearLabel = 'Clear',
  clearShortcut,
  renderIcon,
  fallbackIcon
}: IssuePropertyOptionsProps<T>) {
  const isCleared = value === null;

  return (
    <div className="flex w-[230px] flex-col p-1.5 select-none">
      {onClear && (
        <button
          type="button"
          className={cn(
            'group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium transition-colors outline-none select-none',
            isCleared ? 'bg-muted/50 text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={onClear}
        >
          <div className="flex size-4 items-center justify-center">{fallbackIcon}</div>
          <span className={cn('flex-1 truncate', isCleared && 'text-foreground')}>{clearLabel}</span>
          <div className="flex items-center gap-2">
            {isCleared && <CheckIcon className="text-foreground size-3.5" />}
            {clearShortcut && <span className="text-muted-foreground/60 text-xs font-normal">{clearShortcut}</span>}
          </div>
        </button>
      )}
      <Select
        items={items}
        value={value ?? undefined}
        getValue={(item) => item.id}
        getShortcut={(item) => item.shortcut}
        onValueChange={(item) => onValueChange(item.id)}
        className="gap-0.5"
        renderItem={(item, { selected }) => (
          <>
            <div className="flex size-4 items-center justify-center">{renderIcon(item)}</div>
            <span className="text-foreground flex-1 truncate">{item.name}</span>
            <div className="flex items-center gap-2">
              {selected && <CheckIcon className="text-foreground size-3.5" />}
              {item.shortcut && <span className="text-muted-foreground/60 text-xs font-normal">{item.shortcut}</span>}
            </div>
          </>
        )}
      />
    </div>
  );
}

export { IssuePropertyOptions };
