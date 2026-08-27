import { ColorDot } from '@/components/atoms/color-dot/color-dot';
import { CheckboxGroupItem } from '@/components/molecules/checkbox-group/checkbox-group';

type LabelOptionProps = {
  value: string;
  name: string;
  color: string;
  disabled?: boolean;
};

export default function LabelOption({ value, name, color, disabled }: LabelOptionProps) {
  return (
    <CheckboxGroupItem value={value} disabled={disabled}>
      <ColorDot color={color} />
      <span className="text-foreground min-w-0 truncate text-[13px] font-medium">{name}</span>
    </CheckboxGroupItem>
  );
}
