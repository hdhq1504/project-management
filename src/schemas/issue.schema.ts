import { z } from '@/libs/zod';
import type { IssueStatusId } from '@/constants/issue-status';
import type { IssuePriorityId } from '@/constants/issue-priority';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.custom<IssueStatusId>().optional(),
  priority: z.custom<IssuePriorityId>().optional(),
  labels: z.array(z.string()).optional()
});

export type IssueFields = {
  title: string;
  description?: string;
  status?: IssueStatusId;
  priority?: IssuePriorityId;
  labels?: string[];
};
