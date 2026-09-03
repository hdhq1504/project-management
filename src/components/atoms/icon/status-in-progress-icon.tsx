import { Icon, type IconProps } from './icon';
import { cn } from '@/libs/utils';

function StatusInProgressIcon({ className, ...props }: IconProps) {
  return (
    <Icon className={cn('text-decoration-yellow', className)} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.9967 13.8633C11.2368 13.8633 13.8634 11.2368 13.8634 7.99667C13.8634 4.75659 11.2368 2.13 7.9967 2.13C4.75662 2.13 2.13003 4.75659 2.13003 7.99667C2.13003 11.2368 4.75662 13.8633 7.9967 13.8633ZM7.9967 15.4633C12.1204 15.4633 15.4634 12.1204 15.4634 7.99667C15.4634 3.87294 12.1204 0.529999 7.9967 0.529999C3.87297 0.529999 0.530029 3.87294 0.530029 7.99667C0.530029 12.1204 3.87297 15.4633 7.9967 15.4633Z"
      />
      <path d="M11.8062 7.99667C11.8062 10.1006 10.1007 11.8062 7.99673 11.8062L7.99646 4.18714C10.1004 4.18714 11.8062 5.89272 11.8062 7.99667Z" />
    </Icon>
  );
}

export { StatusInProgressIcon };
