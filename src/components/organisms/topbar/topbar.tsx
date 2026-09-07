import { cn } from '@/libs/utils';

export type TopbarProps = {
  className?: string;
};

export function Topbar({ className }: TopbarProps) {
  return (
    <header
      className={cn(
        'border-border/80 bg-background/90 sticky top-0 z-20 flex h-14 items-center justify-between border-b px-6 backdrop-blur-md select-none',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* TODO: Dùng Render Props */}
        <h1 className="text-foreground text-base font-semibold tracking-tight">All Issues</h1>
      </div>
    </header>
  );
}

export default Topbar;
