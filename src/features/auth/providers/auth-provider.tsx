import { useEffect, type PropsWithChildren } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/libs/supabase';
import { authService } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/features/auth/stores/auth.store';

export function AuthProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    let isMounted = true;

    const syncSession = async (session: Session | null) => {
      if (!session) {
        if (isMounted) useAuthStore.getState().clearAuth();
        return;
      }

      const { data: user, error } = await authService.ensureProfile(session.user);

      if (!isMounted) return;

      if (error || !user) {
        console.error('Không thể tải hồ sơ người dùng:', error);
        useAuthStore.getState().clearAuth();
        return;
      }

      useAuthStore.getState().setAuth(session, user);
    };

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => void syncSession(session), 0);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return children;
}
