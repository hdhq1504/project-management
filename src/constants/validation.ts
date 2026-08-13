export const PASSWORD_MIN_LENGTH = 6;
export const USERNAME_MIN_LENGTH = 3;

export const rules = {
  EMAIL_REQUIRED: 'Email không được để trống',
  EMAIL_INVALID: 'Email không hợp lệ',

  PASSWORD_REQUIRED: 'Mật khẩu không được để trống',
  PASSWORD_MIN_LENGTH: (min: number | bigint) => `Mật khẩu phải có ít nhất ${min} ký tự`,

  USERNAME_REQUIRED: 'Username không được để trống',
  USERNAME_MIN_LENGTH: (min: number | bigint) => `Username phải có ít nhất ${min} ký tự`,

  CONFIRM_PASSWORD_REQUIRED: 'Xác nhận mật khẩu không được để trống',
  CONFIRM_PASSWORD_MISMATCH: 'Xác nhận mật khẩu không khớp'
} as const;
