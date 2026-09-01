import { LoginForm } from '@/components/organisms/login-form';
import { useLogin } from '@/hooks/use-login';
import type { LoginFormValues } from '@/schemas/auth.schema';

export function LoginPage() {
  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = (values: LoginFormValues) => {
    login(values);
  };

  return <LoginForm onSubmit={handleLogin} isPending={isPending} errorMessage={error?.message} />;
}

export default LoginPage;
