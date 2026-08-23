import { Eye, EyeOff } from 'lucide-react';
import type { ComponentProps } from 'react';

import { Button } from '@/components/atoms/button/button';

export type ButtonVisibleStatusProps = ComponentProps<'button'> & {
  isVisible?: boolean;
};

function ButtonVisibleStatus({ isVisible, ...props }: ButtonVisibleStatusProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={isVisible ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
      aria-pressed={isVisible}
      className="text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent dark:hover:bg-transparent"
      {...props}
    >
      {isVisible ? <Eye aria-hidden="true" /> : <EyeOff aria-hidden="true" />}
    </Button>
  );
}

export default ButtonVisibleStatus;
