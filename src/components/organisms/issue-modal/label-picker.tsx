import { ColorDot } from '@/components/atoms/color-dot';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/molecules/checkbox-group';
import { LABELS } from '@/constants/issue-label';
import { useLabelPicker, type UseLabelPickerProps } from '@/hooks/use-label-picker';

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

export type LabelPickerProps = UseLabelPickerProps;

export function LabelPicker(props: LabelPickerProps) {
  const { selectedLabels, handleValueChange } = useLabelPicker(props);

  return (
    <div className="flex w-[230px] flex-col select-none">
      <CheckboxGroup
        name="labels"
        value={selectedLabels}
        onValueChange={handleValueChange}
        aria-label="Issue labels"
        className="flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1.5"
      >
        {LABELS.map(({ id, name, color }) => (
          <LabelOption key={id} value={id} name={name} color={color} />
        ))}
      </CheckboxGroup>
    </div>
  );
}

export default LabelPicker;
