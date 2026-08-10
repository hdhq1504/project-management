import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/ui/input';

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
  name: 'With Value',
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
  args: {
    type: 'password',
    placeholder: 'Nhập mật khẩu...'
  }
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
  name: 'All States',
  render: () => (
    <div className="flex w-80 flex-col gap-3 p-4">
      <Input placeholder="Default" />
      <Input defaultValue="Has value" />
      <Input disabled defaultValue="Disabled" />
      <Input aria-invalid placeholder="Invalid / Error" />
    </div>
  )
};
