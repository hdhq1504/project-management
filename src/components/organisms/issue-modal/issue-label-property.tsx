import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ColorDot } from '@/components/atoms/color-dot';
import { LabelIcon } from '@/components/atoms/icon';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/molecules/checkbox-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';
import { LABELS } from '@/constants/issue-label';
import type { IssueFields } from '@/schemas/issue.schema';

export function IssueLabelProperty() {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext<IssueFields>();

  const {
    field: { value: rawValue, onChange }
  } = useController({ control, name: 'labels' });

  const selectedIds = (rawValue as string[] | undefined) ?? [];
  const selectedLabels = selectedIds.map((id) => LABELS.find((l) => l.id === id)).filter((l) => l !== undefined);

  const labelSummary =
    selectedLabels.length === 0
      ? 'Labels'
      : selectedLabels.length === 1
        ? selectedLabels[0].name
        : `${selectedLabels.length} labels`;

  const triggerIcon =
    selectedLabels.length === 0 ? (
      <LabelIcon />
    ) : selectedLabels.length === 1 ? (
      <ColorDot color={selectedLabels[0].color} />
    ) : (
      <div className="flex items-center -space-x-1">
        {selectedLabels.map((label) => (
          <ColorDot key={label.id} color={label.color} className="ring-background ring-1" />
        ))}
      </div>
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonIssueProperty icon={triggerIcon}>{labelSummary}</ButtonIssueProperty>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[230px] p-0 shadow-xl" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex w-[230px] flex-col select-none">
          <CheckboxGroup
            name="labels"
            value={selectedIds}
            onValueChange={onChange}
            aria-label="Issue labels"
            className="flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1.5"
          >
            {LABELS.map(({ id, name, color }) => (
              <CheckboxGroupItem key={id} value={id}>
                <ColorDot color={color} />
                <span className="text-foreground min-w-0 truncate text-[13px] font-medium">{name}</span>
              </CheckboxGroupItem>
            ))}
          </CheckboxGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
