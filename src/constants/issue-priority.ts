export type IssuePriorityId = 'no_priority' | 'urgent' | 'high' | 'medium' | 'low';

export type IssuePriority = {
  id: IssuePriorityId;
  name: string;
  shortcut: string;
};

export const ISSUE_PRIORITIES: IssuePriority[] = [
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
];
