import { useController, useFormContext } from 'react-hook-form';
import { UserCircleIcon, StatusIcon, PriorityIcon, LabelIcon } from '@/components/atoms/icon';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { ColorDot } from '@/components/atoms/color-dot';
import { ISSUE_STATUSES } from '@/constants/issue-status';
import { ISSUE_PRIORITIES } from '@/constants/issue-priority';
import { LABELS } from '@/constants/issue-label';
import { IssuePropertySelect } from '@/components/molecules/issue-property-select';
import { IssuePropertyCheckbox } from '@/components/molecules/issue-property-checkbox';
import type { IssueFields } from '@/schemas/issue.schema';

function IssueProperties() {
  const { control } = useFormContext<IssueFields>();
  const { field: status } = useController({ control, name: 'status' });
  const { field: priority } = useController({ control, name: 'priority' });
  const { field: labels } = useController({ control, name: 'labels' });

  return (
    <div className="flex flex-wrap items-center gap-1.5 px-4 py-3">
      <IssuePropertySelect
        value={status.value ?? 'backlog'}
        onValueChange={status.onChange}
        items={ISSUE_STATUSES}
        renderIcon={(item) => <StatusIcon status={item.id} className="size-4" />}
        placeholder="Status"
      />

      <IssuePropertySelect
        value={priority.value ?? 'no_priority'}
        onValueChange={priority.onChange}
        items={ISSUE_PRIORITIES}
        renderIcon={(item) => <PriorityIcon priority={item.id} className="size-4" />}
        placeholder="Priority"
      />

      <ButtonIssueProperty icon={<UserCircleIcon />}>Assignee</ButtonIssueProperty>

      <IssuePropertyCheckbox
        items={LABELS}
        value={labels.value ?? []}
        onValueChange={labels.onChange}
        placeholder="Labels"
        renderIcon={(label) => <ColorDot color={label.color} />}
        renderTriggerIcon={(selected) =>
          selected.length === 0 ? (
            <LabelIcon />
          ) : selected.length === 1 ? (
            <ColorDot color={selected[0].color} />
          ) : (
            <div className="flex items-center -space-x-1">
              {selected.map((label) => (
                <ColorDot key={label.id} color={label.color} className="ring-background ring-1" />
              ))}
            </div>
          )
        }
      />
    </div>
  );
}

export { IssueProperties };
