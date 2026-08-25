import { Field, FieldError, FieldLabel } from '@/components/molecules/field/field';
import { isValidElement, cloneElement, useId, type ReactNode } from 'react';
import {
  useController,
  useFormContext,
  type FieldPath,
  type FieldValues,
  type UseControllerProps
} from 'react-hook-form';

export type FormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = UseControllerProps<TFieldValues, TName, TTransformedValues> & {
  label?: ReactNode;
  children?: ReactNode;
};

const FormItem = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  label,
  children,
  ...props
}: FormItemProps<TFieldValues, TName, TTransformedValues>) => {
  const id = useId();

  const { control } = useFormContext<TFieldValues, TName, TTransformedValues>();

  const {
    field,
    fieldState: { invalid, error }
  } = useController<TFieldValues, TName, TTransformedValues>({
    control,
    ...props
  });

  return (
    <Field data-invalid={invalid}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      {isValidElement(children)
        ? cloneElement(children, { id, ...(children?.props as object), ...field } as Record<string, unknown>)
        : null}
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
};

export default FormItem;
