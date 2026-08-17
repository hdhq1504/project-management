import type { ComponentProps, ReactNode } from 'react';
import { FormProvider, type FieldValues, type FormProviderProps, type SubmitHandler } from 'react-hook-form';

export type FormProps<TFieldValues extends FieldValues, TContext = unknown, TTransformedValues = TFieldValues> = Omit<
  ComponentProps<'form'>,
  'onSubmit'
> & {
  form: Omit<FormProviderProps<TFieldValues, TContext, TTransformedValues>, 'children'>;
  children?: ReactNode;
  onFinish?: SubmitHandler<TTransformedValues, void>;
};

const Form = <TFieldValues extends FieldValues, TContext = unknown, TTransformedValues = TFieldValues>({
  children,
  form,
  onFinish = () => {},
  ...props
}: FormProps<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <FormProvider {...form}>
      <form {...props} onSubmit={form?.handleSubmit(onFinish)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
