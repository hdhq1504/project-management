import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import path from '@/constants/path';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await authService.logout();

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      useAuthStore.getState().clearAuth();
      queryClient.clear();
      navigate(path.login, { replace: true });
    }
  });
}
