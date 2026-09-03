export type IssueStatusId = 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled';

export type IssueStatus = {
  id: IssueStatusId;
  name: string;
  shortcut: string;
};

export const ISSUE_STATUSES: IssueStatus[] = [
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
];
