import type { IconProps } from './icon';
import { StatusBacklogIcon } from '@/components/atoms/icon/status-backlog-icon';
import { StatusTodoIcon } from '@/components/atoms/icon/status-todo-icon';
import { StatusInProgressIcon } from '@/components/atoms/icon/status-in-progress-icon';
import { StatusDoneIcon } from '@/components/atoms/icon/status-done-icon';
import { StatusCanceledIcon } from '@/components/atoms/icon/status-canceled-icon';

export type StatusIconProps = IconProps & {
  status?: string;
};

export function StatusIcon({ status, ...props }: StatusIconProps) {
  switch (status) {
    case 'todo':
      return <StatusTodoIcon {...props} />;
    case 'in_progress':
      return <StatusInProgressIcon {...props} />;
    case 'done':
      return <StatusDoneIcon {...props} />;
    case 'canceled':
      return <StatusCanceledIcon {...props} />;
    case 'backlog':
    default:
      return <StatusBacklogIcon {...props} />;
  }
}
