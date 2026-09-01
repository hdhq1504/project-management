import { SidebarHeader } from './sidebar-header';
import { SidebarContent } from './sidebar-content';
import { SidebarFooter } from './sidebar-footer';
import { cn } from '@/libs/utils';
import type { ComponentProps } from 'react';

export type AppSidebarProps = ComponentProps<'div'>;

export function AppSidebar({ className, ...props }: AppSidebarProps) {
  return (
    <div className={cn('flex h-full flex-col gap-4 px-4 py-3', className)} {...props}>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </div>
  );
}

export default AppSidebar;
