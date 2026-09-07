export type AssigneeOption = {
  id: string;
  name: string;
  shortcut?: string;
  avatarUrl?: string | null;
};

// TODO: Replace with project member data from API.
export const ASSIGNEES: AssigneeOption[] = [
  {
    id: 'user-1',
    name: 'Alex Morgan',
    shortcut: '1'
  },
  {
    id: 'user-2',
    name: 'John Doe',
    shortcut: '2'
  },
  {
    id: 'user-3',
    name: 'Jane Smith',
    shortcut: '3'
  }
];
