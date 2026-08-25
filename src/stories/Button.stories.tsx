import type { Meta, StoryObj } from '@storybook/react-vite';
import { Trash2, Plus, Download, Mail } from 'lucide-react';

import { Button } from '@/components/atoms/button/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button theo API shadcn: native button props kết hợp với variant, size và asChild.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
      description: 'Kiểu hiển thị của button'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
      description: 'Kích thước của button'
    },
    disabled: {
      control: 'boolean',
      description: 'Vô hiệu hóa button'
    },
    children: {
      control: 'text',
      description: 'Nội dung bên trong button'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3 p-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Button>
        <Plus />
        Thêm mới
      </Button>
      <Button variant="outline">
        <Download />
        Tải xuống
      </Button>
      <Button variant="secondary">
        <Mail />
        Gửi email
      </Button>
      <Button variant="destructive">
        <Trash2 />
        Xóa
      </Button>
    </div>
  )
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Button size="icon-xs" variant="ghost" aria-label="Xóa">
        <Trash2 />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Thêm">
        <Plus />
      </Button>
      <Button size="icon" aria-label="Tải xuống">
        <Download />
      </Button>
      <Button size="icon-lg" variant="secondary" aria-label="Email">
        <Mail />
      </Button>
    </div>
  )
};

export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    disabled: true
  }
};
