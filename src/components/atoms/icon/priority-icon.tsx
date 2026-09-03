import type { IconProps } from './icon';
import { PriorityNoPriorityIcon } from '@/components/atoms/icon/priority-no-priority-icon';
import { PriorityUrgentIcon } from '@/components/atoms/icon/priority-urgent-icon';
import { PriorityHighIcon } from '@/components/atoms/icon/priority-high-icon';
import { PriorityMediumIcon } from '@/components/atoms/icon/priority-medium-icon';
import { PriorityLowIcon } from '@/components/atoms/icon/priority-low-icon';

export type PriorityIconProps = IconProps & {
  priority?: string;
};

export function PriorityIcon({ priority, ...props }: PriorityIconProps) {
  switch (priority) {
    case 'urgent':
      return <PriorityUrgentIcon {...props} />;
    case 'high':
      return <PriorityHighIcon {...props} />;
    case 'medium':
      return <PriorityMediumIcon {...props} />;
    case 'low':
      return <PriorityLowIcon {...props} />;
    case 'no_priority':
    default:
      return <PriorityNoPriorityIcon {...props} />;
  }
}
