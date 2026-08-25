import { useState } from 'react';
import { NavLink } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/libs/utils';
import type { NavigationItem } from './sidebar-data';

type SidebarItemProps = {
  item: NavigationItem;
  level?: number;
};

export function SidebarItem({ item, level = 0 }: SidebarItemProps) {
  const [isOpen, setIsOpen] = useState(item.defaultOpen ?? false);
  const Icon = item.icon;
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const baseItemClasses = cn(
    'group flex h-8 w-full items-center gap-2 rounded-md px-2 text-[13px] font-medium transition-colors select-none',
    'text-muted-foreground hover:bg-muted hover:text-foreground'
  );

  const iconClasses = 'size-4 shrink-0 transition-colors group-hover:text-[#EEEFFC] group-[.active]:text-[#EEEFFC]';

  // 1. Trường hợp có children -> Là Button Toggle (Collapse/Expand)
  if (hasChildren) {
    return (
      <div className="flex flex-col">
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} className={baseItemClasses}>
          {Icon && <Icon className={iconClasses} />}
          <span className="flex-1 truncate text-left">{item.label}</span>

          <ChevronRight
            className={cn(
              'text-muted-foreground/70 size-3.5 shrink-0 transition-transform duration-150',
              isOpen && 'text-foreground rotate-90'
            )}
          />
        </button>

        {isOpen && item.children && (
          <div className="relative mt-0.5 flex flex-col space-y-0.5 pl-3">
            {/* Đường line thụt đầu dòng kiểu Linear */}
            <div className="bg-border absolute top-0 bottom-0 left-2 w-px" />
            {item.children.map((child) => (
              <SidebarItem key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // 2. Trường hợp là Router Link -> Dùng NavLink
  if (item.href) {
    return (
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          cn(baseItemClasses, isActive && 'active text-foreground bg-[#858698]/20 font-medium')
        }
      >
        {Icon && <Icon className={iconClasses} />}
        <span className="flex-1 truncate text-left">{item.label}</span>
        {item.badge !== undefined && (
          <span className="text-muted-foreground rounded bg-[#858698] px-1.5 py-0.5 text-[11px]">{item.badge}</span>
        )}
      </NavLink>
    );
  }

  // 3. Trường hợp thuần button thông thường
  return (
    <button type="button" className={baseItemClasses}>
      {Icon && <Icon className={iconClasses} />}
      <span className="flex-1 truncate text-left">{item.label}</span>
    </button>
  );
}
