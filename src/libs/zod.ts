import * as z from 'zod';

/**
 * Ref ({@link file://./../../node_modules/zod/v4/locales/vi.js})
 */
const vnLocaleError: z.core.$ZodErrorMap<z.core.$ZodIssue> = (issue) => {
  switch (issue.code) {
    case 'invalid_type': {
      if (issue.input === undefined || issue.input === null) {
        return 'Đây là trường bắt buộc';
      }
      return 'Dữ liệu không đúng định dạng';
    }

    case 'invalid_format': {
      if (issue.format === 'email') {
        return 'Email không hợp lệ';
      }
      break;
    }

    case 'too_small': {
      if (issue.origin === 'string') {
        if (issue.input === '') {
          return 'Đây là trường bắt buộc';
        }
        return `Phải có ít nhất ${issue.minimum} kí tự`;
      }

      if (issue.origin === 'number') {
        return `Giá trị phải >= ${issue.minimum}`;
      }

      break;
    }

    case 'too_big': {
      if (issue.origin === 'string') {
        return `Không được vượt quá ${issue.maximum} ký tự`;
      }

      if (issue.origin === 'number') {
        return `Giá trị không được lớn hơn ${issue.maximum}`;
      }

      break;
    }
  }

  // Note: Default Zod vn error mes
  return z.locales.vi().localeError(issue);
};

z.config({ localeError: vnLocaleError });

export { z };
