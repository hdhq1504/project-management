import type { ReactNode } from 'react';

export type SidebarSectionProps = {
  title?: string;
  children: ReactNode;
};

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {title && <div className="text-muted-foreground/70 px-2 py-1 text-[13px] tracking-wider">{title}</div>}
      {children}
    </div>
  );
}
