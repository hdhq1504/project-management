import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import path from '@/constants/path';
import type { LoginParams } from '@/features/auth/types';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (params: LoginParams) => {
      const { data, error } = await authService.login(params);

      if (error) {
        throw new Error(error.message);
      }

      if (!data.session) {
        throw new Error('Không tạo được phiên đăng nhập.');
      }

      const { data: user, error: profileError } = await authService.getProfile(data.user.id);

      if (profileError || !user) {
        throw new Error(profileError?.message ?? 'Không thể tải hồ sơ người dùng.');
      }

      return { session: data.session, user };
    },
    onSuccess: ({ session, user }) => {
      useAuthStore.getState().setAuth(session, user);
      navigate(path.issues, { replace: true });
    }
  });
}
