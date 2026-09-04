import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/button';
import { useListNavigation, type ListNavigationItem } from '@/hooks/use-list-navigation';

export type SelectItemState = {
  selected: boolean;
  highlighted: boolean;
};

export type SelectProps<T> = {
  items: readonly T[];
  value?: string;
  getValue: (item: T) => string;
  getShortcut?: (item: T) => string;
  onValueChange?: (item: T) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  disabled?: boolean;
  loop?: boolean;
  renderItem: (item: T, state: SelectItemState) => ReactNode;
  className?: string;
};

export function Select<T>({
  items,
  value,
  getValue,
  getShortcut,
  onValueChange,
  onKeyDown,
  disabled = false,
  loop = true,
  renderItem,
  className
}: SelectProps<T>) {
  const [highlightedValue, setHighlightedValue] = useState<string | undefined>(undefined);
  const itemRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const navigationItems: ListNavigationItem[] = items.map((item) => ({
    value: getValue(item),
    disabled: false
  }));

  const { handleKeyDown: handleListKeyDown } = useListNavigation({
    items: navigationItems,
    activeValue: highlightedValue,
    onActiveValueChange: setHighlightedValue,
    onSelect: (val) => {
      const item = items.find((i) => getValue(i) === val);
      if (item) onValueChange?.(item);
    },
    loop
  });

  useEffect(() => {
    if (!highlightedValue) return;
    const el = itemRefs.current.get(highlightedValue);
    el?.focus();
  }, [highlightedValue]);

  useEffect(() => {
    if (items.length > 0 && highlightedValue === undefined) {
      setHighlightedValue(getValue(items[0]));
    }
  }, [items, highlightedValue, getValue]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (getShortcut) {
        const match = items.find((item) => getShortcut(item) === e.key);
        if (match) {
          e.preventDefault();
          onValueChange?.(match);
          return;
        }
      }
      handleListKeyDown(e);
      onKeyDown?.(e);
    },
    [items, getShortcut, onValueChange, handleListKeyDown, onKeyDown]
  );

  return (
    <div
      role="listbox"
      tabIndex={-1}
      data-slot="select"
      data-disabled={disabled || undefined}
      onKeyDown={handleKeyDown}
      className={cn('flex flex-col outline-none', className)}
    >
      {items.map((item) => {
        const itemValue = getValue(item);
        const selected = value === itemValue;
        const highlighted = highlightedValue === itemValue;

        return (
          <Button
            key={itemValue}
            type="button"
            role="option"
            ref={(el) => {
              itemRefs.current.set(itemValue, el);
            }}
            variant="ghost"
            aria-selected={selected}
            data-selected={selected || undefined}
            data-highlighted={highlighted || undefined}
            disabled={disabled}
            tabIndex={highlighted ? 0 : -1}
            onMouseEnter={() => {
              if (!disabled) setHighlightedValue(itemValue);
            }}
            onClick={() => {
              if (!disabled) onValueChange?.(item);
            }}
            className={cn(
              'group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium transition-colors select-none',
              'hover:bg-muted/70 focus:bg-muted/70 outline-none',
              'disabled:pointer-events-none disabled:opacity-50',
              selected && 'bg-muted/50 text-foreground'
            )}
          >
            {renderItem(item, { selected, highlighted })}
          </Button>
        );
      })}
    </div>
  );
}
