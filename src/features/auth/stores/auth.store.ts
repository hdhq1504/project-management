import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import type { Database } from '@/types/database.types';

export type UserProfile = Database['public']['Tables']['users']['Row'];

type AuthState = {
  session: Session | null;
  user: UserProfile | null;
  isInitialized: boolean;
  setAuth: (session: Session, user: UserProfile) => void;
  clearAuth: () => void;
  setInitialized: (isInitialized: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isInitialized: false,
  setAuth: (session, user) => set({ session, user, isInitialized: true }),
  clearAuth: () => set({ session: null, user: null, isInitialized: true }),
  setInitialized: (isInitialized) => set({ isInitialized })
}));
