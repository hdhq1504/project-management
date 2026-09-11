import { useMutation, useQueryClient } from '@tanstack/react-query';
import { issueService } from '@/services/issue.service';
import type { CreateIssueInput } from '@/types/issue.types';

export function useCreateIssue(workspaceId?: string, workspaceSlug?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateIssueInput) => {
      if (!workspaceId) {
        throw new Error('Chưa chọn workspace.');
      }

      return issueService.createIssue(workspaceId, input, workspaceSlug);
    },
    onSuccess: () => {
      if (workspaceId) {
        void queryClient.invalidateQueries({
          queryKey: ['issues', workspaceId]
        });
      }
    }
  });
}
