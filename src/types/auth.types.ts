import type { Database } from '@/types/database.types';

export type UserProfile = Database['public']['Tables']['users']['Row'];

export type LoginParams = {
  email: string;
  password: string;
};

export type SignupParams = {
  username: string;
  email: string;
  password: string;
};
