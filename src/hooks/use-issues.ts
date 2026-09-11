import { useQuery } from '@tanstack/react-query';
import { issueService } from '@/services/issue.service';

export function useIssues(workspaceId?: string, workspaceSlug?: string) {
  return useQuery({
    queryKey: ['issues', workspaceId],
    queryFn: () => {
      if (!workspaceId) return [];
      return issueService.getIssues(workspaceId, workspaceSlug);
    },
    enabled: Boolean(workspaceId)
  });
}
