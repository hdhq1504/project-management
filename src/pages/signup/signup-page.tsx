import { SignupForm } from '@/components/organisms/signup-form';
import { useSignup } from '@/hooks/use-signup';
import type { SignupFormValues } from '@/schemas/auth.schema';

export function SignupPage() {
  const { mutate: signup, isPending, error } = useSignup();

  const handleSignup = ({ username, email, password }: SignupFormValues) => {
    signup({ username, email, password });
  };

  return <SignupForm onSubmit={handleSignup} isPending={isPending} errorMessage={error?.message} />;
}

export default SignupPage;
