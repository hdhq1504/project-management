import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
  type RefObject
} from 'react';
import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/button';
import { useListNavigation, type ListNavigationItem } from '@/hooks/use-list-navigation';

type SelectItemRegistration = {
  value: string;
  disabled: boolean;
  ref: RefObject<HTMLButtonElement | null>;
};

type SelectContextValue = {
  value?: string;
  disabled?: boolean;
  highlightedValue?: string;
  selectValue: (value: string) => void;
  setHighlightedValue: (value?: string) => void;
  registerItem: (registration: SelectItemRegistration) => void;
  unregisterItem: (value: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const select = useContext(SelectContext);
  if (!select) throw new Error('SelectItem must be used within a Select');
  return select;
}

export type SelectProps = Omit<ComponentProps<'div'>, 'value' | 'defaultValue' | 'onChange'> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  disabled?: boolean;
  loop?: boolean;
  children: ReactNode;
};

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  onKeyDown,
  disabled = false,
  loop = true,
  children,
  className,
  ...props
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [highlightedValue, setHighlightedValue] = useState<string>();
  const [items, setItems] = useState<SelectItemRegistration[]>([]);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  function selectValue(nextValue: string) {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  const registerItem = useCallback((registration: SelectItemRegistration) => {
    setItems((prev) => {
      if (prev.some((item) => item.value === registration.value)) return prev;
      return [...prev, registration];
    });
  }, []);

  const unregisterItem = useCallback((itemValue: string) => {
    setItems((prev) => prev.filter((item) => item.value !== itemValue));
  }, []);

  const navigationItems: ListNavigationItem[] = items.map((item) => ({
    value: item.value,
    disabled: item.disabled
  }));

  const { handleKeyDown: handleListKeyDown } = useListNavigation({
    items: navigationItems,
    activeValue: highlightedValue,
    onActiveValueChange: setHighlightedValue,
    onSelect: selectValue,
    loop
  });

  useEffect(() => {
    if (!highlightedValue) return;
    const item = items.find((i) => i.value === highlightedValue);
    item?.ref.current?.focus();
  }, [highlightedValue, items]);

  function handleKeyDown(e: KeyboardEvent) {
    handleListKeyDown(e);
    onKeyDown?.(e);
  }

  useEffect(() => {
    if (items.length > 0 && highlightedValue === undefined) {
      const enabledItems = items.filter((item) => !item.disabled);
      if (enabledItems.length > 0) {
        setHighlightedValue(enabledItems[0].value);
      }
    }
  }, [items, highlightedValue]);

  return (
    <SelectContext.Provider
      value={{
        value,
        disabled,
        highlightedValue,
        selectValue,
        setHighlightedValue,
        registerItem,
        unregisterItem
      }}
    >
      <div
        role="listbox"
        tabIndex={-1}
        data-slot="select"
        data-disabled={disabled || undefined}
        onKeyDown={handleKeyDown}
        className={cn('flex flex-col outline-none', className)}
        {...props}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export type SelectItemRenderProps = {
  selected: boolean;
  highlighted: boolean;
  disabled: boolean;
};

export type SelectItemProps = Omit<ComponentProps<'button'>, 'value' | 'children'> & {
  value: string;
  disabled?: boolean;
  children: ReactNode | ((state: SelectItemRenderProps) => ReactNode);
};

export function SelectItem({
  value: itemValue,
  disabled = false,
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: SelectItemProps) {
  const {
    value,
    highlightedValue,
    selectValue,
    setHighlightedValue,
    disabled: groupDisabled,
    registerItem,
    unregisterItem
  } = useSelectContext();

  const itemRef = useRef<HTMLButtonElement>(null);
  const isDisabled = groupDisabled || disabled;
  const selected = value === itemValue;
  const highlighted = highlightedValue === itemValue;
  const content = typeof children === 'function' ? children({ selected, highlighted, disabled: isDisabled }) : children;

  useEffect(() => {
    registerItem({ value: itemValue, disabled: isDisabled, ref: itemRef });
    return () => unregisterItem(itemValue);
  }, [itemValue, isDisabled, registerItem, unregisterItem]);

  return (
    <Button
      type="button"
      role="option"
      ref={itemRef}
      variant="ghost"
      aria-selected={selected}
      data-selected={selected || undefined}
      data-highlighted={highlighted || undefined}
      disabled={isDisabled}
      tabIndex={highlighted ? 0 : -1}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (!isDisabled) setHighlightedValue(itemValue);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!isDisabled) selectValue(itemValue);
      }}
      className={cn(
        'group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium transition-colors select-none',
        'hover:bg-muted/70 focus:bg-muted/70 outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        selected && 'bg-muted/50 text-foreground',
        className
      )}
      {...props}
    >
      {content}
    </Button>
  );
}
