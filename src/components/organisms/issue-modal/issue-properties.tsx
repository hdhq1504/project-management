import { useWatch } from 'react-hook-form';
import { ColorDot } from '@/components/atoms/color-dot';
import { CircleIcon, LabelIcon, PriorityIcon, UserCircleIcon } from '@/components/atoms/icon';
import { FormItem } from '@/components/molecules/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { LabelPicker } from './label-picker';
import { getLabelSummary, getSelectedLabelObjects } from '@/libs/issue-label';
import type { IssueFields } from '@/schemas/issue.schema';

export function IssueProperties() {
  const labels = useWatch<IssueFields, 'labels'>({ name: 'labels' }) ?? [];
  const selectedLabels = getSelectedLabelObjects(labels);

  const labelIcon =
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
    <div className="flex flex-wrap items-center gap-1.5 px-4 py-3">
      <ButtonIssueProperty icon={<CircleIcon />}>Backlog</ButtonIssueProperty>

      <ButtonIssueProperty icon={<PriorityIcon />}>Priority</ButtonIssueProperty>

      <ButtonIssueProperty icon={<UserCircleIcon />}>Assignee</ButtonIssueProperty>

      <Popover>
        <PopoverTrigger asChild>
          <ButtonIssueProperty icon={labelIcon}>{getLabelSummary(labels)}</ButtonIssueProperty>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-[230px] p-0 shadow-xl" onOpenAutoFocus={(e) => e.preventDefault()}>
          <FormItem<IssueFields> name="labels">
            <LabelPicker />
          </FormItem>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default IssueProperties;
