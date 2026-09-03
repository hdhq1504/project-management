import { Icon, type IconProps } from './icon';

function PriorityNoPriorityIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="1.5" y="7.25" width="3" height="1.5" rx="0.5" />
      <rect x="6.5" y="7.25" width="3" height="1.5" rx="0.5" />
      <rect x="11.5" y="7.25" width="3" height="1.5" rx="0.5" />
    </Icon>
  );
}

export { PriorityNoPriorityIcon };
