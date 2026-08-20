export type { UserProfile } from './stores/auth.store';

export type LoginParams = {
  email: string;
  password: string;
};

export type SignupParams = {
  username: string;
  email: string;
  password: string;
};
