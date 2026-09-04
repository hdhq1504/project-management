import { Icon, type IconProps } from './icon';

function PriorityLowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 10C3.55228 10 4 10.4477 4 11V14C4 14.5523 3.55228 15 3 15H2C1.44772 15 1 14.5523 1 14V11C1 10.4477 1.44772 10 2 10H3Z" />
      <path
        opacity="0.25"
        d="M8.5 5C9.05229 5 9.5 5.44772 9.5 6V14C9.5 14.5523 9.05229 15 8.5 15H7.5C6.94772 15 6.5 14.5523 6.5 14V6C6.5 5.44772 6.94772 5 7.5 5H8.5Z"
      />
      <path
        opacity="0.25"
        d="M14 1C14.5523 1 15 1.44772 15 2V14C15 14.5523 14.5523 15 14 15H13C12.4477 15 12 14.5523 12 14V2C12 1.44772 12.4477 1 13 1H14Z"
      />
    </Icon>
  );
}

export { PriorityLowIcon };
