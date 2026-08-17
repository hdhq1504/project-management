import * as React from 'react';

import { cn } from '@/libs/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  endAdornment?: React.ReactNode;
  containerClassName?: string;
}

function Input({ className, containerClassName, endAdornment, type, ...props }: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
        endAdornment && 'pr-10',
        className
      )}
      {...props}
    />
  );

  if (!endAdornment) return input;

  return (
    <div data-slot="input-container" className={cn('relative w-full', containerClassName)}>
      {input}
      <div data-slot="input-end-adornment" className="absolute inset-y-0 right-0 flex items-center">
        {endAdornment}
      </div>
    </div>
  );
}

export { Input };
