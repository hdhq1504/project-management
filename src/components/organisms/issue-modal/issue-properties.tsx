import { UserCircleIcon } from '@/components/atoms/icon';
import { StatusIcon } from '@/components/atoms/icon/status-icon';
import { PriorityIcon } from '@/components/atoms/icon/priority-icon';
import { ButtonIssueProperty } from '@/components/atoms/button';
import { ISSUE_STATUSES } from '@/constants/issue-status';
import { ISSUE_PRIORITIES } from '@/constants/issue-priority';
import { IssuePropertySelect } from './issue-property-select';
import { IssueLabelProperty } from './issue-label-property';

export function IssueProperties() {
  return (
    <div className="flex flex-wrap items-center gap-1.5 px-4 py-3">
      <IssuePropertySelect
        name="status"
        items={ISSUE_STATUSES}
        defaultValue="backlog"
        placeholder="Status"
        renderIcon={(item) => <StatusIcon status={item.id} className="size-4" />}
      />

      <IssuePropertySelect
        name="priority"
        items={ISSUE_PRIORITIES}
        defaultValue="no_priority"
        placeholder="Priority"
        renderIcon={(item) => <PriorityIcon priority={item.id} className="size-4" />}
      />

      <ButtonIssueProperty icon={<UserCircleIcon />}>Assignee</ButtonIssueProperty>

      <IssueLabelProperty />
    </div>
  );
}

export default IssueProperties;
