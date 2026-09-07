import type { User } from '@/types/user.types';

export type UserProfile = User;
export type { User };

export type LoginParams = {
  email: string;
  password: string;
};

export type SignupParams = {
  username: string;
  email: string;
  password: string;
};
