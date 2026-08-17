import { supabase } from '@/libs/supabase';
import type { User } from '@supabase/supabase-js';

type LoginParams = {
  email: string;
  password: string;
};

type SignupParams = {
  username: string;
  email: string;
  password: string;
};

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
  async ensureProfile(user: User) {
    const existingProfile = await supabase.from('users').select('*').eq('id', user.id).maybeSingle();

    if (existingProfile.error || existingProfile.data) {
      return existingProfile;
    }

    const username =
      typeof user.user_metadata.username === 'string' && user.user_metadata.username.trim()
        ? user.user_metadata.username.trim()
        : (user.email?.split('@')[0] ?? 'user');

    return supabase.from('users').upsert({ id: user.id, username }, { onConflict: 'id' }).select('*').single();
  },
  logout() {
    return supabase.auth.signOut();
  }
};
