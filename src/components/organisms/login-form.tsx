import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/button';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldDescription, FieldGroup, FieldSeparator } from '@/components/atoms/field';
import FormField from '@/components/molecules/form-field';
import { PASSWORD_MIN_LENGTH, rules } from '@/constants/validation';

const loginSchema = z.object({
  email: z.string().nonempty(rules.EMAIL_REQUIRED).email({ error: rules.EMAIL_INVALID }),
  password: z
    .string()
    .nonempty(rules.PASSWORD_REQUIRED)
    .min(PASSWORD_MIN_LENGTH, { error: (issue) => rules.PASSWORD_MIN_LENGTH(issue.minimum) })
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          <p className="text-muted-foreground text-sm text-balance">Nhập thông tin bên dưới để đăng nhập</p>
        </div>

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="Nhập email"
          errorMessage={errors.email?.message}
          {...register('email')}
        />

        <FormField
          id="password"
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu"
          errorMessage={errors.password?.message}
          {...register('password')}
        />

        <Field>
          <Button type="submit" disabled={isSubmitting}>
            Đăng nhập
          </Button>
        </Field>

        <FieldSeparator>Hoặc tiếp tục với</FieldSeparator>

        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Đăng nhập với Google
          </Button>
          <FieldDescription className="text-center">
            Chưa có tài khoản?{' '}
            <Link to="/signup" className="underline underline-offset-4">
              Đăng ký
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
