import { ISSUE_STATUSES, type IssueStatus } from '@/constants/issue-status';

export function getStatusObject(statusId?: string): IssueStatus {
  const found = ISSUE_STATUSES.find((item) => item.id === statusId);
  return found ?? ISSUE_STATUSES[0];
}

export function getStatusName(statusId?: string): string {
  return getStatusObject(statusId).name;
}
