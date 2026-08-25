import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/libs/utils';

export type InputGroupProps = ComponentProps<'div'> & {
  addon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

function InputGroup({ addon, prefix, suffix, children, className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        'border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40 dark:has-disabled:bg-input/80 has-disabled:bg-input/50 relative flex h-8 w-full min-w-0 items-center rounded-lg border bg-transparent transition-colors focus-within:ring-3 has-disabled:pointer-events-none has-disabled:opacity-50 has-aria-invalid:ring-3',
        className
      )}
      {...props}
    >
      {addon && (
        <div data-slot="input-group-addon" className="text-muted-foreground flex shrink-0 items-center pl-2.5">
          {addon}
        </div>
      )}

      {prefix && (
        <div data-slot="input-group-prefix" className="absolute inset-y-0 left-1 flex items-center">
          {prefix}
        </div>
      )}

      <div className="min-w-0 flex-1">{children}</div>

      {suffix && (
        <div data-slot="input-group-suffix" className="absolute inset-y-0 right-1 flex items-center">
          {suffix}
        </div>
      )}
    </div>
  );
}

export { InputGroup };
