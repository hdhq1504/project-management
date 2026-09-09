import { useQuery } from '@tanstack/react-query';
import { labelService } from '@/services/label.service';

export function useLabels(workspaceId?: string) {
  return useQuery({
    queryKey: ['labels', workspaceId],
    queryFn: () => {
      if (!workspaceId) return [];
      return labelService.getLabels(workspaceId);
    },
    enabled: Boolean(workspaceId),
    staleTime: 1000 * 60 * 5
  });
}
