import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import path from '@/constants/path';
import type { SignupParams } from '@/types/auth.types';

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (params: SignupParams) => {
      const { data, error } = await authService.signup(params);

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Không thể tạo tài khoản người dùng.');
      }

      if (!data.session) {
        throw new Error('Không tạo được phiên đăng nhập.');
      }

      const { data: user, error: profileError } = await authService.getProfile(data.user.id);

      if (profileError || !user) {
        throw new Error(profileError?.message ?? 'Không thể tạo hồ sơ người dùng.');
      }

      return { session: data.session, user };
    },
    onSuccess: ({ session, user }) => {
      useAuthStore.getState().setAuth(session, user);
      navigate(path.issues, { replace: true });
    }
  });
}
