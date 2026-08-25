import type { NavigationItem } from './sidebar-data';
import { SidebarItem } from './sidebar-item';

interface SidebarNavigationProps {
  items: NavigationItem[];
  className?: string;
}

export function SidebarNavigation({ items, className }: SidebarNavigationProps) {
  return (
    <nav className={className ?? 'flex flex-col space-y-0.5'}>
      {items.map((item) => (
        <SidebarItem key={item.id} item={item} />
      ))}
    </nav>
  );
}
