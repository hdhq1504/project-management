import { z } from '@/libs/zod';
import { ISSUE_STATUS_IDS } from '@/constants/issue-status';
import { ISSUE_PRIORITY_IDS } from '@/constants/issue-priority';

export const issueSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(ISSUE_STATUS_IDS).optional(),
  priority: z.enum(ISSUE_PRIORITY_IDS).optional(),
  labelIds: z.array(z.string()).default([]),
  assigneeId: z.string().uuid().nullable().default(null)
});

export type IssueFields = z.input<typeof issueSchema>;
