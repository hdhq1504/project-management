import { cn } from '@/libs/utils';
import { SidebarItem, type SidebarItemProps } from './sidebar-item';

export type SidebarNavigationProps = {
  items: SidebarItemProps['item'][];
  className?: string;
};

export function SidebarNavigation({ items, className }: SidebarNavigationProps) {
  return (
    <nav className={cn('flex flex-col space-y-0.5', className)}>
      {items.map((item) => (
        <SidebarItem key={item.id} item={item} />
      ))}
    </nav>
  );
}
