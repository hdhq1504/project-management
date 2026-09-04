import type { IconProps } from './icon';
import type { IssueStatusId } from '@/constants/issue-status';
import { StatusBacklogIcon } from '@/components/atoms/icon/status-backlog-icon';
import { StatusTodoIcon } from '@/components/atoms/icon/status-todo-icon';
import { StatusInProgressIcon } from '@/components/atoms/icon/status-in-progress-icon';
import { StatusDoneIcon } from '@/components/atoms/icon/status-done-icon';
import { StatusCanceledIcon } from '@/components/atoms/icon/status-canceled-icon';

const STATUS_ICONS = {
  backlog: StatusBacklogIcon,
  todo: StatusTodoIcon,
  in_progress: StatusInProgressIcon,
  done: StatusDoneIcon,
  canceled: StatusCanceledIcon
} as const;

export type StatusIconProps = IconProps & {
  status?: IssueStatusId;
};

export function StatusIcon({ status = 'backlog', ...props }: StatusIconProps) {
  const StatusIconComponent = STATUS_ICONS[status];
  return <StatusIconComponent {...props} />;
}
