import type { IconProps } from './icon';
import type { IssuePriorityId } from '@/constants/issue-priority';
import { PriorityNoPriorityIcon } from '@/components/atoms/icon/priority-no-priority-icon';
import { PriorityUrgentIcon } from '@/components/atoms/icon/priority-urgent-icon';
import { PriorityHighIcon } from '@/components/atoms/icon/priority-high-icon';
import { PriorityMediumIcon } from '@/components/atoms/icon/priority-medium-icon';
import { PriorityLowIcon } from '@/components/atoms/icon/priority-low-icon';

const PRIORITY_ICONS = {
  no_priority: PriorityNoPriorityIcon,
  urgent: PriorityUrgentIcon,
  high: PriorityHighIcon,
  medium: PriorityMediumIcon,
  low: PriorityLowIcon
} as const;

export type PriorityIconProps = IconProps & {
  priority?: IssuePriorityId;
};

export function PriorityIcon({ priority = 'no_priority', ...props }: PriorityIconProps) {
  const PriorityIconComponent = PRIORITY_ICONS[priority];
  return <PriorityIconComponent {...props} />;
}
