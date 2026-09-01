import { z } from '@/libs/zod';
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from '@/constants/validation';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(PASSWORD_MIN_LENGTH)
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    username: z.string().min(USERNAME_MIN_LENGTH),
    email: z.email(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    confirmPassword: z.string().min(1)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
