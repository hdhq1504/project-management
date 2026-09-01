import type { ComponentProps } from 'react';
import { cn } from '@/libs/utils';

type ColorDotProps = ComponentProps<'span'> & {
  color?: string;
};

function ColorDot({ className, color, style, ...props }: ColorDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('size-2.5 shrink-0 rounded-full', className)}
      style={{ backgroundColor: color, ...style }}
      {...props}
    />
  );
}

export { ColorDot };
