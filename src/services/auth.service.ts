import type { LoginParams, SignupParams } from '@/types/auth.types';
import { supabase } from '@/libs/supabase';
import { workspaceService } from '@/services/workspace.service';

function fetchProfile(userId: string) {
  return supabase.from('users').select('*').eq('id', userId).single();
}

type ProfileResult = Awaited<ReturnType<typeof fetchProfile>>;

const pendingProfileRequests = new Map<string, Promise<ProfileResult>>();
const pendingWorkspaceRequests = new Map<string, Promise<void>>();

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
  ensurePersonalWorkspace(userId: string) {
    const pendingRequest = pendingWorkspaceRequests.get(userId);

    if (pendingRequest) {
      return pendingRequest;
    }

    const request = workspaceService
      .ensurePersonalWorkspace()
      .then(() => undefined)
      .finally(() => {
        if (pendingWorkspaceRequests.get(userId) === request) {
          pendingWorkspaceRequests.delete(userId);
        }
      });

    pendingWorkspaceRequests.set(userId, request);
    return request;
  },
  logout() {
    return supabase.auth.signOut();
  }
};
