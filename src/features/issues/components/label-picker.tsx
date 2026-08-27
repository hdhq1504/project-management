import { CheckboxGroup } from '@/components/molecules/checkbox-group/checkbox-group';
import { LABELS } from '@/constants/issue-label';
import LabelOption from '@/features/issues/components/label-option';

type LabelPickerProps = {
  value: string[];
  onValueChange: (value: string[]) => void;
};

export default function LabelPicker({ value, onValueChange }: LabelPickerProps) {
  return (
    <div className="flex w-[230px] flex-col select-none">
      <CheckboxGroup
        name="labels"
        value={value}
        onValueChange={onValueChange}
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
