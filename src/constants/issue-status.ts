export const ISSUE_STATUSES = [
  {
    id: 'backlog',
    name: 'Backlog',
    shortcut: '1'
  },
  {
    id: 'todo',
    name: 'Todo',
    shortcut: '2'
  },
  {
    id: 'in_progress',
    name: 'In Progress',
    shortcut: '3'
  },
  {
    id: 'done',
    name: 'Done',
    shortcut: '4'
  },
  {
    id: 'canceled',
    name: 'Canceled',
    shortcut: '5'
  }
] as const;

export type IssueStatus = (typeof ISSUE_STATUSES)[number];
export type IssueStatusId = IssueStatus['id'];
