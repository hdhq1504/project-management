import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/atoms/button/button';
import { Input } from '@/components/atoms/input/input';
import { InputPassword } from '@/components/molecules/input-password';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input component cơ bản với hỗ trợ đầy đủ các trạng thái HTML input.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'Kiểu input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    disabled: {
      control: 'boolean',
      description: 'Vô hiệu hóa input'
    }
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Nhập nội dung...'
  }
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Giá trị mặc định',
    placeholder: 'Nhập nội dung...'
  }
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'name@example.com'
  }
};

export const Password: Story = {
  render: () => <InputPassword placeholder="Nhập mật khẩu..." />
};

function ControlledPasswordExample() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex gap-2">
      <InputPassword
        placeholder="Mật khẩu controlled"
        renderEndAddon={({ disabled }) => (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setVisible((prev) => !prev)}
            className="text-muted-foreground flex items-center justify-center p-1"
          >
            {visible ? (
              <Eye className="text-primary size-4" aria-hidden="true" />
            ) : (
              <EyeOff className="size-4" aria-hidden="true" />
            )}
          </button>
        )}
      />
      <Button type="button" variant="outline" onClick={() => setVisible((current) => !current)}>
        {visible ? 'Ẩn' : 'Hiện'}
      </Button>
    </div>
  );
}

export const ControlledPassword: Story = {
  name: 'Password (Controlled)',
  render: () => <ControlledPasswordExample />
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Input bị vô hiệu hóa'
  }
};

export const Invalid: Story = {
  name: 'Invalid (Error State)',
  args: {
    'aria-invalid': true,
    defaultValue: 'Giá trị không hợp lệ',
    placeholder: 'Nhập nội dung...'
  } as React.ComponentProps<typeof Input>
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3 p-4">
      <Input placeholder="Default" />
      <Input defaultValue="Has value" />
      <Input disabled defaultValue="Disabled" />
      <Input aria-invalid placeholder="Invalid / Error" />
    </div>
  )
};
