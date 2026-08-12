import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Link } from 'react-router';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from '@/components/molecules/field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';

const signupSchema = z
  .object({
    email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),
    password: z.string().min(1, 'Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    username: z.string().min(1, 'Username không được để trống').min(3, 'Username phải có ít nhất 3 ký tự'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu không được để trống')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Xác nhận mật khẩu không khớp',
    path: ['confirmPassword']
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
          <p className="text-muted-foreground text-sm text-balance">Nhập thông tin bên dưới để tạo tài khoản</p>
        </div>

        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" type="text" {...register('username')} placeholder="Nhập username" />
          {errors.username && <FieldError>{errors.username?.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" {...register('email')} placeholder="Nhập email" />
          {errors.email && <FieldError>{errors.email?.message}</FieldError>}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
            <Link to="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Input id="password" type="password" {...register('password')} placeholder="Nhập mật khẩu" />
            <Button type="button" variant="ghost" size="sm" className="absolute top-1/2 right-0 -translate-y-1/2">
              <Eye />
            </Button>
          </div>
          {errors.password && <FieldError>{errors.password?.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Xác nhận mật khẩu</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            {...register('confirmPassword')}
            placeholder="Nhập lại mật khẩu"
          />
          {errors.confirmPassword && <FieldError>{errors.confirmPassword?.message}</FieldError>}
        </Field>
      </FieldGroup>

      <Field>
        <Button type="submit" disabled={isSubmitting}>
          Tạo tài khoản
        </Button>
      </Field>

      <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>

      <Field className="flex flex-col gap-2">
        <Button variant="outline" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Đăng ký với Google
        </Button>
        <FieldDescription className="text-center">
          Đã có tài khoản?{' '}
          <Link to="/login" className="underline underline-offset-4">
            Đăng nhập
          </Link>
        </FieldDescription>
      </Field>
    </form>
  );
}
