import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/button/button';
import { Link } from 'react-router';
import { FieldDescription, FieldError, FieldGroup, FieldSeparator } from '@/components/molecules/field/field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from '@/constants/validation';
import Form from '@/components/templates/form/form';
import FormItem from '@/components/organisms/form-item/form-item';
import { Input } from '@/components/atoms/input/input';
import { PasswordInput } from '@/components/atoms/input/password-input';
import { useSignup } from '@/features/auth/hooks/use-signup';
import path from '@/constants/path';

const signupSchema = z
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

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: ''
    }
  });

  const signupMutation = useSignup();

  const onSubmit = async (values: SignupFormValues) => {
    form.clearErrors('root');
    try {
      await signupMutation.mutateAsync({
        username: values.username,
        email: values.email,
        password: values.password
      });
    } catch (error) {
      form.setError('root', { message: (error as Error).message });
    }
  };

  return (
    <Form form={form} onFinish={onSubmit} className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
          <p className="text-muted-foreground text-sm text-balance">Nhập thông tin bên dưới để tạo tài khoản</p>
        </div>

        <FormItem name="username" label="Tên người dùng">
          <Input placeholder="Nhập tên người dùng" />
        </FormItem>

        <FormItem name="email" label="Email">
          <Input placeholder="Nhập email" />
        </FormItem>

        <FormItem name="password" label="Mật khẩu">
          <PasswordInput autoComplete="new-password" placeholder="Nhập mật khẩu" />
        </FormItem>

        <FormItem name="confirmPassword" label="Xác nhận mật khẩu">
          <PasswordInput autoComplete="new-password" placeholder="Xác nhận mật khẩu" />
        </FormItem>

        <FieldError errors={[form.formState.errors.root]} />
      </FieldGroup>

      <Button type="submit" disabled={signupMutation.isPending}>
        Tạo tài khoản
      </Button>

      <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>

      <FieldDescription className="text-center">
        Đã có tài khoản?{' '}
        <Link to={path.login} className="underline underline-offset-4">
          Đăng nhập
        </Link>
      </FieldDescription>
    </Form>
  );
}
