import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label component dùng để gắn nhãn cho các phần tử form. Xây dựng trên Radix UI Label primitive.'
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Nội dung của label'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email'
  }
};

export const WithInput: Story = {
  name: 'Label + Input',
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="email-demo">Email</Label>
      <Input id="email-demo" type="email" placeholder="name@example.com" />
    </div>
  )
};

export const WithRequiredMark: Story = {
  name: 'Required Field',
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="required-demo">
        Tên người dùng <span className="text-destructive">*</span>
      </Label>
      <Input id="required-demo" placeholder="Nhập tên người dùng..." />
    </div>
  )
};
