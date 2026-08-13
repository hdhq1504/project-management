import { type InputHTMLAttributes, useState } from 'react';

import { Button } from '@/components/atoms/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/atoms/field';
import { Input } from '@/components/atoms/input';
import { Eye, EyeOff } from 'lucide-react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string; // id cho htmlFor của FieldLabel
  label?: React.ReactNode; // Label input
  description?: React.ReactNode; // Mô tả bên dưới input
  errorMessage?: string; // Thông báo lỗi từ validation
}

export default function FormField({ id, label, description, errorMessage, ...rest }: Readonly<FormFieldProps>) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isPassword = rest.type === 'password';
  const handleType = () => {
    if (isPassword) {
      return showPassword ? 'text' : 'password';
    }
    return rest.type;
  };

  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}

      <div className={isPassword ? 'relative' : undefined}>
        <Input id={id} type={handleType()} {...rest} />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-1/2 right-0 -translate-y-1/2"
            onClick={toggleShowPassword}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        )}
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}

      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </Field>
  );
}
