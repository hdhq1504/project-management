import type { LoginParams, SignupParams } from '@/types/auth.types';
import { supabase } from '@/libs/supabase';

function fetchProfile(userId: string) {
  return supabase.from('users').select('*').eq('id', userId).single();
}

type ProfileResult = Awaited<ReturnType<typeof fetchProfile>>;

const pendingProfileRequests = new Map<string, Promise<ProfileResult>>();

export const authService = {
  login({ email, password }: LoginParams) {
    return supabase.auth.signInWithPassword({ email, password });
  },
  signup({ username, email, password }: SignupParams) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });
  },
  getProfile(userId: string) {
    const pendingRequest = pendingProfileRequests.get(userId);

    if (pendingRequest) {
      return pendingRequest;
    }

    const request = Promise.resolve(fetchProfile(userId)).finally(() => {
      if (pendingProfileRequests.get(userId) === request) {
        pendingProfileRequests.delete(userId);
      }
    });

    pendingProfileRequests.set(userId, request);
    return request;
  },
  logout() {
    return supabase.auth.signOut();
  }
};
