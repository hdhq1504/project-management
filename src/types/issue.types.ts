import type { IssueStatusId } from '@/constants/issue-status';
import type { IssuePriorityId } from '@/constants/issue-priority';
import type { UserId } from '@/types/user.types';

export type Issue = {
  id: string;
  title: string;
  description?: string;
  status: IssueStatusId;
  priority: IssuePriorityId;
  labels?: string[];
  assigneeId: UserId | null;
  createdAt: string;
  updatedAt?: string;
};

export type CreateIssueInput = {
  title: string;
  description?: string;
  status?: IssueStatusId;
  priority?: IssuePriorityId;
  labels?: string[];
  assigneeId?: UserId | null;
};

export type UpdateIssueInput = Partial<Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>;

export type GroupedIssues = {
  status: IssueStatusId;
  name: string;
  issues: Issue[];
};
