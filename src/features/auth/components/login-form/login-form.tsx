import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/button/button';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from '@/libs/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PASSWORD_MIN_LENGTH } from '@/constants/validation';
import Form from '@/components/templates/form/form';
import FormItem from '@/components/organisms/form-item/form-item';
import { FieldDescription, FieldError, FieldGroup, FieldSeparator } from '@/components/molecules/field/field';
import { Input } from '@/components/atoms/input/input';
import { InputPassword } from '@/components/atoms/input/input-password';
import { useLogin } from '@/features/auth/hooks/use-login';
import path from '@/constants/path';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(PASSWORD_MIN_LENGTH)
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { mutate, isPending } = useLogin();
  const onSubmit = (values: LoginFormValues) => mutate(values);

  return (
    <Form form={form} onFinish={onSubmit} className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          <p className="text-muted-foreground text-sm text-balance">Nhập thông tin bên dưới để đăng nhập</p>
        </div>

        <FormItem name="email" label="Email">
          <Input placeholder="Nhập email" />
        </FormItem>

        <FormItem name="password" label="Mật khẩu">
          <InputPassword autoComplete="current-password" placeholder="Nhập mật khẩu" />
        </FormItem>

        <FieldError errors={[form.formState.errors.root]} />
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        Đăng nhập
      </Button>

      <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>

      <FieldDescription className="text-center">
        Chưa có tài khoản?{' '}
        <Link to={path.signup} className="underline underline-offset-4">
          Đăng ký
        </Link>
      </FieldDescription>
    </Form>
  );
}
