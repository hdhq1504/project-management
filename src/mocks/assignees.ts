import type { UserId } from '@/types/user.types';

export type AssigneeOption = {
  readonly id: UserId;
  readonly name: string;
  readonly shortcut?: string;
  readonly avatarUrl?: string | null;
};

// TODO: Replace with project member data from API.
export const ASSIGNEES: readonly AssigneeOption[] = [
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
