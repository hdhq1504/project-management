export const ISSUE_PRIORITIES = [
  {
    id: 'no_priority',
    name: 'No priority',
    shortcut: '0'
  },
  {
    id: 'urgent',
    name: 'Urgent',
    shortcut: '1'
  },
  {
    id: 'high',
    name: 'High',
    shortcut: '2'
  },
  {
    id: 'medium',
    name: 'Medium',
    shortcut: '3'
  },
  {
    id: 'low',
    name: 'Low',
    shortcut: '4'
  }
] as const;

export type IssuePriority = (typeof ISSUE_PRIORITIES)[number];
export type IssuePriorityId = IssuePriority['id'];
