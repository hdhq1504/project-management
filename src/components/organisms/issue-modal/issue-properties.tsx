import { ColorDot } from '@/components/atoms/color-dot';
import { LabelIcon, PriorityIcon, StatusIcon, UserCircleIcon } from '@/components/atoms/icon';
import { FormItem } from '@/components/molecules/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/molecules/popover';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { LabelPicker } from './label-picker';
import { StatusPicker } from './status-picker';
import { PriorityPicker } from './priority-picker';
import { useIssueProperties } from '@/hooks/use-issue-properties';
import type { IssueFields } from '@/schemas/issue.schema';

export function IssueProperties() {
  const {
    status,
    statusObj,
    statusOpen,
    setStatusOpen,
    priority,
    priorityLabel,
    priorityOpen,
    setPriorityOpen,
    selectedLabels,
    labelSummary
  } = useIssueProperties();

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
      {/* Status Popover */}
      <Popover open={statusOpen} onOpenChange={setStatusOpen}>
        <PopoverTrigger asChild>
          <ButtonIssueProperty icon={<StatusIcon status={status} />}>{statusObj.name}</ButtonIssueProperty>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-[230px] p-0 shadow-xl">
          <FormItem<IssueFields> name="status">
            <StatusPicker onSelect={() => setStatusOpen(false)} />
          </FormItem>
        </PopoverContent>
      </Popover>

      {/* Priority Popover */}
      <Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
        <PopoverTrigger asChild>
          <ButtonIssueProperty icon={<PriorityIcon priority={priority} />}>{priorityLabel}</ButtonIssueProperty>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-[230px] p-0 shadow-xl">
          <FormItem<IssueFields> name="priority">
            <PriorityPicker onSelect={() => setPriorityOpen(false)} />
          </FormItem>
        </PopoverContent>
      </Popover>

      {/* Assignee Button */}
      <ButtonIssueProperty icon={<UserCircleIcon />}>Assignee</ButtonIssueProperty>

      {/* Label Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <ButtonIssueProperty icon={labelIcon}>{labelSummary}</ButtonIssueProperty>
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
