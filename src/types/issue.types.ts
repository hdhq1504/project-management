import type { IssueStatusId } from '@/constants/issue-status';
import type { IssuePriorityId } from '@/constants/issue-priority';
import type { User } from '@/types/user.types';

export type Issue = {
  id: string;
  title: string;
  description?: string;
  status: IssueStatusId;
  priority: IssuePriorityId;
  labels?: string[];
  assigneeId: User['id'] | null;
  createdAt: string;
  updatedAt?: string;
};

export type CreateIssueInput = {
  title: string;
  description?: string;
  status?: IssueStatusId;
  priority?: IssuePriorityId;
  labels?: string[];
  assigneeId?: User['id'] | null;
};

export type UpdateIssueInput = Partial<Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>;

export type GroupedIssues = {
  status: IssueStatusId;
  name: string;
  issues: Issue[];
};
