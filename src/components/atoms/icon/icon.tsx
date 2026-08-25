import * as React from 'react';

import { cn } from '@/libs/utils';

export interface IconProps extends React.ComponentProps<'svg'> {
  size?: number | string;
}

function Icon({
  size = 16,
  width,
  height,
  className,
  children,
  fill = 'none',
  xmlns = 'http://www.w3.org/2000/svg',
  ...props
}: IconProps) {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      fill={fill}
      xmlns={xmlns}
      className={cn('text-[#858699] shrink-0', className)}
      {...props}
    >
      {children}
    </svg>
  );
}

export { Icon };
