import type { IssueStatusId } from '@/constants/issue-status';
import type { IssuePriorityId } from '@/constants/issue-priority';
import type { UserId } from '@/types/user.types';

export type Issue = {
  id: string;
  identifier: string;
  issueNumber: number;
  workspaceId: string;
  projectId: string | null;
  title: string;
  description?: string;
  status: IssueStatusId;
  priority: IssuePriorityId;
  labelIds?: string[];
  assigneeId: UserId | null;
  reporterId: UserId;
  createdAt: string;
  updatedAt?: string;
};

export type CreateIssueInput = {
  title: string;
  description?: string;
  status?: IssueStatusId;
  priority?: IssuePriorityId;
  labelIds?: string[];
  assigneeId?: UserId | null;
  projectId?: string | null;
};

export type UpdateIssueInput = {
  status?: IssueStatusId;
  priority?: IssuePriorityId;
  labelIds?: string[];
  assigneeId?: UserId | null;
};

export type GroupedIssues = {
  status: IssueStatusId;
  name: string;
  issues: Issue[];
};
