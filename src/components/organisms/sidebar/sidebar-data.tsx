import path from '@/constants/path';
import { IssuesIcon, LayoutIcon } from '@/components/atoms/icon';
import type { SidebarItemProps } from './sidebar-item';

export const workspaceNavigation: SidebarItemProps['item'][] = [
  {
    id: 'issues',
    label: 'Issues',
    href: path.issues,
    icon: <IssuesIcon />
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    icon: <LayoutIcon />
  }
];
