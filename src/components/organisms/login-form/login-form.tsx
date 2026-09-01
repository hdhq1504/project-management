import { type ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/button/button';
import { Input } from '@/components/atoms/input/input';
import { InputPassword } from '@/components/molecules/input-password';
import { FieldDescription, FieldError, FieldGroup, FieldSeparator } from '@/components/molecules/field/field';
import { Form, FormItem } from '@/components/molecules/form';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import path from '@/constants/path';

export type LoginFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit: (values: LoginFormValues) => void;
  isPending?: boolean;
  errorMessage?: string;
};

export function LoginForm({ className, onSubmit, isPending = false, errorMessage, ...props }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

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

        {(errorMessage || form.formState.errors.root) && (
          <FieldError errors={[errorMessage ? { message: errorMessage } : form.formState.errors.root]} />
        )}
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Đang xử lý...' : 'Đăng nhập'}
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
