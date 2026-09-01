import { z } from '@/libs/zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  labels: z.array(z.string()).optional()
});

export type IssueFields = z.infer<typeof issueSchema>;
