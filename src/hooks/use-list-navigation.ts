import { useCallback, type KeyboardEvent } from 'react';

export type ListNavigationItem = {
  value: string;
  disabled: boolean;
};

export type UseListNavigationProps = {
  items: ListNavigationItem[];
  activeValue?: string;
  onActiveValueChange: (value?: string) => void;
  onSelect: (value: string) => void;
  loop?: boolean;
};

export function useListNavigation({
  items,
  activeValue,
  onActiveValueChange,
  onSelect,
  loop = true
}: UseListNavigationProps) {
  const getEnabledItems = useCallback(() => items.filter((item) => !item.disabled), [items]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const enabledItems = getEnabledItems();
      if (enabledItems.length === 0) return;

      const currentIndex = enabledItems.findIndex((item) => item.value === activeValue);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          let nextIndex: number;
          if (currentIndex === -1) {
            nextIndex = 0;
          } else if (currentIndex >= enabledItems.length - 1) {
            nextIndex = loop ? 0 : currentIndex;
          } else {
            nextIndex = currentIndex + 1;
          }
          onActiveValueChange(enabledItems[nextIndex].value);
          break;
        }

        case 'ArrowUp': {
          e.preventDefault();
          let prevIndex: number;
          if (currentIndex === -1) {
            prevIndex = enabledItems.length - 1;
          } else if (currentIndex <= 0) {
            prevIndex = loop ? enabledItems.length - 1 : currentIndex;
          } else {
            prevIndex = currentIndex - 1;
          }
          onActiveValueChange(enabledItems[prevIndex].value);
          break;
        }

        case 'Home': {
          e.preventDefault();
          onActiveValueChange(enabledItems[0].value);
          break;
        }

        case 'End': {
          e.preventDefault();
          onActiveValueChange(enabledItems[enabledItems.length - 1].value);
          break;
        }

        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (activeValue) {
            onSelect(activeValue);
          }
          break;
        }
      }
    },
    [items, activeValue, onActiveValueChange, onSelect, loop, getEnabledItems]
  );

  return { handleKeyDown };
}
