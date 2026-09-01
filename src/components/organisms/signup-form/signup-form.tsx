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
import { signupSchema, type SignupFormValues } from '@/schemas/auth.schema';
import path from '@/constants/path';

export type SignupFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit: (values: SignupFormValues) => void;
  isPending?: boolean;
  errorMessage?: string;
};

export function SignupForm({ className, onSubmit, isPending = false, errorMessage, ...props }: SignupFormProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: ''
    }
  });

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
          <InputPassword autoComplete="new-password" placeholder="Nhập mật khẩu" />
        </FormItem>

        <FormItem name="confirmPassword" label="Xác nhận mật khẩu">
          <InputPassword autoComplete="new-password" placeholder="Xác nhận mật khẩu" />
        </FormItem>

        {(errorMessage || form.formState.errors.root) && (
          <FieldError errors={[errorMessage ? { message: errorMessage } : form.formState.errors.root]} />
        )}
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Đang xử lý...' : 'Tạo tài khoản'}
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
