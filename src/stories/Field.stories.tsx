import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/atoms/button/button';
import { Input } from '@/components/atoms/input/input';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldContent,
  FieldTitle
} from '@/components/molecules/field/field';

const meta: Meta = {
  title: 'UI/Field',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Bộ Field components dùng để xây dựng form có cấu trúc rõ ràng với label, description, error và nhiều layout orientation.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleField: Story = {
  name: 'Simple Field',
  render: () => (
    <div className="w-80">
      <Field>
        <FieldLabel htmlFor="simple-email">Email</FieldLabel>
        <Input id="simple-email" type="email" placeholder="name@example.com" />
      </Field>
    </div>
  )
};

export const WithDescription: Story = {
  name: 'Field with Description',
  render: () => (
    <div className="w-80">
      <Field>
        <FieldLabel htmlFor="desc-email">Email</FieldLabel>
        <FieldContent>
          <Input id="desc-email" type="email" placeholder="name@example.com" />
          <FieldDescription>Email sẽ được dùng để đăng nhập và nhận thông báo.</FieldDescription>
        </FieldContent>
      </Field>
    </div>
  )
};

export const WithError: Story = {
  name: 'Field with Error',
  render: () => (
    <div className="w-80">
      <Field data-invalid="true">
        <FieldLabel htmlFor="error-email">Email</FieldLabel>
        <FieldContent>
          <Input id="error-email" type="email" aria-invalid defaultValue="invalid-email" />
          <FieldError>Email không đúng định dạng.</FieldError>
        </FieldContent>
      </Field>
    </div>
  )
};

export const GroupOfFields: Story = {
  name: 'Field Group',
  render: () => (
    <div className="w-96">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="group-name">Họ và tên</FieldLabel>
          <Input id="group-name" placeholder="Nguyễn Văn A" />
        </Field>
        <Field>
          <FieldLabel htmlFor="group-email">Email</FieldLabel>
          <FieldContent>
            <Input id="group-email" type="email" placeholder="name@example.com" />
            <FieldDescription>Dùng để đăng nhập hệ thống.</FieldDescription>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="group-password">Mật khẩu</FieldLabel>
          <Input id="group-password" type="password" placeholder="••••••••" />
        </Field>
        <Button className="w-full">Đăng ký</Button>
      </FieldGroup>
    </div>
  )
};

export const WithFieldSet: Story = {
  name: 'FieldSet',
  render: () => (
    <div className="w-96">
      <FieldSet>
        <FieldLegend>Thông tin cá nhân</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldTitle>Họ tên</FieldTitle>
            <Input placeholder="Nhập họ và tên..." />
          </Field>
          <Field>
            <FieldTitle>Số điện thoại</FieldTitle>
            <FieldContent>
              <Input type="tel" placeholder="+84 xxx xxx xxx" />
              <FieldDescription>Số điện thoại liên hệ của bạn.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
};

export const HorizontalField: Story = {
  name: 'Horizontal Orientation',
  render: () => (
    <div className="w-96">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="h-name">Họ tên</FieldLabel>
          <Input id="h-name" placeholder="Nguyễn Văn A" />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="h-email">Email</FieldLabel>
          <Input id="h-email" type="email" placeholder="name@example.com" />
        </Field>
      </FieldGroup>
    </div>
  )
};
