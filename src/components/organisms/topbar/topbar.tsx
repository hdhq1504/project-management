import { cn } from '@/libs/utils';

export type TopbarProps = {
  title: string;
  className?: string;
};

function Topbar({ title, className }: TopbarProps) {
  return (
    <header
      className={cn(
        'border-border/80 bg-background/90 sticky top-0 z-20 flex h-14 items-center justify-between border-b px-6 backdrop-blur-md select-none',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-foreground text-base font-semibold tracking-tight">{title}</h1>
      </div>
    </header>
  );
}

export { Topbar };
