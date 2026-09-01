import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import type { UserProfile } from '@/types/auth.types';

type AuthState = {
  session: Session | null;
  user: UserProfile | null;
  isInitialized: boolean;
  setAuth: (session: Session, user: UserProfile) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isInitialized: false,
  setAuth: (session, user) => set({ session, user, isInitialized: true }),
  clearAuth: () => set({ session: null, user: null, isInitialized: true })
}));
