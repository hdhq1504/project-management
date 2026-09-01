import { useEffect, type PropsWithChildren } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/libs/supabase';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';

export function AuthProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    let isMounted = true;

    const syncSession = async (session: Session | null) => {
      if (!session) {
        if (isMounted) useAuthStore.getState().clearAuth();
        return;
      }

      const { session: currentSession, user } = useAuthStore.getState();
      if (currentSession?.access_token === session.access_token && user) {
        return;
      }

      const { data: profile, error } = await authService.getProfile(session.user.id);

      if (!isMounted) return;

      if (error || !profile) {
        console.error('Không thể tải hồ sơ người dùng:', error);
        useAuthStore.getState().clearAuth();
        return;
      }

      useAuthStore.getState().setAuth(session, profile);
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
