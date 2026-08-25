import type { ComponentType } from 'react';
import { IssuesIcon, LayoutIcon } from '@/components/atoms/icon';

import path from '@/constants/path';

export type NavigationItem = {
  id: string;
  label: string;
  href?: string;
  icon?: ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
  defaultOpen?: boolean;
};

export const workspaceNavigation: NavigationItem[] = [
  {
    id: 'issues',
    label: 'Issues',
    href: path.issues,
    icon: IssuesIcon
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    icon: LayoutIcon
  }
];
