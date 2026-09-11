import { useQuery } from '@tanstack/react-query';
import { workspaceService } from '@/services/workspace.service';
import { useAuthStore } from '@/stores/auth.store';

export function useCurrentWorkspace() {
  const currentUserId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: ['current-workspace', currentUserId],
    queryFn: () => workspaceService.getCurrentWorkspace(),
    enabled: Boolean(currentUserId),
    retry: false,
    staleTime: 1000 * 60 * 5
  });
}
