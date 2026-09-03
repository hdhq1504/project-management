import { ISSUE_PRIORITIES, type IssuePriority } from '@/constants/issue-priority';

export function getPriorityObject(priorityId?: string): IssuePriority {
  const found = ISSUE_PRIORITIES.find((item) => item.id === priorityId);
  return found ?? ISSUE_PRIORITIES[0];
}

export function getPriorityName(priorityId?: string): string {
  const obj = getPriorityObject(priorityId);
  return obj.name;
}
