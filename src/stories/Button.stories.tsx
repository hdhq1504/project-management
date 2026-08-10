import type { Meta, StoryObj } from '@storybook/react';
import { Trash2, Plus, Download, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component hỗ trợ nhiều variants và sizes khác nhau. Được xây dựng trên CVA (class-variance-authority).'
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

// ─────────────────────────────────────────────
// Default
// ─────────────────────────────────────────────
export const Default: Story = {
  args: {
    children: 'Click me'
  }
};

// ─────────────────────────────────────────────
// Tất cả Variants
// ─────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
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

// ─────────────────────────────────────────────
// Tất cả Sizes
// ─────────────────────────────────────────────
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-wrap items-end gap-3 p-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

// ─────────────────────────────────────────────
// Với Icon
// ─────────────────────────────────────────────
export const WithIcon: Story = {
  name: 'With Icons',
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

// ─────────────────────────────────────────────
// Icon Only
// ─────────────────────────────────────────────
export const IconOnly: Story = {
  name: 'Icon Only',
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

// ─────────────────────────────────────────────
// Disabled
// ─────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    disabled: true
  }
};
