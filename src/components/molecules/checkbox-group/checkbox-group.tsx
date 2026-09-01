import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';
import { Checkbox, type CheckboxProps } from '@/components/atoms/checkbox';
import { Label } from '@/components/atoms/label';
import { cn } from '@/libs/utils';

type CheckboxGroupContextValue = {
  value: string[];
  disabled?: boolean;
  name?: string;
  setItemChecked: (itemValue: string, checked: boolean) => void;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

type CheckboxGroupProps = Omit<ComponentProps<'div'>, 'defaultValue' | 'onChange'> & {
  value: string[];
  onValueChange: (value: string[]) => void;
  disabled?: boolean;
  name?: string;
};

function CheckboxGroup({ value, onValueChange, disabled, name, children, className, ...props }: CheckboxGroupProps) {
  function setItemChecked(itemValue: string, checked: boolean) {
    if (checked) {
      if (!value.includes(itemValue)) {
        onValueChange([...value, itemValue]);
      }
      return;
    }

    onValueChange(value.filter((curr) => curr !== itemValue));
  }

  return (
    <CheckboxGroupContext.Provider value={{ value, disabled, name, setItemChecked }}>
      <div
        role="group"
        data-slot="checkbox-group"
        data-disabled={disabled || undefined}
        className={className}
        {...props}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

export type CheckboxGroupItemProps = Omit<
  CheckboxProps,
  'type' | 'name' | 'value' | 'checked' | 'defaultChecked' | 'onChange' | 'className'
> & {
  value: string;
  children?: ReactNode;
  className?: string;
  checkboxClassName?: string;
};

function CheckboxGroupItem({
  value: itemValue,
  children,
  disabled,
  className,
  checkboxClassName,
  ...props
}: CheckboxGroupItemProps) {
  const group = useContext(CheckboxGroupContext);

  if (!group) throw new Error('CheckboxGroupItem must be used within a CheckboxGroup');

  const checked = group.value.includes(itemValue);
  const isDisabled = group.disabled || disabled;

  return (
    <Label
      data-disabled={isDisabled || undefined}
      className={cn(
        'group/item flex min-h-8 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors select-none font-normal',
        'focus-within:bg-muted hover:bg-muted',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className
      )}
    >
      <Checkbox
        {...props}
        name={group.name}
        value={itemValue}
        checked={checked}
        disabled={isDisabled}
        className={checkboxClassName}
        onChange={(e) => group.setItemChecked(itemValue, e.target.checked)}
      />
      {children}
    </Label>
  );
}

export { CheckboxGroup, CheckboxGroupItem };
