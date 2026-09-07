import type { IssueStatusId } from '@/constants/issue-status';
import type { IssuePriorityId } from '@/constants/issue-priority';

export type Issue = {
  id: string;
  title: string;
  description?: string;
  status: IssueStatusId;
  priority: IssuePriorityId;
  labels?: string[];
  createdAt: string;
  updatedAt?: string;
};

export type CreateIssueInput = {
  title: string;
  description?: string;
  status?: IssueStatusId;
  priority?: IssuePriorityId;
  labels?: string[];
};

export type UpdateIssueInput = Partial<Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>>;

export type GroupedIssues = {
  status: IssueStatusId;
  name: string;
  issues: Issue[];
};
