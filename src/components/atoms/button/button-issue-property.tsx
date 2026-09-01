import type { ComponentProps, ReactNode } from 'react';
import { Button } from '@/components/atoms/button/button';
import { cn } from '@/libs/utils';

type ButtonIssuePropertyProps = Omit<ComponentProps<typeof Button>, 'children'> & {
  icon?: ReactNode;
  children?: ReactNode;
};

function ButtonIssueProperty({ icon, children, className, ...props }: ButtonIssuePropertyProps) {
  return (
    <Button
      {...props}
      type="button"
      variant="secondary"
      className={cn(
        'gap-1.5 rounded-md px-2.5 text-xs font-medium select-none',
        'border-border/40 bg-muted/50 text-muted-foreground border',
        'hover:border-border hover:bg-muted hover:text-foreground',
        'aria-expanded:border-border aria-expanded:bg-muted aria-expanded:text-foreground',
        className
      )}
    >
      {icon}
      {children}
    </Button>
  );
}

export { ButtonIssueProperty };
