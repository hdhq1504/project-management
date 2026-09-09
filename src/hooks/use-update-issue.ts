import { useMutation, useQueryClient } from '@tanstack/react-query';
import { issueService } from '@/services/issue.service';
import type { Issue, UpdateIssueInput } from '@/types/issue.types';

type UpdateIssueVariables = {
  issueId: string;
  input: UpdateIssueInput;
};

type UpdateIssueContext = {
  previousIssues?: Issue[];
};

export function useUpdateIssue(workspaceId?: string, workspaceSlug?: string) {
  const queryClient = useQueryClient();
  const issuesQueryKey = ['issues', workspaceId] as const;

  return useMutation({
    mutationFn: async ({ issueId, input }: UpdateIssueVariables) => {
      if (!workspaceId) {
        throw new Error('Chưa chọn workspace.');
      }

      return issueService.updateIssue(issueId, input, workspaceSlug);
    },
    onMutate: async ({ issueId, input }): Promise<UpdateIssueContext> => {
      if (workspaceId) {
        await queryClient.cancelQueries({ queryKey: issuesQueryKey });

        const previousIssues = queryClient.getQueryData<Issue[]>(issuesQueryKey);
        queryClient.setQueryData<Issue[]>(issuesQueryKey, (issues) =>
          issues?.map((issue) => {
            if (issue.id !== issueId) return issue;

            return {
              ...issue,
              status: input.status ?? issue.status,
              priority: input.priority ?? issue.priority,
              labelIds: input.labelIds ?? issue.labelIds,
              assigneeId: input.assigneeId === undefined ? issue.assigneeId : input.assigneeId
            };
          })
        );

        return { previousIssues };
      }
      return {};
    },
    onError: (_error, _variables, context) => {
      if (workspaceId && context?.previousIssues) {
        queryClient.setQueryData(issuesQueryKey, context.previousIssues);
      }
    },
    onSettled: () => {
      if (workspaceId) {
        void queryClient.invalidateQueries({ queryKey: issuesQueryKey });
      }
    }
  });
}
