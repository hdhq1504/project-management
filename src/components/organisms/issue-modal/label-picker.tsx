import { ColorDot } from '@/components/atoms/color-dot';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/molecules/checkbox-group';
import { LABELS } from '@/constants/issue-label';

type LabelOptionProps = {
  value: string;
  name: string;
  color: string;
  disabled?: boolean;
};

function LabelOption({ value, name, color, disabled }: LabelOptionProps) {
  return (
    <CheckboxGroupItem value={value} disabled={disabled}>
      <ColorDot color={color} />
      <span className="text-foreground min-w-0 truncate text-[13px] font-medium">{name}</span>
    </CheckboxGroupItem>
  );
}

export type LabelPickerProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  onValueChange?: (value: string[]) => void;
};

export function LabelPicker({ value = [], onChange, onValueChange }: LabelPickerProps) {
  const handleChange = (val: string[]) => {
    onChange?.(val);
    onValueChange?.(val);
  };

  return (
    <div className="flex w-[230px] flex-col select-none">
      <CheckboxGroup
        name="labels"
        value={value}
        onValueChange={handleChange}
        aria-label="Issue labels"
        className="flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1.5"
      >
        {LABELS.map((label) => (
          <LabelOption key={label.id} value={label.id} name={label.name} color={label.color} />
        ))}
      </CheckboxGroup>
    </div>
  );
}

export default LabelPicker;
