import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/atoms/button/button';
import { Input, type InputProps } from '@/components/atoms/input/input';

export interface PasswordVisibilityToggle {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export interface PasswordInputProps extends Omit<InputProps, 'endAdornment' | 'type'> {
  iconRender?: (visible: boolean) => React.ReactNode;
  visibilityToggle?: boolean | PasswordVisibilityToggle;
}

function defaultPasswordIconRender(visible: boolean) {
  return visible ? <Eye aria-hidden="true" /> : <EyeOff aria-hidden="true" />;
}

function preventMouseDownDefault(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
}

function PasswordInput({
  className,
  containerClassName,
  disabled,
  iconRender = defaultPasswordIconRender,
  visibilityToggle = true,
  ...props
}: PasswordInputProps) {
  const [internalVisible, setInternalVisible] = React.useState(false);
  const toggleConfig = typeof visibilityToggle === 'object' ? visibilityToggle : undefined;
  const isControlled = toggleConfig?.visible !== undefined;
  const visible = toggleConfig?.visible ?? internalVisible;
  const canToggleVisibility = visibilityToggle !== false;

  const handleVisibleChange = () => {
    const nextVisible = !visible;

    if (!isControlled) setInternalVisible(nextVisible);
    toggleConfig?.onVisibleChange?.(nextVisible);
  };

  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      disabled={disabled}
      className={className}
      containerClassName={containerClassName}
      endAdornment={
        canToggleVisibility ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            aria-label={visible ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
            aria-pressed={visible}
            className="text-muted-foreground hover:text-foreground"
            onMouseDown={preventMouseDownDefault}
            onClick={handleVisibleChange}
          >
            {iconRender(visible)}
          </Button>
        ) : undefined
      }
    />
  );
}

export { PasswordInput };
