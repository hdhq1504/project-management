import type { ComponentProps } from 'react';
import { useId } from 'react';
import { cn } from '@/libs/utils';
import { CheckIcon } from '@/components/atoms/icon/check-icon';

export type CheckboxProps = Omit<ComponentProps<'input'>, 'type'>;

function Checkbox({ className, id, checked, ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <span className="group relative inline-flex size-4 shrink-0 align-middle">
      <input
        id={checkboxId}
        type="checkbox"
        data-slot="checkbox"
        checked={checked}
        className={cn(
          'peer absolute inset-0 size-full cursor-pointer opacity-0',
          'disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      <span
        className={cn(
          'border-primary/40 bg-background pointer-events-none flex size-4 items-center justify-center rounded-sm border transition-colors',
          checked && 'border-primary bg-primary text-primary-foreground',
          'peer-focus-visible:ring-ring/50 peer-focus-visible:ring-3 peer-focus-visible:outline-none',
          'peer-disabled:opacity-50'
        )}
      >
        {checked && <CheckIcon className="size-3 text-white" />}
      </span>
    </span>
  );
}

export { Checkbox };
