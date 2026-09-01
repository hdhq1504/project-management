import { useState, type Dispatch, type MouseEvent, type ReactNode, type SetStateAction } from 'react';
import { ButtonVisibleStatus } from '@/components/atoms/button/button-visible-status';
import { InputGroup } from '@/components/atoms/input/input-group';
import { Input, type InputProps } from '@/components/atoms/input/input';
import { cn } from '@/libs/utils';

export type RenderEndAddonFn = (params: {
  disabled?: boolean;
  visible: boolean;
  onVisibleChange: Dispatch<SetStateAction<boolean>>;
}) => ReactNode;

function preventMouseDownDefault(event: MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
}

const defaultEndAddon: RenderEndAddonFn = ({ disabled, visible, onVisibleChange }) => (
  <ButtonVisibleStatus
    disabled={disabled}
    isVisible={visible}
    onMouseDown={preventMouseDownDefault}
    onClick={() => onVisibleChange((prev) => !prev)}
  />
);

export type InputPasswordProps = Omit<InputProps, 'type'> & {
  renderEndAddon?: RenderEndAddonFn;
};

function InputPassword({ className, disabled, renderEndAddon = defaultEndAddon, ...props }: InputPasswordProps) {
  const [visible, setVisible] = useState(false);
  const suffix = renderEndAddon({ disabled, visible, onVisibleChange: setVisible });

  return (
    <InputGroup suffix={suffix}>
      <Input
        {...props}
        type={visible ? 'text' : 'password'}
        disabled={disabled}
        className={cn('border-0 bg-transparent! pr-9 focus-visible:ring-0 dark:bg-transparent!', className)}
      />
    </InputGroup>
  );
}

export { InputPassword };
