import { cn } from '@/libs/utils';
import { type ComponentProps, type CSSProperties } from 'react';

export type IconProps = ComponentProps<'svg'> & {
  size?: CSSProperties['width'];
};

function Icon({
  size = 16,
  width,
  height,
  viewBox = '0 0 16 16',
  fill = 'currentColor',
  stroke = 'transparent',
  className,
  children,
  ...props
}: IconProps) {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      className={cn('shrink-0 transition-colors group-hover:text-[#EEEFFC] group-[.active]:text-[#EEEFFC]', className)}
      {...props}
    >
      {children}
    </svg>
  );
}

export { Icon };
