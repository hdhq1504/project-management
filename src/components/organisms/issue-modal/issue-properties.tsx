import { useController, useFormContext } from 'react-hook-form';
import { StatusIcon, PriorityIcon, LabelIcon, UserCircleIcon } from '@/components/atoms/icon';
import { ColorDot } from '@/components/atoms/color-dot';
import { Avatar } from '@/components/atoms/avatar';
import { ISSUE_STATUSES } from '@/constants/issue-status';
import { ISSUE_PRIORITIES } from '@/constants/issue-priority';
import { IssuePropertySelect } from '@/components/molecules/issue-property-select';
import { IssuePropertyCheckbox } from '@/components/molecules/issue-property-checkbox';
import { useLabels } from '@/hooks/use-labels';
import { useAuthStore } from '@/stores/auth.store';
import type { IssueFields } from '@/schemas/issue.schema';

type IssuePropertiesProps = {
  workspaceId?: string;
};

function IssueProperties({ workspaceId }: IssuePropertiesProps) {
  const { control } = useFormContext<IssueFields>();
  const { field: status } = useController({ control, name: 'status' });
  const { field: priority } = useController({ control, name: 'priority' });
  const { field: labelIds } = useController({ control, name: 'labelIds' });
  const { field: assignee } = useController({ control, name: 'assigneeId' });

  const { data: labels = [] } = useLabels(workspaceId);
  const currentUser = useAuthStore((state) => state.user);
  const assignees = currentUser
    ? [
        {
          id: currentUser.id,
          name: currentUser.username,
          avatarUrl: currentUser.avatar_url
        }
      ]
    : [];

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

      <IssuePropertySelect
        items={assignees}
        value={assignee.value ?? null}
        onValueChange={assignee.onChange}
        onClear={() => assignee.onChange(null)}
        clearLabel="Unassigned"
        clearShortcut="0"
        renderIcon={(item) => <Avatar size="xs" name={item.name} src={item.avatarUrl} />}
        placeholder="Assignee"
        fallbackIcon={<UserCircleIcon className="size-4" />}
      />

      <IssuePropertyCheckbox
        items={labels}
        value={labelIds.value ?? []}
        onValueChange={labelIds.onChange}
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
